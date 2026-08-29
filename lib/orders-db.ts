import { env } from 'cloudflare:workers';

type SiteEnv = {
  DB: D1Database;
};

const getDatabase = () => (env as unknown as SiteEnv).DB;

export async function ensureOrderSchema() {
  const db = getDatabase();

  await db.batch([
    db.prepare(`
      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        order_number TEXT NOT NULL UNIQUE,
        branch TEXT NOT NULL,
        customer_name TEXT NOT NULL,
        phone TEXT NOT NULL,
        address TEXT NOT NULL,
        floor_bell TEXT NOT NULL DEFAULT '',
        notes TEXT NOT NULL DEFAULT '',
        payment_method TEXT NOT NULL DEFAULT 'cash',
        subtotal REAL NOT NULL,
        delivery_fee REAL NOT NULL DEFAULT 0,
        total REAL NOT NULL,
        status TEXT NOT NULL DEFAULT 'new',
        created_at TEXT NOT NULL
      )
    `),
    db.prepare(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        product_name TEXT NOT NULL,
        unit_price REAL NOT NULL,
        quantity INTEGER NOT NULL,
        options_json TEXT NOT NULL DEFAULT '[]',
        line_total REAL NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
      )
    `),
    db.prepare(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_orders_order_number
      ON orders(order_number)
    `),
    db.prepare(`
      CREATE INDEX IF NOT EXISTS idx_orders_status_created_at
      ON orders(status, created_at)
    `),
    db.prepare(`
      CREATE INDEX IF NOT EXISTS idx_order_items_order_id
      ON order_items(order_id)
    `),
  ]);

  await db.prepare('PRAGMA optimize').run();

  return db;
}
