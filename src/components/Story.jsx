import React, { useEffect, useRef } from 'react';
import './Story.css';

const Story = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    class SmokeParticle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 100;
        this.radius = Math.random() * 100 + 70;
        this.speedY = Math.random() * 0.35 + 0.1;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.06 + 0.01;
        this.fadeSpeed = Math.random() * 0.0003 + 0.0001;
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.radius += 0.15;
        this.opacity -= this.fadeSpeed;
        if (this.y < -this.radius || this.opacity <= 0) this.reset();
      }
      draw() {
        ctx.save();
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, `rgba(255, 249, 230, ${this.opacity})`);
        gradient.addColorStop(0.5, `rgba(40, 25, 20, ${this.opacity * 0.4})`);
        gradient.addColorStop(1, 'rgba(10, 10, 10, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    class EmberParticle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 50;
        this.size = Math.random() * 2 + 0.6;
        this.speedY = Math.random() * 0.9 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.fadeSpeed = Math.random() * 0.004 + 0.001;
        this.color = Math.random() > 0.5 ? '#F4BA3F' : '#D23214';
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.3;
        this.opacity -= this.fadeSpeed;
        if (this.y < -10 || this.opacity <= 0) this.reset();
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    const smokeParticles = Array.from({ length: 15 }, () => new SmokeParticle());
    const emberParticles = Array.from({ length: 30 }, () => new EmberParticle());

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      smokeParticles.forEach(s => { s.update(); s.draw(); });
      emberParticles.forEach(e => { e.update(); e.draw(); });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="story" className="story-section">
      <canvas ref={canvasRef} className="story-bg-canvas" />

      <div className="story-content-wrapper">
        
        {/* Left Column: Story Text with Palette Highlighting */}
        <div className="story-text-col">
          <div className="story-header">
            <span className="story-tagline">OUR STORY</span>
            <h2 className="story-title">
              <span className="text-cream">ROOTED IN TRADITION.</span><br />
              <span className="text-red">COOKED WITH</span> <span className="text-yellow">HEART.</span>
            </h2>
          </div>

          <div className="story-body">
            <p>
              <strong className="text-yellow">DesiKart Cuisine</strong> was created with a simple idea — to serve the kind of <span className="text-green">authentic Pakistani food</span> that feels familiar from the very first bite.
            </p>
            <p>
              Our menu celebrates the dishes we grew up loving: slow-cooked <span className="text-red">Nihari</span> and <span className="text-red">Paya</span>, rich <span className="text-yellow">Degi Qorma</span>, comforting <span className="text-cream">Haleem</span>, <span className="text-green">Chinioti Mutton Kunna</span>, traditional <span className="text-yellow">Chicken Achari</span> and smoky <span className="text-red">BBQ favourites</span>. We believe these dishes deserve time, care and respect for the recipes that make them special.
            </p>
            <p>
              We are not trying to reinvent desi food. We want to serve it the way it deserves to be served — <span className="text-green">freshly prepared</span>, full of character and made with ingredients we are comfortable serving to our own families.
            </p>
            <p>
              For us, DesiKart Cuisine is about more than completing an order. It is about building a kitchen people can return to with <span className="text-yellow">confidence</span> — knowing that the same care, flavour and <span className="text-green">honesty</span> will be waiting for them.
            </p>
          </div>

          {/* Signature Line */}
          <div className="story-signature">
            <span className="signature-text">Desi Swaad, Dil Se.</span>
          </div>
        </div>

        {/* Right Column: Cinematic Brand Emblem & Signature Dish */}
        <div className="story-image-col">
          <div className="story-glow-backdrop"></div>
          
          {/* Cinematic Animated Brand Emblem Badge */}
          <div className="story-emblem-container">
            <img 
              src="/images/brand/desikart-logo.png" 
              alt="DesiKart Crest Emblem" 
              className="story-emblem-logo"
            />
          </div>

          <div className="story-image-card">
            <img 
              src="/images/menu/nalli-beef-nihari.jpeg" 
              alt="DesiKart Signature Dish - Special Nali Beef Nihari" 
              className="story-dish-img"
            />
            <div className="story-img-badge">
              <span className="badge-title">SIGNATURE CREATION</span>
              <span className="badge-subtitle">Slow-Cooked Daily Perfection</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Story;