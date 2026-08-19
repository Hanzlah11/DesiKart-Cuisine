import React, { useEffect, useRef } from 'react';
import './Story.css';

const timelineMilestones = [
  {
    id: '01',
    phase: 'The Spark',
    icon: '✨',
    title: 'Familiar from the First Bite',
    desc: 'DesiKart Cuisine was born from a timeless desire: to serve the authentic taste of true Pakistani culinary traditions that feel intimately familiar from the very first bite.',
    hasMedia: false,
    animType: 'anim-spark'
  },
  {
    id: '02',
    phase: 'Generations of Craft',
    icon: '🔥',
    title: 'Heritage Dishes, Zero Shortcuts',
    desc: 'From slow-simmered Nihari and Paya to rich Degi Qorma, comforting Haleem, Chinioti Mutton Kunna, and fiery BBQ, each dish is given the patient time and craft it deserves.',
    hasMedia: true,
    imgSrc: '/images/menu/nalli_beef_nihari.jpeg',
    badge: 'Signature Nalli Nihari',
    animType: 'anim-flame'
  },
  {
    id: '03',
    phase: 'Our Philosophy',
    icon: '🌿',
    title: 'Pure Kitchen Authenticity',
    desc: 'We are not trying to reinvent desi food. We prepare it fresh daily with pure, uncompromised ingredients that we are proud to serve at our own family dinner tables.',
    hasMedia: false,
    animType: 'anim-leaf'
  },
  {
    id: '04',
    phase: 'The Bond',
    icon: '🤝',
    title: 'Building Long-Term Trust',
    desc: 'For us, DesiKart is far more than filling an order. It is about crafting an honest kitchen you can return to with complete confidence and unwavering flavor consistency.',
    hasMedia: false,
    animType: 'anim-bond'
  }
];

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

    const isLightObsidian = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      return theme === 'light' || theme === 'cardamom' || theme === 'light-obsidian';
    };

    class SmokeParticle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 80;
        this.radius = Math.random() * 110 + 75;
        this.speedY = Math.random() * 0.35 + 0.12;
        this.speedX = (Math.random() - 0.5) * 0.35;
        this.opacity = Math.random() * 0.04 + 0.015;
        this.fadeSpeed = Math.random() * 0.00035 + 0.00012;
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.radius += 0.16;
        this.opacity -= this.fadeSpeed;
        if (this.y < -this.radius || this.opacity <= 0) this.reset();
      }
      draw() {
        ctx.save();
        const light = isLightObsidian();
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);

        if (light) {
          gradient.addColorStop(0, `rgba(194, 203, 197, ${this.opacity * 1.5})`);
          gradient.addColorStop(0.45, `rgba(255, 196, 77, ${this.opacity * 0.7})`);
          gradient.addColorStop(1, 'rgba(43, 48, 45, 0)');
        } else {
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

    class EmberParticle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 40;
        this.size = Math.random() * 2.2 + 0.7;
        this.speedY = Math.random() * 0.85 + 0.35;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.fadeSpeed = Math.random() * 0.004 + 0.001;
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.012) * 0.35;
        this.opacity -= this.fadeSpeed;
        if (this.y < -10 || this.opacity <= 0) this.reset();
      }
      draw() {
        ctx.save();
        const light = isLightObsidian();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        const color = light
          ? (Math.random() > 0.4 ? '#FFC44D' : '#E63B1C')
          : (Math.random() > 0.4 ? '#F4BA3F' : '#D23214');

        ctx.fillStyle = color;
        ctx.shadowBlur = light ? 5 : 8;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.restore();
      }
    }

    const smokeParticles = Array.from({ length: 16 }, () => new SmokeParticle());
    const emberParticles = Array.from({ length: 30 }, () => new EmberParticle());

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      smokeParticles.forEach((s) => { s.update(); s.draw(); });
      emberParticles.forEach((e) => { e.update(); e.draw(); });
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
        
        {/* Section Header */}
        <div className="story-header-center">
          <span className="story-tagline">OUR HERITAGE & JOURNEY</span>
          <h2 className="story-main-title">
            <span className="text-cream">ROOTED IN TRADITION.</span><br />
            <span className="text-red">COOKED WITH</span> <span className="text-yellow">HEART.</span>
          </h2>
        </div>

        {/* Cinematic Vertical Timeline */}
        <div className="story-timeline-container">
          {timelineMilestones.map((step, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div 
                key={step.id} 
                className={`timeline-step ${isLeft ? 'left' : 'right'} ${step.animType}`}
                style={{ animationDelay: `${index * 0.18}s` }}
              >
                <div className="timeline-node" title={step.phase}>
                  <span>{step.icon}</span>
                </div>

                <div className="timeline-card">
                  <div className="timeline-step-meta">
                    <span className="timeline-num">{step.id}</span>
                    <span className="timeline-phase">• {step.phase}</span>
                  </div>

                  <h3 className="timeline-heading">{step.title}</h3>
                  <p className="timeline-desc">{step.desc}</p>

                  {step.hasMedia && (
                    <div className="timeline-card-media">
                      <img src={step.imgSrc} alt={step.title} />
                      <span className="timeline-card-badge">{step.badge}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Brand Crest Motto */}
        <div className="story-signature-crest">
          <div className="story-crest-logo-wrap">
            <img 
              src="/images/brand/desikart-logo.png" 
              alt="DesiKart Crest Emblem" 
              className="story-crest-logo"
            />
          </div>
          <span className="signature-motto">"Desi Swaad, Dil Se."</span>
        </div>

      </div>
    </section>
  );
};

export default Story;