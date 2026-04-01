/**
 * AnalyticsCollector.js
 * Comprehensive analytics tracking for Sonic Drive
 * Tracks metrics for Blind, ADHD, and Stroke rehabilitation use cases
 *
 * Created: 2026-03-30
 */

export class AnalyticsCollector {
  constructor(userRoles = []) {
    // User configuration
    this.userRoles = userRoles; // ['blind', 'adhd'] or ['blind'] or ['adhd']
    this.userId = this.getOrCreateUserId();

    // Session metadata
    this.sessionId = this.generateUUID();
    this.sessionStartTime = performance.now();
    this.sessionStartTimestamp = new Date().toISOString();
    this.sessionEndTime = null;
    this.difficultyLevel = 3;
    this.controlMethod = 'gesture'; // 'gesture' or 'keyboard'

    // Game performance metrics
    this.finalScore = 0;
    this.distanceTraveled = 0;
    this.collisions = 0;
    this.nearMisses = 0;
    this.successfulDodges = 0;

    // Event tracking
    this.events = []; // Raw event log
    this.reactionTimes = []; // Array of reaction times in milliseconds

    // Blind-specific metrics
    this.blindMetrics = {
      soundLocalizationAttempts: 0,
      soundLocalizationCorrect: 0,
      leftLaneCorrectResponses: 0,
      rightLaneCorrectResponses: 0,
      centerLaneCorrectResponses: 0,
      totalLaneChanges: 0,
      collisionAvoidances: 0
    };

    // ADHD-specific metrics
    this.adhdMetrics = {
      attentionSpans: [], // Array of continuous attention periods
      currentAttentionStart: performance.now(),
      prematureResponses: 0, // Acting before stimulus complete
      totalActions: 0,
      impulsiveErrors: 0, // Mistakes from rushing
      focusBreaks: 0 // Times attention was lost
    };

    // Gesture tracking
    this.gestureMetrics = {
      totalDetected: 0,
      leftCount: 0,
      rightCount: 0,
      accurateCount: 0,
      latencies: [],
      recognitionFailures: 0
    };

    // Distance-based tracking for sound localization
    this.lastCarSpawnTime = null;
    this.lastHornStartTime = null;
    this.awaitingResponse = false;
    this.expectedLane = null; // Which lane car is in
    this.responseLane = null; // Which lane player moved to

    console.log(`📊 AnalyticsCollector initialized for user: ${this.userId}`, {
      roles: this.userRoles,
      sessionId: this.sessionId
    });
  }

  // ============================================================================
  // USER ID MANAGEMENT
  // ============================================================================

  getOrCreateUserId() {
    let userId = localStorage.getItem('sonic_drive_user_id');
    if (!userId) {
      userId = this.generateUUID();
      localStorage.setItem('sonic_drive_user_id', userId);
      console.log(`✅ Created new user ID: ${userId}`);
    }
    return userId;
  }

  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // ============================================================================
  // EVENT LOGGING
  // ============================================================================

  logEvent(eventType, eventData = {}) {
    const timestamp = performance.now() - this.sessionStartTime;

    const event = {
      timestamp_ms: Math.round(timestamp),
      event_type: eventType,
      event_data: eventData
    };

    this.events.push(event);

    // Log to console for debugging
    if (this.shouldLogEvent(eventType)) {
      console.log(`📊 [${eventType}]`, eventData);
    }
  }

  shouldLogEvent(eventType) {
    // Only log important events to avoid console spam
    const importantEvents = [
      'session_start', 'session_end', 'collision', 'near_miss',
      'car_spawn', 'level_complete', 'gesture_detected'
    ];
    return importantEvents.includes(eventType);
  }

  // ============================================================================
  // GAME EVENT HANDLERS
  // ============================================================================

  onSessionStart(difficulty, controlMethod) {
    this.difficultyLevel = difficulty;
    this.controlMethod = controlMethod;

    this.logEvent('session_start', {
      difficulty,
      controlMethod,
      roles: this.userRoles
    });
  }

  onCarSpawn(carPosition, carLane) {
    this.lastCarSpawnTime = performance.now();
    this.awaitingResponse = true;
    this.expectedLane = carLane;

    this.logEvent('car_spawn', {
      car_x: carPosition.x,
      car_y: carPosition.y,
      car_lane: carLane
    });

    // For blind users - start tracking sound localization
    if (this.userRoles.includes('blind')) {
      this.blindMetrics.soundLocalizationAttempts++;
    }
  }

