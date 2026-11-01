"use client";

import React, { useEffect, useRef } from "react";

interface SteamEffectProps {
  density?: "low" | "medium" | "high";
  height?: string;
  tint?: "white" | "warm" | "turquoise";
}

export default function SteamEffect({ 
  density = "medium", 
  height = "h-48",
  tint = "white"
}: SteamEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let h = (canvas.height = canvas.parentElement?.clientHeight || 250);

    // Optimized particle count (subtle, soft, 0% CPU lag)
    const particleCount = density === "low" ? 12 : density === "medium" ? 20 : 28;
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      maxAlpha: number;
      growRate: number;
    }> = [];

    const getColors = () => {
      switch (tint) {
        case "warm": return "254, 243, 199";
        case "turquoise": return "153, 246, 228";
        default: return "255, 255, 255";
      }
    };
    const rgb = getColors();

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: h - Math.random() * (h * 0.7),
        radius: 25 + Math.random() * 45,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.3 - Math.random() * 0.5,
        alpha: 0,
        maxAlpha: 0.06 + Math.random() * 0.08,
        growRate: 0.12 + Math.random() * 0.18,
      });
    }

    const render = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, h);

      for (let p of particles) {
        p.x += p.vx + Math.sin(p.y * 0.02) * 0.2;
        p.y += p.vy;
        p.radius += p.growRate;

        const lifeRatio = p.y / h;
        if (lifeRatio > 0.6) {
          p.alpha = Math.min(p.maxAlpha, p.alpha + 0.003);
        } else {
          p.alpha = Math.max(0, p.maxAlpha * (p.y / (h * 0.6)));
        }

        if (p.y < -p.radius || p.alpha <= 0.001) {
          p.x = Math.random() * width;
          p.y = h + 10;
          p.radius = 25 + Math.random() * 35;
          p.alpha = 0;
        }

        const grad = ctx.createRadialGradient(
          p.x, p.y, p.radius * 0.1,
          p.x, p.y, p.radius
        );
        grad.addColorStop(0, `rgba(${rgb}, ${p.alpha})`);
        grad.addColorStop(0.6, `rgba(${rgb}, ${p.alpha * 0.3})`);
        grad.addColorStop(1, `rgba(${rgb}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    // Pause when scrolled off screen
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animId);
      }
    }, { threshold: 0.1 });

    observer.observe(canvas);

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || 600;
      h = canvas.height = canvas.parentElement?.clientHeight || 250;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [density, tint]);

  return (
    <div className={`pointer-events-none relative w-full ${height} overflow-hidden`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
