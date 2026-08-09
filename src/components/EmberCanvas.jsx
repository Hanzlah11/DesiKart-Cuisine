import React, { useEffect, useRef } from 'react';

const EmberCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // --- Smoke Particle Class ---
    class SmokeParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 200;
        this.radius = Math.random() * 120 + 80; // Large soft clouds
        this.speedY = Math.random() * 0.4 + 0.15; // Slow upward drift
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.08 + 0.02; // Soft, non-distracting transparency
        this.fadeSpeed = Math.random() * 0.0003 + 0.0001;
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.radius += 0.2; // Smoke expands as it rises
        this.opacity -= this.fadeSpeed;

        if (this.y < -this.radius || this.opacity <= 0) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        );
        // Soft charcoal & warm amber-tinted smoke
        gradient.addColorStop(0, `rgba(215, 180, 140, ${this.opacity})`);
        gradient.addColorStop(0.5, `rgba(40, 35, 30, ${this.opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(13, 13, 14, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // --- Fire Ember Particle Class ---
    class EmberParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 100;
        this.size = Math.random() * 2.2 + 0.8;
        this.speedY = Math.random() * 1.2 + 0.4;
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.fadeSpeed = Math.random() * 0.005 + 0.002;
        this.color = Math.random() > 0.35 ? '#F59E0B' : '#EF4444';
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.3;
        this.opacity -= this.fadeSpeed;

        if (this.y < -10 || this.opacity <= 0) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    // Generate instances
    const smokeCount = 18;
    const emberCount = 45;
    const smokeParticles = Array.from({ length: smokeCount }, () => new SmokeParticle());
    const emberParticles = Array.from({ length: emberCount }, () => new EmberParticle());

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Render smoke layer first (behind embers)
      smokeParticles.forEach((smoke) => {
        smoke.update();
        smoke.draw();
      });

      // Render ember particles on top
      emberParticles.forEach((ember) => {
        ember.update();
        ember.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id="ember-canvas" ref={canvasRef} />;
};

export default EmberCanvas;