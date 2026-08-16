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

// Default identity for auto-authenticated players.
export const DEFAULT_USERNAME = process.env.NEXT_PUBLIC_DEFAULT_USERNAME || 'user'

/**
 * Silently ensures a Supabase session exists using the shared default account,
 * so games/progress work without any sign-in UI. Idempotent: if a session is
 * already present it is reused. Also normalizes the display name to "user".
 * Returns the authenticated user, or null if auto sign-in could not complete.
 */
export const ensureDefaultSession = async () => {
  const supabase = createClient()

  // Reuse an existing session if there is one (local check, no network round-trip).
  const { data: { session } } = await supabase.auth.getSession()
  let user = session?.user ?? null

  if (!user) {
    const email = process.env.NEXT_PUBLIC_DEFAULT_GAME_EMAIL
    const password = process.env.NEXT_PUBLIC_DEFAULT_GAME_PASSWORD

    if (!email || !password) {
      console.error('❌ Missing default game credentials (NEXT_PUBLIC_DEFAULT_GAME_EMAIL / _PASSWORD)')
      return null
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      console.error('❌ Auto sign-in failed:', error.message)
      return null
    }
    user = data.user ?? null
  }

  // Make sure the account presents as "user" (the save API reads full_name first).
  if (user && user.user_metadata?.full_name !== DEFAULT_USERNAME) {
    try {
      await supabase.auth.updateUser({ data: { full_name: DEFAULT_USERNAME } })
    } catch (e) {
      console.error('⚠️ Could not normalize default username:', e)
    }
  }

  return user
}