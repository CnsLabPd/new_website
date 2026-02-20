/**
 * Neurogati Game SDK - Authentication Module
 * Shared authentication helper for all Neurogati games
 *
 * Usage:
 * <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
 * <script src="https://neurogati.com/game-sdk/neurogati-auth.js"></script>
 */

class NeurogatiAuth {
  constructor() {
    this.supabase = null;
    this.user = null;
    this.initialized = false;
  }

  /**
   * Initialize the Supabase client
   * Call this first before any other methods
   */
  async init() {
    if (this.initialized) return;

    // Supabase credentials - these are public and safe to expose
    const SUPABASE_URL = 'https://yourttiykfslostesqjp.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXJ0dGl5a2ZzbG9zdGVzcWpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1NzY1NjgsImV4cCI6MjA4NzE1MjU2OH0.R-spS9GY6AXA5cwytwW2KIxDd1F0ryqb84d8C_wwIGc';

    // Check if Supabase is loaded
    if (typeof supabase === 'undefined') {
      throw new Error('Supabase library not loaded. Please include: <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>');
    }

    this.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Get current user session
    const { data: { user } } = await this.supabase.auth.getUser();
    this.user = user;

    this.initialized = true;
    console.log('✅ Neurogati Auth initialized', user ? `User: ${user.email}` : 'No user logged in');

    return this.user;
  }

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!this.user;
  }

  /**
   * Get current user
   * @returns {Object|null} User object or null
   */
  getCurrentUser() {
    return this.user;
  }

  /**
   * Get user ID
   * @returns {string|null}
   */
  getUserId() {
    return this.user?.id || null;
  }

  /**
   * Get user email
   * @returns {string|null}
   */
  getUserEmail() {
    return this.user?.email || null;
  }

  /**
   * Get user name (from metadata)
   * @returns {string|null}
   */
  getUserName() {
    return this.user?.user_metadata?.full_name || this.user?.email || null;
  }

  /**
   * Redirect to login page
   * Shows alert and redirects to main Neurogati website
   */
  redirectToLogin() {
    alert('Please sign in to Neurogati to play this game.');
    window.location.href = 'https://neurogati.com';
  }

  /**
   * Get Supabase client for direct access
   * @returns {Object} Supabase client
   */
  getClient() {
    if (!this.initialized) {
      throw new Error('Auth not initialized. Call init() first.');
    }
    return this.supabase;
  }
}

// Create global instance
window.NeurogatiAuth = new NeurogatiAuth();

// Auto-initialize on load
window.addEventListener('DOMContentLoaded', async () => {
  try {
    await window.NeurogatiAuth.init();
  } catch (error) {
    console.error('❌ Failed to initialize Neurogati Auth:', error);
  }
});
