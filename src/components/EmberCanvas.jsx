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

    const isLightObsidian = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      return theme === 'light' || theme === 'cardamom' || theme === 'light-obsidian';
    };

    // --- Smoke Particle Class ---
    class SmokeParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 200;
        this.radius = Math.random() * 120 + 80;
        this.speedY = Math.random() * 0.4 + 0.15;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.06 + 0.015;
        this.fadeSpeed = Math.random() * 0.0003 + 0.0001;
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.radius += 0.2;
        this.opacity -= this.fadeSpeed;

        if (this.y < -this.radius || this.opacity <= 0) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        const light = isLightObsidian();
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        );

        if (light) {
          // Light Obsidian: Silvery Misty Slate & Saffron Amber Haze
          gradient.addColorStop(0, `rgba(194, 203, 197, ${this.opacity * 1.5})`);
          gradient.addColorStop(0.45, `rgba(255, 196, 77, ${this.opacity * 0.7})`);
          gradient.addColorStop(1, 'rgba(43, 48, 45, 0)');
        } else {
          // Midnight Obsidian: Deep Volcanic Gold & Chili Smoke
          gradient.addColorStop(0, `rgba(244, 186, 63, ${this.opacity})`);
          gradient.addColorStop(0.5, `rgba(210, 50, 20, ${this.opacity * 0.3})`);
          gradient.addColorStop(1, 'rgba(10, 10, 10, 0)');
        }

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
        const light = isLightObsidian();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        const color = light
          ? (Math.random() > 0.4 ? '#FFC44D' : '#E63B1C')
          : (Math.random() > 0.35 ? '#F4BA3F' : '#D23214');

        ctx.fillStyle = color;
        ctx.shadowBlur = light ? 6 : 10;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.restore();
      }
    }

    const smokeCount = 18;
    const emberCount = 45;
    const smokeParticles = Array.from({ length: smokeCount }, () => new SmokeParticle());
    const emberParticles = Array.from({ length: emberCount }, () => new EmberParticle());

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      smokeParticles.forEach((smoke) => {
        smoke.update();
        smoke.draw();
      });

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

  return <canvas id="ember-canvas" ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 0 }} />;
};

export default EmberCanvas;