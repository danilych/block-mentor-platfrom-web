import React, { useEffect, useRef } from "react";

interface ParticleOptions {
  particleColor: string;
  lineColor: string;
  particleAmount: number;
  defaultRadius: number;
  variantRadius: number;
  defaultSpeed: number;
  variantSpeed: number;
  linkRadius: number;
}

interface Particle {
  x: number;
  y: number;
  color: string;
  radius: number;
  speed: number;
  directionAngle: number;
  vector: { x: number; y: number };
  update: () => void;
  border: () => void;
  draw: () => void;
}

const ParticleEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const options: ParticleOptions = {
      particleColor: "rgba(255,255,255,0.6)",
      lineColor: "rgba(0,181,255,0.2)",
      particleAmount: 60,
      defaultRadius: 1,
      variantRadius: 1,
      defaultSpeed: 1,
      variantSpeed: 1,
      linkRadius: 300,
    };

    const particles: Particle[] = [];
    const loopIds: number[] = [];

    function initCanvas(
      canvas: HTMLCanvasElement,
      ctx: CanvasRenderingContext2D
    ) {
      const w = (canvas.width = window.innerWidth);
      const h = (canvas.height = window.innerHeight);

      function resizeReset() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      function initialiseParticles() {
        particles.length = 0;
        for (let i = 0; i < options.particleAmount; i++) {
          particles.push(createParticle(w, h));
        }
      }

      function createParticle(w: number, h: number): Particle {
        const angle = Math.random() * 360;
        const radians = angle * (Math.PI / 180);

        return {
          x: Math.random() * w,
          y: Math.random() * h,
          color: options.particleColor,
          radius: options.defaultRadius + Math.random() * options.variantRadius,
          speed: options.defaultSpeed + Math.random() * options.variantSpeed,
          directionAngle: angle,
          vector: {
            x:
              Math.cos(radians) *
              (options.defaultSpeed + Math.random() * options.variantSpeed),
            y:
              Math.sin(radians) *
              (options.defaultSpeed + Math.random() * options.variantSpeed),
          },
          update() {
            this.border();
            this.x += this.vector.x;
            this.y += this.vector.y;
          },
          border() {
            if (this.x >= w || this.x <= 0) this.vector.x *= -1;
            if (this.y >= h || this.y <= 0) this.vector.y *= -1;
            if (this.x > w) this.x = w;
            if (this.y > h) this.y = h;
            if (this.x < 0) this.x = 0;
            if (this.y < 0) this.y = 0;
          },
          draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
          },
        };
      }

      function drawLines() {
        let x1, y1, x2, y2, length, opacity;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            x1 = particles[i].x;
            y1 = particles[i].y;
            x2 = particles[j].x;
            y2 = particles[j].y;
            length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            if (length < options.linkRadius) {
              opacity = 1 - length / options.linkRadius;
              ctx.strokeStyle = `rgba(0,181,255,${opacity * 0.2})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              ctx.closePath();
              ctx.stroke();
            }
          }
        }
      }

      function loop() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach((particle) => {
          particle.update();
          particle.draw();
        });
        drawLines();
        const loopId = requestAnimationFrame(loop);
        loopIds.push(loopId);
      }

      window.addEventListener("resize", () => {
        resizeReset();
        initialiseParticles();
      });

      initialiseParticles();
      loop();
    }

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        initCanvas(canvas, ctx);
      }
    }

    return () => {
      loopIds.forEach((id) => cancelAnimationFrame(id));
      window.removeEventListener("resize", () => {});
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 opacity-50"
    />
  );
};

export default ParticleEffect;
