/**
 * Authentication and Session Management
 * NOW USING NEUROGATI GAME SDK
 * Handles user authentication and progress tracking via Supabase
 */

class AuthManager {
    constructor() {
        this.auth = window.NeurogatiAuth;
        this.gameAPI = null;
        this.progress = [];
        this.initialized = false;
    }

    /**
     * Initialize the game API
     * Call this after NeurogatiAuth is ready
     */
    async init() {
        if (this.initialized) return;

        // Wait for NeurogatiAuth to be ready
        if (!this.auth || !this.auth.initialized) {
            console.log('⏳ Waiting for NeurogatiAuth to initialize...');
            await new Promise(resolve => {
                const checkAuth = setInterval(() => {
                    if (window.NeurogatiAuth && window.NeurogatiAuth.initialized) {
                        clearInterval(checkAuth);
                        this.auth = window.NeurogatiAuth;
                        resolve();
                    }
                }, 100);
            });
        }

        // Initialize Sonic Drive API
        this.gameAPI = new BalloonRacingAPI('sonic-drive');
        this.initialized = true;
        console.log('✅ AuthManager initialized with Neurogati SDK');
    }

    /**
     * Check if user is logged in
     */
    isLoggedIn() {
        return this.auth && this.auth.isAuthenticated();
    }

    /**
     * Get current user info
     */
    getCurrentUser() {
        if (!this.isLoggedIn()) return null;

        const user = this.auth.getCurrentUser();
        // Return in format expected by game code
        return {
            id: user.id,
            username: this.auth.getUserName(),
            email: this.auth.getUserEmail()
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
 * Initialize auth (without forcing login - parent page handles that)
 */
async function initAuth() {
    // Wait for NeurogatiAuth to initialize
    if (!window.NeurogatiAuth || !window.NeurogatiAuth.initialized) {
        console.log('⏳ Waiting for NeurogatiAuth...');
        await new Promise(resolve => {
            const checkAuth = setInterval(() => {
                if (window.NeurogatiAuth && window.NeurogatiAuth.initialized) {
                    clearInterval(checkAuth);
                    resolve();
                }
            }, 100);
        });
    }

    // Initialize authManager
    await window.authManager.init();

    // Check if user is logged in (but don't force redirect - parent page handles that)
    if (window.authManager.isLoggedIn()) {
        const user = window.authManager.getCurrentUser();
        console.log(`✅ Authenticated as: ${user.username}`);
        console.log('👤 Full user object:', user);
        console.log('📧 Email:', window.NeurogatiAuth.getUserEmail());
        console.log('🏷️ getUserName() returns:', window.NeurogatiAuth.getUserName());

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
