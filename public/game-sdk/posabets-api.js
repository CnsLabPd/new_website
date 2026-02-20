/**
 * Neurogati Game SDK - Posabets (Alphabet Pose Game) API
 * API helper for Alphabet Pose Game
 *
 * Usage:
 * <script src="https://neurogati.com/game-sdk/neurogati-auth.js"></script>
 * <script src="https://neurogati.com/game-sdk/posabets-api.js"></script>
 */

class PosabetsAPI {
  constructor() {
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
   * Initialize user progress (create if doesn't exist)
   * @private
   */
  async _initializeProgress() {
    const userId = this.auth.getUserId();
    const supabase = this.auth.getClient();

    try {
      const { data: existing } = await supabase
        .from('posabets_progress')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (!existing) {
        // Create initial progress
        await supabase
          .from('posabets_progress')
          .insert({
            user_id: userId,
            current_level: 0,
            letters_completed: [],
            words_completed: [],
            badges: [],
            total_stars: 0,
            current_streak: 0,
            best_streak: 0
          });
      }
    } catch (error) {
      console.error('Error initializing progress:', error);
    }
  }

  /**
   * Get user's progress
   * @returns {Promise<Object>} Progress object
   */
  async getProgress() {
    this._ensureAuth();

    const userId = this.auth.getUserId();
    const supabase = this.auth.getClient();

    await this._initializeProgress();

    try {
      const { data, error } = await supabase
        .from('posabets_progress')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;

      return data || {
        current_level: 0,
        letters_completed: [],
        words_completed: [],
        badges: [],
        total_stars: 0,
        current_streak: 0,
        best_streak: 0
      };
    } catch (error) {
      console.error('❌ Error getting progress:', error);
      return null;
    }
  }

  /**
   * Mark a letter as completed
   * @param {string} letter - Letter completed (e.g., 'A', 'B')
   * @param {number} stars - Stars earned
   * @returns {Promise<Object>} Result object
   */
  async markLetterComplete(letter, stars = 1) {
    this._ensureAuth();

    const userId = this.auth.getUserId();
    const supabase = this.auth.getClient();

    try {
      const progress = await this.getProgress();
      const lettersCompleted = progress.letters_completed || [];

      // Add letter if not already completed
      if (!lettersCompleted.includes(letter)) {
        lettersCompleted.push(letter);
      }

      // Update progress
      const { error: updateError } = await supabase
        .from('posabets_progress')
        .update({
          letters_completed: lettersCompleted,
          total_stars: progress.total_stars + stars,
          last_played: new Date().toISOString()
        })
        .eq('user_id', userId);

      if (updateError) throw updateError;

      // Save to history
      await supabase
        .from('posabets_session_history')
        .insert({
          user_id: userId,
          session_type: 'letter',
          target: letter,
          stars_earned: stars,
          completed: true
        });

      console.log(`✅ Letter ${letter} completed! (+${stars} stars)`);

      return {
        success: true,
        lettersCompleted: lettersCompleted.length,
        totalStars: progress.total_stars + stars
      };
    } catch (error) {
      console.error('❌ Error marking letter complete:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Mark a word as completed
   * @param {string} word - Word completed
   * @param {number} stars - Stars earned
   * @returns {Promise<Object>} Result object
   */
  async markWordComplete(word, stars = 3) {
    this._ensureAuth();

    const userId = this.auth.getUserId();
    const supabase = this.auth.getClient();

    try {
      const progress = await this.getProgress();
      const wordsCompleted = progress.words_completed || [];

      // Add word if not already completed
      if (!wordsCompleted.includes(word)) {
        wordsCompleted.push(word);
      }

      // Update progress
      const { error: updateError } = await supabase
        .from('posabets_progress')
        .update({
          words_completed: wordsCompleted,
          total_stars: progress.total_stars + stars,
          last_played: new Date().toISOString()
        })
        .eq('user_id', userId);

      if (updateError) throw updateError;

      // Save to history
      await supabase
        .from('posabets_session_history')
        .insert({
          user_id: userId,
          session_type: 'word',
          target: word,
          stars_earned: stars,
          completed: true
        });

      console.log(`✅ Word "${word}" completed! (+${stars} stars)`);

      return {
        success: true,
        wordsCompleted: wordsCompleted.length,
        totalStars: progress.total_stars + stars
      };
    } catch (error) {
      console.error('❌ Error marking word complete:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Add a badge
   * @param {string} badgeId - Badge ID
   * @returns {Promise<boolean>} True if badge was newly added
   */
  async addBadge(badgeId) {
    this._ensureAuth();

    const userId = this.auth.getUserId();
    const supabase = this.auth.getClient();

    try {
      const progress = await this.getProgress();
      const badges = progress.badges || [];

      if (badges.includes(badgeId)) {
        return false; // Badge already earned
      }

      badges.push(badgeId);

      await supabase
        .from('posabets_progress')
        .update({
          badges: badges,
          last_played: new Date().toISOString()
        })
        .eq('user_id', userId);

      console.log(`🏆 Badge earned: ${badgeId}`);
      return true;
    } catch (error) {
      console.error('❌ Error adding badge:', error);
      return false;
    }
  }

  /**
   * Update streak
   * @param {boolean} isCorrect - Whether answer was correct
   * @returns {Promise<number>} Current streak
   */
  async updateStreak(isCorrect) {
    this._ensureAuth();

    const userId = this.auth.getUserId();
    const supabase = this.auth.getClient();

    try {
      const progress = await this.getProgress();
      let newStreak = isCorrect ? (progress.current_streak || 0) + 1 : 0;
      let bestStreak = Math.max(progress.best_streak || 0, newStreak);

      await supabase
        .from('posabets_progress')
        .update({
          current_streak: newStreak,
          best_streak: bestStreak,
          last_played: new Date().toISOString()
        })
        .eq('user_id', userId);

      return newStreak;
    } catch (error) {
      console.error('❌ Error updating streak:', error);
      return 0;
    }
  }

  /**
   * Get user statistics
   * @returns {Promise<Object>} Stats object
   */
  async getStats() {
    const progress = await this.getProgress();

    return {
      lettersCount: (progress.letters_completed || []).length,
      wordsCount: (progress.words_completed || []).length,
      badgesCount: (progress.badges || []).length,
      totalStars: progress.total_stars || 0,
      currentStreak: progress.current_streak || 0,
      bestStreak: progress.best_streak || 0,
      lastPlayed: progress.last_played
    };
  }

  /**
   * Get session history
   * @param {number} limit - Number of results (default 50)
   * @returns {Promise<Array>} Array of session history
   */
  async getSessionHistory(limit = 50) {
    this._ensureAuth();

    const userId = this.auth.getUserId();
    const supabase = this.auth.getClient();

    try {
      const { data, error } = await supabase
        .from('posabets_session_history')
        .select('*')
        .eq('user_id', userId)
        .order('played_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('❌ Error getting session history:', error);
      return [];
    }
  }
}

// Export for use in game
window.PosabetsAPI = PosabetsAPI;
