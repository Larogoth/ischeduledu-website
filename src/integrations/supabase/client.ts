// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://bfwojaofxczxxfxlfvqf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmd29qYW9meGN6eHhmeGxmdnFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5MzU5ODMsImV4cCI6MjA1MTUxMTk4M30.Di_GfDxN0S8GaR2toxBDOR9JDI2yrs7Atbv0zHmaC9c";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);