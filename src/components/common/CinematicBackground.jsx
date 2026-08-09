import { useEffect, useRef } from 'react'

function CinematicBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')

    let width = 0
    let height = 0
    let animationFrame

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const smokeParticles = []
    const embers = []

    const DPR = Math.min(window.devicePixelRatio || 1, 2)

    /* ==========================================
       RESIZE
    ========================================== */

    const resizeCanvas = () => {
      const parent = canvas.parentElement

      width = parent.clientWidth
      height = parent.clientHeight

      canvas.width = width * DPR
      canvas.height = height * DPR

      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }

    /* ==========================================
       HELPERS
    ========================================== */

    const random = (min, max) =>
      Math.random() * (max - min) + min

    /* ==========================================
       SMOKE
    ========================================== */

    class SmokeParticle {
      constructor(initial = false) {
        this.reset(initial)
      }

      reset(initial = false) {
        this.x = random(-width * 0.1, width * 1.1)

        this.y = initial
          ? random(height * 0.15, height)
          : height + random(40, 180)

        this.radius = random(90, 240)

        this.velocityX = random(-0.12, 0.12)
        this.velocityY = random(-0.16, -0.05)

        this.opacity = random(0.018, 0.055)

        this.life = random(0.7, 1)
        this.decay = random(0.00025, 0.0006)

        this.warmth = Math.random()
      }

      update() {
        this.x += this.velocityX
        this.y += this.velocityY

        this.life -= this.decay

        /*
         Gentle sideways drift
        */
        this.x += Math.sin(this.y * 0.006) * 0.035

        if (
          this.life <= 0 ||
          this.y < -this.radius * 2
        ) {
          this.reset()
        }
      }

      draw() {
        const alpha =
          this.opacity *
          Math.max(0, this.life)

        const gradient =
          ctx.createRadialGradient(
            this.x,
            this.y,
            0,
            this.x,
            this.y,
            this.radius
          )

        if (this.warmth > 0.5) {
          gradient.addColorStop(
            0,
            `rgba(150, 125, 102, ${alpha})`
          )

          gradient.addColorStop(
            0.45,
            `rgba(105, 82, 66, ${alpha * 0.6})`
          )
        } else {
          gradient.addColorStop(
            0,
            `rgba(185, 174, 160, ${alpha})`
          )

          gradient.addColorStop(
            0.45,
            `rgba(120, 105, 88, ${alpha * 0.5})`
          )
        }

        gradient.addColorStop(
          1,
          'rgba(0,0,0,0)'
        )

        ctx.fillStyle = gradient

        ctx.beginPath()

        ctx.arc(
          this.x,
          this.y,
          this.radius,
          0,
          Math.PI * 2
        )

        ctx.fill()
      }
    }

    /* ==========================================
       EMBERS
    ========================================== */

    class Ember {
      constructor(initial = false) {
        this.reset(initial)
      }

      reset(initial = false) {
        this.x = random(0, width)

        this.y = initial
          ? random(height * 0.55, height)
          : height + random(0, 60)

        this.size = random(0.8, 3.2)

        this.velocityY = random(-1.25, -0.45)

        this.velocityX = random(-0.18, 0.18)

        this.opacity = random(0.35, 1)

        this.life = random(0.65, 1)

        this.decay = random(
          0.0015,
          0.0045
        )

        this.flicker =
          random(0, Math.PI * 2)
      }

      update() {
        this.y += this.velocityY
        this.x += this.velocityX

        /*
         Gentle turbulence
        */
        this.x +=
          Math.sin(
            this.y * 0.025 +
            this.flicker
          ) * 0.18

        this.life -= this.decay

        this.flicker += 0.08

        if (
          this.life <= 0 ||
          this.y < -40
        ) {
          this.reset()
        }
      }

      draw() {
        const flicker =
          0.7 +
          Math.sin(this.flicker) * 0.3

        const alpha =
          this.opacity *
          this.life *
          flicker

        ctx.save()

        ctx.shadowBlur =
          this.size * 5

        ctx.shadowColor =
          'rgba(255, 117, 30, 0.85)'

        const gradient =
          ctx.createRadialGradient(
            this.x,
            this.y,
            0,
            this.x,
            this.y,
            this.size * 2.6
          )

        gradient.addColorStop(
          0,
          `rgba(255, 238, 165, ${alpha})`
        )

        gradient.addColorStop(
          0.3,
          `rgba(255, 180, 70, ${alpha})`
        )

        gradient.addColorStop(
          0.65,
          `rgba(228, 87, 30, ${alpha * 0.8})`
        )

        gradient.addColorStop(
          1,
          'rgba(228,87,30,0)'
        )

        ctx.fillStyle = gradient

        ctx.beginPath()

        ctx.arc(
          this.x,
          this.y,
          this.size * 2.6,
          0,
          Math.PI * 2
        )

        ctx.fill()

        ctx.restore()
      }
    }

    /* ==========================================
       INITIAL PARTICLES
    ========================================== */

    const createParticles = () => {
      smokeParticles.length = 0
      embers.length = 0

      /*
       Smoke count:
       increase this if you want denser smoke.
      */
      const smokeCount =
        width < 700 ? 18 : 30

      /*
       Ember count:
       This controls how "alive" the scene feels.
      */
      const emberCount =
        width < 700 ? 55 : 95

      for (
        let i = 0;
        i < smokeCount;
        i++
      ) {
        smokeParticles.push(
          new SmokeParticle(true)
        )
      }

      for (
        let i = 0;
        i < emberCount;
        i++
      ) {
        embers.push(
          new Ember(true)
        )
      }
    }

    /* ==========================================
       BACKGROUND LIGHTING
    ========================================== */

    const drawLighting = () => {
      /*
       Copper glow behind logo/right side
      */

      const glow =
        ctx.createRadialGradient(
          width * 0.73,
          height * 0.48,
          20,
          width * 0.73,
          height * 0.48,
          Math.max(width, height) * 0.45
        )

      glow.addColorStop(
        0,
        'rgba(184,97,50,0.12)'
      )

      glow.addColorStop(
        0.35,
        'rgba(120,57,26,0.055)'
      )

      glow.addColorStop(
        1,
        'rgba(0,0,0,0)'
      )

      ctx.fillStyle = glow

      ctx.fillRect(
        0,
        0,
        width,
        height
      )

      /*
       Gold warmth behind left text
      */

      const secondaryGlow =
        ctx.createRadialGradient(
          width * 0.25,
          height * 0.55,
          10,
          width * 0.25,
          height * 0.55,
          width * 0.36
        )

      secondaryGlow.addColorStop(
        0,
        'rgba(212,162,76,0.035)'
      )

      secondaryGlow.addColorStop(
        1,
        'rgba(0,0,0,0)'
      )

      ctx.fillStyle = secondaryGlow

      ctx.fillRect(
        0,
        0,
        width,
        height
      )
    }

    /* ==========================================
       ANIMATION LOOP
    ========================================== */

    const animate = () => {
      ctx.clearRect(
        0,
        0,
        width,
        height
      )

      drawLighting()

      /*
       Smoke first so embers stay sharp
      */

      smokeParticles.forEach(
        particle => {
          if (!reducedMotion) {
            particle.update()
          }

          particle.draw()
        }
      )

      embers.forEach(
        ember => {
          if (!reducedMotion) {
            ember.update()
          }

          ember.draw()
        }
      )

      animationFrame =
        requestAnimationFrame(animate)
    }

    /* ==========================================
       START
    ========================================== */

    resizeCanvas()
    createParticles()
    animate()

    const handleResize = () => {
      resizeCanvas()
      createParticles()
    }

    window.addEventListener(
      'resize',
      handleResize
    )

    return () => {
      cancelAnimationFrame(
        animationFrame
      )

      window.removeEventListener(
        'resize',
        handleResize
      )
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="
        pointer-events-none
        absolute inset-0
        h-full w-full
      "
    />
  )
}

export default CinematicBackground