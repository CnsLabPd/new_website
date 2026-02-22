/**
 * Neurogati Game SDK - Sonic Games API
 * API helper for Sonic Pop and Sonic Drive (Sonic Racer) games
 *
 * Usage:
 * <script src="https://neurogati.com/game-sdk/neurogati-auth.js"></script>
 * <script src="https://neurogati.com/game-sdk/balloon-racing-api.js"></script>
 */

class BalloonRacingAPI {
  constructor(gameSlug) {
    this.gameSlug = gameSlug; // 'sonic-pop' or 'sonic-drive'
    this.auth = window.NeurogatiAuth;
  }

  /**
   * Ensure user is authenticated
   * @private
   */
  _ensureAuth() {
    if (!this.auth.isAuthenticated()) {
      throw new Error('User not authenticated');
    }
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

    const userId = this.auth.getUserId();
    const supabase = this.auth.getClient();

    try {
      // 1. Save to history (all attempts)
      const { error: historyError } = await supabase
        .from('game_score_history')
        .insert({
          user_id: userId,
          game_slug: this.gameSlug,
          level_number: levelNumber,
          score: score,
          completed: completed
        });

      if (historyError) throw historyError;

      // 2. Get current progress
      const { data: currentProgress } = await supabase
        .from('game_progress')
        .select('high_score')
        .eq('user_id', userId)
        .eq('game_slug', this.gameSlug)
        .eq('level_number', levelNumber)
        .single();

      // 3. Update or insert progress (only if new high score)
      const isNewHighScore = !currentProgress || score > currentProgress.high_score;
      const highScore = isNewHighScore ? score : currentProgress.high_score;

      const { error: progressError } = await supabase
        .from('game_progress')
        .upsert({
          user_id: userId,
          game_slug: this.gameSlug,
          level_number: levelNumber,
          module_number: moduleNumber,
          high_score: highScore,
          completed: completed,
          last_played: new Date().toISOString()
        }, {
          onConflict: 'user_id,game_slug,level_number'
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

    const userId = this.auth.getUserId();
    const supabase = this.auth.getClient();

    try {
      const { data, error } = await supabase
        .from('game_progress')
        .select('*')
        .eq('user_id', userId)
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

    const userId = this.auth.getUserId();
    const supabase = this.auth.getClient();

    try {
      const { data, error } = await supabase
        .from('game_progress')
        .select('*')
        .eq('user_id', userId)
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
    const supabase = this.auth.getClient();

    try {
      const { data, error } = await supabase
        .from('game_progress')
        .select(`
          high_score,
          completed,
          last_played,
          user_id
        `)
        .eq('game_slug', this.gameSlug)
        .eq('level_number', levelNumber)
        .order('high_score', { ascending: false })
        .limit(limit);

      if (error) throw error;

      // Get user emails for leaderboard
      const enrichedData = await Promise.all(
        (data || []).map(async (entry) => {
          const { data: { user } } = await supabase.auth.admin.getUserById(entry.user_id);
          return {
            ...entry,
            username: user?.user_metadata?.full_name || user?.email || 'Anonymous'
          };
        })
      );

      return enrichedData;
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

    const userId = this.auth.getUserId();
    const supabase = this.auth.getClient();

    try {
      const { data, error } = await supabase
        .from('game_score_history')
        .select('*')
        .eq('user_id', userId)
        .eq('game_slug', this.gameSlug)
        .eq('level_number', levelNumber)
        .order('played_at', { ascending: false })
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
