// ==========================================
// PIXI.JS GRAPHICS ENGINE
// Cyberpunk Night Racing Theme
// ==========================================

export class GraphicsEngine {
  constructor(canvasElement) {
    this.canvas = canvasElement;

    // Initialize with Canvas 2D renderer
    this.initPromise = this.initPixi();

    // Animation state
    this.roadOffset = 0;
    this.particles = [];
    this.vehicleSprites = new Map();
    this.glowEffects = [];

    // Lane positions (will be set by game.js)
    this.LANE_POSITIONS = [];
  }

  async initPixi() {
    console.log('🎨 Initializing Graphics Engine...');

    // Force Canvas 2D mode - skip WebGL detection entirely
    console.log('🎨 Using native Canvas 2D renderer (WebGL bypassed)');
    this.useNativeCanvas = true;
    this.ctx = this.canvas.getContext('2d');

    if (!this.ctx) {
      console.error('❌ Failed to get Canvas 2D context!');
      return;
    }

    this.createBackgroundCanvas();
    this.createStarFieldCanvas();

    console.log('✅ Graphics Engine initialized (Canvas 2D)');
  }

  // ==========================================
  // BACKGROUND
  // ==========================================
  createBackground() {
    // Gradient background (dark purple to black)
    const gradient = new PIXI.Graphics();
    const gradientStops = [
      { color: 0x1a0033, position: 0 },
      { color: 0x0d0019, position: 0.5 },
      { color: 0x000000, position: 1 }
    ];

    for (let i = 0; i < 600; i++) {
      const ratio = i / 600;
      let color = gradientStops[0].color;

      if (ratio < 0.5) {
        const t = ratio * 2;
        color = this.lerpColor(gradientStops[0].color, gradientStops[1].color, t);
      } else {
        const t = (ratio - 0.5) * 2;
        color = this.lerpColor(gradientStops[1].color, gradientStops[2].color, t);
      }

      // Pixi v8 API: use rect() and fill()
      gradient.rect(0, i, 800, 1);
      gradient.fill(color);
    }

    this.backgroundLayer.addChild(gradient);
  }

  lerpColor(color1, color2, t) {
    const r1 = (color1 >> 16) & 0xff;
    const g1 = (color1 >> 8) & 0xff;
    const b1 = color1 & 0xff;

    const r2 = (color2 >> 16) & 0xff;
    const g2 = (color2 >> 8) & 0xff;
    const b2 = color2 & 0xff;

    const r = Math.round(r1 + (r2 - r1) * t);
    const g = Math.round(g1 + (g2 - g1) * t);
    const b = Math.round(b1 + (b2 - b1) * t);

    return (r << 16) | (g << 8) | b;
  }

  // ==========================================
  // ROAD
  // ==========================================
  createRoad() {
    this.roadGraphics = new PIXI.Graphics();
    this.roadLayer.addChild(this.roadGraphics);
  }

