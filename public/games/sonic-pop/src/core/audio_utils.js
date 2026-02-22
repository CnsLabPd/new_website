// Enhanced 3D Spatial Audio Utilities for Audio Balloon Pop Game
class AudioManager {
    constructor() {
        this.context = null;
        this.masterGainNode = null;
        this.isInitialized = false;
        this.sounds = {};
        this.backgroundMusic = null;
        this.musicGainNode = null;

        // 3D Audio Components
        this.listener = null;
        this.pannerNode = null;
        this.spatialGainNode = null;

        // 3D Audio Settings
        this.settings = {
            masterVolume: 0.7,
            musicVolume: 0.3,
            sfxVolume: 0.8,
            beepVolume: 0.5,
            spatialVolume: 0.8
        };

        // 3D Space dimensions (in meters)
        this.spaceWidth = 10;   // 10 meters wide
        this.spaceHeight = 6;   // 6 meters tall
        this.spaceDepth = 8;    // 8 meters deep

        // Listener (player) position - center of the space
        this.listenerPosition = {
            x: 0, // Center
            y: 0, // Center
            z: 0  // Center
        };

        // Bomb alarm audio buffer and sources
        this.bombAlarmBuffer = null;
        this.activeBombSources = new Map(); // Track active bomb alarm sources
    }

    async initialize() {
        if (this.isInitialized) return true;

        try {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create master gain node
            this.masterGainNode = this.context.createGain();
            this.masterGainNode.connect(this.context.destination);
            this.masterGainNode.gain.setValueAtTime(this.settings.masterVolume, this.context.currentTime);

            // Create music gain node
            this.musicGainNode = this.context.createGain();
            this.musicGainNode.connect(this.masterGainNode);
            this.musicGainNode.gain.setValueAtTime(this.settings.musicVolume, this.context.currentTime);

            // Initialize 3D spatial audio
            await this.initialize3DAudio();

            await this.createSounds();

            // Load bomb alarm audio file
            await this.loadBombAlarm();

            this.isInitialized = true;

            console.log('✅ AudioManager with 3D Spatial Audio initialized');
            return true;
        } catch (error) {
            console.error('❌ AudioManager initialization failed:', error);
            return false;
        }
    }

    async loadBombAlarm() {
        console.log('═══════════════════════════════════════════════════════════');
        console.log('🚨 [BOMB ALARM LOADER] Starting MP3 load process...');
        console.log('═══════════════════════════════════════════════════════════');

        try {
            // Add cache-busting timestamp to ensure fresh load
            const cacheBuster = `?v=${Date.now()}`;
            const fileUrl = `assets/audio/warning-alarm.mp3${cacheBuster}`;

            console.log(`🔍 [BOMB ALARM LOADER] Fetching: ${fileUrl}`);
            const response = await fetch(fileUrl);
            console.log(`📥 [BOMB ALARM LOADER] Fetch response: ${response.status} ${response.statusText}`);
            console.log(`📊 [BOMB ALARM LOADER] Content-Type: ${response.headers.get('content-type')}`);
            console.log(`📏 [BOMB ALARM LOADER] Content-Length: ${response.headers.get('content-length')} bytes`);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            console.log('🔄 [BOMB ALARM LOADER] Converting to array buffer...');
            const arrayBuffer = await response.arrayBuffer();
            console.log(`📦 [BOMB ALARM LOADER] Array buffer size: ${arrayBuffer.byteLength} bytes (expected ~124KB)`);

            if (arrayBuffer.byteLength === 0) {
                throw new Error('Empty array buffer received');
            }

            console.log('🎵 [BOMB ALARM LOADER] Decoding audio data...');
            this.bombAlarmBuffer = await this.context.decodeAudioData(arrayBuffer);

            console.log('═══════════════════════════════════════════════════════════');
            console.log(`✅ [BOMB ALARM LOADER] SUCCESS!`);
            console.log(`   Duration: ${this.bombAlarmBuffer.duration.toFixed(2)} seconds`);
            console.log(`   Channels: ${this.bombAlarmBuffer.numberOfChannels}`);
            console.log(`   Sample Rate: ${this.bombAlarmBuffer.sampleRate} Hz`);
            console.log(`   Length: ${this.bombAlarmBuffer.length} samples`);
            console.log('   MP3 ALARM IS READY TO USE!');
            console.log('═══════════════════════════════════════════════════════════');
        } catch (error) {
            console.log('═══════════════════════════════════════════════════════════');
            console.error('❌ [BOMB ALARM LOADER] FAILED!');
            console.error(`   Error: ${error.message}`);
            console.error(`   Stack: ${error.stack}`);
            console.warn('⚠️  [BOMB ALARM LOADER] Will use SYNTHESIZED bomb sound as fallback');
            console.log('═══════════════════════════════════════════════════════════');
            this.bombAlarmBuffer = null; // Ensure it's null for fallback
        }
    }

    async initialize3DAudio() {
        console.log('🎧 Initializing 3D Spatial Audio System...');

        try {
            // Get the AudioListener (represents the player's head/ears)
            this.listener = this.context.listener;
            
            // Set up listener properties for 3D audio
            if (this.listener.positionX) {
                // Modern API
                this.listener.positionX.setValueAtTime(this.listenerPosition.x, this.context.currentTime);
                this.listener.positionY.setValueAtTime(this.listenerPosition.y, this.context.currentTime);
                this.listener.positionZ.setValueAtTime(this.listenerPosition.z, this.context.currentTime);
                
                // Forward direction (where the listener is facing)
                this.listener.forwardX.setValueAtTime(0, this.context.currentTime);
                this.listener.forwardY.setValueAtTime(0, this.context.currentTime);
                this.listener.forwardZ.setValueAtTime(-1, this.context.currentTime);
                
                // Up direction
                this.listener.upX.setValueAtTime(0, this.context.currentTime);
                this.listener.upY.setValueAtTime(1, this.context.currentTime);
                this.listener.upZ.setValueAtTime(0, this.context.currentTime);
            } else {
                // Legacy API fallback
                this.listener.setPosition(this.listenerPosition.x, this.listenerPosition.y, this.listenerPosition.z);
                this.listener.setOrientation(0, 0, -1, 0, 1, 0);
            }
            
            console.log('✅ 3D Audio Listener configured');
            
        } catch (error) {
            console.error('❌ 3D Audio initialization failed:', error);
        }
    }

