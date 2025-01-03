import { createClient } from '@supabase/supabase-js';

// Get these values from your Supabase project settings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anonymous Key. Make sure you have connected your Supabase project in Lovable.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);