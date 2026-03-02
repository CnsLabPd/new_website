// ==========================================
// AUDIO ENGINE MODULE
// ==========================================

export class AudioEngine {
  constructor() {
    this.audioCtx = null;
    this.engineNodes = {};
    this.windNodes = {};
    this.warningNodes = {
      beepOsc: null,
      beepGain: null,
      beepPanner: null,
      vehicleOsc: null,
      vehicleGain: null,
      vehiclePanner: null,
      vehicleFilter: null
    };

    // Engine parameters
    this.currentRPM = 1200;
    this.targetRPM = 1200;
    this.MIN_RPM = 1200;
    this.MAX_RPM = 8500;
    this.IDLE_RPM = 1200;
    this.cylinders = 8;

    // Gear shift parameters
    this.gear = 1;
    this.GEAR_RATIOS = [180, 135, 105, 82, 68, 56];
    this.GEAR_SPEED_MAX = [22, 38, 56, 76, 98, 120];
    this.GEAR_SPEED_MIN = [0, 14, 28, 44, 62, 82];
    this.shiftCooldown = 0;
    this.throttle = 0;
    this.engineLoad = 0;

    // Proximity warning state
    this.lastWarningUpdate = 0;
  }

  init() {
    if (this.audioCtx) return;

    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = new AudioContextCtor();

    const noiseBuffer = this.createNoiseBuffer();
    this.setupEngineNodes(noiseBuffer);
    this.setupWindNodes(noiseBuffer);

    // Fade in engine
    this.engineNodes.masterGain.gain.setTargetAtTime(0.55, this.audioCtx.currentTime, 0.5);
  }

