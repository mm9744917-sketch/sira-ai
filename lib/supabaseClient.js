// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// تنبيه وقت التشغيل لو في مشكلة بالعوامل
if (!supabaseUrl || !supabaseKey) {
  console.warn(
    '⚠️ Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL & NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel.'
  );
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseKey || ''
);
