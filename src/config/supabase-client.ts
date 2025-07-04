import { createClient } from "@supabase/supabase-js";


const supabaseURL = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_API_KEY as string;

export const supabase = createClient(supabaseURL, supabaseAnonKey)