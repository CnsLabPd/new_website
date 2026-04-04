// ==========================================
// GESTURE CONTROLLER MODULE
// ==========================================

export class GestureController {
  constructor() {
    this.hands = null;
    this.camera = null;
    this.videoElement = null;
    this.canvasElement = null;
    this.canvasCtx = null;

    // Hand state tracking
    this.handStates = {
      left: {
        isOpen: false,
        wasOpen: false,
        thumbsUp: false,
        thumbsDown: false,
        isPointing: false, // NEW: pointing gesture (index finger extended)
        gesture: null,
        previousGesture: null,
        detected: false,
        lastDetectionTime: 0,
        lastLaneShiftTime: 0 // NEW: Track when lane shift was triggered
      },
      right: {
        isOpen: false,
        wasOpen: false,
        thumbsUp: false,
        thumbsDown: false,
        isPointing: false, // NEW: pointing gesture (index finger extended)
        gesture: null,
        previousGesture: null,
        detected: false,
        lastDetectionTime: 0,
        lastLaneShiftTime: 0 // NEW: Track when lane shift was triggered
      }
    };

    // Gesture cooldown settings
    this.LANE_SHIFT_COOLDOWN = 800; // ms - prevent multiple lane shifts in quick succession
    this.BRAKE_ACCEL_BLOCK_AFTER_SHIFT = 500; // ms - block brake/accel after lane shift

    // Callbacks for game control
    this.onLaneShiftLeft = null;
    this.onLaneShiftRight = null;
    this.onAccelerate = null;
    this.onDecelerate = null;
    this.onHandsLost = null;
    this.onHandsDetected = null;
    this.onGestureEvent = null;

    // Detection timing
    this.HAND_LOST_TIMEOUT = 500; // ms - time before considering hands lost
    this.bothHandsDetected = false;

    // Pause state
    this.isPaused = false;
    this.wasAutoPaused = false; // Track if we auto-paused due to hand loss

    console.log('🤚 GestureController initialized');
  }