  onHornStart(carPosition, carLane, hornVolume, hornPan) {
    this.lastHornStartTime = performance.now();

    this.logEvent('horn_start', {
      car_x: carPosition.x,
      car_y: carPosition.y,
      car_lane: carLane,
      horn_volume: hornVolume,
      horn_pan: hornPan
    });

    // Reaction time starts when horn is first audible
    if (this.userRoles.includes('blind')) {
      this.lastStimulusTime = performance.now();
    }
  }

  onHornStop(carPosition) {
    this.logEvent('horn_stop', {
      car_x: carPosition.x,
      car_y: carPosition.y
    });
  }

  onLaneChange(fromLane, toLane, playerPosition, carPositions = []) {
    const reactionTime = this.lastHornStartTime ?
      performance.now() - this.lastHornStartTime : null;

    if (reactionTime !== null && reactionTime < 5000) { // Valid RT < 5 seconds
      this.reactionTimes.push(reactionTime);
    }

    this.logEvent('lane_change', {
      from_lane: fromLane,
      to_lane: toLane,
      player_x: playerPosition.x,
      player_y: playerPosition.y,
      reaction_time_ms: reactionTime,
      cars_present: carPositions.length
    });

    // Track for blind users - did they move to correct lane?
    if (this.userRoles.includes('blind') && this.awaitingResponse) {
      this.responseLane = toLane;
      this.blindMetrics.totalLaneChanges++;

      // Check if response was appropriate (moved away from car)
      if (this.expectedLane !== null && toLane !== this.expectedLane) {
        this.blindMetrics.soundLocalizationCorrect++;

        // Track per-lane accuracy
        if (this.expectedLane === 0) this.blindMetrics.leftLaneCorrectResponses++;
        else if (this.expectedLane === 1) this.blindMetrics.centerLaneCorrectResponses++;
        else if (this.expectedLane === 2) this.blindMetrics.rightLaneCorrectResponses++;
      }

      this.awaitingResponse = false;
    }

    // Track for ADHD users - action count
    if (this.userRoles.includes('adhd')) {
      this.adhdMetrics.totalActions++;

      // Check for premature response (too fast = impulsive)
      if (reactionTime !== null && reactionTime < 150) {
        this.adhdMetrics.prematureResponses++;
      }
    }
  }

  onCollision(playerPosition, carPosition) {
    this.collisions++;

    this.logEvent('collision', {
      player_x: playerPosition.x,
      player_y: playerPosition.y,
      car_x: carPosition.x,
      car_y: carPosition.y
    });

    // Track as error for ADHD
    if (this.userRoles.includes('adhd')) {
      this.adhdMetrics.impulsiveErrors++;
      this.adhdMetrics.focusBreaks++;

      // Attention span ended
      this.endAttentionSpan();
    }
  }

  onNearMiss(playerPosition, carPosition, distance) {
    this.nearMisses++;

    this.logEvent('near_miss', {
      player_x: playerPosition.x,
      player_y: playerPosition.y,
      car_x: carPosition.x,
      car_y: carPosition.y,
      distance: distance
    });

    // Track for blind users - successful avoidance
    if (this.userRoles.includes('blind')) {
      this.blindMetrics.collisionAvoidances++;
    }
  }

  onSuccessfulDodge(carPosition) {
    this.successfulDodges++;

    this.logEvent('successful_dodge', {
      car_x: carPosition.x,
      car_y: carPosition.y
    });
  }

  onScoreUpdate(newScore, distance) {
    this.finalScore = newScore;
    this.distanceTraveled = distance;
  }

  onGestureDetected(gestureType, confidence, landmarks, latency) {
    this.gestureMetrics.totalDetected++;

    if (gestureType === 'left') this.gestureMetrics.leftCount++;
    else if (gestureType === 'right') this.gestureMetrics.rightCount++;

    if (confidence > 0.7) {
      this.gestureMetrics.accurateCount++;
    }

    if (latency !== null) {
      this.gestureMetrics.latencies.push(latency);
    }

    this.logEvent('gesture_detected', {
      gesture_type: gestureType,
      confidence: confidence,
      latency_ms: latency,
      hand_landmarks: landmarks // 21-point data
    });

    // Track action for ADHD
    if (this.userRoles.includes('adhd')) {
      this.adhdMetrics.totalActions++;
    }
  }