  drawRoad(speed) {
    this.roadGraphics.clear();

    // Animate road movement
    this.roadOffset += speed * 0.3;
    if (this.roadOffset > 40) this.roadOffset = 0;

    // 60-degree perspective view: Road narrows towards the top (vanishing point)
    // Bottom width: 600px (100 to 700)
    // Top width: narrower for perspective (250 to 550 = 300px)
    const roadBottomLeft = 100;
    const roadBottomRight = 700;
    const roadTopLeft = 250;   // Narrower at top
    const roadTopRight = 550;  // Narrower at top
    const roadHeight = 600;

    // Draw perspective road surface as a trapezoid
    this.roadGraphics.moveTo(roadTopLeft, 0);
    this.roadGraphics.lineTo(roadTopRight, 0);
    this.roadGraphics.lineTo(roadBottomRight, roadHeight);
    this.roadGraphics.lineTo(roadBottomLeft, roadHeight);
    this.roadGraphics.lineTo(roadTopLeft, 0);
    this.roadGraphics.fill({ color: 0x1a1a2e, alpha: 0.8 });

    // Lane dividers (animated dashed lines) with perspective
    const dashLength = 30;
    const gapLength = 20;

    // Helper function to calculate X position with perspective at given Y
    const getPerspectiveX = (bottomX, y) => {
      const ratio = y / roadHeight; // 0 at top, 1 at bottom
      const topX = roadTopLeft + ((bottomX - roadBottomLeft) / (roadBottomRight - roadBottomLeft)) * (roadTopRight - roadTopLeft);
      return topX + (bottomX - topX) * ratio;
    };

    if (this.LANE_POSITIONS.length === 2) {
      // 2-lane mode: Single center divider between LEFT and RIGHT
      const centerX = (this.LANE_POSITIONS[0] + this.LANE_POSITIONS[1]) / 2;
      for (let y = -this.roadOffset; y < 600; y += dashLength + gapLength) {
        const x1 = getPerspectiveX(centerX, y);
        const x2 = getPerspectiveX(centerX, Math.min(y + dashLength, 600));
        this.roadGraphics.moveTo(x1, y);
        this.roadGraphics.lineTo(x2, Math.min(y + dashLength, 600));
      }
    } else if (this.LANE_POSITIONS.length === 3) {
      // 3-lane mode: Two dividers
      const leftDividerX = (this.LANE_POSITIONS[0] + this.LANE_POSITIONS[1]) / 2;
      const rightDividerX = (this.LANE_POSITIONS[1] + this.LANE_POSITIONS[2]) / 2;

      // Left-Center divider
      for (let y = -this.roadOffset; y < 600; y += dashLength + gapLength) {
        const x1 = getPerspectiveX(leftDividerX, y);
        const x2 = getPerspectiveX(leftDividerX, Math.min(y + dashLength, 600));
        this.roadGraphics.moveTo(x1, y);
        this.roadGraphics.lineTo(x2, Math.min(y + dashLength, 600));
      }

      // Center-Right divider
      for (let y = -this.roadOffset; y < 600; y += dashLength + gapLength) {
        const x1 = getPerspectiveX(rightDividerX, y);
        const x2 = getPerspectiveX(rightDividerX, Math.min(y + dashLength, 600));
        this.roadGraphics.moveTo(x1, y);
        this.roadGraphics.lineTo(x2, Math.min(y + dashLength, 600));
      }
    } else if (this.LANE_POSITIONS.length === 4) {
      // 4-lane mode: Three dividers
      const divider1X = (this.LANE_POSITIONS[0] + this.LANE_POSITIONS[1]) / 2;
      const divider2X = (this.LANE_POSITIONS[1] + this.LANE_POSITIONS[2]) / 2;
      const divider3X = (this.LANE_POSITIONS[2] + this.LANE_POSITIONS[3]) / 2;

      for (const dividerX of [divider1X, divider2X, divider3X]) {
        for (let y = -this.roadOffset; y < 600; y += dashLength + gapLength) {
          const x1 = getPerspectiveX(dividerX, y);
          const x2 = getPerspectiveX(dividerX, Math.min(y + dashLength, 600));
          this.roadGraphics.moveTo(x1, y);
          this.roadGraphics.lineTo(x2, Math.min(y + dashLength, 600));
        }
      }
    }

    this.roadGraphics.stroke({ width: 3, color: 0x00ff88, alpha: 0.8 });

    // Road boundaries (glowing neon lines) with perspective
    this.roadGraphics.moveTo(roadTopLeft, 0);
    this.roadGraphics.lineTo(roadBottomLeft, roadHeight);
    this.roadGraphics.moveTo(roadTopRight, 0);
    this.roadGraphics.lineTo(roadBottomRight, roadHeight);
    this.roadGraphics.stroke({ width: 4, color: 0xff0066, alpha: 1 });

    // Add glow effect to boundaries
    const glowFilter = new PIXI.BlurFilter({ strength: 4 });
    this.roadGraphics.filters = [glowFilter];
  }

