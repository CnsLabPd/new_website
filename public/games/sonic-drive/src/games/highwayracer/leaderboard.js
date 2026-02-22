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
     * Get auth token from localStorage
     * Tries parent window first (when running in iframe), then current window
     */
    getAuthToken() {
        try {
            // Try to get token from parent window (when running in iframe from main game)
            if (window.parent && window.parent !== window && window.parent.localStorage) {
                const parentToken = window.parent.localStorage.getItem('auth_token');
                if (parentToken) {
                    return parentToken;
                }
            }
        } catch (e) {
            // Cross-origin error - parent is different origin
            console.log('Cannot access parent localStorage (cross-origin), using current window');
        }

        // Fall back to current window's localStorage
        return localStorage.getItem('auth_token');
    }

    /**
     * Get current user from localStorage
     * Tries parent window first (when running in iframe), then current window
     */
    getCurrentUser() {
        try {
            // Try to get user from parent window (when running in iframe from main game)
            if (window.parent && window.parent !== window && window.parent.localStorage) {
                const parentUserStr = window.parent.localStorage.getItem('user');
                if (parentUserStr) {
                    return JSON.parse(parentUserStr);
                }
            }
        } catch (e) {
            // Cross-origin error - parent is different origin
            console.log('Cannot access parent localStorage (cross-origin), using current window');
        }

        // Fall back to current window's localStorage
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }

    /**
     * Check if user is logged in
     */
    isLoggedIn() {
        return !!this.getAuthToken() && !!this.getCurrentUser();
    }

    /**
     * Save score to server
     */
    async saveScore(score, completed = false) {
        if (!this.isLoggedIn()) {
            console.warn('Not logged in, cannot save score');
            alert('Please log in to save your score!');
            return false;
        }

        try {
            const response = await fetch(`${API_URL}/progress/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getAuthToken()}`
                },
                body: JSON.stringify({
                    level_number: this.levelNumber,
                    module_number: this.moduleNumber,
                    score: Math.round(score),
                    completed: completed
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log(`✅ Score saved: ${score} for level ${this.levelNumber}`);
                return true;
            } else {
                console.error('Failed to save score:', data.error);
                alert(`Failed to save score: ${data.error}`);
                return false;
            }
        } catch (error) {
            console.error('Error saving score:', error);
            alert('Connection error. Could not save score.');
            return false;
        }
    }

    /**
     * Fetch leaderboard from server
     */
    async fetchLeaderboard(limit = 10) {
        try {
            const response = await fetch(`${API_URL}/leaderboard/${this.levelNumber}?limit=${limit}`);
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
