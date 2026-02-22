// Audio Manager for Sound Effects and Music
import { CONFIG } from '../../config.js';

export class AudioManager {
    constructor() {
        this.sounds = new Map();
        this.enabled = true;
        this.volume = 0.5;
        this.musicVolume = 0.3;
        this.initialized = false;
        this.backgroundMusic = null;
        this.musicEnabled = true;
    }

    async init() {
        if (this.initialized) return;

        // For now, we'll use Web Audio API for simple sounds
        // You can add actual sound files later
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Initialize background music
        this.backgroundMusic = new Audio('/assets/sounds/cheerful-joyful-playful-music-380550.mp3');
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = this.musicVolume;

        this.initialized = true;

        console.log('Audio Manager initialized');
    }

    // Start background music
    async startBackgroundMusic() {
        if (!this.backgroundMusic || !this.musicEnabled) return;

        try {
            // Start playing music
            await this.backgroundMusic.play();
            console.log('🎵 Background music started');
        } catch (error) {
            console.warn('Could not play background music:', error);
        }
    }

    // Stop background music
    stopBackgroundMusic() {
        if (!this.backgroundMusic) return;
        this.backgroundMusic.pause();
        this.backgroundMusic.currentTime = 0;
    }

    // Toggle background music
    toggleMusic() {
        this.musicEnabled = !this.musicEnabled;

        if (this.musicEnabled) {
            this.startBackgroundMusic();
        } else {
            this.stopBackgroundMusic();
        }

        return this.musicEnabled;
    }

    // Set music volume
    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
        if (this.backgroundMusic) {
            this.backgroundMusic.volume = this.musicVolume;
        }
    }

    // Get music status
    isMusicPlaying() {
        return this.backgroundMusic && !this.backgroundMusic.paused;
    }

    // Simple beep sound for success (generated)
    playSuccess() {
        if (!this.enabled || !this.initialized) return;
        this.playTone(523.25, 0.2); // C5 note
        setTimeout(() => this.playTone(659.25, 0.2), 150); // E5 note
    }

    // Encouragement sound
    playEncouragement() {
        if (!this.enabled || !this.initialized) return;
        this.playTone(440, 0.15); // A4 note
    }

    // Badge unlock sound
    playBadgeUnlock() {
        if (!this.enabled || !this.initialized) return;
        this.playTone(523.25, 0.1);
        setTimeout(() => this.playTone(659.25, 0.1), 100);
        setTimeout(() => this.playTone(783.99, 0.1), 200);
        setTimeout(() => this.playTone(1046.50, 0.3), 300); // C6 note
    }

    // Click sound
    playClick() {
        if (!this.enabled || !this.initialized) return;
        this.playTone(800, 0.05);
    }

    // Helper: Generate a tone
    playTone(frequency, duration) {
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(this.volume * 0.3, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        } catch (error) {
            console.warn('Audio playback error:', error);
        }
    }

    // Text-to-Speech for encouragement messages
    speak(text, rate = 1.0) {
        if (!this.enabled || !window.speechSynthesis) return;

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = rate;
        utterance.pitch = 1.2; // Slightly higher pitch for kids
        utterance.volume = this.volume;

        window.speechSynthesis.speak(utterance);
    }

    // Volume control
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
    }

    // Enable/Disable audio
    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    setEnabled(enabled) {
        this.enabled = enabled;
    }

    isEnabled() {
        return this.enabled;
    }
}

// Singleton instance
export const audioManager = new AudioManager();