  onGestureRecognitionFailure() {
    this.gestureMetrics.recognitionFailures++;
  }

  // ============================================================================
  // ADHD-SPECIFIC: ATTENTION TRACKING
  // ============================================================================

  endAttentionSpan() {
    const duration = performance.now() - this.adhdMetrics.currentAttentionStart;
    this.adhdMetrics.attentionSpans.push(duration);
    this.adhdMetrics.currentAttentionStart = performance.now();
  }

  // ============================================================================
  // SESSION END & METRICS CALCULATION
  // ============================================================================

  async endSession() {
    this.sessionEndTime = performance.now();
    const durationSeconds = Math.round((this.sessionEndTime - this.sessionStartTime) / 1000);

    // Finalize ADHD attention tracking
    if (this.userRoles.includes('adhd')) {
      this.endAttentionSpan();
    }

    this.logEvent('session_end', {
      duration_seconds: durationSeconds,
      final_score: this.finalScore,
      distance_traveled: this.distanceTraveled
    });

    // Calculate all metrics
    const sessionData = this.calculateMetrics(durationSeconds);

    console.log('📊 Session Analytics:', sessionData);

    return sessionData;
  }

  calculateMetrics(durationSeconds) {
    // Calculate reaction time statistics
    const rtStats = this.calculateReactionTimeStats();

    // Calculate blind-specific metrics
    const blindMetrics = this.userRoles.includes('blind') ?
      this.calculateBlindMetrics() : null;

    // Calculate ADHD-specific metrics
    const adhdMetrics = this.userRoles.includes('adhd') ?
      this.calculateADHDMetrics() : null;

    // Calculate gesture metrics
    const gestureMetrics = this.controlMethod === 'gesture' ?
      this.calculateGestureMetrics() : null;

    return {
      // Session metadata
      session_id: this.sessionId,
      user_id: this.userId,
      started_at: this.sessionStartTimestamp,
      ended_at: new Date().toISOString(),
      duration_seconds: durationSeconds,
      difficulty_level: this.difficultyLevel,
      control_method: this.controlMethod,

      // Game performance
      final_score: this.finalScore,
      distance_traveled: this.distanceTraveled,
      collisions: this.collisions,
      near_misses: this.nearMisses,
      successful_dodges: this.successfulDodges,

      // Reaction time stats
      ...rtStats,

      // Role-specific metrics
      ...blindMetrics,
      ...adhdMetrics,
      ...gestureMetrics,

      // Raw events (for detailed analysis)
      events: this.events,

      // Browser/device info
      browser_info: navigator.userAgent,
      device_info: this.getDeviceInfo()
    };
  }

  calculateReactionTimeStats() {
    if (this.reactionTimes.length === 0) {
      return {
        mean_reaction_time_ms: null,
        median_reaction_time_ms: null,
        reaction_time_sd_ms: null,
        min_reaction_time_ms: null,
        max_reaction_time_ms: null
      };
    }

    const sorted = [...this.reactionTimes].sort((a, b) => a - b);
    const mean = this.reactionTimes.reduce((a, b) => a + b, 0) / this.reactionTimes.length;
    const median = sorted[Math.floor(sorted.length / 2)];
    const variance = this.reactionTimes.reduce((sum, rt) => sum + Math.pow(rt - mean, 2), 0) / this.reactionTimes.length;
    const sd = Math.sqrt(variance);

    return {
      mean_reaction_time_ms: Math.round(mean),
      median_reaction_time_ms: Math.round(median),
      reaction_time_sd_ms: Math.round(sd),
      min_reaction_time_ms: Math.round(sorted[0]),
      max_reaction_time_ms: Math.round(sorted[sorted.length - 1])
    };
  }