  // ==========================================
  // STAR FIELD (scrolling background)
  // ==========================================
  createStarField() {
    for (let i = 0; i < 100; i++) {
      const star = new PIXI.Graphics();
      const size = Math.random() * 2 + 1;
      const brightness = Math.random();
      const color = brightness > 0.7 ? 0x00ffff : 0xffffff;

      star.circle(0, 0, size);
      star.fill({ color: color, alpha: brightness });

      star.x = Math.random() * 800;
      star.y = Math.random() * 600;
      star.speed = Math.random() * 2 + 1;

      this.particles.push(star);
      this.backgroundLayer.addChild(star);
    }
  }

  updateStarField(speed) {
    this.particles.forEach(star => {
      star.y += star.speed * (1 + speed * 0.02);

      if (star.y > 600) {
        star.y = -10;
        star.x = Math.random() * 800;
      }
    });
  }

  // ==========================================
  // VEHICLES
  // ==========================================
  createPlayerCar(x, y, currentLane) {
    if (this.playerSprite) {
      this.vehicleLayer.removeChild(this.playerSprite);
    }

    const car = new PIXI.Graphics();

    // 60-degree perspective view: Player car is closer (larger)
    // Scale factor based on Y position (closer to bottom = larger)
    const perspectiveScale = 1.0; // Player car at bottom is full size

    // Car body (sleek cyberpunk design) - wider and more visible from 60-degree angle
    car.roundRect(-20 * perspectiveScale, -45 * perspectiveScale, 40 * perspectiveScale, 90 * perspectiveScale, 8);
    car.fill(0xff0066);

    // Windshield - visible from angled view
    car.roundRect(-15 * perspectiveScale, -30 * perspectiveScale, 30 * perspectiveScale, 35 * perspectiveScale, 5);
    car.fill({ color: 0x00ffff, alpha: 0.6 });

    // Headlights (glowing) - positioned at front
    car.circle(-12 * perspectiveScale, 35 * perspectiveScale, 5 * perspectiveScale);
    car.circle(12 * perspectiveScale, 35 * perspectiveScale, 5 * perspectiveScale);
    car.fill(0xffff00);

    // Neon underglow
    const glow = new PIXI.Graphics();
    glow.ellipse(0, 0, 35 * perspectiveScale, 60 * perspectiveScale);
    glow.fill({ color: 0xff0066, alpha: 0.3 });
    glow.filters = [new PIXI.BlurFilter({ strength: 8 })];

    car.addChild(glow);
    glow.position.set(0, 0);
    glow.zIndex = -1;

    car.x = x;
    car.y = y;

    // Add lane indicator glow
    const laneColors = [0x00ff88, 0xffff00, 0xff00ff];
    const laneGlow = new PIXI.Graphics();
    laneGlow.circle(0, -60 * perspectiveScale, 18 * perspectiveScale);
    laneGlow.fill({ color: laneColors[currentLane], alpha: 0.4 });
    laneGlow.filters = [new PIXI.BlurFilter({ strength: 10 })];
    car.addChild(laneGlow);

    this.playerSprite = car;
    this.vehicleLayer.addChild(car);
  }

  updatePlayerCar(x, y, currentLane) {
    if (this.playerSprite) {
      // Smooth movement
      this.playerSprite.x += (x - this.playerSprite.x) * 0.2;
      this.playerSprite.y = y;

      // Update lane glow color
      const laneColors = [0x00ff88, 0xffff00, 0xff00ff];
      if (this.playerSprite.children[1]) {
        this.playerSprite.removeChild(this.playerSprite.children[1]);
      }

      const laneGlow = new PIXI.Graphics();
      laneGlow.circle(0, -50, 15);
      laneGlow.fill({ color: laneColors[currentLane], alpha: 0.4 });
      laneGlow.filters = [new PIXI.BlurFilter({ strength: 10 })];
      this.playerSprite.addChild(laneGlow);
    }
  }

