"use client";

import { useEffect, useRef } from "react";

export default function Particles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particleCount = 40;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const el = document.createElement("div");
      el.className = "particle";

      const size = Math.random() * 2 + 1;
      const left = Math.random() * 100;
      const duration = Math.random() * 20 + 15;
      const delay = Math.random() * 20;
      const isCyan = Math.random() > 0.5;

      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.left = `${left}%`;
      el.style.bottom = "-10px";
      el.style.background = isCyan
        ? "rgba(0, 212, 255, 0.6)"
        : "rgba(124, 58, 237, 0.6)";
      el.style.animationDuration = `${duration}s`;
      el.style.animationDelay = `${delay}s`;

      container.appendChild(el);
      particles.push(el);
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
