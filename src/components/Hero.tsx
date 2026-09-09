"use client";

import { useEffect, useState } from "react";

function TypeWriter({ texts }: { texts: string[] }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentTextIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentCharIndex < currentText.length) {
            setCurrentCharIndex((prev) => prev + 1);
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (currentCharIndex > 0) {
            setCurrentCharIndex((prev) => prev - 1);
          } else {
            setIsDeleting(false);
            setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? 30 : 60
    );

    return () => clearTimeout(timeout);
  }, [currentCharIndex, isDeleting, currentTextIndex, texts]);

  return (
    <span>
      {texts[currentTextIndex].slice(0, currentCharIndex)}
      <span className="terminal-cursor" />
    </span>
  );
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Hero() {
  const stats = [
    { value: 1, label: "Host Node", suffix: "" },
    { value: 40, label: "Containers", suffix: "+" },
    { value: 51, label: "Proxy Rules", suffix: "" },
    { value: 8, label: "CPU Cores", suffix: "" },
  ];

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
        padding: "6rem 1.5rem 4rem",
      }}
    >
      {/* Terminal prompt label */}
      <div
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.875rem",
          color: "var(--text-muted)",
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span className="pulse-dot" />
        <span>systems online</span>
      </div>

      {/* Name */}
      <h1
        style={{
          fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          marginBottom: "1rem",
        }}
      >
        <span className="gradient-text">Chairiel&apos;s</span>{" "}
        <span style={{ color: "var(--foreground)" }}>Homelab</span>
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: "1.25rem",
          color: "var(--text-muted)",
          marginBottom: "1rem",
          maxWidth: 600,
        }}
      >
        Full Stack Developer → DevOps / Cloud Engineer
      </p>

      {/* Typewriter */}
      <div
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "clamp(0.875rem, 2vw, 1.125rem)",
          color: "var(--primary)",
          marginBottom: "3rem",
          minHeight: "2em",
        }}
      >
        <span style={{ color: "var(--text-muted)" }}>$ </span>
        <TypeWriter
          texts={[
            "Self-hosting 40+ services on a single node",
            "Docker Compose • Cloudflare Tunnel • Tailscale",
            "Monitoring • Media • Security • Cloud Storage",
            "Building infrastructure, one container at a time",
          ]}
        />
      </div>

      {/* Stats bar */}
      <div
        className="glass-card"
        style={{
          display: "flex",
          gap: "2rem",
          padding: "1.5rem 3rem",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "3rem",
        }}
      >
        {stats.map((s) => (
          <div key={s.label} className="stat-item">
            <div className="stat-value">
              <AnimatedCounter target={s.value} suffix={s.suffix} />
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* CTA Links */}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <a
          href="https://github.com/chairielazizi"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.5rem",
            borderRadius: 12,
            background: "var(--gradient-primary)",
            color: "#0B0E17",
            fontWeight: 600,
            textDecoration: "none",
            transition: "opacity 0.2s, transform 0.2s",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/chairielazizi/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.5rem",
            borderRadius: 12,
            border: "1px solid var(--border-color)",
            color: "var(--foreground)",
            fontWeight: 500,
            textDecoration: "none",
            transition: "border-color 0.2s, transform 0.2s",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </a>
        <a
          href="#architecture"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.5rem",
            borderRadius: 12,
            border: "1px solid var(--border-color)",
            color: "var(--text-muted)",
            fontWeight: 500,
            textDecoration: "none",
            transition: "border-color 0.2s, color 0.2s",
          }}
        >
          Explore Architecture ↓
        </a>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          animation: "bounce 2s infinite",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--text-muted)"
          strokeWidth="2"
        >
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }
      `}</style>
    </section>
  );
}