  createTrafficVehicle(id, x, y) {
    const car = new PIXI.Graphics();

    // Random vehicle color (neon theme)
    const colors = [0x00ffff, 0xff00ff, 0xffff00, 0x00ff00];
    const color = colors[Math.floor(Math.random() * colors.length)];

    // 60-degree perspective: Calculate scale based on Y position
    // Y=0 (top/far) should be smaller, Y=600 (bottom/near) should be larger
    // Using exponential scaling for realistic perspective
    const perspectiveScale = 0.3 + (y / 600) * 0.7; // Range: 0.3 to 1.0

    // Car body - scaled based on distance
    car.roundRect(-20 * perspectiveScale, -45 * perspectiveScale, 40 * perspectiveScale, 90 * perspectiveScale, 8 * perspectiveScale);
    car.fill({ color: color, alpha: 0.9 });

    // Windshield (back window visible from behind)
    car.roundRect(-15 * perspectiveScale, -15 * perspectiveScale, 30 * perspectiveScale, 30 * perspectiveScale, 5 * perspectiveScale);
    car.fill({ color: 0x000000, alpha: 0.5 });

    // Taillights (red glow) - visible from behind
    car.circle(-12 * perspectiveScale, -35 * perspectiveScale, 4 * perspectiveScale);
    car.circle(12 * perspectiveScale, -35 * perspectiveScale, 4 * perspectiveScale);
    car.fill({ color: 0xff0000, alpha: 0.8 });

    car.x = x;
    car.y = y;
    car._perspectiveScale = perspectiveScale; // Store for updates

    this.vehicleSprites.set(id, car);
    this.vehicleLayer.addChild(car);
  }

  updateTrafficVehicle(id, x, y) {
    const sprite = this.vehicleSprites.get(id);
    if (sprite) {
      // Update position
      sprite.x = x;
      sprite.y = y;

      // Recalculate perspective scale based on new Y position
      const newPerspectiveScale = 0.3 + (y / 600) * 0.7; // Range: 0.3 to 1.0

      // Only redraw if scale changed significantly (optimization)
      if (Math.abs(newPerspectiveScale - sprite._perspectiveScale) > 0.05) {
        sprite._perspectiveScale = newPerspectiveScale;

        // Recreate the vehicle with new scale
        this.vehicleLayer.removeChild(sprite);
        this.vehicleSprites.delete(id);
        this.createTrafficVehicle(id, x, y);
      }
    }
  }

  removeTrafficVehicle(id) {
    const sprite = this.vehicleSprites.get(id);
    if (sprite) {
      this.vehicleLayer.removeChild(sprite);
      this.vehicleSprites.delete(id);
    }
  }

  // ==========================================
  // EFFECTS
  // ==========================================
  createSpeedLines(speed) {
    // Remove old speed lines
    this.effectsLayer.removeChildren();

    if (speed > 30) {
      const lineCount = Math.floor(speed / 10);

      for (let i = 0; i < lineCount; i++) {
        const line = new PIXI.Graphics();

        // Pick a random lane and add small offset for natural variation
        const laneIndex = Math.floor(Math.random() * this.LANE_POSITIONS.length);
        const laneCenter = this.LANE_POSITIONS[laneIndex];
        const xOffset = (Math.random() - 0.5) * 60; // ±30 pixels around lane center
        const x = laneCenter + xOffset;

        const y1 = Math.random() * 600;
        const length = 20 + Math.random() * 40;
        const alpha = Math.random() * 0.5;

        line.moveTo(x, y1);
        line.lineTo(x, y1 + length);
        line.stroke({ width: 2, color: 0xffffff, alpha: alpha });

        this.effectsLayer.addChild(line);
      }
    }
  }

