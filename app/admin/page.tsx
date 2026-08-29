import { env } from 'cloudflare:workers';
import { Clock3, LockKeyhole, MapPin, Phone, RefreshCw, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

import { chatGPTSignInPath, getChatGPTUser } from '@/app/chatgpt-auth';
import { ensureOrderSchema } from '@/lib/orders-db';

export const dynamic = 'force-dynamic';

type OrderRow = {
  id: string;
  order_number: string;
  branch: string;
  customer_name: string;
  phone: string;
  address: string;
  floor_bell: string;
  notes: string;
  payment_method: string;
  subtotal: number;
  delivery_fee: number;
  total: number;
  status: string;
  created_at: string;
};

type ItemRow = {
  order_id: string;
  product_name: string;
  unit_price: number;
  quantity: number;
  options_json: string;
  line_total: number;
};

const branchNames: Record<string, string> = {
  nikaia: 'Νίκαια',
  pasalimani: 'Πασαλιμάνι',
  drapetsona: 'Δραπετσώνα',
};

const formatPrice = (value: number) =>
  new Intl.NumberFormat('el-GR', { style: 'currency', currency: 'EUR' }).format(value);

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('el-GR', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'Europe/Athens',
  }).format(new Date(value));

export default async function AdminOrdersPage() {
  const user = await getChatGPTUser();

  if (!user) {
    return (
      <main className="grid min-h-screen place-items-center bg-background p-5 text-foreground">
        <section className="w-full max-w-md rounded-3xl border border-black/10 bg-card p-6 text-center shadow-xl sm:p-8">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-primary text-white">
            <LockKeyhole />
          </span>
          <h1 className="mt-5 text-2xl font-black">Πίνακας Παρόλι</h1>
          <p className="mt-3 text-sm font-medium leading-6 text-muted-foreground">
            Συνδέσου με τον εξουσιοδοτημένο λογαριασμό ChatGPT για να δεις τις παραγγελίες.
          </p>
          <a
            href={chatGPTSignInPath('/admin')}
            target="_top"
            className="mt-6 inline-flex h-12 items-center rounded-full bg-primary px-6 text-sm font-black text-white"
          >
            Σύνδεση με ChatGPT
          </a>
        </section>
      </main>
    );
  }

  const siteEnv = env as unknown as { ADMIN_USER_ID?: string };
  if (!siteEnv.ADMIN_USER_ID || user.id !== siteEnv.ADMIN_USER_ID) {
    return (
      <main className="grid min-h-screen place-items-center bg-background p-5 text-foreground">
        <section className="w-full max-w-md rounded-3xl border border-black/10 bg-card p-6 text-center sm:p-8">
          <LockKeyhole className="mx-auto size-10 text-primary" />
          <h1 className="mt-5 text-2xl font-black">Δεν έχεις πρόσβαση</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Ο λογαριασμός {user.email} δεν είναι εξουσιοδοτημένος για τον πίνακα παραγγελιών.
          </p>
          <Link href="/" className="mt-6 inline-flex min-h-11 items-center font-black text-primary underline underline-offset-4">Επιστροφή στο site</Link>
        </section>
      </main>
    );
  }

  const db = await ensureOrderSchema();
  const orderResult = await db
    .prepare(
      'SELECT id, order_number, branch, customer_name, phone, address, floor_bell, notes, payment_method, subtotal, delivery_fee, total, status, created_at FROM orders ORDER BY created_at DESC LIMIT 100',
    )
    .all<OrderRow>();
  const itemResult = await db
    .prepare(
      'SELECT order_id, product_name, unit_price, quantity, options_json, line_total FROM order_items WHERE order_id IN (SELECT id FROM orders ORDER BY created_at DESC LIMIT 100) ORDER BY id ASC',
    )
    .all<ItemRow>();

  const itemsByOrder = new Map<string, ItemRow[]>();
  for (const item of itemResult.results) {
    itemsByOrder.set(item.order_id, [...(itemsByOrder.get(item.order_id) ?? []), item]);
  }

  return (
    <main className="min-h-screen bg-[#f7efdf] text-foreground">
      <header className="sticky top-0 z-10 border-b border-black/10 bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:gap-4 sm:px-5">
          <div className="min-w-0">
            <p className="eyebrow">Owner inbox</p>
            <h1 className="mt-1 text-xl font-black tracking-tight sm:text-2xl">Παραγγελίες Παρόλι</h1>
          </div>
          <div className="flex items-center gap-3">
            <span title={user.name || user.email} className="hidden max-w-56 truncate text-right text-xs font-bold text-muted-foreground sm:block">
              {user.name || user.email}<br />έως 100 πρόσφατες
            </span>
            <Link href="/admin" className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-white focus-visible:ring-3 focus-visible:ring-primary/40" aria-label="Ανανέωση παραγγελιών">
              <RefreshCw className="size-4" />
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-5 sm:py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-muted-foreground">Σύνολο στο inbox</p>
            <p className="text-4xl font-black">{orderResult.results.length}</p>
          </div>
          <Link href="/" className="inline-flex min-h-11 items-center rounded-full border border-black/10 bg-card px-4 py-2 text-sm font-black focus-visible:ring-3 focus-visible:ring-primary/40">Προβολή site</Link>
        </div>

        {orderResult.results.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-black/20 bg-card p-8 text-center sm:p-14">
            <ShoppingBag className="mx-auto size-10 text-primary" />
            <p className="mt-4 text-lg font-black">Δεν υπάρχουν παραγγελίες ακόμη.</p>
            <p className="mt-2 text-sm text-muted-foreground">Οι νέες παραγγελίες θα εμφανίζονται εδώ.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {orderResult.results.map((order) => {
              const items = itemsByOrder.get(order.id) ?? [];
              return (
                <article key={order.id} className="overflow-hidden rounded-3xl border border-black/10 bg-card shadow-[0_10px_35px_rgb(44_32_20/6%)]">
                  <div className="flex flex-col gap-4 border-b border-black/10 bg-ink p-4 text-white sm:flex-row sm:items-center sm:justify-between sm:p-5">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-primary px-3 py-1 text-xs font-black">ΝΕΑ</span>
                        <span className="text-xs font-bold text-white/55">{branchNames[order.branch] || order.branch}</span>
                      </div>
                      <h2 className="mt-2 text-xl font-black">{order.order_number}</h2>
                    </div>
                    <time dateTime={order.created_at} className="flex min-h-11 items-center gap-2 text-sm font-bold text-white/70"><Clock3 className="size-4 shrink-0 text-sun" />{formatDate(order.created_at)}</time>
                  </div>

                  <div className="grid lg:grid-cols-[1fr_0.85fr]">
                    <div className="min-w-0 border-b border-black/10 p-4 sm:p-5 lg:border-b-0 lg:border-r">
                      <h3 className="font-black">Προϊόντα</h3>
                      <div className="mt-4 space-y-4">
                        {items.map((item, index) => {
                          let options: string[] = [];
                          try {
                            options = JSON.parse(item.options_json) as string[];
                          } catch {
                            options = [];
                          }
                          return (
                            <div key={item.product_name + index} className="flex min-w-0 justify-between gap-4 text-sm">
                              <div className="min-w-0 [overflow-wrap:anywhere]">
                                <p className="font-black">{item.quantity} × {item.product_name}</p>
                                {options.length > 0 && <p className="mt-1 max-w-xl text-xs leading-5 text-muted-foreground">{options.join(' · ')}</p>}
                              </div>
                              <span className="shrink-0 font-black">{formatPrice(item.line_total)}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-5 flex justify-between border-t border-dashed border-black/20 pt-4 text-lg font-black">
                        <span>Σύνολο</span><span>{formatPrice(order.total)}</span>
                      </div>
                    </div>

                    <div className="min-w-0 p-4 sm:p-5">
                      <h3 className="font-black [overflow-wrap:anywhere]">{order.customer_name}</h3>
                      <div className="mt-4 space-y-3 text-sm font-semibold">
                        <a href={'tel:' + order.phone} className="flex min-h-11 items-center gap-3 rounded-lg text-primary focus-visible:ring-3 focus-visible:ring-primary/40"><Phone className="size-4" />{order.phone}</a>
                        <p className="flex items-start gap-3 [overflow-wrap:anywhere]"><MapPin className="mt-0.5 size-4 shrink-0 text-primary" /><span className="min-w-0">{order.address}{order.floor_bell ? ' · ' + order.floor_bell : ''}</span></p>
                      </div>
                      {order.notes && <p className="mt-4 rounded-xl bg-sun/20 p-3 text-sm font-semibold leading-6 [overflow-wrap:anywhere]">{order.notes}</p>}
                      <p className="mt-4 text-xs font-bold text-muted-foreground">Πληρωμή: μετρητά στην παράδοση</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
