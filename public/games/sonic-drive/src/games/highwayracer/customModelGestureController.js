// ==========================================
// CUSTOM MODEL GESTURE CONTROLLER MODULE
// Uses separate trained models for left and right hand
// ==========================================

export class CustomModelGestureController {
  constructor() {
    this.hands = null;
    this.camera = null;
    this.videoElement = null;
    this.canvasElement = null;
    this.canvasCtx = null;

    // Dual model system
    this.dualModelMode = false;
    this.leftHandModel = null;
    this.rightHandModel = null;
    this.leftModelData = null;
    this.rightModelData = null;

    // Hand state tracking
    this.handStates = {
      left: {
        gesture: null,
        previousGesture: null, // Track previous gesture for transition detection
        confidence: null,
        confidence: 0,
        detected: false,
        lastDetectionTime: 0,
        lastActionTime: 0, // For cooldown
        openCount: 0 // Track how many times "open" has been seen continuously
      },
      right: {
        gesture: null,
        previousGesture: null, // Track previous gesture for transition detection
        confidence: null,
        confidence: 0,
        detected: false,
        lastDetectionTime: 0,
        lastActionTime: 0, // For cooldown
        openCount: 0 // Track how many times "open" has been seen continuously
      }
    };

    // Callbacks for game control
    this.onLaneShiftLeft = null;
    this.onLaneShiftRight = null;
    this.onAccelerate = null;
    this.onDecelerate = null;
    this.onHandsLost = null;
    this.onHandsDetected = null;
    this.onGestureEvent = null;

    // Detection timing
    this.HAND_LOST_TIMEOUT = 500; // ms
    this.bothHandsDetected = false;

    // Cooldown settings
    this.LANE_SHIFT_COOLDOWN = 800; // ms - prevent multiple lane shifts
    this.BRAKE_ACCEL_BLOCK_AFTER_SHIFT = 500; // ms - block brake/accel after lane shift

    // Pause state
    this.isPaused = false;
    this.wasAutoPaused = false;

    console.log('🤖 CustomModelGestureController initialized');
  }

  /**
   * Load dual models for left and right hands
   */
  async loadDualModels(leftModelPath, rightModelPath) {
    try {
      console.log('🤖 Loading dual models...');
      console.log('📂 Left model:', leftModelPath);
      console.log('📂 Right model:', rightModelPath);

      // Fetch both models in parallel
      const [leftResponse, rightResponse] = await Promise.all([
        fetch(leftModelPath),
        fetch(rightModelPath)
      ]);

      if (!leftResponse.ok || !rightResponse.ok) {
        throw new Error('Failed to fetch one or both model files');
      }

      this.leftModelData = await leftResponse.json();
      this.rightModelData = await rightResponse.json();

      console.log('📊 Left model gestures:', this.leftModelData.gestureNames);
      console.log('📊 Right model gestures:', this.rightModelData.gestureNames);

      // Load left hand model
      await this.loadSingleModel(this.leftModelData, 'left');

      // Load right hand model
      await this.loadSingleModel(this.rightModelData, 'right');

      this.dualModelMode = true;
      console.log('✅ Dual models loaded successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to load dual models:', error);
      throw error;
    }
  }

