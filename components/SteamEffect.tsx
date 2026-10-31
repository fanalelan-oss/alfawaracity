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
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 300);

    const particleCount = density === "low" ? 25 : density === "medium" ? 45 : 70;
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
        y: height - Math.random() * (height * 0.7),
        radius: 20 + Math.random() * 50,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.3 - Math.random() * 0.6,
        alpha: 0,
        maxAlpha: 0.08 + Math.random() * 0.14,
        growRate: 0.15 + Math.random() * 0.25,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let p of particles) {
        p.x += p.vx + Math.sin(p.y * 0.02) * 0.3;
        p.y += p.vy;
        p.radius += p.growRate;

        // Fade in when starting, fade out as it reaches the top
        const lifeRatio = p.y / height;
        if (lifeRatio > 0.6) {
          p.alpha = Math.min(p.maxAlpha, p.alpha + 0.005);
        } else {
          p.alpha = Math.max(0, p.maxAlpha * (p.y / (height * 0.6)));
        }

        // Reset particle if it drifted off top or sides
        if (p.y < -p.radius || p.alpha <= 0.001) {
          p.x = Math.random() * width;
          p.y = height + 10;
          p.radius = 20 + Math.random() * 40;
          p.alpha = 0;
        }

        // Draw radial steam puff
        const grad = ctx.createRadialGradient(
          p.x, p.y, p.radius * 0.1,
          p.x, p.y, p.radius
        );
        grad.addColorStop(0, `rgba(${rgb}, ${p.alpha})`);
        grad.addColorStop(0.5, `rgba(${rgb}, ${p.alpha * 0.4})`);
        grad.addColorStop(1, `rgba(${rgb}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [density, tint]);

  return (
    <div className={`absolute inset-x-0 bottom-0 ${height} pointer-events-none overflow-hidden z-10`}>
      <canvas ref={canvasRef} className="w-full h-full opacity-80" />
    </div>
  );
}
