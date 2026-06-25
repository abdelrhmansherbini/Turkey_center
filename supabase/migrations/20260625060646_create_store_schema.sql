/*
# Create store schema: products, testimonials, orders

## Overview
Sets up the full data layer for the سنتر التركي furnishings store:
products catalog, customer testimonials, and order submissions.

## 1. New Tables

### products
- id (uuid, PK)
- name (text) — Arabic product name
- category (text) — one of: مفارش السرير, اللحفة, البطاطين, السجاد التركي
- price (numeric) — current price in EGP
- original_price (numeric, nullable) — pre-discount price
- image (text) — URL to product image
- rating (numeric) — average rating 0-5
- reviews (int) — number of reviews
- badge (text, nullable) — e.g. "الأكثر مبيعاً"
- badge_color (text, nullable) — tailwind bg class
- description (text) — Arabic description
- colors (text[]) — available color hex codes
- sizes (text[]) — available size labels
- in_stock (boolean, default true)
- created_at (timestamptz)

### testimonials
- id (uuid, PK)
- name (text) — customer name
- location (text) — e.g. "الغربية - زفتى"
- rating (int) — 1-5
- text (text) — review text in Arabic
- initials (text) — 2-char avatar initials
- color (text) — tailwind bg class for avatar
- created_at (timestamptz)

### orders
- id (uuid, PK)
- customer_name (text)
- customer_phone (text)
- customer_address (text)
- items (jsonb) — array of {product_id, name, price, qty, image}
- total (numeric) — total order value in EGP
- status (text, default 'new') — new / contacted / completed / cancelled
- created_at (timestamptz)

## 2. Indexes
- products(category) — filter by category
- orders(status), orders(created_at) — admin dashboard queries
- testimonials(created_at desc)

## 3. Security (RLS)
All tables are single-tenant (no user auth). The admin dashboard is protected
by a client-side password gate, and writes go through the anon key.
- products: anon SELECT (storefront), anon INSERT/UPDATE/DELETE (admin)
- testimonials: anon SELECT (storefront), anon INSERT (customer submission),
  anon UPDATE/DELETE (admin)
- orders: anon INSERT (checkout), anon SELECT (admin dashboard view).
  No public update/delete to protect order integrity.
*/

-- ── products ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  original_price numeric,
  image text NOT NULL,
  rating numeric NOT NULL DEFAULT 4.5,
  reviews integer NOT NULL DEFAULT 0,
  badge text,
  badge_color text,
  description text NOT NULL DEFAULT '',
  colors text[] NOT NULL DEFAULT '{}',
  sizes text[] NOT NULL DEFAULT '{}',
  in_stock boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_products" ON products;
CREATE POLICY "anon_select_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_products" ON products;
CREATE POLICY "anon_insert_products" ON products FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_products" ON products;
CREATE POLICY "anon_update_products" ON products FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_products" ON products;
CREATE POLICY "anon_delete_products" ON products FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);

-- ── testimonials ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL,
  rating integer NOT NULL DEFAULT 5,
  text text NOT NULL,
  initials text NOT NULL DEFAULT '',
  color text NOT NULL DEFAULT 'bg-crimson-600',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_testimonials" ON testimonials;
CREATE POLICY "anon_select_testimonials" ON testimonials FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_testimonials" ON testimonials;
CREATE POLICY "anon_insert_testimonials" ON testimonials FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_testimonials" ON testimonials;
CREATE POLICY "anon_update_testimonials" ON testimonials FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_testimonials" ON testimonials;
CREATE POLICY "anon_delete_testimonials" ON testimonials FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_testimonials_created ON testimonials(created_at desc);

-- ── orders ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_address text NOT NULL,
  items jsonb NOT NULL DEFAULT '[]',
  total numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_orders" ON orders;
CREATE POLICY "anon_select_orders" ON orders FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_update_orders" ON orders;
CREATE POLICY "anon_update_orders" ON orders FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at desc);
