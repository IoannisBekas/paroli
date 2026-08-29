import { menuItems } from '@/lib/menu';
import { ensureOrderSchema } from '@/lib/orders-db';

type IncomingLine = {
  itemId?: unknown;
  quantity?: unknown;
  optionIds?: unknown;
  options?: unknown;
};

type IncomingOrder = {
  branch?: unknown;
  customerName?: unknown;
  phone?: unknown;
  address?: unknown;
  floorBell?: unknown;
  notes?: unknown;
  paymentMethod?: unknown;
  lines?: unknown;
};

const validBranches = new Set(['nikaia', 'pasalimani', 'drapetsona']);

const optionPrices: Record<string, number> = {
  cypriot: 0.4,
  giant_pita: 3.9,
  giant_sandwich: 2,
  giant_skepasti: 6.7,
  half_kilo: -0.5,
  extra_gouda: 0.5,
  extra_feta: 0.5,
};

const cleanText = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

const roundMoney = (value: number) => Math.round(value * 100) / 100;

export async function POST(request: Request) {
  let payload: IncomingOrder;

  try {
    payload = (await request.json()) as IncomingOrder;
  } catch {
    return Response.json({ message: 'Η παραγγελία δεν ήταν έγκυρη.' }, { status: 400 });
  }

  const branch = cleanText(payload.branch, 24);
  const customerName = cleanText(payload.customerName, 80);
  const phone = cleanText(payload.phone, 24).replace(/[\s()-]/g, '');
  const address = cleanText(payload.address, 180);
  const floorBell = cleanText(payload.floorBell, 80);
  const notes = cleanText(payload.notes, 500);
  const paymentMethod = cleanText(payload.paymentMethod, 24) || 'cash';
  const incomingLines = Array.isArray(payload.lines) ? (payload.lines as IncomingLine[]) : [];

  if (!validBranches.has(branch)) {
    return Response.json({ message: 'Επίλεξε κατάστημα.' }, { status: 400 });
  }

  if (customerName.length < 2 || address.length < 5 || !/^\+?\d{10,15}$/.test(phone)) {
    return Response.json(
      { message: 'Συμπλήρωσε σωστά όνομα, τηλέφωνο και διεύθυνση.' },
      { status: 400 },
    );
  }

  if (paymentMethod !== 'cash') {
    return Response.json({ message: 'Ο τρόπος πληρωμής δεν υποστηρίζεται.' }, { status: 400 });
  }

  if (incomingLines.length === 0 || incomingLines.length > 50) {
    return Response.json({ message: 'Το καλάθι είναι άδειο ή πολύ μεγάλο.' }, { status: 400 });
  }

  const catalog = new Map(menuItems.map((item) => [item.id, item]));

  const lines = incomingLines.map((line) => {
    const itemId = cleanText(line.itemId, 32);
    const item = catalog.get(itemId);
    const quantity = Number(line.quantity);
    const optionIds = Array.isArray(line.optionIds)
      ? line.optionIds.filter((value): value is string => typeof value === 'string').slice(0, 20)
      : [];
    const options = Array.isArray(line.options)
      ? line.options.filter((value): value is string => typeof value === 'string').slice(0, 20)
      : [];

    if (!item || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      return null;
    }

    let multiplier = 1;
    let surcharge = 0;

    for (const optionId of new Set(optionIds)) {
      if (optionId === 'half_kilo') multiplier = 0.5;
      else surcharge += optionPrices[optionId] ?? 0;
    }

    const unitPrice = roundMoney(item.price * multiplier + surcharge);
    return {
      productId: item.id,
      productName: item.name,
      unitPrice,
      quantity,
      options,
      lineTotal: roundMoney(unitPrice * quantity),
    };
  });

  if (lines.some((line) => line === null)) {
    return Response.json({ message: 'Κάποιο προϊόν δεν είναι πλέον έγκυρο.' }, { status: 400 });
  }

  const safeLines = lines.filter((line): line is NonNullable<typeof line> => line !== null);
  const subtotal = roundMoney(safeLines.reduce((sum, line) => sum + line.lineTotal, 0));
  const deliveryFee = 0;
  const total = roundMoney(subtotal + deliveryFee);

  if (subtotal < 6) {
    return Response.json({ message: 'Η ελάχιστη παραγγελία είναι 6,00€.' }, { status: 400 });
  }

  const now = new Date();
  const id = crypto.randomUUID();
  const compactDate = now.toISOString().slice(2, 10).replaceAll('-', '');
  const orderNumber = `PAR-${compactDate}-${Math.floor(100000 + Math.random() * 900000)}`;

  try {
    const db = await ensureOrderSchema();
    const statements: D1PreparedStatement[] = [
      db
        .prepare(`
          INSERT INTO orders (
            id, order_number, branch, customer_name, phone, address, floor_bell,
            notes, payment_method, subtotal, delivery_fee, total, status, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', ?)
        `)
        .bind(
          id,
          orderNumber,
          branch,
          customerName,
          phone,
          address,
          floorBell,
          notes,
          paymentMethod,
          subtotal,
          deliveryFee,
          total,
          now.toISOString(),
        ),
      ...safeLines.map((line) =>
        db
          .prepare(`
            INSERT INTO order_items (
              order_id, product_id, product_name, unit_price, quantity, options_json, line_total
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
          `)
          .bind(
            id,
            line.productId,
            line.productName,
            line.unitPrice,
            line.quantity,
            JSON.stringify(line.options),
            line.lineTotal,
          ),
      ),
    ];

    await db.batch(statements);

    return Response.json(
      {
        orderNumber,
        total,
        eta: '25–30 λεπτά',
        message: 'Η παραγγελία καταχωρήθηκε.',
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Unable to create order', error);
    return Response.json(
      { message: 'Δεν μπορέσαμε να καταχωρήσουμε την παραγγελία. Δοκίμασε ξανά.' },
      { status: 500 },
    );
  }
}
