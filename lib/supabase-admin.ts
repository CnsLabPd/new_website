import { createClient, type SupabaseClient } from "@supabase/supabase-js"

// Server-only Supabase client using the service-role key. This bypasses RLS,
// so it must NEVER be imported into client components. Used exclusively by
// API routes under /api/advisory.
let adminInstance: SupabaseClient | null = null

export function createAdminClient(): SupabaseClient {
  if (adminInstance) return adminInstance

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error(
      "Missing Supabase server credentials. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the environment."
    )
  }

  adminInstance = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
  return adminInstance
}

// Simple shared-secret gate for the admin surfaces. Because the whole site
// auto-authenticates as one shared account, admin access is gated by this
// separate key rather than by Supabase auth.
export function isAdminKeyValid(key: string | null | undefined): boolean {
  const expected = process.env.ADMIN_DASHBOARD_KEY
  if (!expected) return false
  return typeof key === "string" && key.length > 0 && key === expected
}
