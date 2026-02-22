import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

// Define the strings first
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Safety check: Ensure the app doesn't crash silently if env vars are missing
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase Environment Variables. Check your .env.local file.'
  )
}

// Create a single shared instance (singleton pattern)
let supabaseInstance: SupabaseClient | null = null

export const createClient = () => {
  // Return existing instance if already created
  if (supabaseInstance) {
    return supabaseInstance
  }

  // Create new instance only if it doesn't exist
  supabaseInstance = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      storageKey: 'sb-yourttiykfslostesqjp-auth-token',
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false
    }
  })

  console.log('✅ Created Supabase client instance (singleton)')

  return supabaseInstance
}