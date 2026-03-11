"use client"; // Required for Next.js App Router

import React, { useRef, useEffect } from 'react';

interface WaveBackgroundProps {
  lineColor?: string;
  backgroundColor?: string;
  waveCount?: number;
  enableZoom?: boolean;
  zoomSpeed?: number;
  zoomIntensity?: number;
}

const WaveBackground: React.FC<WaveBackgroundProps> = ({
  lineColor = 'rgba(0, 138, 216, 0.2)',
  backgroundColor = 'transparent',
  waveCount = 30,
  enableZoom = true,
  zoomSpeed = 0.001,
  zoomIntensity = 0.15,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let frame = 0;

    const resize = () => {
      // Set to parent container size
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (backgroundColor !== 'transparent') {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      const h = canvas.height;
      const w = canvas.width;
      const midY = h / 2;

      // Calculate zoom scale
      let scale = 1;
      if (enableZoom) {
        scale = 1 + Math.sin(frame * zoomSpeed) * zoomIntensity;
      }

      // Save the current context state
      ctx.save();

      // Apply zoom transformation from center
      if (enableZoom) {
        ctx.translate(w / 2, h / 2);
        ctx.scale(scale, scale);
        ctx.translate(-w / 2, -h / 2);
      }

      ctx.lineWidth = 0.8;
      ctx.strokeStyle = lineColor;

      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();
        const shift = frame * 0.005; // Slow, elegant movement

        for (let x = 0; x <= w; x += 15) {
          // Complex sine math to create the "intertwined ribbon" look from your image
          const xAngle = (x / w) * Math.PI * 1.5;
          const wavePhase = shift + (i * 0.08);

          const y = midY +
            Math.sin(xAngle + wavePhase) * (h * 0.15) * Math.sin(shift * 0.5 + i * 0.1);

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Restore the context state
      ctx.restore();

      frame++;
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [lineColor, backgroundColor, waveCount, enableZoom, zoomSpeed, zoomIntensity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default WaveBackground;