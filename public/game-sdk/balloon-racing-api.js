/**
 * Neurogati Game SDK - Sonic Games API
 * API helper for Sonic Pop and Sonic Drive (Sonic Racer) games
 *
 * Usage:
 * <script src="https://neurogati.com/game-sdk/balloon-racing-api.js"></script>
 */

class BalloonRacingAPI {
  constructor(gameSlug) {
    this.gameSlug = gameSlug; // 'sonic-pop' or 'sonic-drive'
    this.gameUser = null;
    this.supabaseClient = null;
    this._initSupabase();
    this._loadGameUser();
  }

  /**
   * Initialize Supabase client
   * @private
   */
  _initSupabase() {
    // Use the global Supabase client from the parent page
    if (window.parent && window.parent.createSupabaseClient) {
      this.supabaseClient = window.parent.createSupabaseClient();
    } else {
      console.warn('⚠️ Supabase client not available from parent window');
    }
  }

  /**
   * Load game user from sessionStorage
   * @private
   */
  _loadGameUser() {
    try {
      const storedUser = sessionStorage.getItem('neurogati_game_user');
      if (storedUser) {
        this.gameUser = JSON.parse(storedUser);
        console.log('✅ Game user loaded for API:', this.gameUser.username);
      }
    } catch (e) {
      console.error('❌ Error loading game user:', e);
    }
  }

  /**
   * Ensure user is authenticated
   * @private
   */
  _ensureAuth() {
    if (!this.gameUser) {
      throw new Error('User not authenticated');
    }
  }

  /**
   * Get user identifier (using email as unique identifier)
   * @private
   */
  _getUserIdentifier() {
    return this.gameUser ? this.gameUser.email : null;
  }

  /**
   * Get username
   * @private
   */
  _getUsername() {
    return this.gameUser ? this.gameUser.username : 'Guest';
  }

  /**
   * Save score for a level
   * @param {number} levelNumber - Level number (1, 2, 3, etc.)
   * @param {number} moduleNumber - Module number
   * @param {number} score - Score achieved
   * @param {boolean} completed - Whether level was completed
   * @returns {Promise<Object>} Result object
   */
  async saveScore(levelNumber, moduleNumber, score, completed = false) {
    this._ensureAuth();

    if (!this.supabaseClient) {
      console.warn('⚠️ Cannot save score: Supabase client not available');
      return { success: false, error: 'Database not available' };
    }

    const userIdentifier = this._getUserIdentifier(); // email
    const username = this._getUsername();

    try {
      // 1. Save to history (all attempts)
      const { error: historyError } = await this.supabaseClient
        .from('game_score_history')
        .insert({
          user_id: null, // No user_id for simple login
          username: username, // Store username directly
          game_slug: this.gameSlug,
          level_number: levelNumber,
          score: score,
          completed: completed
        });

      if (historyError) throw historyError;

      // 2. Get current progress (using username instead of user_id)
      const { data: currentProgress } = await this.supabaseClient
        .from('game_progress')
        .select('high_score')
        .eq('username', username)
        .eq('game_slug', this.gameSlug)
        .eq('level_number', levelNumber)
        .single();

      // 3. Update or insert progress (only if new high score)
      const isNewHighScore = !currentProgress || score > currentProgress.high_score;
      const highScore = isNewHighScore ? score : currentProgress.high_score;

      const { error: progressError } = await this.supabaseClient
        .from('game_progress')
        .upsert({
          user_id: null, // No user_id for simple login
          username: username, // Store username directly
          game_slug: this.gameSlug,
          level_number: levelNumber,
          module_number: moduleNumber,
          high_score: highScore,
          completed: completed,
          last_played: new Date().toISOString()
        }, {
          onConflict: 'username,game_slug,level_number' // Changed from user_id to username
        });

      if (progressError) throw progressError;

      console.log(`✅ Score saved: Level ${levelNumber}, Score: ${score}${isNewHighScore ? ' (NEW HIGH SCORE!)' : ''}`);

      return {
        success: true,
        isNewHighScore,
        highScore
      };

    } catch (error) {
      console.error('❌ Error saving score:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Get user's progress for all levels
   * @returns {Promise<Array>} Array of progress objects
   */
  async getAllProgress() {
    this._ensureAuth();

    if (!this.supabaseClient) {
      console.warn('⚠️ Cannot get progress: Supabase client not available');
      return [];
    }

    const username = this._getUsername();

    try {
      const { data, error } = await this.supabaseClient
        .from('game_progress')
        .select('*')
        .eq('username', username)
        .eq('game_slug', this.gameSlug)
        .order('module_number', { ascending: true })
        .order('level_number', { ascending: true });

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('❌ Error getting progress:', error);
      return [];
    }
  }

  /**
   * Get progress for a specific level
   * @param {number} levelNumber - Level number
   * @returns {Promise<Object|null>} Progress object or null
   */
  async getLevelProgress(levelNumber) {
    this._ensureAuth();

    if (!this.supabaseClient) {
      console.warn('⚠️ Cannot get level progress: Supabase client not available');
      return null;
    }

    const username = this._getUsername();

    try {
      const { data, error } = await this.supabaseClient
        .from('game_progress')
        .select('*')
        .eq('username', username)
        .eq('game_slug', this.gameSlug)
        .eq('level_number', levelNumber)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // Ignore "not found" errors

      return data || null;
    } catch (error) {
      console.error('❌ Error getting level progress:', error);
      return null;
    }
  }

  /**
   * Get leaderboard for a specific level
   * @param {number} levelNumber - Level number
   * @param {number} limit - Number of results (default 10)
   * @returns {Promise<Array>} Array of leaderboard entries
   */
  async getLeaderboard(levelNumber, limit = 10) {
    if (!this.supabaseClient) {
      console.warn('⚠️ Cannot get leaderboard: Supabase client not available');
      return [];
    }

    try {
      const { data, error } = await this.supabaseClient
        .from('game_progress')
        .select(`
          high_score,
          completed,
          last_played,
          username
        `)
        .eq('game_slug', this.gameSlug)
        .eq('level_number', levelNumber)
        .order('high_score', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('❌ Error getting leaderboard:', error);
      return [];
    }
  }

  /**
   * Get user's score history for a level
   * @param {number} levelNumber - Level number
   * @param {number} limit - Number of results (default 50)
   * @returns {Promise<Array>} Array of score history
   */
  async getScoreHistory(levelNumber, limit = 50) {
    this._ensureAuth();

    if (!this.supabaseClient) {
      console.warn('⚠️ Cannot get score history: Supabase client not available');
      return [];
    }

    const username = this._getUsername();

    try {
      const { data, error } = await this.supabaseClient
        .from('game_score_history')
        .select('*')
        .eq('username', username)
        .eq('game_slug', this.gameSlug)
        .eq('level_number', levelNumber)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('❌ Error getting score history:', error);
      return [];
    }
  }
}

// Export for use in games
window.BalloonRacingAPI = BalloonRacingAPI;
