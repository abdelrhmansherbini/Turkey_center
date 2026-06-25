import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase env vars. Check .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  original_price: number | null;
  image: string;
  rating: number;
  reviews: number;
  badge: string | null;
  badge_color: string | null;
  description: string;
  colors: string[];
  sizes: string[];
  in_stock: boolean;
  created_at: string;
};

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  initials: string;
  color: string;
  created_at: string;
};

export type Order = {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  items: OrderItem[];
  total: number;
  status: string;
  created_at: string;
};

export type OrderItem = {
  product_id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
};

export type CartItem = Product & { qty: number };
