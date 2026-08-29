import { index, integer, real, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const orders = sqliteTable(
  'orders',
  {
    id: text('id').primaryKey(),
    orderNumber: text('order_number').notNull(),
    branch: text('branch').notNull(),
    customerName: text('customer_name').notNull(),
    phone: text('phone').notNull(),
    address: text('address').notNull(),
    floorBell: text('floor_bell').notNull().default(''),
    notes: text('notes').notNull().default(''),
    paymentMethod: text('payment_method').notNull().default('cash'),
    subtotal: real('subtotal').notNull(),
    deliveryFee: real('delivery_fee').notNull().default(0),
    total: real('total').notNull(),
    status: text('status').notNull().default('new'),
    createdAt: text('created_at').notNull(),
  },
  (table) => [
    uniqueIndex('idx_orders_order_number').on(table.orderNumber),
    index('idx_orders_status_created_at').on(table.status, table.createdAt),
  ],
);

export const orderItems = sqliteTable(
  'order_items',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    orderId: text('order_id')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    productId: text('product_id').notNull(),
    productName: text('product_name').notNull(),
    unitPrice: real('unit_price').notNull(),
    quantity: integer('quantity').notNull(),
    optionsJson: text('options_json').notNull().default('[]'),
    lineTotal: real('line_total').notNull(),
  },
  (table) => [index('idx_order_items_order_id').on(table.orderId)],
);