  createNoiseBuffer() {
    const bufferSize = this.audioCtx.sampleRate * 2;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  setupEngineNodes(noiseBuffer) {
    const ctx = this.audioCtx;
    const nodes = this.engineNodes;

    // Master gain with stereo panner
    nodes.masterGain = ctx.createGain();
    nodes.masterGain.gain.value = 0.0;

    nodes.panner = ctx.createStereoPanner();
    nodes.panner.pan.value = 0;

    nodes.compressor = ctx.createDynamicsCompressor();
    nodes.compressor.threshold.value = -24;
    nodes.compressor.knee.value = 16;
    nodes.compressor.ratio.value = 6;
    nodes.compressor.attack.value = 0.002;
    nodes.compressor.release.value = 0.2;

    // Fundamental frequency
    nodes.fundamental = ctx.createOscillator();
    nodes.fundamental.type = "sawtooth";
    nodes.fundamentalGain = ctx.createGain();
    nodes.fundamentalGain.gain.value = 0.45;
    nodes.fundamental.connect(nodes.fundamentalGain);

    // 2nd harmonic
    nodes.harmonic2 = ctx.createOscillator();
    nodes.harmonic2.type = "triangle";
    nodes.harmonic2Gain = ctx.createGain();
    nodes.harmonic2Gain.gain.value = 0.28;
    nodes.harmonic2.connect(nodes.harmonic2Gain);

    // 3rd harmonic
    nodes.harmonic3 = ctx.createOscillator();
    nodes.harmonic3.type = "sine";
    nodes.harmonic3Gain = ctx.createGain();
    nodes.harmonic3Gain.gain.value = 0.18;
    nodes.harmonic3.connect(nodes.harmonic3Gain);

    // 4th harmonic
    nodes.harmonic4 = ctx.createOscillator();
    nodes.harmonic4.type = "square";
    nodes.harmonic4Gain = ctx.createGain();
    nodes.harmonic4Gain.gain.value = 0.12;
    nodes.harmonic4.connect(nodes.harmonic4Gain);

    // Combustion noise
    nodes.combustionNoise = ctx.createBufferSource();
    nodes.combustionNoise.buffer = noiseBuffer;
    nodes.combustionNoise.loop = true;
    nodes.combustionFilter = ctx.createBiquadFilter();
    nodes.combustionFilter.type = "highpass";
    nodes.combustionFilter.frequency.value = 800;
    nodes.combustionFilter.Q.value = 0.5;
    nodes.combustionGain = ctx.createGain();
    nodes.combustionGain.gain.value = 0.15;
    nodes.combustionNoise.connect(nodes.combustionFilter);
    nodes.combustionFilter.connect(nodes.combustionGain);

    // Intake noise
    nodes.intakeNoise = ctx.createBufferSource();
    nodes.intakeNoise.buffer = noiseBuffer;
    nodes.intakeNoise.loop = true;
    nodes.intakeFilter = ctx.createBiquadFilter();
    nodes.intakeFilter.type = "bandpass";
    nodes.intakeFilter.frequency.value = 2200;
    nodes.intakeFilter.Q.value = 2.5;
    nodes.intakeGain = ctx.createGain();
    nodes.intakeGain.gain.value = 0.08;
    nodes.intakeNoise.connect(nodes.intakeFilter);
    nodes.intakeFilter.connect(nodes.intakeGain);

    // Formant filter
    nodes.formantFilter = ctx.createBiquadFilter();
    nodes.formantFilter.type = "peaking";
    nodes.formantFilter.frequency.value = 480;
    nodes.formantFilter.Q.value = 4.5;
    nodes.formantFilter.gain.value = 18;

    // Exhaust lowpass
    nodes.exhaustFilter = ctx.createBiquadFilter();
    nodes.exhaustFilter.type = "lowpass";
    nodes.exhaustFilter.frequency.value = 2400;
    nodes.exhaustFilter.Q.value = 0.7;

    // Connect routing
    nodes.fundamentalGain.connect(nodes.formantFilter);
    nodes.harmonic2Gain.connect(nodes.formantFilter);
    nodes.harmonic3Gain.connect(nodes.formantFilter);
    nodes.harmonic4Gain.connect(nodes.formantFilter);
    nodes.combustionGain.connect(nodes.formantFilter);
    nodes.intakeGain.connect(nodes.formantFilter);

    nodes.formantFilter.connect(nodes.exhaustFilter);
    nodes.exhaustFilter.connect(nodes.panner);
    nodes.panner.connect(nodes.masterGain);
    nodes.masterGain.connect(nodes.compressor);
    nodes.compressor.connect(ctx.destination);

    // Start oscillators
    nodes.fundamental.start();
    nodes.harmonic2.start();
    nodes.harmonic3.start();
    nodes.harmonic4.start();
    nodes.combustionNoise.start();
    nodes.intakeNoise.start();
  }

  setupWindNodes(noiseBuffer) {
    const ctx = this.audioCtx;
    const wind = this.windNodes;

    // Left lane wind
    wind.leftNoise = ctx.createBufferSource();
    wind.leftNoise.buffer = noiseBuffer;
    wind.leftNoise.loop = true;
    wind.leftFilter = ctx.createBiquadFilter();
    wind.leftFilter.type = "bandpass";
    wind.leftFilter.frequency.value = 400;
    wind.leftFilter.Q.value = 2;
    wind.leftGain = ctx.createGain();
    wind.leftGain.gain.value = 0;
    wind.leftPanner = ctx.createStereoPanner();
    wind.leftPanner.pan.value = -0.8;
    wind.leftNoise.connect(wind.leftFilter);
    wind.leftFilter.connect(wind.leftGain);
    wind.leftGain.connect(wind.leftPanner);
    wind.leftPanner.connect(ctx.destination);
    wind.leftNoise.start();

    // Right lane wind
    wind.rightNoise = ctx.createBufferSource();
    wind.rightNoise.buffer = noiseBuffer;
    wind.rightNoise.loop = true;
    wind.rightFilter = ctx.createBiquadFilter();
    wind.rightFilter.type = "bandpass";
    wind.rightFilter.frequency.value = 600;
    wind.rightFilter.Q.value = 2;
    wind.rightGain = ctx.createGain();
    wind.rightGain.gain.value = 0;
    wind.rightPanner = ctx.createStereoPanner();
    wind.rightPanner.pan.value = 0.8;
    wind.rightNoise.connect(wind.rightFilter);
    wind.rightFilter.connect(wind.rightGain);
    wind.rightGain.connect(wind.rightPanner);
    wind.rightPanner.connect(ctx.destination);
    wind.rightNoise.start();

    // Setup continuous proximity warning oscillator
    this.setupProximityWarning();
  }

  setupProximityWarning() {
    const ctx = this.audioCtx;
    const warning = this.warningNodes;

    console.log('🔊 Setting up proximity warning system...');

    // ========================================
    // INCOMING VEHICLE ENGINE SOUND
    // ========================================
    // Create a lower-pitched engine sound for incoming vehicles
    warning.vehicleOsc = ctx.createOscillator();
    warning.vehicleOsc.type = "sawtooth"; // Aggressive engine-like sound
    warning.vehicleOsc.frequency.value = 150; // Low rumble

    warning.vehicleFilter = ctx.createBiquadFilter();
    warning.vehicleFilter.type = "lowpass";
    warning.vehicleFilter.frequency.value = 800;
    warning.vehicleFilter.Q.value = 2;

    warning.vehicleGain = ctx.createGain();
    warning.vehicleGain.gain.value = 0; // Start silent

    warning.vehiclePanner = ctx.createStereoPanner();
    warning.vehiclePanner.pan.value = 0;

    warning.vehicleOsc.connect(warning.vehicleFilter);
    warning.vehicleFilter.connect(warning.vehicleGain);
    warning.vehicleGain.connect(warning.vehiclePanner);
    warning.vehiclePanner.connect(ctx.destination);

    warning.vehicleOsc.start();
    console.log('✅ Vehicle engine sound initialized');

    // ========================================
    // BEEPING ALARM SOUND
    // ========================================
    warning.beepOsc = ctx.createOscillator();
    warning.beepOsc.type = "sine";
    warning.beepOsc.frequency.value = 800;

    warning.beepGain = ctx.createGain();
    warning.beepGain.gain.value = 0; // Start silent

    warning.beepPanner = ctx.createStereoPanner();
    warning.beepPanner.pan.value = 0;

    warning.beepOsc.connect(warning.beepGain);
    warning.beepGain.connect(warning.beepPanner);
    warning.beepPanner.connect(ctx.destination);

    warning.beepOsc.start();
    console.log('✅ Beeping alarm initialized');
  }

  autoShift(speed) {
    if (this.shiftCooldown > 0) return;

    const gearIndex = Math.max(0, this.gear - 1);
    const canUpshift = this.gear < this.GEAR_RATIOS.length;
    const canDownshift = this.gear > 1;

    // Upshift when exceeding gear max speed and throttle is applied
    if (canUpshift && speed > this.GEAR_SPEED_MAX[gearIndex] && this.throttle > 0.3) {
      this.shiftUp();
    }
    // Downshift when below gear min speed and low throttle
    else if (canDownshift && speed < this.GEAR_SPEED_MIN[gearIndex] && this.throttle < 0.3) {
      this.shiftDown();
    }
  }

  shiftUp() {
    if (this.gear >= this.GEAR_RATIOS.length) return;

    console.log(`⬆️ SHIFT UP: Gear ${this.gear} → ${this.gear + 1}`);
    this.gear += 1;
    this.shiftCooldown = 0.6; // 600ms cooldown

    // Throttle dip during shift
    this.throttle = Math.min(this.throttle, 0.7);
    this.engineLoad *= 0.5;

    // Temporary RPM dip for shift feel
    this.currentRPM *= 0.85;
  }

  shiftDown() {
    if (this.gear <= 1) return;

    console.log(`⬇️ SHIFT DOWN: Gear ${this.gear} → ${this.gear - 1}`);
    this.gear -= 1;
    this.shiftCooldown = 0.6;

    // Throttle blip during downshift
    this.throttle = Math.min(1, this.throttle + 0.25);
    this.engineLoad *= 1.3;

    // RPM increase for downshift
    this.currentRPM *= 1.15;
  }

  update(speed, currentLane, isAccelerating) {
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const MAX_SPEED = 120;

    // Update throttle with smooth acceleration
    const ACCEL_RATE = 0.05; // Slower buildup for realism
    const COAST_DECAY = 0.02;

    if (isAccelerating) {
      this.throttle = Math.min(this.throttle + ACCEL_RATE, 1);
    } else {
      this.throttle = Math.max(this.throttle - COAST_DECAY, 0);
    }

    // Update shift cooldown
    if (this.shiftCooldown > 0) {
      this.shiftCooldown -= 0.016; // Assumes 60fps
    }

    // Auto shift based on speed
    this.autoShift(speed);

    // Calculate target RPM using gear ratios
    const gearIndex = Math.max(0, this.gear - 1);
    const ratio = this.GEAR_RATIOS[gearIndex];
    const gearBoost = (this.gear - 1) * 180;
    const baseRPM = this.IDLE_RPM + gearBoost;
    let rpmFromSpeed = baseRPM + speed * ratio;

    // Add throttle response (load-based)
    const rpmFromThrottle = this.throttle * 1800 * (1 + this.engineLoad * 0.5);

    this.targetRPM = Math.max(this.MIN_RPM, Math.min(rpmFromSpeed + rpmFromThrottle, this.MAX_RPM));

    // Smooth RPM transition with realistic response
    const diff = this.targetRPM - this.currentRPM;
    const RESPONSE = 0.08; // Smoothing factor
    this.currentRPM += diff * RESPONSE;

    // Calculate engine load
    const rpmRatio = (this.currentRPM - this.IDLE_RPM) / (this.MAX_RPM - this.IDLE_RPM);
    this.engineLoad = this.throttle * (0.3 + 0.7 * rpmRatio);

    // Calculate engine order frequency
    const engineOrderHz = (this.currentRPM * this.cylinders) / 120;

    // Update oscillator frequencies
    this.engineNodes.fundamental.frequency.setTargetAtTime(engineOrderHz, now, 0.04);
    this.engineNodes.harmonic2.frequency.setTargetAtTime(engineOrderHz * 2, now, 0.04);
    this.engineNodes.harmonic3.frequency.setTargetAtTime(engineOrderHz * 3, now, 0.04);
    this.engineNodes.harmonic4.frequency.setTargetAtTime(engineOrderHz * 4, now, 0.04);

    // Adjust harmonic gains
    const rpmFactor = (this.currentRPM - this.MIN_RPM) / (this.MAX_RPM - this.MIN_RPM);
    this.engineNodes.harmonic2Gain.gain.setTargetAtTime(0.28 + rpmFactor * 0.15, now, 0.1);
    this.engineNodes.harmonic4Gain.gain.setTargetAtTime(0.12 + rpmFactor * 0.08, now, 0.1);

    // Combustion noise
    const combustionLevel = 0.1 + this.engineLoad * 0.3 + rpmFactor * 0.2;
    this.engineNodes.combustionGain.gain.setTargetAtTime(combustionLevel, now, 0.15);
    this.engineNodes.combustionFilter.frequency.setTargetAtTime(800 + rpmFactor * 1200, now, 0.12);

    // Intake noise
    const intakeLevel = this.throttle * 0.15 * (1 + rpmFactor * 0.8);
    this.engineNodes.intakeGain.gain.setTargetAtTime(intakeLevel, now, 0.08);
    this.engineNodes.intakeFilter.frequency.setTargetAtTime(1800 + this.throttle * 1500, now, 0.1);

    // Exhaust filter
    const exhaustCutoff = 1200 + rpmFactor * 4000;
    this.engineNodes.exhaustFilter.frequency.setTargetAtTime(exhaustCutoff, now, 0.12);

    // Formant shift
    const formantFreq = 380 + this.engineLoad * 300;
    this.engineNodes.formantFilter.frequency.setTargetAtTime(formantFreq, now, 0.15);

    // Update stereo panning based on lane
    // 2-lane mode: LEFT=-1.0 (full left), RIGHT=1.0 (full right)
    // 3-lane mode: LEFT=-0.7, CENTER=0, RIGHT=0.7
    // 4-lane mode: LANE1=-1.0 (full left), LANE2=-0.5 (half left), LANE3=0.5 (half right), LANE4=1.0 (full right)
    let panValue;
    if (this.numLanes === 2) {
      panValue = currentLane === 0 ? -1.0 : 1.0;
    } else if (this.numLanes === 3) {
      panValue = currentLane === 0 ? -0.7 : currentLane === 1 ? 0 : 0.7;
    } else if (this.numLanes === 4) {
      if (currentLane === 0) panValue = -1.0;       // Lane 1: full left
      else if (currentLane === 1) panValue = -0.5;  // Lane 2: half left
      else if (currentLane === 2) panValue = 0.5;   // Lane 3: half right
      else panValue = 1.0;                          // Lane 4: full right
    } else {
      panValue = 0; // Default: center
    }
    this.engineNodes.panner.pan.setTargetAtTime(panValue, now, 0.1);

    // Update wind sounds based on lane and speed (3 lanes)
    const windIntensity = (speed / MAX_SPEED) * 0.2;
    if (currentLane === 0) {
      // LEFT lane - wind in left ear
      this.windNodes.leftGain.gain.setTargetAtTime(windIntensity, now, 0.2);
      this.windNodes.rightGain.gain.setTargetAtTime(0, now, 0.2);
      this.windNodes.leftFilter.frequency.setTargetAtTime(400 + speed * 2, now, 0.1);
    } else if (currentLane === 1) {
      // CENTER lane - balanced wind in both ears
      this.windNodes.leftGain.gain.setTargetAtTime(windIntensity * 0.5, now, 0.2);
      this.windNodes.rightGain.gain.setTargetAtTime(windIntensity * 0.5, now, 0.2);
      this.windNodes.leftFilter.frequency.setTargetAtTime(500 + speed * 2, now, 0.1);
      this.windNodes.rightFilter.frequency.setTargetAtTime(500 + speed * 2, now, 0.1);
    } else {
      // RIGHT lane - wind in right ear
      this.windNodes.leftGain.gain.setTargetAtTime(0, now, 0.2);
      this.windNodes.rightGain.gain.setTargetAtTime(windIntensity, now, 0.2);
      this.windNodes.rightFilter.frequency.setTargetAtTime(600 + speed * 2, now, 0.1);
    }
  }

  updateProximityWarnings(playerCar, trafficVehicles, currentLane, lanePositions, numLanes = 3) {
    // Store numLanes for use in other methods
    this.numLanes = numLanes;
    if (!this.audioCtx || !this.warningNodes.vehicleOsc) {
      console.warn('⚠️ Audio context or warning nodes not initialized');
      return;
    }

    const now = this.audioCtx.currentTime;
    const warning = this.warningNodes;

    // Use actual lane positions from game (dynamically calculated based on screen size)
    const playerLaneX = lanePositions[currentLane];
    const playerY = playerCar.position.y;

    // Find the closest vehicle in the current lane
    let closestDistance = Infinity;
    let foundVehicleInLane = false;
    let closestVehicle = null;

    const laneNames = ['LEFT', 'CENTER', 'RIGHT'];
    // console.log(`🚗 Checking ${trafficVehicles.length} vehicles | Player lane: ${laneNames[currentLane]} (x=${playerLaneX.toFixed(1)}) | Player Y: ${Math.round(playerY)}`);

    trafficVehicles.forEach((vehicle, idx) => {
      // Distance: NEGATIVE = vehicle is AHEAD (above player), POSITIVE = vehicle is BEHIND (below player)
      const distance = playerY - vehicle.position.y;
      const laneDiff = Math.abs(vehicle.position.x - playerLaneX);

      // console.log(`  Vehicle ${idx}: x=${Math.round(vehicle.position.x)}, y=${Math.round(vehicle.position.y)}, distance=${Math.round(distance)}, laneDiff=${Math.round(laneDiff)}`);

      // Only check vehicles ahead in same lane (distance > 0 means vehicle is above/ahead of player)
      if (distance > 0 && distance < 600 && laneDiff < 50) {
        foundVehicleInLane = true;
        if (distance < closestDistance) {
          closestDistance = distance;
          closestVehicle = vehicle;
        }
      }
    });

    // ========================================
    // SMART WARNING SYSTEM - CHECK ESCAPE ROUTES
    // ========================================
    let hasEscapeRoute = false;

    if (foundVehicleInLane && closestDistance < 350) {
      // Only check escape routes when vehicle is close enough to matter
      // console.log(`⚠️ Vehicle detected at ${Math.round(closestDistance)}px - checking escape routes...`);

      // Calculate urgency to determine how strict to be with blocking detection
      const urgency = Math.max(0, 1 - closestDistance / 350);

      // IMPROVED: Dynamically adjust safety margin based on urgency
      // Far away = larger margin (more cautious)
      // Very close = smaller margin (more lenient, need to warn NOW)
      const dynamicSafetyMargin = 50 + (1 - urgency) * 100; // 50-150px based on urgency

      // console.log(`  Urgency: ${urgency.toFixed(2)}, Safety margin: ${Math.round(dynamicSafetyMargin)}px`);

      // Check all adjacent lanes for blocking vehicles
      for (let lane = 0; lane < numLanes; lane++) {
        if (lane === currentLane) continue; // Skip current lane

        const adjacentLaneX = lanePositions[lane];
        let laneIsBlocked = false;

        // Check if any vehicle in this lane would block the switch
        for (let vehicle of trafficVehicles) {
          const laneDiff = Math.abs(vehicle.position.x - adjacentLaneX);
          const verticalDistance = vehicle.position.y - playerY; // Positive = behind, Negative = ahead
          const verticalDiff = Math.abs(verticalDistance);

          // CRITICAL FIX: Only consider cars as blocking if they are:
          // 1. In the adjacent lane (laneDiff < 50)
          // 2. AHEAD of player or very close behind (within dynamic safety margin)
          // 3. Cars far behind (verticalDistance > 100) don't block!

          const isInLane = laneDiff < 50;
          const isInBlockingZone = verticalDiff < dynamicSafetyMargin;
          const isBehindAndFar = verticalDistance > 80; // Car is >80px behind player = safe

          if (isInLane && isInBlockingZone && !isBehindAndFar) {
            laneIsBlocked = true;
            // const position = verticalDistance < 0 ? 'AHEAD' : 'BEHIND';
            // console.log(`  ❌ ${laneNames[lane]} lane BLOCKED: Car ${position} at y=${Math.round(vehicle.position.y)} (${Math.round(verticalDiff)}px from player)`);
            break;
          }
        }

        if (!laneIsBlocked) {
          hasEscapeRoute = true;
          // console.log(`  ✅ ${laneNames[lane]} lane is CLEAR - safe escape route!`);
        }
      }

      if (!hasEscapeRoute) {
        // console.log(`🚫 NO ESCAPE ROUTE - suppressing warnings until a lane clears`);
      }
    } else if (foundVehicleInLane) {
      // Vehicle is far away (>350px), always allow warnings
      hasEscapeRoute = true;
      // console.log(`✅ Vehicle far away (${Math.round(closestDistance)}px) - warnings allowed`);
    }

    // ========================================
    // PLAY WARNINGS ONLY IF ESCAPE ROUTE EXISTS
    // ========================================
    if (foundVehicleInLane && hasEscapeRoute) {
      // Calculate urgency based on distance (0 = far, 1 = very close)
      const urgency = Math.max(0, 1 - closestDistance / 600);

      // console.log(`🚨 WARNING ACTIVE! Distance: ${Math.round(closestDistance)}px, Urgency: ${urgency.toFixed(2)}`);

      // ========================================
      // INCOMING VEHICLE ENGINE SOUND
      // ========================================
      // Engine gets louder and higher pitched as vehicle approaches
      const vehicleVolume = 0.1 + urgency * 0.4; // 0.1 to 0.5
      warning.vehicleGain.gain.setTargetAtTime(vehicleVolume, now, 0.15);

      // Engine frequency rises with approach (150-250 Hz)
      const engineFreq = 150 + urgency * 100;
      warning.vehicleOsc.frequency.setTargetAtTime(engineFreq, now, 0.1);

      // Filter opens up as vehicle gets closer
      const filterFreq = 600 + urgency * 800; // 600-1400 Hz
      warning.vehicleFilter.frequency.setTargetAtTime(filterFreq, now, 0.1);

      // console.log(`  🔊 Vehicle Sound: volume=${vehicleVolume.toFixed(2)}, freq=${Math.round(engineFreq)}Hz`);

      // ========================================
      // BEEPING ALARM SOUND
      // ========================================
      // Beeping gets louder and faster when very close
      if (urgency > 0.3) { // Only beep when vehicle is closer
        const beepVolume = (urgency - 0.3) * 0.6; // 0 to 0.42

        // Create pulsing beep effect - faster when closer
        const pulseSpeed = 3 + urgency * 10; // 3-13 Hz
        const pulseValue = Math.abs(Math.sin(now * pulseSpeed * Math.PI));
        warning.beepGain.gain.setTargetAtTime(beepVolume * pulseValue, now, 0.02);

        // Beep frequency rises with urgency (800-1400 Hz)
        const beepFreq = 800 + urgency * 600;
        warning.beepOsc.frequency.setTargetAtTime(beepFreq, now, 0.05);

        // console.log(`  📢 Beep Alarm: volume=${(beepVolume * pulseValue).toFixed(2)}, freq=${Math.round(beepFreq)}Hz, pulse=${pulseSpeed.toFixed(1)}Hz`);
      } else {
        // No beeping when far away
        warning.beepGain.gain.setTargetAtTime(0, now, 0.1);
        // console.log(`  🔇 Beep off (urgency < 0.3)`);
      }

      // ========================================
      // STEREO POSITIONING
      // 2-lane: LEFT=-1.0, RIGHT=1.0 (full stereo separation)
      // 3-lane: LEFT=-0.7, CENTER=0, RIGHT=0.7
      // 4-lane: LANE1=-1.0 (full left), LANE2=-0.5 (half left), LANE3=0.5 (half right), LANE4=1.0 (full right)
      // ========================================
      let panValue;
      if (numLanes === 2) {
        panValue = currentLane === 0 ? -1.0 : 1.0;
      } else if (numLanes === 3) {
        panValue = currentLane === 0 ? -0.7 : currentLane === 1 ? 0 : 0.7;
      } else if (numLanes === 4) {
        if (currentLane === 0) panValue = -1.0;       // Lane 1: full left
        else if (currentLane === 1) panValue = -0.5;  // Lane 2: half left
        else if (currentLane === 2) panValue = 0.5;   // Lane 3: half right
        else panValue = 1.0;                          // Lane 4: full right
      } else {
        panValue = 0; // Default: center
      }
      warning.vehiclePanner.pan.setTargetAtTime(panValue, now, 0.1);
      warning.beepPanner.pan.setTargetAtTime(panValue, now, 0.1);

    } else {
      // No vehicle in lane OR no escape route - fade out all warnings
      // if (!foundVehicleInLane) {
      //   console.log(`✅ No vehicle in lane - warnings off`);
      // }
      warning.vehicleGain.gain.setTargetAtTime(0, now, 0.2);
      warning.beepGain.gain.setTargetAtTime(0, now, 0.2);
    }
  }

  playCollisionSound() {
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.value = 80;

    const gain = this.audioCtx.createGain();
    gain.gain.value = 0.8;

    const now = this.audioCtx.currentTime;
    osc.frequency.exponentialRampToValueAtTime(20, now + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.5);
  }

  playRewardSound() {
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;

    // Create two oscillators for a pleasant "coin pickup" sound
    const osc1 = this.audioCtx.createOscillator();
    const osc2 = this.audioCtx.createOscillator();

    osc1.type = "sine";
    osc2.type = "sine";

    // Start with a nice major third interval (C to E)
    osc1.frequency.value = 800; // High C
    osc2.frequency.value = 1000; // High E

    const gain = this.audioCtx.createGain();
    gain.gain.value = 0.3;

    // Quick attack and decay for a "ding" sound
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    // Slight frequency sweep upward for extra positivity
    osc1.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
    osc2.frequency.exponentialRampToValueAtTime(1500, now + 0.1);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.15);
    osc2.stop(now + 0.15);

    console.log('✨ Reward sound played - car dodged!');
  }

  fadeOut() {
    if (!this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    console.log('🔇 [AUDIO] fadeOut() called - stopping ALL game sounds');

    // Stop engine sounds
    this.engineNodes.masterGain.gain.setTargetAtTime(0, now, 0.5);

    // Stop wind sounds
    this.windNodes.leftGain.gain.setTargetAtTime(0, now, 0.3);
    this.windNodes.rightGain.gain.setTargetAtTime(0, now, 0.3);

    // STOP PROXIMITY WARNING SOUNDS (THIS WAS MISSING!)
    if (this.warningNodes.vehicleGain) {
      this.warningNodes.vehicleGain.gain.setTargetAtTime(0, now, 0.1);
      console.log('🔇 [AUDIO] Stopped proximity vehicle siren');
    }
    if (this.warningNodes.beepGain) {
      this.warningNodes.beepGain.gain.setTargetAtTime(0, now, 0.1);
      console.log('🔇 [AUDIO] Stopped proximity beep sound');
    }
  }

  fadeIn() {
    if (!this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    this.engineNodes.masterGain.gain.setTargetAtTime(0.55, now, 0.5);
  }
}
