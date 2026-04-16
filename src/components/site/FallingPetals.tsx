"use client";

import { useEffect, useRef } from "react";

// Petal SVG path — a soft organic teardrop shape
const PETAL_PATH =
  "M0,-22 C8,-18 10,-6 6,2 C3,10 0,18 0,22 C0,18 -3,10 -6,2 C-10,-6 -8,-18 0,-22Z";

interface Petal {
  x: number;
  y: number;
  rotation: number;
  rotationSpeed: number;
  speed: number;
  scale: number;
  opacity: number;
  sway: number;
  swaySpeed: number;
  swayOffset: number;
  color: string;
  offsetX: number;
  offsetY: number;    
}

const COLORS = [
  "rgba(255, 105, 180, 0.55)", // hot pink rose
  "rgba(255, 182, 193, 0.55)", // light pink
  "rgba(219, 112, 147, 0.5)",  // pale violet rose
  "rgba(255, 160, 180, 0.45)", // blush
  "rgba(199, 21, 133, 0.4)",   // deep pink
];

function makePetal(canvasWidth: number, fromTop = false): Petal {
  return {
    x: Math.random() * canvasWidth,
    y: fromTop ? Math.random() * -200 : Math.random() * -800,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 1.8,
    speed: 0.6 + Math.random() * 1.0,
    scale: 0.45 + Math.random() * 0.75,
    opacity: 0.35 + Math.random() * 0.5,
    sway: 40 + Math.random() * 60,
    swaySpeed: 0.004 + Math.random() * 0.006,
    swayOffset: Math.random() * Math.PI * 2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    offsetX: (Math.random() - 0.5) * 10,
    offsetY: (Math.random() - 0.5) * 6,
  };
}

export function FallingPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const rafRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 28;
    petalsRef.current = Array.from({ length: COUNT }, () =>
      makePetal(canvas.width, true)
    );

    const path = new Path2D(PETAL_PATH);

    const draw = () => {
      timeRef.current += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of petalsRef.current) {
        p.y += p.speed;
        p.x += Math.sin(timeRef.current * p.swaySpeed + p.swayOffset) * 1.2;
        p.x += (Math.random() - 0.5) * 0.3; // tiny chaos   
        p.rotation += p.rotationSpeed + Math.sin(timeRef.current * 0.01) * 0.2;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x + p.offsetX, p.y + p.offsetY);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.scale(p.scale, p.scale);
        ctx.fillStyle = p.color;
        ctx.fill(path);
        // subtle inner highlight
        ctx.globalAlpha = p.opacity * 0.3;
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.scale(0.5, 0.6);
        ctx.translate(0, -4);
        ctx.fill(path);
        ctx.restore();

        // reset when off screen
        if (p.y > canvas.height + 60) {
          const fresh = makePetal(canvas.width, false);
          Object.assign(p, fresh);
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 1,
      }}
    />
  );
}