    async createSounds() {
        // Create synthetic sound effects
        this.sounds = {
            pop: this.createPopSound(),
            beep: this.createBeepSound(),
            success: this.createSuccessSound(),
            levelUp: this.createLevelUpSound(),
            gameOver: this.createGameOverSound(),
            countdown: this.createCountdownSound(),
            bombTick: this.createBombTickSound(),
            bombExplosion: this.createBombExplosionSound()
        };
    }

    createPopSound() {
        return (pitch = 1.0, volume = 1.0) => {
            if (!this.context) return;

            const oscillator = this.context.createOscillator();
            const gainNode = this.context.createGain();
            const filter = this.context.createBiquadFilter();

            // Pop sound characteristics
            oscillator.frequency.setValueAtTime(600 * pitch, this.context.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(150 * pitch, this.context.currentTime + 0.2);
            oscillator.type = 'square';

            // Filter for more realistic pop
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(800, this.context.currentTime);
            filter.Q.setValueAtTime(5, this.context.currentTime);

            // Volume envelope
            const finalVolume = this.settings.sfxVolume * volume * 0.4;
            gainNode.gain.setValueAtTime(finalVolume, this.context.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.2);

            // Connect nodes
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.masterGainNode);

            // Play
            oscillator.start(this.context.currentTime);
            oscillator.stop(this.context.currentTime + 0.2);
        };
    }

    createBeepSound() {
        return (frequency = 440, duration = 0.1, volume = 1.0) => {
            if (!this.context) return;

            const oscillator = this.context.createOscillator();
            const gainNode = this.context.createGain();

            oscillator.frequency.setValueAtTime(frequency, this.context.currentTime);
            oscillator.type = 'sine';

            const finalVolume = this.settings.beepVolume * volume;
            gainNode.gain.setValueAtTime(0, this.context.currentTime);
            gainNode.gain.linearRampToValueAtTime(finalVolume, this.context.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + duration);

            oscillator.connect(gainNode);
            gainNode.connect(this.masterGainNode);

            oscillator.start(this.context.currentTime);
            oscillator.stop(this.context.currentTime + duration);
        };
    }

