"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, Compass, Eye, Moon, Sun } from "lucide-react";

export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isNightMode, setIsNightMode] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(isNightMode ? 0x080c10 : 0x0f1d2e, 0.035);

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 12, 28);
    camera.lookAt(0, 2, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(
      isNightMode ? 0x1e293b : 0x64748b, 
      isNightMode ? 1.2 : 2.5
    );
    scene.add(ambientLight);

    const goldSpot = new THREE.SpotLight(0xd4af37, 5, 40, Math.PI / 4, 0.5, 1);
    goldSpot.position.set(0, 18, 5);
    goldSpot.castShadow = true;
    scene.add(goldSpot);

    const poolLight = new THREE.PointLight(0x06b6d4, 3, 20);
    poolLight.position.set(0, 2, 0);
    scene.add(poolLight);

    // Mountain Valley Ground
    const groundGeo = new THREE.PlaneGeometry(60, 60, 40, 40);
    const pos = groundGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const distFromCenter = Math.sqrt(x * x + y * y);
      if (distFromCenter > 8) {
        // Mountain hills on perimeter
        const z = Math.sin(x * 0.2) * Math.cos(y * 0.2) * 4 + (distFromCenter - 8) * 0.4;
        pos.setZ(i, z);
      }
    }
    groundGeo.computeVertexNormals();

    const groundMat = new THREE.MeshStandardMaterial({
      color: isNightMode ? 0x0a1118 : 0x14202e,
      roughness: 0.9,
      metalness: 0.1,
      wireframe: false,
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // Central Hot Sulfur Pool
    const poolGeo = new THREE.CylinderGeometry(6, 6.5, 0.6, 32);
    const poolRimMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.4,
      metalness: 0.2,
    });
    const poolRim = new THREE.Mesh(poolGeo, poolRimMat);
    poolRim.position.y = 0.3;
    scene.add(poolRim);

    // Hot Thermal Water
    const waterGeo = new THREE.CircleGeometry(5.8, 32);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.85,
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.y = 0.55;
    scene.add(waterMesh);

    // Resort Pavilions / Chalets around the pool
    const chaletMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.6,
      metalness: 0.3,
    });
    const goldTrimMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.8,
      roughness: 0.2,
    });
    const windowMat = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
    });

    const createChalet = (x: number, z: number, rotY: number) => {
      const group = new THREE.Group();
      // Base
      const base = new THREE.Mesh(new THREE.BoxGeometry(4, 3, 5), chaletMat);
      base.position.y = 1.5;
      base.castShadow = true;
      group.add(base);

      // Roof (Luxury Arabesque Angle)
      const roof = new THREE.Mesh(new THREE.ConeGeometry(3.6, 2, 4), goldTrimMat);
      roof.position.y = 4;
      roof.rotation.y = Math.PI / 4;
      group.add(roof);

      // Glowing Glass Window
      const win = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.4), windowMat);
      win.position.set(0, 1.6, 2.51);
      group.add(win);

      group.position.set(x, 0, z);
      group.rotation.y = rotY;
      scene.add(group);
      return group;
    };

    createChalet(-9, -4, Math.PI / 6);
    createChalet(9, -4, -Math.PI / 6);
    createChalet(0, -11, 0);

    // Rising Steam Particles (Natural Sulfur Mist)
    const particleCount = 70;
    const steamGeo = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(particleCount * 3);
    const steamVelocities: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      steamPositions[i * 3] = (Math.random() - 0.5) * 8;
      steamPositions[i * 3 + 1] = 0.6 + Math.random() * 4;
      steamPositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      steamVelocities.push(0.02 + Math.random() * 0.03);
    }
    steamGeo.setAttribute("position", new THREE.BufferAttribute(steamPositions, 3));

    const steamMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.65,
      transparent: true,
      opacity: 0.35,
    });
    const steamParticles = new THREE.Points(steamGeo, steamMat);
    scene.add(steamParticles);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / height - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Water ripples
      waterMesh.position.y = 0.55 + Math.sin(time * 3) * 0.03;

      // Animate Steam rising
      const posAttr = steamGeo.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        let y = posAttr.getY(i);
        y += steamVelocities[i];
        if (y > 6) {
          y = 0.6;
          posAttr.setX(i, (Math.random() - 0.5) * 7);
          posAttr.setZ(i, (Math.random() - 0.5) * 7);
        }
        posAttr.setY(i, y);
      }
      posAttr.needsUpdate = true;

      // Smooth camera follow mouse
      targetX += (mouseX * 8 - targetX) * 0.04;
      targetY += (mouseY * 4 - targetY) * 0.04;

      camera.position.x = Math.sin(time * 0.15 + targetX * 0.2) * 22;
      camera.position.z = Math.cos(time * 0.15 + targetX * 0.2) * 22;
      camera.position.y = 11 - targetY;
      camera.lookAt(0, 2.5, 0);

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isNightMode]);

  return (
    <div className="relative w-full h-[520px] lg:h-[640px] rounded-3xl overflow-hidden border border-[#1f2a3c] bg-gradient-to-b from-[#0a1017] via-[#080c10] to-[#040608] shadow-2xl">
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Badges & Controls Overlay */}
      <div className="absolute top-5 right-5 z-20 flex items-center gap-2">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080c10]/80 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs font-semibold shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          مجسم ثلاثي الأبعاد تفاعلي (3D Live View)
        </span>
        <button
          onClick={() => setIsNightMode(!isNightMode)}
          className="p-2 rounded-full bg-[#0f1622]/80 backdrop-blur-md border border-[#1f2a3c] text-slate-300 hover:text-amber-300 transition-colors"
          title="تبديل إضاءة المشهد"
        >
          {isNightMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      {/* Floating Info Pill */}
      <div className="absolute bottom-5 left-5 z-20 hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#080c10]/80 backdrop-blur-md border border-[#1f2a3c] text-xs text-slate-300 shadow-xl">
        <Compass className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: "12s" }} />
        <span>حرّك الماوس لاستكشاف المنتجع ومسابح المياه الكبريتية من جميع الزوايا</span>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#080c10] to-transparent pointer-events-none" />
    </div>
  );
}
