/**
 * Authentication and Session Management
 * SIMPLE GAME LOGIN SYSTEM
 * Handles user authentication and progress tracking via simple username/email
 */

class AuthManager {
    constructor() {
        this.gameUser = null;
        this.gameAPI = null;
        this.progress = [];
        this.initialized = false;
    }

    /**
     * Initialize the game API
     */
    async init() {
        if (this.initialized) return;

        // Get user from sessionStorage
        const storedUser = sessionStorage.getItem('neurogati_game_user');
        if (storedUser) {
            try {
                this.gameUser = JSON.parse(storedUser);
                console.log('✅ Game user loaded:', this.gameUser.username);
            } catch (e) {
                console.error('❌ Error parsing game user:', e);
            }
        }

        // Initialize Balloon Racing API
        this.gameAPI = new BalloonRacingAPI('sonic-pop');
        this.initialized = true;
        console.log('✅ AuthManager initialized with simple login');
    }

    /**
     * Check if user is logged in
     */
    isLoggedIn() {
        return this.gameUser !== null;
    }

    /**
     * Get current user info
     */
    getCurrentUser() {
        if (!this.isLoggedIn()) return null;

        // Return in format expected by game code
        return {
            id: this.gameUser.email, // Use email as ID for now
            username: this.gameUser.username,
            email: this.gameUser.email
        };
    }

    /**
     * Load all progress for current user
     */
    async loadProgress() {
        if (!this.isLoggedIn()) {
            console.warn('Cannot load progress: not logged in');
            return [];
        }

        if (!this.initialized) {
            await this.init();
        }

        try {
            this.progress = await this.gameAPI.getAllProgress();
            console.log(`📊 Loaded progress for ${this.progress.length} levels`);
            return this.progress;
        } catch (error) {
            console.error('Load progress error:', error);
            return [];
        }
    }

    /**
     * Get progress for a specific level
     */
    getLevelProgress(levelNumber) {
        return this.progress.find(p => p.level_number === levelNumber) || null;
    }

    /**
     * Save progress for a level
     */
    async saveProgress(levelNumber, moduleNumber, score, completed = false) {
        if (!this.isLoggedIn()) {
            console.warn('Cannot save progress: not logged in');
            return false;
        }

        if (!this.initialized) {
            await this.init();
        }

        try {
            const result = await this.gameAPI.saveScore(levelNumber, moduleNumber, score, completed);

            if (result.success) {
                console.log(`✅ Progress saved: Level ${levelNumber}, Score ${score}, Completed: ${completed}`);

                if (result.isNewHighScore) {
                    console.log(`🎉 NEW HIGH SCORE: ${result.highScore}`);
                }

                // Reload progress to update cache
                await this.loadProgress();
                return true;
            } else {
                console.error('Failed to save progress:', result.error);
                return false;
            }
        } catch (error) {
            console.error('Save progress error:', error);
            return false;
        }
    }

    /**
     * Get high score for a level
     */
    getHighScore(levelNumber) {
        const levelProgress = this.getLevelProgress(levelNumber);
        return levelProgress ? levelProgress.high_score : 0;
    }

    /**
     * Check if level is completed
     */
    isLevelCompleted(levelNumber) {
        const levelProgress = this.getLevelProgress(levelNumber);
        return levelProgress ? !!levelProgress.completed : false;
    }

    /**
     * Get overall statistics
     */
    getStats() {
        const totalLevels = this.progress.length;
        const completedLevels = this.progress.filter(p => p.completed).length;
        const totalScore = this.progress.reduce((sum, p) => sum + p.high_score, 0);

        return {
            totalLevels,
            completedLevels,
            totalScore,
            completionRate: totalLevels > 0 ? (completedLevels / totalLevels * 100).toFixed(1) : 0
        };
    }
}

// Create global instance
window.authManager = new AuthManager();

/**
 * Initialize auth (simple game login system)
 */
async function initAuth() {
    // Initialize authManager
    await window.authManager.init();

    // Check if user is logged in
    if (window.authManager.isLoggedIn()) {
        const user = window.authManager.getCurrentUser();
        console.log(`✅ Game user authenticated: ${user.username}`);
        console.log('📧 Email:', user.email);

        // Load progress
        await window.authManager.loadProgress();

        // Dispatch event to notify other components
        window.dispatchEvent(new CustomEvent('auth:ready', {
            detail: {
                user: user,
                progress: window.authManager.progress
            }
        }));

        console.log('🎮 Game ready to play with user data!');
        return true;
    } else {
        console.log('ℹ️ No user session found - playing without save capability');
        console.log('🎮 Game ready to play (guest mode)!');
        return false;
    }
}

/**
 * Initialize auth on page load
 */
window.addEventListener('load', async () => {
    await initAuth();
});