  /**
   * Load a single TensorFlow.js model
   */
  async loadSingleModel(modelData, hand) {
    try {
      if (modelData.modelType !== 'neural_network' || !modelData.weights) {
        throw new Error(`Invalid model type for ${hand} hand: ${modelData.modelType}`);
      }

      console.log(`🧠 Loading ${hand} hand TensorFlow model...`);

      // Build TensorFlow.js model from weights
      const model = tf.sequential();

      const architecture = modelData.architecture;
      const layers = architecture.layers;
      const dropout = architecture.dropout || [];

      // First hidden layer
      model.add(tf.layers.dense({
        units: layers[0],
        activation: 'relu',
        inputShape: [modelData.numFeatures]
      }));
      if (dropout[0]) {
        model.add(tf.layers.dropout({ rate: dropout[0] }));
      }

      // Second hidden layer
      if (layers[1]) {
        model.add(tf.layers.dense({
          units: layers[1],
          activation: 'relu'
        }));
        if (dropout[1]) {
          model.add(tf.layers.dropout({ rate: dropout[1] }));
        }
      }

      // Output layer
      model.add(tf.layers.dense({
        units: modelData.numClasses,
        activation: 'softmax'
      }));

      // Set weights from modelData
      const weightValues = [];
      for (const layerWeights of modelData.weights) {
        for (const weight of layerWeights.weights) {
          const tensor = tf.tensor(weight.data, weight.shape);
          weightValues.push(tensor);
        }
      }
      model.setWeights(weightValues);

      // Create prediction function
      const predictFunction = async (features) => {
        if (!features || features.length === 0) return null;

        try {
          // Create tensor with explicit shape [1, numFeatures]
          const inputTensor = tf.tensor2d([features], [1, features.length]);
          const predictions = model.predict(inputTensor);
          const predArray = await predictions.array();
          const probabilities = predArray[0];

          const predictedClass = probabilities.indexOf(Math.max(...probabilities));
          const confidence = probabilities[predictedClass];

          const gestureName = modelData.labelDecoder[predictedClass.toString()];

          inputTensor.dispose();
          predictions.dispose();

          return {
            gesture: gestureName || 'unknown',
            confidence: confidence
          };
        } catch (error) {
          console.error(`❌ ${hand} hand prediction error:`, error);
          return null;
        }
      };

      // Store model
      if (hand === 'left') {
        this.leftHandModel = {
          tfModel: model,
          predict: predictFunction
        };
      } else {
        this.rightHandModel = {
          tfModel: model,
          predict: predictFunction
        };
      }

      console.log(`✅ ${hand} hand model loaded - accuracy: ${(modelData.accuracy * 100).toFixed(2)}%`);
      return true;
    } catch (error) {
      console.error(`❌ ${hand} hand model loading failed:`, error);
      throw error;
    }
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

      this.hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 0,
        minDetectionConfidence: 0.6,
        minTrackingConfidence: 0.6
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

      // Wait for video metadata
      await new Promise((resolve, reject) => {
        this.videoElement.onloadedmetadata = () => {
          console.log('✅ Video metadata loaded');
          resolve();
        };
        this.videoElement.onerror = (e) => {
          console.error('❌ Video error:', e);
          reject(new Error('Video failed to load'));
        };
        setTimeout(() => reject(new Error('Video metadata timeout')), 5000);
      });

      // Play video
      console.log('▶️ Starting video playback...');
      await this.videoElement.play();

      // Set canvas size
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

      console.log('✅ Custom model gesture controller initialized');
      return true;
    } catch (error) {
      console.error('❌ Failed to initialize:', error);
      throw error;
    }
  }

  /**
   * Process hand detection results from MediaPipe
   */
  onResults(results) {
    if (!this.canvasCtx || !this.canvasElement) {
      return;
    }

    try {
      // Clear canvas
      this.canvasCtx.save();
      this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

      if (results.multiHandLandmarks && results.multiHandedness) {
        const currentTime = Date.now();
        const detectedHands = new Set();

        for (let i = 0; i < results.multiHandLandmarks.length; i++) {
          const landmarks = results.multiHandLandmarks[i];
          const handedness = results.multiHandedness[i].label; // "Left" or "Right" from camera perspective

          // MIRROR the handedness - camera "Left" is user's RIGHT hand
          const handLabel = handedness.toLowerCase() === 'left' ? 'right' : 'left';

          detectedHands.add(handLabel);

          // Update hand state
          const wasDetected = this.handStates[handLabel].detected;
          this.handStates[handLabel].detected = true;
          this.handStates[handLabel].lastDetectionTime = currentTime;

          // Draw hand landmarks and connections
          this.drawHandLandmarks(landmarks, handLabel);

          // Extract features and predict gesture
          this.predictGesture(landmarks, handLabel);

          // Draw gesture label and action
          this.drawGestureLabel(landmarks, handLabel);
        }

        // Check if both hands are detected (for status only, not required for gameplay)
        const bothDetected = detectedHands.has('left') && detectedHands.has('right');
        const prevBothDetected = this.bothHandsDetected;
        this.bothHandsDetected = bothDetected;

        // Resume game if hands are detected (even just one hand)
        if (detectedHands.size > 0 && this.wasAutoPaused && this.onHandsDetected) {
          console.log('🔄 Hands detected - auto-resuming game');
          this.wasAutoPaused = false;
          this.onHandsDetected();
        }

        // Update status display
        if (bothDetected) {
          this.updateHandStatus('Both hands ready', 'detected');
        } else {
          const count = detectedHands.size;
          if (count === 1) {
            const hand = detectedHands.has('left') ? 'Left' : 'Right';
            this.updateHandStatus(`${hand} hand detected`, 'detected');
          } else if (count === 0) {
            this.updateHandStatus('Waiting for hands...', 'warning');
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
   * Normalize hand landmarks for translation and scale invariance
   */
  normalizeHandLandmarks(landmarks) {
    const normalized = [];

    // 1. Use wrist (landmark 0) as reference point
    const refPoint = landmarks[0] ? { ...landmarks[0] } : { x: 0, y: 0, z: 0 };

    // 2. Find scale (max distance from wrist to any landmark)
    let scale = 0;
    landmarks.forEach(lm => {
      if (lm) {
        const dist = Math.sqrt(
          Math.pow(lm.x - refPoint.x, 2) +
          Math.pow(lm.y - refPoint.y, 2) +
          Math.pow(lm.z - refPoint.z, 2)
        );
        scale = Math.max(scale, dist);
      }
    });

    // Prevent division by zero
    if (scale < 0.0001) scale = 1.0;

    // 3. Normalize all landmarks (translate and scale)
    landmarks.forEach(lm => {
      if (lm) {
        normalized.push({
          x: (lm.x - refPoint.x) / scale,
          y: (lm.y - refPoint.y) / scale,
          z: (lm.z - refPoint.z) / scale
        });
      } else {
        normalized.push({ x: 0, y: 0, z: 0 });
      }
    });

    return normalized;
  }

  /**
   * Calculate angle between three points
   */
  calculateAngle(p1, p2, p3) {
    const v1 = { x: p1.x - p2.x, y: p1.y - p2.y };
    const v2 = { x: p3.x - p2.x, y: p3.y - p2.y };

    const dot = v1.x * v2.x + v1.y * v2.y;
    const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
    const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);

    if (mag1 === 0 || mag2 === 0) return 0;

    return Math.acos(Math.max(-1, Math.min(1, dot / (mag1 * mag2))));
  }

  /**
   * Extract 88 features from landmarks
   * Features: 21 coords (x,y,z) = 63 + 15 distances + 10 angles = 88
   * EXACT IMPLEMENTATION from working gesture-tester.html
   */
  extractHandFeatures(landmarks) {
    // Extract comprehensive features from hand landmarks
    const features = [];

    // 1. Raw coordinates (normalized) - 21 landmarks × 3 = 63 features
    landmarks.forEach(landmark => {
      features.push(landmark.x, landmark.y, landmark.z);
    });

    // 2. Distances between key points - 15 features
    const keyPoints = [0, 4, 8, 12, 16, 20]; // Wrist, fingertips
    for (let i = 0; i < keyPoints.length; i++) {
      for (let j = i + 1; j < keyPoints.length; j++) {
        const p1 = landmarks[keyPoints[i]];
        const p2 = landmarks[keyPoints[j]];
        const distance = Math.sqrt(
          Math.pow(p1.x - p2.x, 2) +
          Math.pow(p1.y - p2.y, 2) +
          Math.pow(p1.z - p2.z, 2)
        );
        features.push(distance);
      }
    }

    // 3. Angles between finger segments - 10 features
    const fingerChains = [
      [1, 2, 3, 4],     // Thumb
      [5, 6, 7, 8],     // Index
      [9, 10, 11, 12],  // Middle
      [13, 14, 15, 16], // Ring
      [17, 18, 19, 20]  // Pinky
    ];

    fingerChains.forEach(chain => {
      for (let i = 0; i < chain.length - 2; i++) {
        const p1 = landmarks[chain[i]];
        const p2 = landmarks[chain[i + 1]];
        const p3 = landmarks[chain[i + 2]];

        const angle = this.calculateAngle(p1, p2, p3);
        features.push(angle);
      }
    });

    return features;
  }

  /**
   * Extract features from landmarks and predict gesture
   * Uses model's predict wrapper function
   */
  async predictGesture(landmarks, hand) {
    if (!this.leftHandModel && !this.rightHandModel) return;

    try {
      console.log(`👁️ Processing ${hand} hand...`);

      // Extract features (same as training) - 88 features
      const features = this.extractHandFeatures(landmarks);

      console.log(`✅ Extracted ${features.length} features`);

      // Get appropriate model for this hand
      const model = hand === 'left' ? this.leftHandModel : this.rightHandModel;

      if (!model || !model.predict) {
        console.warn(`⚠️ No model loaded for ${hand} hand`);
        return;
      }

      // Use the model's predict wrapper function
      const result = await model.predict(features);

      if (result && result.gesture) {
        const state = this.handStates[hand];

        // Store previous gesture before updating
        state.previousGesture = state.gesture;
        state.gesture = result.gesture;
        state.confidence = result.confidence;

        // Log prediction
        console.log(`🔮 Predicted gesture: ${result.gesture} (confidence: ${(result.confidence * 100).toFixed(1)}%)`);

        if (this.onGestureEvent && state.gesture !== state.previousGesture) {
          this.onGestureEvent({
            hand,
            gesture: result.gesture,
            confidence: result.confidence,
            timestamp_ms: Date.now()
          });
        }

        // Trigger game actions based on gesture
        this.handleGesture(hand, result.gesture, result.confidence);
      }
    } catch (error) {
      console.error(`❌ ${hand} hand prediction error:`, error);
    }
  }

  /**
   * Handle gesture and trigger game actions
   */
  handleGesture(hand, gesture, confidence) {
    if (this.isPaused || confidence < 0.7) return; // Confidence threshold

    const currentTime = Date.now();
    const state = this.handStates[hand];
    const previousGesture = state.previousGesture;

    // Track consecutive "open" detections
    const isOpenGesture = gesture.includes('open');
    const isCloseOrIndex = gesture.includes('close') || gesture.includes('index');

    if (isOpenGesture) {
      state.openCount++;
    } else if (isCloseOrIndex) {
      // Reset counter when hand closes or points
      state.openCount = 0;
    }

    // Detect gesture TRANSITIONS for lane shifting
    // Lane shift triggers when:
    // 1. First time seeing "open" (openCount === 1)
    // 2. Previous gesture was not "open"
    const justOpenedHand = isOpenGesture && state.openCount === 1;

    // Debug logging (only occasionally)
    if (Math.random() < 0.05) {
      console.log(`🔍 ${hand} DEBUG: gesture="${gesture}", openCount=${state.openCount}, justOpened=${justOpenedHand}`);
    }

    // Map gestures to actions
    // LEFT HAND: transition to "left hand open" = lane shift LEFT
    // LEFT HAND: "left hand index" held = continuous brake
    // RIGHT HAND: transition to "right hand open" = lane shift RIGHT
    // RIGHT HAND: "right hand index" held = continuous accelerate

    if (hand === 'left') {
      // LANE SHIFT: Only on transition to open hand
      if (justOpenedHand && this.onLaneShiftLeft) {
        console.log(`👈 LEFT LANE SHIFT (openCount: ${state.openCount}, confidence: ${(confidence * 100).toFixed(1)}%)`);
        state.lastActionTime = currentTime;
        this.onLaneShiftLeft({ hand, gesture, confidence });
      }
      // BRAKE: Continuous while index finger is pointing
      else if (gesture === 'left hand index' && this.onDecelerate) {
        // Only log occasionally to avoid spam
        if (Math.random() < 0.02) {
          console.log(`🛑 BRAKE (confidence: ${(confidence * 100).toFixed(1)}%)`);
        }
        this.onDecelerate();
      }
    } else if (hand === 'right') {
      // LANE SHIFT: Only on transition to open hand
      if (justOpenedHand && this.onLaneShiftRight) {
        console.log(`👉 RIGHT LANE SHIFT (openCount: ${state.openCount}, confidence: ${(confidence * 100).toFixed(1)}%)`);
        state.lastActionTime = currentTime;
        this.onLaneShiftRight({ hand, gesture, confidence });
      }
      // ACCELERATE: Continuous while index finger is pointing
      else if (gesture === 'right hand index' && this.onAccelerate) {
        // Only log occasionally to avoid spam
        if (Math.random() < 0.02) {
          console.log(`⚡ ACCELERATE (confidence: ${(confidence * 100).toFixed(1)}%)`);
        }
        this.onAccelerate();
      }
    }
  }

  /**
   * Check if all hands have been lost for too long
   */
  checkHandLoss() {
    // DISABLED: Auto-pause is too aggressive and interrupts gameplay
    // Users can manually pause with Space key if needed
    return;

    const currentTime = Date.now();

    // Check if ANY hand is still detected or recently detected
    const leftDetected = this.handStates.left.detected ||
                        (currentTime - this.handStates.left.lastDetectionTime <= this.HAND_LOST_TIMEOUT);
    const rightDetected = this.handStates.right.detected ||
                         (currentTime - this.handStates.right.lastDetectionTime <= this.HAND_LOST_TIMEOUT);

    // Only pause game if BOTH hands are lost
    if (!leftDetected && !rightDetected) {
      if (this.onHandsLost && !this.wasAutoPaused) {
        console.log('⚠️ All hands lost - notifying game');
        this.wasAutoPaused = true;
        this.onHandsLost();
      }
    }
  }

  /**
   * Update hand status display
   */
  updateHandStatus(text, className) {
    const statusDiv = document.getElementById('handStatus');
    if (statusDiv) {
      statusDiv.textContent = text;
      statusDiv.className = `status ${className}`;
    }
  }

  /**
   * Draw hand landmarks and connections on canvas
   */
  drawHandLandmarks(landmarks, handLabel) {
    const ctx = this.canvasCtx;
    const width = this.canvasElement.width;
    const height = this.canvasElement.height;

    // Hand connections (MediaPipe hand model)
    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 4],           // Thumb
      [0, 5], [5, 6], [6, 7], [7, 8],           // Index
      [0, 9], [9, 10], [10, 11], [11, 12],      // Middle
      [0, 13], [13, 14], [14, 15], [15, 16],    // Ring
      [0, 17], [17, 18], [18, 19], [19, 20],    // Pinky
      [5, 9], [9, 13], [13, 17]                 // Palm
    ];

    // Color based on hand
    const color = handLabel === 'left' ? '#00FF00' : '#FF0000';

    // Draw connections
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    connections.forEach(([start, end]) => {
      const startPoint = landmarks[start];
      const endPoint = landmarks[end];
      if (startPoint && endPoint) {
        ctx.beginPath();
        ctx.moveTo(startPoint.x * width, startPoint.y * height);
        ctx.lineTo(endPoint.x * width, endPoint.y * height);
        ctx.stroke();
      }
    });

    // Draw landmarks
    ctx.fillStyle = color;
    landmarks.forEach((landmark, idx) => {
      if (landmark) {
        const x = landmark.x * width;
        const y = landmark.y * height;
        ctx.beginPath();
        ctx.arc(x, y, idx === 0 ? 8 : 4, 0, 2 * Math.PI);
        ctx.fill();
      }
    });
  }

  /**
   * Draw gesture label and action on canvas
   */
  drawGestureLabel(landmarks, handLabel) {
    const ctx = this.canvasCtx;
    const width = this.canvasElement.width;
    const height = this.canvasElement.height;
    const state = this.handStates[handLabel];

    if (!state.gesture || !landmarks[0]) return;

    // Position label near wrist
    const wrist = landmarks[0];
    const x = wrist.x * width;
    const y = wrist.y * height - 40;

    // Determine action
    let action = '';
    let actionColor = '#FFFFFF';

    if (state.gesture.includes('open')) {
      action = handLabel === 'left' ? '← SHIFT LEFT' : 'SHIFT RIGHT →';
      actionColor = '#FFD700'; // Gold
    } else if (state.gesture.includes('index')) {
      action = handLabel === 'left' ? '🛑 BRAKE' : '⚡ ACCELERATE';
      actionColor = handLabel === 'left' ? '#FF4444' : '#44FF44';
    } else if (state.gesture.includes('close')) {
      action = '✋ IDLE';
      actionColor = '#888888';
    }

    // Save context state
    ctx.save();

    // Flip horizontally for text to appear correctly in mirrored video
    ctx.scale(-1, 1);

    // Adjust x position for flipped coordinate system
    const flippedX = -x;

    // Draw background (rectangle needs to be flipped too)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(flippedX - 80, y - 25, 160, 50);

    // Draw gesture name
    ctx.fillStyle = handLabel === 'left' ? '#00FF00' : '#FF0000';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(state.gesture.toUpperCase(), flippedX, y - 5);

    // Draw action
    ctx.fillStyle = actionColor;
    ctx.font = 'bold 14px Arial';
    ctx.fillText(action, flippedX, y + 15);

    // Draw confidence
    ctx.fillStyle = '#CCCCCC';
    ctx.font = '10px Arial';
    ctx.fillText(`${(state.confidence * 100).toFixed(0)}%`, flippedX, y + 28);

    // Restore context state
    ctx.restore();
  }

  /**
   * Show webcam overlay
   */
  showWebcam() {
    const webcamContainer = document.getElementById('webcamContainer');
    if (webcamContainer) {
      webcamContainer.style.display = 'block';
      console.log('📹 Webcam overlay shown');
    } else {
      console.warn('⚠️ Webcam container not found');
    }
  }

  /**
   * Hide webcam overlay
   */
  hideWebcam() {
    const webcamContainer = document.getElementById('webcamContainer');
    if (webcamContainer) {
      webcamContainer.style.display = 'none';
      console.log('📹 Webcam overlay hidden');
    }
  }

  /**
   * Stop gesture detection (for cleanup)
   */
  stop() {
    this.cleanup();
    this.hideWebcam();
  }

  /**
   * Pause gesture detection
   */
  pause() {
    this.isPaused = true;
  }

  /**
   * Resume gesture detection
   */
  resume() {
    this.isPaused = false;
  }

  /**
   * Cleanup resources
   */
  cleanup() {
    if (this.camera) {
      this.camera.stop();
    }
    if (this.hands) {
      this.hands.close();
    }
    if (this.videoElement && this.videoElement.srcObject) {
      const tracks = this.videoElement.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }

    // Dispose TensorFlow models
    if (this.leftHandModel && this.leftHandModel.tfModel) {
      this.leftHandModel.tfModel.dispose();
    }
    if (this.rightHandModel && this.rightHandModel.tfModel) {
      this.rightHandModel.tfModel.dispose();
    }

    console.log('🧹 Custom model gesture controller cleaned up');
  }
}