  flashLaneChange(currentLane) {
    // Skip flash effect in native canvas mode (PIXI not available)
    if (this.useNativeCanvas) {
      console.log(`✨ Lane change flash effect skipped (Canvas 2D mode)`);
      return;
    }

    const flash = new PIXI.Graphics();
    const laneColors = [0x00ff88, 0xffff00, 0xff00ff];

    flash.rect(0, 0, 800, 600);
    flash.fill({ color: laneColors[currentLane], alpha: 0.3 });

    this.effectsLayer.addChild(flash);

    // Fade out
    let alpha = 0.3;
    const fadeInterval = setInterval(() => {
      alpha -= 0.05;
      flash.alpha = alpha;

      if (alpha <= 0) {
        this.effectsLayer.removeChild(flash);
        clearInterval(fadeInterval);
      }
    }, 16);
  }

  // ==========================================
  // ANIMATION LOOP
  // ==========================================
  animate() {
    // Override in game.js with actual game state
  }

  // ==========================================
  // NATIVE CANVAS 2D FALLBACK
  // ==========================================
  createBackgroundCanvas() {
    // Background will be drawn in drawRoadCanvas
    // Initialize roadOffset if not set
    if (typeof this.roadOffset === 'undefined') {
      this.roadOffset = 0;
    }
  }