  calculateBlindMetrics() {
    const totalAttempts = this.blindMetrics.soundLocalizationAttempts;
    const localizationAccuracy = totalAttempts > 0 ?
      (this.blindMetrics.soundLocalizationCorrect / totalAttempts) * 100 : 0;

    const navigationEfficiency = this.distanceTraveled > 0 ?
      (this.successfulDodges / (this.collisions + this.successfulDodges + 0.001)) * 100 : 0;

    const collisionAvoidanceRate = (this.successfulDodges + this.nearMisses) > 0 ?
      ((this.successfulDodges + this.nearMisses) / (this.collisions + this.successfulDodges + this.nearMisses + 0.001)) * 100 : 0;

    const stereoAwarenessScore = totalAttempts > 0 ?
      ((this.blindMetrics.leftLaneCorrectResponses +
        this.blindMetrics.centerLaneCorrectResponses +
        this.blindMetrics.rightLaneCorrectResponses) / totalAttempts) * 100 : 0;

    return {
      blind_sound_localization_accuracy: Math.round(localizationAccuracy * 10) / 10,
      blind_navigation_efficiency: Math.round(navigationEfficiency * 10) / 10,
      blind_collision_avoidance_rate: Math.round(collisionAvoidanceRate * 10) / 10,
      blind_stereo_awareness_score: Math.round(stereoAwarenessScore * 10) / 10
    };
  }

  calculateADHDMetrics() {
    // Sustained attention duration - mean of attention spans
    const meanAttentionDuration = this.adhdMetrics.attentionSpans.length > 0 ?
      this.adhdMetrics.attentionSpans.reduce((a, b) => a + b, 0) / this.adhdMetrics.attentionSpans.length / 1000 : 0;

    // Impulsivity index (0-100, lower is better)
    const impulsivityIndex = this.adhdMetrics.totalActions > 0 ?
      (this.adhdMetrics.prematureResponses / this.adhdMetrics.totalActions) * 100 : 0;

    // Attention consistency (0-100, higher is better) - inverse of RT variability
    const rtSD = this.calculateReactionTimeStats().reaction_time_sd_ms || 0;
    const rtMean = this.calculateReactionTimeStats().mean_reaction_time_ms || 1;
    const coefficient_of_variation = rtSD / rtMean;
    const consistencyScore = Math.max(0, 100 - (coefficient_of_variation * 100));

    // Premature response rate
    const prematureRate = this.adhdMetrics.totalActions > 0 ?
      (this.adhdMetrics.prematureResponses / this.adhdMetrics.totalActions) * 100 : 0;

    // Task completion quality (composite of accuracy and speed)
    const accuracyScore = this.collisions > 0 ?
      (this.successfulDodges / (this.collisions + this.successfulDodges)) * 100 : 100;
    const speedScore = this.finalScore / 10; // Normalize score
    const qualityScore = (accuracyScore * 0.7 + speedScore * 0.3); // Weighted

    return {
      adhd_sustained_attention_duration_sec: Math.round(meanAttentionDuration * 10) / 10,
      adhd_impulsivity_index: Math.round(impulsivityIndex * 10) / 10,
      adhd_attention_consistency: Math.round(consistencyScore * 10) / 10,
      adhd_premature_response_rate: Math.round(prematureRate * 10) / 10,
      adhd_task_completion_quality: Math.round(qualityScore * 10) / 10
    };
  }

  calculateGestureMetrics() {
    const accuracy = this.gestureMetrics.totalDetected > 0 ?
      (this.gestureMetrics.accurateCount / this.gestureMetrics.totalDetected) * 100 : 0;

    const meanLatency = this.gestureMetrics.latencies.length > 0 ?
      this.gestureMetrics.latencies.reduce((a, b) => a + b, 0) / this.gestureMetrics.latencies.length : 0;

    return {
      gesture_accuracy_rate: Math.round(accuracy * 10) / 10,
      gesture_recognition_latency_ms: Math.round(meanLatency),
      total_gestures_detected: this.gestureMetrics.totalDetected,
      left_gesture_count: this.gestureMetrics.leftCount,
      right_gesture_count: this.gestureMetrics.rightCount
    };
  }

  getDeviceInfo() {
    return {
      screen_width: window.screen.width,
      screen_height: window.screen.height,
      pixel_ratio: window.devicePixelRatio,
      platform: navigator.platform
    };
  }

  // ============================================================================
  // SUMMARY FOR DISPLAY
  // ============================================================================

  getSessionSummary() {
    const rtStats = this.calculateReactionTimeStats();

    return {
      score: this.finalScore,
      distance: Math.round(this.distanceTraveled),
      collisions: this.collisions,
      dodges: this.successfulDodges,
      avgReactionTime: rtStats.mean_reaction_time_ms,
      consistency: rtStats.reaction_time_sd_ms
    };
  }
}
