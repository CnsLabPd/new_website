/**
 * Leaderboard Manager for Racing Game
 * Handles score saving and leaderboard display
 */

// Auto-detect API URL based on environment
const API_URL = `${window.location.origin}/api`;

export class LeaderboardManager {
    constructor(levelNumber) {
        this.levelNumber = levelNumber;
        this.moduleNumber = 2; // Racing games are in Module 2
    }

    /**
     * Get auth token from Supabase session
     * Uses NeurogatiAuth SDK to get the access token
     */
    async getAuthToken() {
        try {
            // Check if NeurogatiAuth is available
            if (window.NeurogatiAuth && window.NeurogatiAuth.initialized) {
                const supabaseClient = window.NeurogatiAuth.getClient();
                const { data: { session } } = await supabaseClient.auth.getSession();
                return session?.access_token || null;
            }

            // Fallback: try to get from localStorage (legacy support)
            try {
                if (window.parent && window.parent !== window && window.parent.localStorage) {
                    const parentToken = window.parent.localStorage.getItem('auth_token');
                    if (parentToken) {
                        return parentToken;
                    }
                }
            } catch (e) {
                console.log('Cannot access parent localStorage (cross-origin)');
            }

            return localStorage.getItem('auth_token');
        } catch (error) {
            console.error('Error getting auth token:', error);
            return null;
        }
    }

    /**
     * Get current user from NeurogatiAuth or localStorage
     * Tries NeurogatiAuth first, then falls back to localStorage
     */
    getCurrentUser() {
        try {
            // Try to get user from NeurogatiAuth
            if (window.NeurogatiAuth && window.NeurogatiAuth.initialized) {
                const user = window.NeurogatiAuth.getCurrentUser();
                if (user) {
                    return {
                        id: window.NeurogatiAuth.getUserId(),
                        username: window.NeurogatiAuth.getUserName(),
                        email: window.NeurogatiAuth.getUserEmail()
                    };
                }
            }

            // Try to get user from parent window (legacy support)
            if (window.parent && window.parent !== window && window.parent.localStorage) {
                const parentUserStr = window.parent.localStorage.getItem('user');
                if (parentUserStr) {
                    return JSON.parse(parentUserStr);
                }
            }
        } catch (e) {
            console.log('Cannot access parent localStorage (cross-origin)');
        }

        // Fall back to current window's localStorage
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }

    /**
     * Check if user is logged in
     */
    isLoggedIn() {
        // Use NeurogatiAuth if available
        if (window.NeurogatiAuth && window.NeurogatiAuth.initialized) {
            const isAuth = window.NeurogatiAuth.isAuthenticated();
            console.log(`🔐 [LEADERBOARD] NeurogatiAuth check: ${isAuth}`);
            return isAuth;
        }

        // Fallback to localStorage check (legacy)
        const hasUser = !!this.getCurrentUser();
        console.log(`🔐 [LEADERBOARD] localStorage check: ${hasUser}`);
        return hasUser;
    }