  createStarFieldCanvas() {
    this.stars = [];
    // OPTIMIZED: Reduced star density from /5000 to /6000 for better performance
    const numStars = Math.floor((this.canvas.width * this.canvas.height) / 6000);
    for (let i = 0; i < numStars; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 2 + 1,
        brightness: Math.random()
      });
    }
  }

  updateStarFieldCanvas(speed) {
    if (!this.stars) return;
    // Only move stars if player has speed - stop completely when speed is 0
    if (speed > 0) {
      this.stars.forEach(star => {
        star.y += star.speed * (1 + speed * 0.02);
        if (star.y > this.canvas.height) {
          star.y = -10;
          star.x = Math.random() * this.canvas.width;
        }
      });
    }
  }

  drawRoadCanvas(speed) {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;

    // Background gradient (different colors for different levels)
    const gradient = ctx.createLinearGradient(0, 0, 0, height);

    // Level 1: Blue/Cyan theme (easier, calming)
    // Level 2: Purple/Pink theme (advanced, energetic)
    // Level 3: Red/Orange theme (professional, intense)
    if (this.LANE_POSITIONS.length === 2) {
      // Level 1: 2-lane - Blue/Cyan sky
      gradient.addColorStop(0, '#001a33');  // Dark blue
      gradient.addColorStop(0.5, '#003d5c'); // Medium blue
      gradient.addColorStop(1, '#001429');   // Very dark blue
    } else if (this.LANE_POSITIONS.length === 3) {
      // Level 2: 3-lane - Purple/Magenta space
      gradient.addColorStop(0, '#1a0033');  // Deep purple
      gradient.addColorStop(0.5, '#0d0019'); // Dark purple
      gradient.addColorStop(1, '#000000');   // Black
    } else if (this.LANE_POSITIONS.length === 4) {
      // Level 3: 4-lane - Red/Orange intense sunset
      gradient.addColorStop(0, '#330a00');  // Dark red-brown
      gradient.addColorStop(0.5, '#1a0500'); // Very dark red
      gradient.addColorStop(1, '#000000');   // Black
    } else {
      // Default fallback
      gradient.addColorStop(0, '#1a0033');
      gradient.addColorStop(0.5, '#0d0019');
      gradient.addColorStop(1, '#000000');
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Stars
    if (this.stars) {
      this.stars.forEach(star => {
        ctx.fillStyle = star.brightness > 0.7 ? '#00ffff' : '#ffffff';
        ctx.globalAlpha = star.brightness;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    }

    // Animate road movement - only when car is moving
    if (speed > 0) {
      this.roadOffset += speed * 0.3;
      if (this.roadOffset > 40) this.roadOffset = 0;
    }

    // Road surface (centered, takes 60% of width) - TOP DOWN VIEW
    const roadWidth = width * 0.6;
    const roadLeft = (width - roadWidth) / 2;
    const roadRight = roadLeft + roadWidth;

    ctx.fillStyle = 'rgba(26, 26, 46, 0.8)';
    ctx.fillRect(roadLeft, 0, roadWidth, height);

    // Lane dividers (animated dashed lines) - TOP DOWN VIEW
    const dashLength = 30;
    const gapLength = 20;

    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.8;

    if (this.LANE_POSITIONS.length === 2) {
      // 2-lane mode: Single center divider between LEFT and RIGHT
      for (let y = -this.roadOffset; y < height; y += dashLength + gapLength) {
        const x = (this.LANE_POSITIONS[0] + this.LANE_POSITIONS[1]) / 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + dashLength);
        ctx.stroke();
      }
    } else if (this.LANE_POSITIONS.length === 3) {
      // 3-lane mode: Two dividers
      // Left-Center divider
      for (let y = -this.roadOffset; y < height; y += dashLength + gapLength) {
        const x = (this.LANE_POSITIONS[0] + this.LANE_POSITIONS[1]) / 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + dashLength);
        ctx.stroke();
      }

      // Center-Right divider
      for (let y = -this.roadOffset; y < height; y += dashLength + gapLength) {
        const x = (this.LANE_POSITIONS[1] + this.LANE_POSITIONS[2]) / 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + dashLength);
        ctx.stroke();
      }
    } else if (this.LANE_POSITIONS.length === 4) {
      // 4-lane mode: Three dividers
      // Lane 1-2 divider
      for (let y = -this.roadOffset; y < height; y += dashLength + gapLength) {
        const x = (this.LANE_POSITIONS[0] + this.LANE_POSITIONS[1]) / 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + dashLength);
        ctx.stroke();
      }

      // Lane 2-3 divider
      for (let y = -this.roadOffset; y < height; y += dashLength + gapLength) {
        const x = (this.LANE_POSITIONS[1] + this.LANE_POSITIONS[2]) / 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + dashLength);
        ctx.stroke();
      }

      // Lane 3-4 divider
      for (let y = -this.roadOffset; y < height; y += dashLength + gapLength) {
        const x = (this.LANE_POSITIONS[2] + this.LANE_POSITIONS[3]) / 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + dashLength);
        ctx.stroke();
      }
    }

    ctx.globalAlpha = 1;

    // Road boundaries - TOP DOWN VIEW (straight lines)
    ctx.strokeStyle = '#ff0066';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(roadLeft, 0);
    ctx.lineTo(roadLeft, height);
    ctx.moveTo(roadRight, 0);
    ctx.lineTo(roadRight, height);
    ctx.stroke();
  }

  drawPlayerCarCanvas(x, y, currentLane, speed = 0, isShifting = false) {
    const ctx = this.ctx;

    ctx.save();
    ctx.translate(x, y);

    // Calculate speed-based effects
    const speedRatio = speed / 120; // Normalize speed (0-1)
    const isHighSpeed = speed > 60;

    // Speed-based vibration/shake effect (DISABLED for performance - causes micro-stutters)
    // Removed shake effect entirely to improve frame consistency

    // Gear shift effects - intense glow and distortion
    if (isShifting) {
      // Intense outer glow during shift
      ctx.fillStyle = '#ff0066';
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.ellipse(0, 0, 60, 90, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      // Pulsing energy ring
      ctx.strokeStyle = '#ffff00';
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.arc(0, 0, 45, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // Speed-based exhaust glow (intensity increases with speed)
    if (speed > 30) {
      const exhaustIntensity = speedRatio * 0.5;
      ctx.fillStyle = isShifting ? '#ff00ff' : '#ff6600';
      ctx.globalAlpha = exhaustIntensity;
      ctx.beginPath();
      ctx.ellipse(0, -45, 25 + speedRatio * 15, 40 + speedRatio * 20, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    // Lane indicator glow
    const laneColors = ['#00ff88', '#ffff00', '#ff00ff', '#00ffff']; // 4 colors for 4 lanes
    ctx.fillStyle = laneColors[currentLane] || '#ffffff'; // Fallback to white if invalid lane
    ctx.globalAlpha = 0.4 + (isShifting ? 0.3 : 0);
    ctx.beginPath();
    ctx.arc(0, -50, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Enhanced neon underglow (brighter at high speeds)
    const underglowIntensity = 0.3 + speedRatio * 0.3;
    ctx.fillStyle = isShifting ? '#ffff00' : '#ff0066';
    ctx.globalAlpha = underglowIntensity;
    ctx.beginPath();
    ctx.ellipse(0, 0, 30, 50, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Car body (with speed-based color shift)
    if (isShifting) {
      ctx.fillStyle = '#ff00ff'; // Magenta during shift
    } else {
      ctx.fillStyle = isHighSpeed ? '#ff0088' : '#ff0066';
    }
    ctx.beginPath();
    ctx.roundRect(-20, -35, 40, 70, 8);
    ctx.fill();

    // Windshield (brighter at high speeds)
    const windshieldBrightness = isShifting ? 1.0 : (0.6 + speedRatio * 0.3);
    ctx.fillStyle = `rgba(0, 255, 255, ${windshieldBrightness})`;
    ctx.beginPath();
    ctx.roundRect(-15, -25, 30, 25, 5);
    ctx.fill();

    // Headlights (OPTIMIZED - reduced shadow blur for performance)
    const headlightSize = 4 + speedRatio * 2;
    ctx.fillStyle = isShifting ? '#00ffff' : '#ffff00';
    // Reduced shadow blur from 10-20 to 5-8 for better performance
    ctx.shadowColor = ctx.fillStyle;
    ctx.shadowBlur = isShifting ? 8 : 5;
    ctx.beginPath();
    ctx.arc(-12, 30, headlightSize, 0, Math.PI * 2);
    ctx.arc(12, 30, headlightSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Speed streaks behind car (at very high speeds)
    if (speed > 80) {
      ctx.globalAlpha = (speedRatio - 0.67) * 1.5; // Fade in from speed 80-120
      ctx.fillStyle = '#ff0066';
      ctx.beginPath();
      ctx.moveTo(-25, -35);
      ctx.lineTo(-30, -60);
      ctx.lineTo(-20, -60);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(25, -35);
      ctx.lineTo(30, -60);
      ctx.lineTo(20, -60);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    ctx.restore();
  }

  drawTrafficVehicleCanvas(x, y, color) {
    const ctx = this.ctx;

    ctx.save();
    ctx.translate(x, y);

    // Car body - TOP DOWN VIEW
    ctx.fillStyle = color || '#00ffff';
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.roundRect(-20, -35, 40, 70, 8);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Windshield
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.roundRect(-15, -10, 30, 25, 5);
    ctx.fill();

    // Taillights
    ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
    ctx.beginPath();
    ctx.arc(-12, -30, 3, 0, Math.PI * 2);
    ctx.arc(12, -30, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  createSpeedLinesCanvas(speed) {
    if (speed <= 30) return;

    const ctx = this.ctx;
    // OPTIMIZED: Cap line count at 15 to prevent excessive drawing at very high speeds
    const lineCount = Math.min(Math.floor(speed / 10), 15);

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;

    for (let i = 0; i < lineCount; i++) {
      // Pick a random lane and add small offset for natural variation
      const laneIndex = Math.floor(Math.random() * this.LANE_POSITIONS.length);
      const laneCenter = this.LANE_POSITIONS[laneIndex];
      const xOffset = (Math.random() - 0.5) * 60; // ±30 pixels around lane center
      const x = laneCenter + xOffset;

      const y1 = Math.random() * 600;
      const length = 20 + Math.random() * 40;
      const alpha = Math.random() * 0.5;

      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(x, y1);
      ctx.lineTo(x, y1 + length);
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
  }

  animateCanvas() {
    if (!this.useNativeCanvas) return;

    // This will be called by game.js updateGraphics
    requestAnimationFrame(() => this.animateCanvas());
  }

  // ==========================================
  // CLEANUP
  // ==========================================
  destroy() {
    if (this.app) {
      this.app.destroy(true, { children: true, texture: true, baseTexture: true });
    }
  }
}
