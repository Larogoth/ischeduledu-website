import { createClient } from '@supabase/supabase-js';

// Get these values from your Supabase project settings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anonymous Key. Make sure you have connected your Supabase project in Lovable by clicking the Supabase icon in the top right corner.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Add a helper function to check connection status
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('testimonials').select('count');
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Supabase connection error:', error);
    return false;
  }
};