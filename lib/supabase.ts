import { createBrowserClient } from '@supabase/ssr'

// Define the strings first
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Safety check: Ensure the app doesn't crash silently if env vars are missing
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase Environment Variables. Check your .env.local file.'
  )
}

export const createClient = () => createBrowserClient(supabaseUrl, supabaseAnonKey)