import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bfwojaofxczxxfxlfvqf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmd29qYW9meGN6eHhmemxmdnFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ0MTI4MDAsImV4cCI6MjAxOTk4ODgwMH0.JEKfEsHu6ZJPVZxJ-YzNUOSS_UyZEzE9h5Qx0vhzqrE';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);