    createSuccessSound() {
        return () => {
            if (!this.context) return;

            // Success chord
            const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
            const duration = 0.5;

            frequencies.forEach((freq, index) => {
                setTimeout(() => {
                    const oscillator = this.context.createOscillator();
                    const gainNode = this.context.createGain();

                    oscillator.frequency.setValueAtTime(freq, this.context.currentTime);
                    oscillator.type = 'sine';

                    const volume = this.settings.sfxVolume * 0.3;
                    gainNode.gain.setValueAtTime(0, this.context.currentTime);
                    gainNode.gain.linearRampToValueAtTime(volume, this.context.currentTime + 0.05);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + duration);

                    oscillator.connect(gainNode);
                    gainNode.connect(this.masterGainNode);

                    oscillator.start(this.context.currentTime);
                    oscillator.stop(this.context.currentTime + duration);
                }, index * 100);
            });
        };
    }

    createLevelUpSound() {
        return () => {
            if (!this.context) return;

            // Ascending musical phrase
            const notes = [261.63, 293.66, 329.63, 392.00, 523.25]; // C4, D4, E4, G4, C5
            const duration = 0.2;

            notes.forEach((freq, index) => {
                setTimeout(() => {
                    const oscillator = this.context.createOscillator();
                    const gainNode = this.context.createGain();

                    oscillator.frequency.setValueAtTime(freq, this.context.currentTime);
                    oscillator.type = 'triangle';

                    const volume = this.settings.sfxVolume * 0.4;
                    gainNode.gain.setValueAtTime(volume, this.context.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + duration);

                    oscillator.connect(gainNode);
                    gainNode.connect(this.masterGainNode);

                    oscillator.start(this.context.currentTime);
                    oscillator.stop(this.context.currentTime + duration);
                }, index * 150);
            });
        };
    }

    createGameOverSound() {
        return () => {
            if (!this.context) return;

            // Descending minor chord
            const notes = [392.00, 349.23, 293.66, 261.63]; // G4, F4, D4, C4
            const duration = 0.6;

            notes.forEach((freq, index) => {
                setTimeout(() => {
                    const oscillator = this.context.createOscillator();
                    const gainNode = this.context.createGain();

                    oscillator.frequency.setValueAtTime(freq, this.context.currentTime);
                    oscillator.type = 'sawtooth';

                    const volume = this.settings.sfxVolume * 0.3;
                    gainNode.gain.setValueAtTime(volume, this.context.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + duration);

                    oscillator.connect(gainNode);
                    gainNode.connect(this.masterGainNode);

                    oscillator.start(this.context.currentTime);
                    oscillator.stop(this.context.currentTime + duration);
                }, index * 200);
            });
        };
    }

    createCountdownSound() {
        return (count) => {
            if (!this.context) return;

            const frequency = count <= 3 ? 800 : 600; // Higher pitch for final countdown
            const oscillator = this.context.createOscillator();
            const gainNode = this.context.createGain();

            oscillator.frequency.setValueAtTime(frequency, this.context.currentTime);
            oscillator.type = 'square';

            const volume = this.settings.sfxVolume * 0.5;
            gainNode.gain.setValueAtTime(volume, this.context.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.3);

            oscillator.connect(gainNode);
            gainNode.connect(this.masterGainNode);

            oscillator.start(this.context.currentTime);
            oscillator.stop(this.context.currentTime + 0.3);
        };
    }

    createBombTickSound() {
        return (frequency = 200, duration = 0.05, volume = 1.0) => {
            if (!this.context) return;

            // Two-tone ticking sound for danger
            const oscillator1 = this.context.createOscillator();
            const oscillator2 = this.context.createOscillator();
            const gainNode = this.context.createGain();

            // Low dangerous frequency
            oscillator1.frequency.setValueAtTime(frequency, this.context.currentTime);
            oscillator1.type = 'square';

            // Slightly higher harmonic
            oscillator2.frequency.setValueAtTime(frequency * 1.5, this.context.currentTime);
            oscillator2.type = 'sawtooth';

            const finalVolume = this.settings.sfxVolume * volume * 0.4;
            gainNode.gain.setValueAtTime(0, this.context.currentTime);
            gainNode.gain.linearRampToValueAtTime(finalVolume, this.context.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + duration);

            oscillator1.connect(gainNode);
            oscillator2.connect(gainNode);
            gainNode.connect(this.masterGainNode);

            oscillator1.start(this.context.currentTime);
            oscillator2.start(this.context.currentTime);
            oscillator1.stop(this.context.currentTime + duration);
            oscillator2.stop(this.context.currentTime + duration);
        };
    }

    createBombExplosionSound() {
        return () => {
            if (!this.context) return;

            // Explosive noise burst
            const duration = 0.5;
            const noise = this.context.createBufferSource();
            const gainNode = this.context.createGain();
            const filter = this.context.createBiquadFilter();

            // Create noise buffer
            const bufferSize = this.context.sampleRate * duration;
            const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            noise.buffer = buffer;

            // Low-pass filter for "boom" effect
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(200, this.context.currentTime);
            filter.Q.setValueAtTime(1, this.context.currentTime);

            // Volume envelope for explosion
            const volume = this.settings.sfxVolume * 0.7;
            gainNode.gain.setValueAtTime(volume, this.context.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + duration);

            noise.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.masterGainNode);

            noise.start(this.context.currentTime);
        };
    }

    // Background music generator
    async startBackgroundMusic() {
        if (!this.context || this.backgroundMusic) return;

        this.backgroundMusic = this.createBackgroundMusic();
    }

    createBackgroundMusic() {
        if (!this.context) return null;

        // Simple ambient background music loop
        const playAmbientLoop = () => {
            const notes = [
                { freq: 261.63, duration: 2.0 }, // C4
                { freq: 329.63, duration: 2.0 }, // E4
                { freq: 392.00, duration: 2.0 }, // G4
                { freq: 329.63, duration: 2.0 }, // E4
                { freq: 293.66, duration: 2.0 }, // D4
                { freq: 261.63, duration: 4.0 }  // C4
            ];

            let currentTime = this.context.currentTime;

            notes.forEach(note => {
                const oscillator = this.context.createOscillator();
                const gainNode = this.context.createGain();

                oscillator.frequency.setValueAtTime(note.freq, currentTime);
                oscillator.type = 'sine';

                // Soft, ambient volume
                const volume = 0.1;
                gainNode.gain.setValueAtTime(0, currentTime);
                gainNode.gain.linearRampToValueAtTime(volume, currentTime + 0.5);
                gainNode.gain.linearRampToValueAtTime(0, currentTime + note.duration - 0.5);

                oscillator.connect(gainNode);
                gainNode.connect(this.musicGainNode);

                oscillator.start(currentTime);
                oscillator.stop(currentTime + note.duration);

                currentTime += note.duration;
            });

            // Schedule next loop
            setTimeout(() => {
                if (this.backgroundMusic) {
                    playAmbientLoop();
                }
            }, (currentTime - this.context.currentTime) * 1000);
        };

        playAmbientLoop();
        return true;
    }

    stopBackgroundMusic() {
        this.backgroundMusic = null;
    }

    playSound(soundName, ...params) {
        if (!this.isInitialized || !this.sounds[soundName]) {
            console.warn(`Sound '${soundName}' not available`);
            return;
        }

        this.sounds[soundName](...params);
    }

    // Volume controls
    setMasterVolume(volume) {
        this.settings.masterVolume = Math.max(0, Math.min(1, volume));
        if (this.masterGainNode) {
            this.masterGainNode.gain.setValueAtTime(this.settings.masterVolume, this.context.currentTime);
        }
    }

    setMusicVolume(volume) {
        this.settings.musicVolume = Math.max(0, Math.min(1, volume));
        if (this.musicGainNode) {
            this.musicGainNode.gain.setValueAtTime(this.settings.musicVolume, this.context.currentTime);
        }
    }

    setSfxVolume(volume) {
        this.settings.sfxVolume = Math.max(0, Math.min(1, volume));
    }

    setBeepVolume(volume) {
        this.settings.beepVolume = Math.max(0, Math.min(1, volume));
    }

    // Enhanced 3D spatial audio for distance-based feedback with beat frequency
    createSpatialBeep(balloonPosition3D, distance, maxDistance) {
        if (!this.context) return;

        // Normalize distance (0 = very close, 1 = very far)
        const normalizedDistance = Math.min(distance / maxDistance, 1);

        // Musical Scale Mapping (Pentatonic C Major - Happy/Magical)
        // C4, D4, E4, G4, A4, C5, D5, E5, G5, A5
        const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];
        
        // Map distance (1.0 -> 0.0) to scale index (0 -> 9)
        // Closer = Higher Note (Reward Approaching!)
        const scaleIndex = Math.min(scale.length - 1, Math.floor((1 - normalizedDistance) * scale.length));
        const frequency = scale[scaleIndex];

        // Duration: steady chime
        const duration = 0.12; 

        // Volume: closer = louder
        const baseVolume = 0.8 * (1 - normalizedDistance * 0.3);

        // Create 3D spatial beep (Magic Chime)
        this.play3DBeep(frequency, duration, baseVolume, balloonPosition3D);

        // Return beat interval for the game to use
        return this.calculateBeatInterval(normalizedDistance);
    }

    // 3D Spatial bomb ticking audio - EXTREME DANGER sound that increases with proximity
    createSpatialBombTick(bombPosition3D, distance, maxDistance) {
        if (!this.context) return;

        // Normalize distance (0 = very close, 1 = very far)
        const normalizedDistance = Math.min(distance / maxDistance, 1);

        // Frequency mapping: closer = lower, more menacing frequency
        const frequency = 150 + normalizedDistance * 100; // 150Hz (close, danger!) to 250Hz (far)

        // Duration: closer = shorter, more urgent ticks
        const duration = normalizedDistance < 0.3 ? 0.08 : 0.12;

        // Volume mapping: closer = MUCH louder to indicate EXTREME danger
        const baseVolume = 1.2 * (1 - normalizedDistance * 0.4); // Increased volume

        // Urgency level based on distance
        const urgency = 1 - normalizedDistance; // 0 = far, 1 = very close

        // Create 3D spatial bomb tick with urgency
        this.play3DBombTick(frequency, duration, baseVolume, bombPosition3D, urgency);

        // Return tick interval (faster when close for danger feel)
        return this.calculateBombTickInterval(normalizedDistance);
    }

    // Create OR UPDATE 3D positioned bomb tick sound
    play3DBombTick(frequency, duration, volume, position3D, urgency = 0.5) {
        if (!this.context) return;

        try {
            const now = this.context.currentTime;
            // Calculate target speed: 1.0 (normal) to 3.0 (extreme panic) based on urgency
            const targetPlaybackRate = 1.0 + (urgency * 2.0);

            // === USE MP3 ALARM FILE IF AVAILABLE ===
            if (this.bombAlarmBuffer) {
                // Check if we are already playing the alarm
                if (this.currentBombSound && this.currentBombSound.isPlaying) {
                    // Update existing sound parameters
                    const { panner, gain, source } = this.currentBombSound;
                    
                    // Update Position
                    this.set3DPosition(panner, position3D);
                    
                    // Update Volume based on distance/urgency
                    const alarmVolume = volume * (0.6 + urgency * 0.4);
                    gain.gain.cancelScheduledValues(now);
                    gain.gain.linearRampToValueAtTime(alarmVolume, now + 0.1);
                    
                    // Update Playback Rate (Speed/Pitch)
                    if (source.playbackRate) {
                        source.playbackRate.cancelScheduledValues(now);
                        source.playbackRate.linearRampToValueAtTime(targetPlaybackRate, now + 0.1);
                    }
                    
                    return; // Successfully updated
                }
                
                // START NEW SOUND (if not playing)
                const alarmSource = this.context.createBufferSource();
                const alarmGain = this.context.createGain();
                const alarmPanner = this.context.createPanner();

                this.configure3DPanner(alarmPanner);
                alarmPanner.rolloffFactor = 1.5;
                this.set3DPosition(alarmPanner, position3D);

                alarmSource.buffer = this.bombAlarmBuffer;
                alarmSource.loop = true; // Loop the alarm!
                alarmSource.playbackRate.value = targetPlaybackRate;

                const alarmVolume = volume * (0.6 + urgency * 0.4);
                
                // Fade in
                alarmGain.gain.setValueAtTime(0, now);
                alarmGain.gain.linearRampToValueAtTime(alarmVolume, now + 0.1);

                alarmSource.connect(alarmGain);
                alarmGain.connect(alarmPanner);
                alarmPanner.connect(this.masterGainNode);

                alarmSource.start(now);

                this.currentBombSound = { 
                    source: alarmSource, 
                    gain: alarmGain, 
                    panner: alarmPanner, 
                    isPlaying: true 
                };

                return;
            }

            // === FALLBACK: SYNTHESIZED SOUND ===
            // (Only play if enough time has passed to prevent overlapping)
            if (this.lastSynthBombTime && (now - this.lastSynthBombTime < duration)) {
                return; // Skip if playing too fast
            }
            this.lastSynthBombTime = now;
            
            const osc = this.context.createOscillator();
            const gain = this.context.createGain();
            const panner = this.context.createPanner();
            
            this.configure3DPanner(panner);
            this.set3DPosition(panner, position3D);
            
            osc.frequency.setValueAtTime(frequency * targetPlaybackRate, now); // Pitch up synthesized sound too
            osc.type = 'sawtooth';
            
            gain.gain.setValueAtTime(volume * 0.5, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
            
            osc.connect(gain);
            gain.connect(panner);
            panner.connect(this.masterGainNode);
            
            osc.start(now);
            osc.stop(now + duration);

        } catch (error) {
            console.error('❌ Error playing bomb sound:', error);
        }
    }

    // Stop all active bomb alarm sounds
    stopAllBombAlarms() {
        if (this.currentBombSound) {
            // console.log('🔇 Stopping continuous bomb alarm');
            const { source, gain, panner } = this.currentBombSound;
            
            try {
                const now = this.context.currentTime;
                // Quick fade out
                gain.gain.cancelScheduledValues(now);
                gain.gain.setValueAtTime(gain.gain.value, now);
                gain.gain.linearRampToValueAtTime(0, now + 0.1);
                
                source.stop(now + 0.1);
                
                setTimeout(() => {
                    source.disconnect();
                    gain.disconnect();
                    panner.disconnect();
                }, 150);
            } catch (e) {
                // Ignore
            }
            
            this.currentBombSound = null;
        }
        
        // Clear legacy map just in case
        this.activeBombSources.clear();
    }

    // Calculate bomb tick interval based on distance (faster when danger is near)
    calculateBombTickInterval(normalizedDistance) {
        // Bomb ticks get FASTER when you're close (opposite feel from balloon)
        // Very close (0-0.1): 5 TPS (200ms interval) - DANGER!
        // Close (0.1-0.3): 3 TPS (333ms interval)
        // Medium (0.3-0.6): 2 TPS (500ms interval)
        // Far (0.6-0.8): 1 TPS (1000ms interval)
        // Very far (0.8-1.0): 0.5 TPS (2000ms interval)

        const minInterval = 200;   // 5 TPS when extremely close - DANGER!
        const maxInterval = 2000;  // 0.5 TPS when very far

        // Exponential curve for dramatic danger feel
        const curve = Math.pow(normalizedDistance, 1.8);
        const interval = minInterval + (maxInterval - minInterval) * curve;

        return Math.round(interval);
    }

    // Create 3D positioned beep sound (Enhanced: Magic Chime)
    play3DBeep(frequency, duration, volume, position3D) {
        if (!this.context) return;

        try {
            const osc1 = this.context.createOscillator(); // Fundamental (Body)
            const osc2 = this.context.createOscillator(); // Harmonic (Sparkle)
            const gain = this.context.createGain();
            const panner = this.context.createPanner();
            
            // Configure panner for realistic 3D audio
            panner.panningModel = 'HRTF';
            panner.distanceModel = 'inverse';
            panner.refDistance = 1;
            panner.maxDistance = this.spaceWidth * 2;
            panner.rolloffFactor = 1;
            panner.coneInnerAngle = 360;
            panner.coneOuterAngle = 360;
            panner.coneOuterGain = 0;

            // Set 3D position of the sound source
            if (panner.positionX) {
                // Modern API
                panner.positionX.setValueAtTime(position3D.x, this.context.currentTime);
                panner.positionY.setValueAtTime(position3D.y, this.context.currentTime);
                panner.positionZ.setValueAtTime(position3D.z, this.context.currentTime);
            } else {
                // Legacy API fallback
                panner.setPosition(position3D.x, position3D.y, position3D.z);
            }

            // Oscillator 1: Sine (Warmth)
            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(frequency, this.context.currentTime);

            // Oscillator 2: Triangle (Brightness/Reward feel)
            osc2.type = 'triangle';
            osc2.frequency.setValueAtTime(frequency * 2, this.context.currentTime); // Octave up for shimmer

            // Bell-like Envelope
            gain.gain.setValueAtTime(0, this.context.currentTime);
            gain.gain.linearRampToValueAtTime(volume * 0.6, this.context.currentTime + 0.02); // Fast attack
            gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + duration + 0.2); // Longer decay for "ring"

            // Connect graph
            // Use a separate gain for the harmonic to keep it subtle
            const harmonicGain = this.context.createGain();
            harmonicGain.gain.value = 0.3; // Harmonic is quieter
            
            osc1.connect(gain);
            osc2.connect(harmonicGain);
            harmonicGain.connect(gain);
            
            gain.connect(panner);
            panner.connect(this.masterGainNode);

            // Play
            const now = this.context.currentTime;
            osc1.start(now);
            osc2.start(now);
            osc1.stop(now + duration + 0.3);
            osc2.stop(now + duration + 0.3);

        } catch (error) {
            console.error('❌ Error creating 3D spatial beep:', error);
        }
    }

    // Convert 2D screen coordinates to 3D audio space coordinates
    // NEW: Can specify listener position (hand/cursor) for relative audio
    screenTo3D(screenX, screenY, screenWidth, screenHeight, depth = 0, verticalBoost = 1.0, listenerX = null, listenerY = null) {
        // If listener position is provided, calculate position RELATIVE to listener (hand/cursor)
        // Otherwise, use screen center as reference (legacy behavior)
        const referenceX = listenerX !== null ? listenerX : screenWidth / 2;
        const referenceY = listenerY !== null ? listenerY : screenHeight / 2;

        // Calculate position relative to reference point (listener/hand)
        const relativeX = screenX - referenceX;
        const relativeY = screenY - referenceY;

        // Map to 3D audio space
        const x = (relativeX / screenWidth) * this.spaceWidth;

        // Enhanced vertical positioning with boost for better top/bottom perception
        let y = -(relativeY / screenHeight) * this.spaceHeight; // Flip Y axis (screen Y down = audio Y down)
        y *= verticalBoost; // Apply vertical boost setting

        // Clamp Y to prevent extreme values
        y = Math.max(-this.spaceHeight, Math.min(this.spaceHeight, y));

        const z = depth * this.spaceDepth; // Depth from 0 (front) to 1 (back)

        return { x, y, z };
    }

    // Enhanced 3D positioning with better vertical audio cues
    updateListenerOrientation(verticalBoost = 1.0) {
        if (!this.listener) return;
        
        try {
            if (this.listener.positionX) {
                // Modern API - enhanced for better vertical perception
                // Listener position stays at center
                this.listener.positionX.setValueAtTime(0, this.context.currentTime);
                this.listener.positionY.setValueAtTime(0, this.context.currentTime);
                this.listener.positionZ.setValueAtTime(0, this.context.currentTime);
                
                // Enhanced orientation for better top/bottom perception
                this.listener.forwardX.setValueAtTime(0, this.context.currentTime);
                this.listener.forwardY.setValueAtTime(0, this.context.currentTime);
                this.listener.forwardZ.setValueAtTime(-1, this.context.currentTime);
                
                // Enhanced up vector for improved vertical positioning
                this.listener.upX.setValueAtTime(0, this.context.currentTime);
                this.listener.upY.setValueAtTime(verticalBoost, this.context.currentTime);
                this.listener.upZ.setValueAtTime(0, this.context.currentTime);
            } else {
                // Legacy API fallback
                this.listener.setPosition(0, 0, 0);
                this.listener.setOrientation(0, 0, -1, 0, verticalBoost, 0);
            }
        } catch (error) {
            console.error('❌ Error updating listener orientation:', error);
        }
    }

    // Calculate beat interval based on distance (closer = faster beats)
    calculateBeatInterval(normalizedDistance) {
        // Beat frequency mapping:
        // Very close (0-0.1): 10 BPS (100ms interval)
        // Close (0.1-0.3): 5 BPS (200ms interval)  
        // Medium (0.3-0.6): 2 BPS (500ms interval)
        // Far (0.6-0.8): 1 BPS (1000ms interval)
        // Very far (0.8-1.0): 0.5 BPS (2000ms interval)
        
        const minInterval = 50;   // 20 BPS when extremely close
        const maxInterval = 2000; // 0.5 BPS when very far
        
        // Exponential curve for more dramatic change when getting close
        const curve = Math.pow(normalizedDistance, 1.5);
        const interval = minInterval + (maxInterval - minInterval) * curve;
        
        return Math.round(interval);
    }

    // Get beat frequency in BPS for display
    getBeatFrequency(normalizedDistance) {
        const interval = this.calculateBeatInterval(normalizedDistance);
        const bps = 1000 / interval;
        return Math.round(bps * 10) / 10; // Round to 1 decimal place
    }

    // === LEVEL 3: HAND POSITION TRACKING AUDIO SYSTEM ===

    /**
     * Create continuous ambient audio tone based on hand position
     * Uses realistic 3D spatial audio with Web Audio API
     */
    createHandPositionAudio() {
        if (!this.context || this.handPositionOscillator) return;

        console.log('🎧 Creating hand position tracking audio system...');

        // Create oscillator for continuous tone
        this.handPositionOscillator = this.context.createOscillator();
        this.handPositionGain = this.context.createGain();
        this.handPositionFilter = this.context.createBiquadFilter();
        this.handPositionPanner = this.context.createPanner();

        // Configure panner for HRTF 3D audio
        this.configure3DPanner(this.handPositionPanner);

        // Start with a pleasant mid-range frequency
        this.handPositionOscillator.frequency.setValueAtTime(440, this.context.currentTime);
        this.handPositionOscillator.type = 'sine'; // Smooth sine wave

        // Configure filter for warmth
        this.handPositionFilter.type = 'lowpass';
        this.handPositionFilter.frequency.setValueAtTime(2000, this.context.currentTime);
        this.handPositionFilter.Q.setValueAtTime(1, this.context.currentTime);

        // Start with zero volume (will be updated based on hand position)
        this.handPositionGain.gain.setValueAtTime(0, this.context.currentTime);

        // Connect: Oscillator -> Filter -> Gain -> Panner -> Master
        this.handPositionOscillator.connect(this.handPositionFilter);
        this.handPositionFilter.connect(this.handPositionGain);
        this.handPositionGain.connect(this.handPositionPanner);
        this.handPositionPanner.connect(this.masterGainNode);

        // Start the oscillator
        this.handPositionOscillator.start();

        console.log('✅ Hand position audio system created');
    }

    /**
     * Update hand position audio based on screen coordinates
     * Implements realistic spatial audio with distance-based volume and frequency
     * @param {boolean} invertedVolume - If true, edges are loud and center is quiet
     */
    updateHandPositionAudio(handX, handY, screenWidth, screenHeight, invertedVolume = false) {
        if (!this.handPositionOscillator || !this.handPositionPanner || !this.handPositionGain) {
            return;
        }

        const currentTime = this.context.currentTime;

        // === 1. CALCULATE 3D POSITION ===
        // Convert screen coordinates to 3D audio space
        const centerX = screenWidth / 2;
        const centerY = screenHeight / 2;

        // Normalize to -1 to 1 range
        const normalizedX = (handX - centerX) / centerX;
        const normalizedY = -(handY - centerY) / centerY; // Invert Y for audio space

        // Map to 3D space (meters)
        const audio3D = {
            x: normalizedX * this.spaceWidth / 2,  // -5 to +5 meters
            y: normalizedY * this.spaceHeight / 2, // -3 to +3 meters
            z: 2 // Fixed depth
        };

        // === 2. UPDATE 3D PANNER POSITION ===
        if (this.handPositionPanner.positionX) {
            // Modern API - smooth transitions
            this.handPositionPanner.positionX.linearRampToValueAtTime(audio3D.x, currentTime + 0.1);
            this.handPositionPanner.positionY.linearRampToValueAtTime(audio3D.y, currentTime + 0.1);
            this.handPositionPanner.positionZ.linearRampToValueAtTime(audio3D.z, currentTime + 0.1);
        } else {
            // Legacy API
            this.handPositionPanner.setPosition(audio3D.x, audio3D.y, audio3D.z);
        }

        // === 3. CALCULATE DISTANCE FROM CENTER ===
        const distanceFromCenter = Math.sqrt(
            Math.pow(handX - centerX, 2) +
            Math.pow(handY - centerY, 2)
        );
        const maxDistance = Math.sqrt(
            Math.pow(screenWidth / 2, 2) +
            Math.pow(screenHeight / 2, 2)
        );
        const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);

        // === 4. DISTANCE-BASED VOLUME ===
        const baseVolume = 0.3;
        let distanceAttenuation, volume;

        if (invertedVolume) {
            // INVERTED MODE (Level 4): Edges = loud, center = quiet
            // Far from center = louder
            distanceAttenuation = Math.pow(normalizedDistance, 1.5);
            volume = baseVolume * distanceAttenuation * this.settings.spatialVolume;
        } else {
            // NORMAL MODE (Level 3): Center = loud, edges = quiet
            // Closer to center = louder, at edges = quieter
            // Uses inverse-square law for realistic attenuation
            distanceAttenuation = 1 - Math.pow(normalizedDistance, 1.5);
            volume = baseVolume * distanceAttenuation * this.settings.spatialVolume;
        }

        this.handPositionGain.gain.linearRampToValueAtTime(volume, currentTime + 0.05);

        // === 5. DISTANCE-BASED FREQUENCY ===
        // Pitch changes ONLY based on distance from center, not position
        // This way left and right have the same pitch, only 3D positioning differs
        const baseFreq = 440; // A4 (440Hz)
        let targetFreq;

        if (invertedVolume) {
            // Level 4: Higher pitch at edges (far = higher pitch)
            const distanceShift = normalizedDistance * 200; // 0-200Hz based on distance
            targetFreq = baseFreq + distanceShift; // 440-640Hz
        } else {
            // Level 3: Higher pitch at center (close = higher pitch)
            const distanceShift = (1 - normalizedDistance) * 200; // 0-200Hz based on closeness
            targetFreq = baseFreq + distanceShift; // 440-640Hz
        }

        this.handPositionOscillator.frequency.linearRampToValueAtTime(targetFreq, currentTime + 0.05);

        // === 6. DISTANCE-BASED FILTER (for depth perception) ===
        // Filter also changes based on distance only
        let filterCutoff;
        if (invertedVolume) {
            // Level 4: Brighter at edges
            filterCutoff = 500 + (normalizedDistance * 2500); // 500Hz to 3000Hz
        } else {
            // Level 3: Brighter at center
            filterCutoff = 500 + ((1 - normalizedDistance) * 2500); // 500Hz to 3000Hz
        }
        this.handPositionFilter.frequency.linearRampToValueAtTime(filterCutoff, currentTime + 0.05);

        // === 7. QUADRANT DETECTION (for feedback) ===
        const quadrant = this.getQuadrant(normalizedX, normalizedY);

        // Log for debugging
        if (Math.random() < 0.01) { // Log 1% of updates to avoid spam
            console.log(`🎵 Hand Audio: Pos(${audio3D.x.toFixed(1)}, ${audio3D.y.toFixed(1)}), ` +
                       `Dist: ${(normalizedDistance * 100).toFixed(0)}%, ` +
                       `Freq: ${targetFreq.toFixed(0)}Hz, ` +
                       `Vol: ${(volume * 100).toFixed(0)}%, ` +
                       `Quadrant: ${quadrant}`);
        }

        return {
            quadrant,
            volume,
            frequency: targetFreq,
            distance: normalizedDistance
        };
    }

    /**
     * Get quadrant name based on normalized coordinates
     */
    getQuadrant(normalizedX, normalizedY) {
        const threshold = 0.3; // Center zone threshold

        if (Math.abs(normalizedX) < threshold && Math.abs(normalizedY) < threshold) {
            return 'center';
        }

        if (Math.abs(normalizedY) < threshold) {
            return normalizedX > 0 ? 'right' : 'left';
        }

        if (Math.abs(normalizedX) < threshold) {
            return normalizedY > 0 ? 'top' : 'bottom';
        }

        // Diagonals
        if (normalizedX > 0 && normalizedY > 0) return 'top-right';
        if (normalizedX < 0 && normalizedY > 0) return 'top-left';
        if (normalizedX > 0 && normalizedY < 0) return 'bottom-right';
        return 'bottom-left';
    }

    /**
     * Stop hand position audio
     */
    stopHandPositionAudio() {
        if (this.handPositionOscillator) {
            try {
                this.handPositionOscillator.stop();
                this.handPositionOscillator.disconnect();
            } catch (e) {
                // Already stopped
            }
            this.handPositionOscillator = null;
        }

        if (this.handPositionGain) {
            this.handPositionGain.disconnect();
            this.handPositionGain = null;
        }

        if (this.handPositionFilter) {
            this.handPositionFilter.disconnect();
            this.handPositionFilter = null;
        }

        if (this.handPositionPanner) {
            this.handPositionPanner.disconnect();
            this.handPositionPanner = null;
        }

        console.log('🔇 Hand position audio stopped');
    }

    // Accessibility features
    announceDistance(distance, maxDistance) {
        const normalizedDistance = distance / maxDistance;
        let announcement;

        if (normalizedDistance < 0.1) {
            announcement = "Very close! Almost there!";
        } else if (normalizedDistance < 0.2) {
            announcement = "Very close!";
        } else if (normalizedDistance < 0.4) {
            announcement = "Close";
        } else if (normalizedDistance < 0.6) {
            announcement = "Getting warmer";
        } else if (normalizedDistance < 0.8) {
            announcement = "Far";
        } else {
            announcement = "Very far";
        }

        return announcement;
    }

    // True 3D Spatial Speech - creates synthesized voice from specific 3D position
    // SPEECH REMOVED - keeping spatial audio only
    speak3D(text, position3D, options = {}) {
        return new Promise((resolve) => {
            console.log(`🎤 3D Speech DISABLED: "${text}" at position (${position3D.x.toFixed(1)}, ${position3D.y.toFixed(1)}, ${position3D.z.toFixed(1)})`);

            // Speech removed - only keeping spatial beeps/tones
            // Create synthetic speech using audio synthesis that can be spatialized
            this.createSpatialSpeech(text, position3D, options)
                .then(resolve)
                .catch(() => {
                    // Speech synthesis disabled
                    // const utterance = new SpeechSynthesisUtterance(text);
                    // utterance.rate = options.rate || 0.9;
                    // utterance.onend = resolve;
                    // utterance.onerror = resolve;
                    // speechSynthesis.speak(utterance);
                    resolve(); // Immediately resolve without speaking
                });
        });
    }

    // Create synthesized speech that can be positioned in 3D space
    async createSpatialSpeech(text, position3D, options = {}) {
        if (!this.context) throw new Error('Audio context not available');

        // Word-to-frequency mapping for basic speech synthesis
        const wordFrequencies = {
            'left': { base: 300, pattern: [300, 280, 260] },
            'right': { base: 280, pattern: [280, 300, 320] },
            'top': { base: 400, pattern: [350, 450] },
            'bottom': { base: 220, pattern: [220, 200, 240] },
            'center': { base: 350, pattern: [330, 350, 370] },
            'front': { base: 320, pattern: [320, 340] },
            'back': { base: 280, pattern: [280, 260] },
            'completed': { base: 330, pattern: [330, 350, 320, 340] },
            'test': { base: 360, pattern: [360, 380] },
            'default': { base: 300, pattern: [300, 320, 280] }
        };

        const cleanText = text.toLowerCase().replace(/[^a-z\s]/g, '');
        const words = cleanText.split(' ');
        
        return new Promise((resolve) => {
            let currentTime = this.context.currentTime;
            const wordDuration = 0.4; // Duration per word
            
            words.forEach((word, wordIndex) => {
                const freqData = wordFrequencies[word] || wordFrequencies['default'];
                const syllables = this.getSyllables(word);
                const syllableDuration = wordDuration / Math.max(syllables.length, 1);
                
                syllables.forEach((syllable, syllableIndex) => {
                    const syllableTime = currentTime + (wordIndex * wordDuration) + (syllableIndex * syllableDuration);
                    this.createSpatialSyllable(
                        freqData.pattern[syllableIndex % freqData.pattern.length] || freqData.base,
                        syllableTime,
                        syllableDuration * 0.8, // Slight gap between syllables
                        position3D,
                        options
                    );
                });
            });
            
            // Resolve after all speech is complete
            const totalDuration = words.length * wordDuration;
            setTimeout(resolve, totalDuration * 1000);
        });
    }

    // Create a single spatialized syllable
    createSpatialSyllable(frequency, startTime, duration, position3D, options = {}) {
        try {
            // Create oscillator for voice synthesis
            const oscillator = this.context.createOscillator();
            const gainNode = this.context.createGain();
            const filter = this.context.createBiquadFilter();
            const pannerNode = this.context.createPanner();
            
            // Configure 3D panner
            this.configure3DPanner(pannerNode);
            this.set3DPosition(pannerNode, position3D);
            
            // Configure voice-like oscillator
            oscillator.frequency.setValueAtTime(frequency, startTime);
            oscillator.frequency.linearRampToValueAtTime(frequency * 1.1, startTime + duration * 0.3);
            oscillator.frequency.linearRampToValueAtTime(frequency * 0.95, startTime + duration);
            oscillator.type = 'sawtooth';
            
            // Voice-like filtering
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(frequency * 2.5, startTime);
            filter.Q.setValueAtTime(3, startTime);
            
            // Natural speech envelope
            const volume = (options.volume || 0.6) * 0.4;
            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.02);
            gainNode.gain.linearRampToValueAtTime(volume * 0.8, startTime + duration * 0.6);
            gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
            
            // Connect audio graph: Oscillator -> Filter -> Gain -> Panner -> Master
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(pannerNode);
            pannerNode.connect(this.masterGainNode);
            
            // Schedule playback
            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
            
        } catch (error) {
            console.error('❌ Error creating spatial syllable:', error);
        }
    }

    // Simple syllable breakdown for speech synthesis
    getSyllables(word) {
        if (!word) return [''];
        
        // Simple syllable patterns for common direction words
        const syllableMap = {
            'left': ['left'],
            'right': ['right'],
            'top': ['top'],
            'bottom': ['bot', 'tom'],
            'center': ['cen', 'ter'],
            'front': ['front'],
            'back': ['back'],
            'completed': ['com', 'plet', 'ed'],
            'test': ['test']
        };
        
        return syllableMap[word] || [word];
    }

    // Create a 3D positioned "voice-like" tone that precedes speech
    create3DVoiceTone(position3D, textLength = 5) {
        if (!this.context) return;

        try {
            // Create oscillator for voice-like tone
            const oscillator = this.context.createOscillator();
            const gainNode = this.context.createGain();
            const filter = this.context.createBiquadFilter();
            
            // Create 3D panner
            const pannerNode = this.context.createPanner();
            this.configure3DPanner(pannerNode);
            this.set3DPosition(pannerNode, position3D);

            // Voice-like frequency sweep
            const baseFreq = 200;
            oscillator.frequency.setValueAtTime(baseFreq, this.context.currentTime);
            oscillator.frequency.linearRampToValueAtTime(baseFreq * 1.2, this.context.currentTime + 0.15);
            oscillator.type = 'sawtooth';

            // Filter for more voice-like sound
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(800, this.context.currentTime);
            filter.Q.setValueAtTime(2, this.context.currentTime);

            // Envelope for natural voice-like attack
            const duration = Math.min(0.25, 0.05 * textLength);
            gainNode.gain.setValueAtTime(0, this.context.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.2, this.context.currentTime + 0.02);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + duration);

            // Connect: Oscillator -> Filter -> Gain -> Panner -> Master
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(pannerNode);
            pannerNode.connect(this.masterGainNode);

            // Play the voice tone
            oscillator.start(this.context.currentTime);
            oscillator.stop(this.context.currentTime + duration);
            
        } catch (error) {
            console.error('❌ Error creating 3D voice tone:', error);
        }
    }

    // Helper function to configure 3D panner settings
    configure3DPanner(pannerNode) {
        pannerNode.panningModel = 'HRTF';
        pannerNode.distanceModel = 'inverse';
        pannerNode.refDistance = 1;
        pannerNode.maxDistance = this.spaceWidth * 2;
        pannerNode.rolloffFactor = 0.5; // Less aggressive rolloff for speech
        pannerNode.coneInnerAngle = 360;
        pannerNode.coneOuterAngle = 360;
        pannerNode.coneOuterGain = 0;
    }

    // Helper function to set 3D position
    set3DPosition(pannerNode, position3D) {
        if (pannerNode.positionX) {
            // Modern API
            pannerNode.positionX.setValueAtTime(position3D.x, this.context.currentTime);
            pannerNode.positionY.setValueAtTime(position3D.y, this.context.currentTime);
            pannerNode.positionZ.setValueAtTime(position3D.z, this.context.currentTime);
        } else {
            // Legacy API fallback
            pannerNode.setPosition(position3D.x, position3D.y, position3D.z);
        }
    }

    // Enhanced 3D beep + speech combination for testing
    async play3DTestSound(position3D, locationName, options = {}) {
        // Play 3D beep first
        this.play3DBeep(800, 0.4, 0.6, position3D);
        
        // Wait a bit, then play 3D speech
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Speak the location name from the 3D position
        return this.speak3D(locationName, position3D, options);
    }
}

// Export for use in main game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AudioManager;
} else {
    window.AudioManager = AudioManager;
}