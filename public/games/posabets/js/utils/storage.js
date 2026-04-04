// Local Storage Wrapper for Player Data
import { StorageKeys } from './constants.js';

export class Storage {
    static save(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Storage save error:', error);
            return false;
        }
    }

    static load(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Storage load error:', error);
            return defaultValue;
        }
    }

    static remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Storage remove error:', error);
            return false;
        }
    }

    static clear() {
        try {
            // Only clear game-related data
            Object.values(StorageKeys).forEach(key => {
                localStorage.removeItem(key);
            });
            return true;
        } catch (error) {
            console.error('Storage clear error:', error);
            return false;
        }
    }

    // Authentication Methods
    static getUsers() {
        return this.load(StorageKeys.USERS, []);
    }

    static saveUsers(users) {
        return this.save(StorageKeys.USERS, users);
    }

    static signup(username, password) {
        const users = this.getUsers();
        if (users.find(u => u.username === username)) {
            return { success: false, message: 'Username already exists' };
        }
        users.push({ username, password });
        this.saveUsers(users);
        return { success: true };
    }

    static login(username, password) {
        const users = this.getUsers();
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            this.save(StorageKeys.CURRENT_USER, username);
            this.save(StorageKeys.PLAYER_NAME, username); // For compatibility
            return { success: true };
        }
        return { success: false, message: 'Invalid username or password' };
    }

    static logout() {
        this.remove(StorageKeys.CURRENT_USER);
    }

    static getCurrentUser() {
        return this.load(StorageKeys.CURRENT_USER, null);
    }

    static isAuthenticated() {
        // Check simple game login first
        const gameUser = this.getGameUser();
        if (gameUser) {
            return true;
        }
        // Fallback to localStorage for guest mode
        return !!this.getCurrentUser();
    }

    // Simple game login methods
    static getGameUser() {
        try {
            const storedUser = sessionStorage.getItem('neurogati_game_user');
            if (storedUser) {
                return JSON.parse(storedUser);
            }
        } catch (e) {
            console.error('Error getting game user:', e);
        }
        return null;
    }

    // Player-specific methods
    static savePlayerName(name) {
        return this.save(StorageKeys.PLAYER_NAME, name);
    }

    static getPlayerName() {
        // Use simple game login if available
        const gameUser = this.getGameUser();
        if (gameUser) {
            return gameUser.username || 'Player';
        }
        // Fallback to localStorage
        return this.getCurrentUser() || this.load(StorageKeys.PLAYER_NAME, '');
    }

    static getPlayerEmail() {
        // Get email from simple game login
        const gameUser = this.getGameUser();
        return gameUser ? gameUser.email : '';
    }

    static getUserProgressKey() {
        const user = this.getCurrentUser();
        return user ? `${StorageKeys.PLAYER_PROGRESS}_${user}` : StorageKeys.PLAYER_PROGRESS;
    }

    static saveProgress(progress) {
        return this.save(this.getUserProgressKey(), progress);
    }

    static getProgress() {
        // For now, just use localStorage (sync)
        // API sync will happen on save operations
        return this.load(this.getUserProgressKey(), {
            currentLevel: 0,
            lettersCompleted: [],
            wordsCompleted: [],
            namesCompleted: [],  // NEW: Track completed names
            badges: [],
            totalStars: 0,
            streak: 0,
            lastPlayed: null
        });
    }

    static updateStars(stars) {
        const progress = this.getProgress();
        progress.totalStars = (progress.totalStars || 0) + stars;
        progress.lastPlayed = new Date().toISOString();
        return this.saveProgress(progress);
    }

    static async markLetterComplete(letter, stars) {
        // Update localStorage first
        const progress = this.getProgress();
        if (!progress.lettersCompleted.includes(letter)) {
            progress.lettersCompleted.push(letter);
        }
        progress.totalStars = (progress.totalStars || 0) + stars;
        progress.lastPlayed = new Date().toISOString();
        this.saveProgress(progress);

        // Sync to API if available
        if (window.PosabetsAPI && this.isAuthenticated()) {
            const api = new window.PosabetsAPI();
            await api.markLetterComplete(letter, stars);
        }

        return true;
    }

    static async markWordComplete(word, stars) {
        // Update localStorage first
        const progress = this.getProgress();
        if (!progress.wordsCompleted.includes(word)) {
            progress.wordsCompleted.push(word);
        }
        progress.totalStars = (progress.totalStars || 0) + stars;
        progress.lastPlayed = new Date().toISOString();
        this.saveProgress(progress);

        // Sync to API if available
        if (window.PosabetsAPI && this.isAuthenticated()) {
            const api = new window.PosabetsAPI();
            await api.markWordComplete(word, stars);
        }

        return true;
    }

    static async markNameComplete(name, stars) {
        // Update localStorage first
        const progress = this.getProgress();

        // Initialize namesCompleted array if it doesn't exist
        if (!progress.namesCompleted) {
            progress.namesCompleted = [];
        }

        // Add name if not already completed
        if (!progress.namesCompleted.includes(name)) {
            progress.namesCompleted.push(name);
        }

        progress.totalStars = (progress.totalStars || 0) + stars;
        progress.lastPlayed = new Date().toISOString();
        this.saveProgress(progress);

        // Sync to API if available (name mode may not have API endpoint yet)
        if (window.PosabetsAPI && this.isAuthenticated()) {
            const api = new window.PosabetsAPI();
            if (api.markNameComplete) {
                await api.markNameComplete(name, stars);
            }
        }

        return true;
    }

    static async addBadge(badgeId) {
        // Update localStorage first
        const progress = this.getProgress();
        if (!progress.badges.includes(badgeId)) {
            progress.badges.push(badgeId);
            this.saveProgress(progress);

            // Sync to API if available
            if (window.PosabetsAPI && this.isAuthenticated()) {
                const api = new window.PosabetsAPI();
                await api.addBadge(badgeId);
            }

            return true;
        }
        return false;
    }

    static hasBadge(badgeId) {
        const progress = this.getProgress();
        return progress.badges.includes(badgeId);
    }

    static async updateStreak(isCorrect) {
        // Update localStorage first
        const progress = this.getProgress();
        if (isCorrect) {
            progress.streak = (progress.streak || 0) + 1;
        } else {
            progress.streak = 0;
        }
        this.saveProgress(progress);

        // Sync to API if available
        if (window.PosabetsAPI && this.isAuthenticated()) {
            const api = new window.PosabetsAPI();
            await api.updateStreak(isCorrect);
        }

        return progress.streak;
    }

    static getStats() {
        // For now, just use localStorage (sync)
        const progress = this.getProgress();
        return {
            lettersCount: progress.lettersCompleted?.length || 0,
            wordsCount: progress.wordsCompleted?.length || 0,
            namesCount: progress.namesCompleted?.length || 0,  // NEW: Names count
            badgesCount: progress.badges?.length || 0,
            totalStars: progress.totalStars || 0,
            streak: progress.streak || 0,
            lastPlayed: progress.lastPlayed
        };
    }
}