    /**
     * Save score to server
     */
    async saveScore(score, completed = false) {
        console.log(`💾 [LEADERBOARD] saveScore called: score=${score}, level=${this.levelNumber}`);

        if (!this.isLoggedIn()) {
            console.warn('❌ [LEADERBOARD] Not logged in, cannot save score');
            alert('Please log in to save your score!');
            return false;
        }

        try {
            console.log('🔑 [LEADERBOARD] Getting auth token...');
            const token = await this.getAuthToken();

            if (!token) {
                console.error('❌ [LEADERBOARD] No auth token available');
                alert('Authentication error. Please log in again.');
                return false;
            }

            console.log(`📤 [LEADERBOARD] Sending score to API: ${API_URL}/progress/save`);
            const requestBody = {
                level_number: this.levelNumber,
                module_number: this.moduleNumber,
                score: Math.round(score),
                completed: completed,
                game_slug: 'sonic-drive'
            };
            console.log('📦 [LEADERBOARD] Request body:', requestBody);

            const response = await fetch(`${API_URL}/progress/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();
            console.log(`📥 [LEADERBOARD] API response (${response.status}):`, data);

            if (response.ok) {
                console.log(`✅ [LEADERBOARD] Score saved successfully: ${score} for level ${this.levelNumber}`);
                return true;
            } else {
                console.error('❌ [LEADERBOARD] Failed to save score:', data.error);
                alert(`Failed to save score: ${data.error}`);
                return false;
            }
        } catch (error) {
            console.error('❌ [LEADERBOARD] Error saving score:', error);
            alert('Connection error. Could not save score.');
            return false;
        }
    }

    /**
     * Fetch leaderboard from server
     */
    async fetchLeaderboard(limit = 10) {
        try {
            const response = await fetch(`${API_URL}/leaderboard/${this.levelNumber}?game_slug=sonic-drive&limit=${limit}`);
            const data = await response.json();

            if (response.ok) {
                console.log(`📊 Leaderboard fetched: ${data.leaderboard.length} entries`);
                return data.leaderboard;
            } else {
                console.error('Failed to fetch leaderboard:', data.error);
                return [];
            }
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            return [];
        }
    }

    /**
     * Display leaderboard in HTML element
     */
    async displayLeaderboard(containerElement) {
        containerElement.innerHTML = '<p>Loading leaderboard...</p>';

        const leaderboard = await this.fetchLeaderboard();

        if (leaderboard.length === 0) {
            containerElement.innerHTML = '<p>No scores yet. Be the first!</p>';
            return;
        }

        const currentUser = this.getCurrentUser();
        const currentUsername = currentUser ? currentUser.username : null;

        let html = '<table class="leaderboard-table">';
        html += '<thead><tr><th>Rank</th><th>Player</th><th>Score</th></tr></thead>';
        html += '<tbody>';

        leaderboard.forEach((entry, index) => {
            const rank = index + 1;
            const rankClass = rank <= 3 ? `rank-${rank}` : '';
            const isCurrentUser = entry.username === currentUsername;
            const rowClass = isCurrentUser ? 'current-user' : '';

            const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '';

            html += `<tr class="${rowClass}">
                <td class="leaderboard-rank ${rankClass}">${medal} #${rank}</td>
                <td>${entry.username}${isCurrentUser ? ' (You)' : ''}</td>
                <td><strong>${entry.high_score.toLocaleString()}</strong></td>
            </tr>`;
        });

        html += '</tbody></table>';

        containerElement.innerHTML = html;
    }

    /**
     * Show leaderboard panel
     */
    showLeaderboard() {
        const panel = document.getElementById('leaderboardPanel');
        const content = document.getElementById('leaderboardContent');

        if (panel && content) {
            panel.style.display = 'block';
            this.displayLeaderboard(content);
        }
    }

    /**
     * Hide leaderboard panel
     */
    hideLeaderboard() {
        const panel = document.getElementById('leaderboardPanel');
        if (panel) {
            panel.style.display = 'none';
        }
    }
}

export function setupLeaderboardUI(leaderboardManager, gameInstance) {
    // Save & Quit button
    const saveQuitBtn = document.getElementById('saveQuitBtn');
    if (saveQuitBtn) {
        saveQuitBtn.addEventListener('click', async () => {
            if (!leaderboardManager.isLoggedIn()) {
                alert('Please log in to save your score!');
                return;
            }

            const score = gameInstance.score || 0;
            const distance = gameInstance.distance || 0;

            if (confirm(`Save your score (${score}) and quit?\nDistance: ${distance}m`)) {
                const saved = await leaderboardManager.saveScore(score, false);
                if (saved) {
                    alert(`Score saved: ${score}!\nCheck the leaderboard to see your ranking.`);
                    leaderboardManager.showLeaderboard();
                }
            }
        });
    }

    // Save Score button (in game over screen)
    const saveScoreBtn = document.getElementById('saveScoreBtn');
    if (saveScoreBtn) {
        saveScoreBtn.addEventListener('click', async () => {
            if (!leaderboardManager.isLoggedIn()) {
                alert('Please log in to save your score!');
                return;
            }

            const score = gameInstance.score || 0;
            const saved = await leaderboardManager.saveScore(score, false);
            if (saved) {
                alert(`Score saved: ${score}!`);
                saveScoreBtn.disabled = true;
                saveScoreBtn.textContent = '✅ Score Saved';
                leaderboardManager.showLeaderboard();
            }
        });
    }

    // View Leaderboard button
    const viewLeaderboardBtn = document.getElementById('viewLeaderboardBtn');
    if (viewLeaderboardBtn) {
        viewLeaderboardBtn.addEventListener('click', () => {
            leaderboardManager.showLeaderboard();
        });
    }

    // Close Leaderboard button
    const closeLeaderboardBtn = document.getElementById('closeLeaderboardBtn');
    if (closeLeaderboardBtn) {
        closeLeaderboardBtn.addEventListener('click', () => {
            leaderboardManager.hideLeaderboard();
        });
    }
}