  /**
   * Initialize MediaPipe Hands and webcam
   */
  async init() {
    try {
      // Get video and canvas elements
      this.videoElement = document.getElementById('webcamVideo');
      this.canvasElement = document.getElementById('handCanvas');
      this.canvasCtx = this.canvasElement.getContext('2d');

      // Initialize MediaPipe Hands
      this.hands = new Hands({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        }
      });

      // OPTIMIZED: Reduced model complexity for better performance
      this.hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 0,  // Changed from 1 to 0 for faster processing
        minDetectionConfidence: 0.6,  // Increased from 0.5 to reduce false positives
        minTrackingConfidence: 0.6    // Increased from 0.5 for more stable tracking
      });

      this.hands.onResults((results) => this.onResults(results));

      // Setup webcam
      console.log('📷 Requesting camera access...');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      });

      console.log('✅ Camera stream obtained');
      this.videoElement.srcObject = stream;

      // Wait for video metadata to load FIRST
      await new Promise((resolve, reject) => {
        this.videoElement.onloadedmetadata = () => {
          console.log('✅ Video metadata loaded');
          resolve();
        };
        this.videoElement.onerror = (e) => {
          console.error('❌ Video error:', e);
          reject(new Error('Video failed to load'));
        };
        // Timeout after 5 seconds
        setTimeout(() => reject(new Error('Video metadata timeout')), 5000);
      });

      // NOW play the video
      console.log('▶️ Starting video playback...');
      await this.videoElement.play();

      // Set canvas size to match video
      this.canvasElement.width = this.videoElement.videoWidth;
      this.canvasElement.height = this.videoElement.videoHeight;

      console.log(`📐 Video size: ${this.videoElement.videoWidth}x${this.videoElement.videoHeight}`);

      // Start camera with MediaPipe
      this.camera = new Camera(this.videoElement, {
        onFrame: async () => {
          if (this.hands && this.videoElement.readyState >= 2) {
            try {
              await this.hands.send({ image: this.videoElement });
            } catch (e) {
              console.error('Frame processing error:', e);
            }
          }
        },
        width: 640,
        height: 480
      });

      await this.camera.start();

      console.log('✅ Gesture controller initialized successfully');
      console.log(`📹 Video dimensions: ${this.videoElement.videoWidth}x${this.videoElement.videoHeight}`);
      return true;
    } catch (error) {
      console.error('❌ Failed to initialize gesture controller:', error);
      throw error;
    }
  }

  /**
   * Process hand detection results from MediaPipe
   */
  onResults(results) {
    if (!this.canvasCtx || !this.canvasElement) {
      console.log('⚠️ onResults: Missing canvas context or element');
      return;
    }

    // Debug: Log that onResults is being called (only occasionally to avoid spam)
    // if (Math.random() < 0.01) { // 1% of frames
    //   console.log('🎬 onResults called', {
    //     hasLandmarks: !!results.multiHandLandmarks,
    //     handCount: results.multiHandLandmarks?.length || 0
    //   });
    // }

    try {
      // Clear canvas
      this.canvasCtx.save();
      this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

      // Draw hand landmarks if detected
      if (results.multiHandLandmarks && results.multiHandedness) {
        // console.log(`👋 HANDS DETECTED: ${results.multiHandLandmarks.length} hand(s)`);

        const currentTime = Date.now();
        const detectedHands = new Set();

        for (let i = 0; i < results.multiHandLandmarks.length; i++) {
          const landmarks = results.multiHandLandmarks[i];
          const handedness = results.multiHandedness[i].label; // "Left" or "Right" from camera perspective

          // MIRROR the handedness - camera "Left" is user's RIGHT hand
          const handLabel = handedness.toLowerCase() === 'left' ? 'right' : 'left';

          detectedHands.add(handLabel);

          // Hand skeleton overlay removed - keeping gesture detection only
          // OPTIMIZED: Reduce visual drawing frequency (every 2 frames) to save CPU
          // const shouldDraw = (i % 2 === 0); // Only draw for first hand each frame
          // if (shouldDraw && typeof drawConnectors !== 'undefined') {
          //   drawConnectors(this.canvasCtx, landmarks, HAND_CONNECTIONS, {
          //     color: handLabel === 'right' ? '#00ff00' : '#ff00ff',
          //     lineWidth: 2  // Reduced from 3 to 2
          //   });
          //
          //   // Draw landmarks with smaller radius
          //   drawLandmarks(this.canvasCtx, landmarks, {
          //     color: handLabel === 'right' ? '#00ffff' : '#ffff00',
          //     lineWidth: 1,
          //     radius: 2  // Reduced from 3 to 2
          //   });
          // }

          // Update hand state
          const wasDetected = this.handStates[handLabel].detected;
          this.handStates[handLabel].detected = true;
          this.handStates[handLabel].lastDetectionTime = currentTime;

          // If this is the first detection, initialize as closed
          if (!wasDetected) {
            this.handStates[handLabel].isOpen = false;
            this.handStates[handLabel].wasOpen = false;
            console.log(`✋ ${handLabel} hand first detected - initialized as CLOSED`);
          }

          // Analyze gestures
          this.analyzeGestures(landmarks, handLabel);

          // Gesture label drawing removed - cleaner camera view
          // this.drawGestureLabel(landmarks, handLabel);
        }

        // Check if both hands are detected
        const bothDetected = detectedHands.has('left') && detectedHands.has('right');

        if (bothDetected && !this.bothHandsDetected) {
          this.bothHandsDetected = true;
          // Auto-resume if we previously auto-paused
          if (this.wasAutoPaused && this.onHandsDetected) {
            console.log('🔄 Both hands detected - auto-resuming game');
            this.wasAutoPaused = false;
            this.onHandsDetected();
          }
        }

        // Update status display
        if (bothDetected) {
          this.updateHandStatus('Ready', 'detected');
        } else {
          // Only one or no hands
          const count = detectedHands.size;
          if (count === 1) {
            const hand = detectedHands.has('left') ? 'Left' : 'Right';
            this.updateHandStatus(`${hand} hand only`, 'warning');
          }
        }

        // Mark undetected hands
        for (const hand of ['left', 'right']) {
          if (!detectedHands.has(hand)) {
            this.handStates[hand].detected = false;
          }
        }
      } else {
        // No hands detected
        this.handStates.left.detected = false;
        this.handStates.right.detected = false;
        this.updateHandStatus('Waiting for hands...', 'warning');
      }

      // Check for hand loss timeout
      this.checkHandLoss();

      this.canvasCtx.restore();
    } catch (error) {
      console.error('Error in onResults:', error);
    }
  }

  /**
   * Check if hands have been lost for too long
   */
  checkHandLoss() {
    const currentTime = Date.now();

    // Only check if we had both hands before
    if (!this.bothHandsDetected) return;

    const leftDetected = this.handStates.left.detected ||
                        (currentTime - this.handStates.left.lastDetectionTime <= this.HAND_LOST_TIMEOUT);
    const rightDetected = this.handStates.right.detected ||
                         (currentTime - this.handStates.right.lastDetectionTime <= this.HAND_LOST_TIMEOUT);

    // If either hand is lost
    if (!leftDetected || !rightDetected) {
      this.bothHandsDetected = false;
      if (this.onHandsLost && !this.wasAutoPaused) {
        console.log('⚠️ Hands lost - notifying game');
        this.wasAutoPaused = true; // Mark that we're auto-pausing
        this.onHandsLost();
      }
    }
  }

  /**
   * Draw gesture label near the hand
   */
  drawGestureLabel(landmarks, hand) {
    const state = this.handStates[hand];

    // Get wrist position for label placement
    const wrist = landmarks[0];
    const x = wrist.x * this.canvasElement.width;
    const y = wrist.y * this.canvasElement.height;

    // Determine gesture text
    let gestureText = '';
    let gestureColor = '';

    if (state.isPointing) {
      gestureText = '☝️ POINTING';
      gestureColor = '#FFD700'; // Gold
    } else if (state.thumbsUp) {
      gestureText = '👍 THUMBS UP';
      gestureColor = '#00FF00'; // Green
    } else if (state.thumbsDown) {
      gestureText = '👎 THUMBS DOWN';
      gestureColor = '#FF0066'; // Pink/Red
    } else if (state.isOpen) {
      gestureText = '✋ OPEN';
      gestureColor = '#00FFFF'; // Cyan
    } else {
      gestureText = '✊ CLOSED';
      gestureColor = '#FF6600'; // Orange
    }

    // Add hand label
    const handLabel = hand.toUpperCase();
    const fullText = `${handLabel}: ${gestureText}`;

    // Draw background box
    this.canvasCtx.font = 'bold 18px Arial';
    const textWidth = this.canvasCtx.measureText(fullText).width;
    const padding = 10;
    const boxHeight = 30;

    // Position box above wrist
    const boxX = x - textWidth / 2 - padding;
    const boxY = y - 60;

    this.canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    this.canvasCtx.fillRect(boxX, boxY, textWidth + padding * 2, boxHeight);

    // Draw border
    this.canvasCtx.strokeStyle = gestureColor;
    this.canvasCtx.lineWidth = 3;
    this.canvasCtx.strokeRect(boxX, boxY, textWidth + padding * 2, boxHeight);

    // Draw text
    this.canvasCtx.fillStyle = gestureColor;
    this.canvasCtx.textAlign = 'center';
    this.canvasCtx.textBaseline = 'middle';
    this.canvasCtx.fillText(fullText, x, boxY + boxHeight / 2);
  }

  /**
   * Analyze hand gestures and trigger callbacks
   */
  analyzeGestures(landmarks, hand) {
    const state = this.handStates[hand];
    const currentTime = Date.now();

    // Store previous state
    state.wasOpen = state.isOpen;
    state.previousGesture = state.gesture;

    // PRIORITY 1: Detect specific gestures first (these override open hand)
    // Detect pointing gesture (index finger extended, others closed)
    state.isPointing = this.isPointing(landmarks);

    // Detect thumbs up and thumbs down
    state.thumbsUp = this.isThumbsUp(landmarks);
    state.thumbsDown = this.isThumbsDown(landmarks);

    // PRIORITY 2: Detect open hand ONLY if no specific gesture is active
    // This prevents pointing gestures from triggering lane shifts
    const hasSpecificGesture = state.isPointing || state.thumbsUp || state.thumbsDown;

    if (hasSpecificGesture) {
      // If doing a specific gesture, force hand to NOT be considered "open"
      state.isOpen = false;
    } else {
      // Only check for open hand if no specific gesture is detected
      state.isOpen = this.isHandOpen(landmarks);
    }

    if (state.isPointing) state.gesture = 'pointing';
    else if (state.thumbsUp) state.gesture = 'thumbs_up';
    else if (state.thumbsDown) state.gesture = 'thumbs_down';
    else if (state.isOpen) state.gesture = 'open';
    else state.gesture = 'closed';

    if (this.onGestureEvent && state.gesture !== state.previousGesture) {
      this.onGestureEvent({
        hand,
        gesture: state.gesture,
        confidence: 1,
        timestamp_ms: currentTime
      });
    }

    // Don't trigger callbacks if paused
    if (this.isPaused) return;

    // Check cooldowns
    const timeSinceLastShift = currentTime - state.lastLaneShiftTime;
    const canShiftLane = timeSinceLastShift > this.LANE_SHIFT_COOLDOWN;
    const canBrakeAccel = timeSinceLastShift > this.BRAKE_ACCEL_BLOCK_AFTER_SHIFT;

    // EDGE DETECTION: closed → open transition triggers lane shift
    // This will ONLY trigger if hand is truly open (not pointing or thumbs up)
    if (state.isOpen && !state.wasOpen && canShiftLane) {
      // Hand just opened - trigger lane shift
      console.log(`🎯 ${hand} hand: LANE SHIFT (closed → open)`);
      state.lastLaneShiftTime = currentTime; // Record shift time

      if (hand === 'left') {
        if (this.onLaneShiftLeft) {
          console.log('👈 Left hand opened - shifting LEFT lane');
          this.onLaneShiftLeft({ hand, gesture: 'open', confidence: 1 });
        } else {
          console.log('⚠️ onLaneShiftLeft callback is not set!');
        }
      } else if (hand === 'right') {
        if (this.onLaneShiftRight) {
          console.log('👉 Right hand opened - shifting RIGHT lane');
          this.onLaneShiftRight({ hand, gesture: 'open', confidence: 1 });
        } else {
          console.log('⚠️ onLaneShiftRight callback is not set!');
        }
      }
    }

    // CONTINUOUS: pointing or thumbs up for acceleration/deceleration
    // BLOCKED for 500ms after lane shift to prevent accidental triggers
    // Right hand pointing/thumbs up = Accelerate
    // Left hand pointing/thumbs up = Decelerate
    if (canBrakeAccel) {
      if (hand === 'right' && (state.isPointing || state.thumbsUp) && this.onAccelerate) {
        if (state.isPointing) {
          // Only log occasionally to avoid spam
          if (Math.random() < 0.02) console.log('☝️ RIGHT pointing - accelerating');
        }
        this.onAccelerate();
      } else if (hand === 'left' && (state.isPointing || state.thumbsUp) && this.onDecelerate) {
        if (state.isPointing) {
          // Only log occasionally to avoid spam
          if (Math.random() < 0.02) console.log('☝️ LEFT pointing - decelerating');
        }
        this.onDecelerate();
      }
    }
  }

  /**
   * Detect if hand is fully open (extended palm)
   * Uses finger extension detection
   */
  isHandOpen(landmarks) {
    // Get wrist and fingertips
    const wrist = landmarks[0];
    const indexTip = landmarks[8];
    const middleTip = landmarks[12];
    const ringTip = landmarks[16];
    const pinkyTip = landmarks[20];

    // Get finger PIPs (middle joints)
    const indexPIP = landmarks[6];
    const middlePIP = landmarks[10];
    const ringPIP = landmarks[14];
    const pinkyPIP = landmarks[18];

    // Check if fingers are extended (tip is farther from wrist than PIP)
    // Use a threshold to account for slight bends
    const indexDist = this.getDistance(indexTip, wrist);
    const indexPIPDist = this.getDistance(indexPIP, wrist);
    const indexExtended = indexDist > indexPIPDist * 1.1;

    const middleDist = this.getDistance(middleTip, wrist);
    const middlePIPDist = this.getDistance(middlePIP, wrist);
    const middleExtended = middleDist > middlePIPDist * 1.1;

    const ringDist = this.getDistance(ringTip, wrist);
    const ringPIPDist = this.getDistance(ringPIP, wrist);
    const ringExtended = ringDist > ringPIPDist * 1.1;

    const pinkyDist = this.getDistance(pinkyTip, wrist);
    const pinkyPIPDist = this.getDistance(pinkyPIP, wrist);
    const pinkyExtended = pinkyDist > pinkyPIPDist * 1.1;

    // Hand is open if at least 3 out of 4 fingers are extended
    const extendedCount = [indexExtended, middleExtended, ringExtended, pinkyExtended].filter(Boolean).length;
    return extendedCount >= 3;
  }

  /**
   * Detect pointing gesture (index finger extended, others closed)
   * STRICT detection to avoid confusion with open hand
   */
  isPointing(landmarks) {
    // Get key landmarks
    const wrist = landmarks[0];
    const thumbTip = landmarks[4];
    const thumbMCP = landmarks[2];
    const indexTip = landmarks[8];
    const indexPIP = landmarks[6];
    const indexMCP = landmarks[5];
    const middleTip = landmarks[12];
    const middlePIP = landmarks[10];
    const middleMCP = landmarks[9];
    const ringTip = landmarks[16];
    const ringPIP = landmarks[14];
    const ringMCP = landmarks[13];
    const pinkyTip = landmarks[20];
    const pinkyPIP = landmarks[18];
    const pinkyMCP = landmarks[17];

    // Index finger MUST be clearly extended (tip farther from wrist than PIP)
    const indexDist = this.getDistance(indexTip, wrist);
    const indexPIPDist = this.getDistance(indexPIP, wrist);
    const indexExtended = indexDist > indexPIPDist * 1.2; // Stricter threshold

    // Index finger should also be pointing UP (tip above MCP joint)
    const indexPointingUp = indexTip.y < indexMCP.y - 0.05;

    // Other fingers MUST be clearly curled (stricter detection)
    // Finger is curled if tip is NOT significantly farther from wrist than MCP
    const middleDist = this.getDistance(middleTip, wrist);
    const middleMCPDist = this.getDistance(middleMCP, wrist);
    const middleCurled = middleDist < middleMCPDist * 1.15; // Must be clearly curled

    const ringDist = this.getDistance(ringTip, wrist);
    const ringMCPDist = this.getDistance(ringMCP, wrist);
    const ringCurled = ringDist < ringMCPDist * 1.15;

    const pinkyDist = this.getDistance(pinkyTip, wrist);
    const pinkyMCPDist = this.getDistance(pinkyMCP, wrist);
    const pinkyCurled = pinkyDist < pinkyMCPDist * 1.15;

    // ALL three other fingers (middle, ring, pinky) must be curled
    const allOthersCurled = middleCurled && ringCurled && pinkyCurled;

    // Thumb can be extended or not (don't check thumb to allow natural pointing)

    const isPointing = indexExtended && indexPointingUp && allOthersCurled;

    return isPointing;
  }

  /**
   * Detect thumbs up gesture
   * Thumb is extended up, other fingers are closed
   */
  isThumbsUp(landmarks) {
    // Get key landmarks
    const wrist = landmarks[0];
    const thumbTip = landmarks[4];
    const thumbIP = landmarks[3];
    const thumbMCP = landmarks[2];
    const indexTip = landmarks[8];
    const indexPIP = landmarks[6];
    const indexMCP = landmarks[5];
    const middleTip = landmarks[12];
    const middlePIP = landmarks[10];
    const ringTip = landmarks[16];
    const ringPIP = landmarks[14];
    const pinkyTip = landmarks[20];
    const pinkyPIP = landmarks[18];

    // Thumb should be extended upward (tip above wrist) - relaxed threshold
    const thumbExtended = thumbTip.y < wrist.y - 0.03; // Reduced from 0.05

    // Check thumb is also extended horizontally - relaxed threshold
    const thumbDistance = this.getDistance(thumbTip, thumbMCP);
    const thumbExtendedDist = thumbDistance > 0.08; // Reduced from 0.1

    // Fingers should be curled (tips not extended far from wrist) - relaxed thresholds
    // Using negative offset means fingertip can be slightly above PIP joint
    const indexCurled = indexTip.y > indexPIP.y - 0.01; // More lenient
    const middleCurled = middleTip.y > middlePIP.y - 0.01; // More lenient
    const ringCurled = ringTip.y > ringPIP.y - 0.01; // More lenient
    const pinkyCurled = pinkyTip.y > pinkyPIP.y - 0.01; // Added pinky check

    // At least 3 out of 4 fingers should be curled (more forgiving)
    const curledCount = [indexCurled, middleCurled, ringCurled, pinkyCurled].filter(Boolean).length;
    const fingersCurled = curledCount >= 3;

    const isThumbsUp = thumbExtended && thumbExtendedDist && fingersCurled;

    // Debug logging (only log occasionally to avoid spam)
    // if (Math.random() < 0.05) { // Log ~5% of the time
    //   console.log(`👍 Thumbs Up Check: extended=${thumbExtended}, dist=${thumbExtendedDist}, curled=${fingersCurled} (${curledCount}/4) -> ${isThumbsUp}`);
    // }

    // Thumbs up: thumb extended upward, fingers curled
    return isThumbsUp;
  }

  /**
   * Detect thumbs down gesture
   * Thumb is extended down, other fingers are closed
   */
  isThumbsDown(landmarks) {
    // Get key landmarks
    const wrist = landmarks[0];
    const thumbTip = landmarks[4];
    const thumbIP = landmarks[3];
    const thumbMCP = landmarks[2];
    const indexTip = landmarks[8];
    const indexPIP = landmarks[6];
    const middleTip = landmarks[12];
    const middlePIP = landmarks[10];
    const ringTip = landmarks[16];
    const ringPIP = landmarks[14];

    // Thumb should be extended downward (tip significantly below wrist)
    const thumbExtended = thumbTip.y > wrist.y + 0.05;

    // Check thumb is also extended horizontally
    const thumbDistance = this.getDistance(thumbTip, thumbMCP);
    const thumbExtendedDist = thumbDistance > 0.1;

    // All fingers should be curled
    const indexCurled = indexTip.y > indexPIP.y + 0.02;
    const middleCurled = middleTip.y > middlePIP.y + 0.02;
    const ringCurled = ringTip.y > ringPIP.y + 0.02;

    // Thumbs down: thumb extended downward, all fingers curled
    return thumbExtended && thumbExtendedDist && indexCurled && middleCurled && ringCurled;
  }

  /**
   * Calculate Euclidean distance between two landmarks
   */
  getDistance(point1, point2) {
    const dx = point1.x - point2.x;
    const dy = point1.y - point2.y;
    const dz = (point1.z || 0) - (point2.z || 0);
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  /**
   * Update hand status indicator
   */
  updateHandStatus(text, statusClass = '') {
    const statusDiv = document.getElementById('handStatus');
    if (statusDiv) {
      // Add hand state info if both hands detected
      let statusText = text;
      if (this.bothHandsDetected && !this.isPaused) {
        const leftState = this.handStates.left.isOpen ? '✋' : '✊';
        const rightState = this.handStates.right.isOpen ? '✋' : '✊';
        statusText = `${leftState} L | R ${rightState} | ${text}`;
      }
      statusDiv.textContent = statusText;
      statusDiv.className = 'hand-status ' + statusClass;
    }
  }

  /**
   * Pause gesture processing (but keep camera running)
   */
  pause() {
    this.isPaused = true;
    this.updateHandStatus('Game Paused', 'paused');
    console.log('⏸️ Gesture processing paused (camera still running)');
  }

  /**
   * Resume gesture processing
   */
  resume() {
    this.isPaused = false;
    // Don't reset wasAutoPaused here - only reset when hands are detected
    console.log('▶️ Gesture processing resumed');
  }

  /**
   * Stop the gesture controller and release webcam
   */
  stop() {
    try {
      if (this.camera) {
        this.camera.stop();
        this.camera = null;
      }

      if (this.videoElement && this.videoElement.srcObject) {
        const tracks = this.videoElement.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        this.videoElement.srcObject = null;
      }

      if (this.hands) {
        this.hands.close();
        this.hands = null;
      }

      console.log('🛑 Gesture controller stopped');
    } catch (error) {
      console.error('Error stopping gesture controller:', error);
    }
  }

  /**
   * Show webcam overlay
   */
  showWebcam() {
    const container = document.getElementById('webcamContainer');
    if (container) {
      container.style.display = 'block';
    }
  }

  /**
   * Hide webcam overlay
   */
  hideWebcam() {
    const container = document.getElementById('webcamContainer');
    if (container) {
      container.style.display = 'none';
    }
  }
}
