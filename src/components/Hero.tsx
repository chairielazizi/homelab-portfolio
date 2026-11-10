"use client";

import { useState } from "react";

type TerminalTab = "neofetch" | "docker" | "tunnel" | "security";

export default function Hero() {
  const [activeTab, setActiveTab] = useState<TerminalTab>("neofetch");
  const [copied, setCopied] = useState(false);

  const terminalTabs: { id: TerminalTab; label: string; icon: string }[] = [
    { id: "neofetch", label: "neofetch --homelab", icon: "⚡" },
    { id: "docker", label: "docker compose ps", icon: "🐳" },
    { id: "tunnel", label: "cloudflared tunnel info", icon: "🛡️" },
    { id: "security", label: "netstat -audit", icon: "🔒" },
  ];

  const handleCopy = () => {
    let text = "";
    if (activeTab === "neofetch") {
      text = `OS: EndeavourOS Linux x86_64\nHost: AMD Ryzen 7 4800H (8C/16T)\nRAM: 18.6 GiB / 32.0 GiB\nStorage: 1TB NVMe PCIe SSD\nContainers: 40 active\nIngress: Cloudflare Zero-Trust Tunnel`;
    } else if (activeTab === "docker") {
      text = `40 containers active: homepage, authentik, nginx-proxy-manager, cloudflared, jellyfin, nextcloud, grafana, portainer...`;
    } else if (activeTab === "tunnel") {
      text = `Tunnel: airiel-space-tunnel (Connected: KUL, SIN)\nProtocol: QUIC/HTTP3\nZero inbound ports open.`;
    } else {
      text = `Public WAN: 0 open inbound ports\nIngress: Egress-only Cloudflare Tunnel\nVPN: Tailscale WireGuard mesh`;
    }
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
        padding: "7rem 1.5rem 5rem",
        overflow: "hidden",
      }}
    >
      {/* Perspective Cyber Grid Background */}
      <div className="hero-perspective-grid" aria-hidden="true" />

      {/* Ambient Spotlight Glow */}
      <div className="hero-ambient-spotlight" aria-hidden="true" />

      {/* Top Telemetry Status Pill */}
      <div className="hero-status-pill">
        <span className="pulse-dot" style={{ width: 8, height: 8 }} />
        <span>HOST NODE ONLINE • 100% OPERATIONAL • AMD RYZEN 7 4800H</span>
      </div>

      {/* Main Hero Header */}
      <h1
        style={{
          fontSize: "clamp(2.5rem, 5.5vw, 4.25rem)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.15,
          marginBottom: "1rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        <span className="gradient-text">Chairiel&apos;s</span>{" "}
        <span style={{ color: "var(--foreground)" }}>Homelab</span>
      </h1>

      {/* Futuristic Career Transition Capsule */}
      <div className="futuristic-subtitle-container" style={{ position: "relative", zIndex: 2 }}>
        <span style={{ color: "#e8ecf4", fontWeight: 600 }}>
          Full Stack Developer
        </span>
        <span className="futuristic-arrow" aria-hidden="true">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="12" x2="20" y2="12" />
            <polyline points="13 5 20 12 13 19" />
          </svg>
        </span>
        <span
          style={{
            fontWeight: 700,
            background: "linear-gradient(135deg, #00d4ff 0%, #a855f7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 10px rgba(0, 212, 255, 0.4))",
          }}
        >
          DevOps / Cloud Engineer
        </span>
      </div>

      {/* Concise Punchy Subtitle */}
      <p
        style={{
          fontSize: "clamp(0.95rem, 1.8vw, 1.125rem)",
          color: "var(--text-muted)",
          maxWidth: 680,
          margin: "0 auto 2.25rem",
          lineHeight: 1.6,
          position: "relative",
          zIndex: 2,
        }}
      >
        Enterprise-grade, self-hosted infrastructure orchestrating{" "}
        <strong style={{ color: "#e8ecf4" }}>40+ containerized workloads</strong> on bare-metal{" "}
        <strong style={{ color: "#e8ecf4" }}>EndeavourOS Linux</strong>. Secured with Cloudflare Zero-Trust Tunnel, Authentik SSO, and zero open inbound ports.
      </p>

      {/* CTA Links */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "3.5rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        <a href="#architecture" className="hero-btn-primary">
          Explore Architecture ↓
        </a>
        <a
          href="https://github.com/chairielazizi/devops-project"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-btn-devops"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="6" y1="3" x2="6" y2="15" />
            <circle cx="18" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <path d="M18 9a9 9 0 0 1-9 9" />
          </svg>
          DevOps Project
        </a>
        <a
          href="https://github.com/chairielazizi"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-btn-secondary"
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
          className="hero-btn-secondary"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </a>
      </div>

      {/* ── Bespoke Centerpiece Artifact: Interactive Server Telemetry HUD ── */}
      <div className="hero-terminal-window">
        {/* Terminal Window Header */}
        <div className="terminal-header">
          <div className="terminal-controls">
            <span className="terminal-dot red" />
            <span className="terminal-dot yellow" />
            <span className="terminal-dot green" />
          </div>

          <div
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "0.8rem",
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span>chairiel@endeavour-homelab: ~/telemetry</span>
          </div>

          <button
            onClick={handleCopy}
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "6px",
              padding: "0.25rem 0.55rem",
              color: copied ? "var(--success)" : "var(--text-muted)",
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono), monospace",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            title="Copy command output"
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>

        {/* Interactive Command Tabs */}
        <div className="terminal-command-bar">
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginRight: "0.25rem", fontFamily: "var(--font-mono), monospace" }}>
            Quick Run:
          </span>
          {terminalTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`terminal-command-chip ${activeTab === tab.id ? "active" : ""}`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Terminal Body */}
        <div className="terminal-body">
          {/* Active Command Line */}
          <div className="terminal-prompt-line">
            <span style={{ color: "#10b981" }}>chairiel@endeavour</span>
            <span style={{ color: "var(--text-muted)" }}>:</span>
            <span style={{ color: "var(--secondary)" }}>~/infrastructure</span>
            <span style={{ color: "var(--foreground)" }}>$</span>
            <span style={{ color: "var(--primary)" }}>
              {activeTab === "neofetch" && "neofetch --homelab"}
              {activeTab === "docker" && "docker compose ps --format \"table {{.Name}}\\t{{.Status}}\\t{{.Ports}}\""}
              {activeTab === "tunnel" && "cloudflared tunnel info airiel-space-tunnel"}
              {activeTab === "security" && "netstat -audit --wan-inbound"}
            </span>
          </div>

          {/* Tab 1: Neofetch System Overview */}
          {activeTab === "neofetch" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
              <div>
                <p style={{ margin: "0.2rem 0", color: "#e8ecf4" }}>
                  <span style={{ color: "var(--primary)", fontWeight: 600 }}>OS:</span> EndeavourOS Linux x86_64
                </p>
                <p style={{ margin: "0.2rem 0", color: "#e8ecf4" }}>
                  <span style={{ color: "var(--primary)", fontWeight: 600 }}>Host:</span> AMD Ryzen 7 4800H (8 Cores, 16 Threads @ 4.2GHz)
                </p>
                <p style={{ margin: "0.2rem 0", color: "#e8ecf4" }}>
                  <span style={{ color: "var(--primary)", fontWeight: 600 }}>Memory:</span> 18.6 GiB / 32.0 GiB DDR4 (58% allocated)
                </p>
                <p style={{ margin: "0.2rem 0", color: "#e8ecf4" }}>
                  <span style={{ color: "var(--primary)", fontWeight: 600 }}>Storage:</span> 1TB NVMe PCIe 3.0 SSD (Docker Volumes & Data)
                </p>
              </div>
              <div>
                <p style={{ margin: "0.2rem 0", color: "#e8ecf4" }}>
                  <span style={{ color: "var(--primary)", fontWeight: 600 }}>Ingress:</span> Cloudflare Zero-Trust Tunnel (No router ports open)
                </p>
                <p style={{ margin: "0.2rem 0", color: "#e8ecf4" }}>
                  <span style={{ color: "var(--primary)", fontWeight: 600 }}>Reverse Proxy:</span> Nginx Proxy Manager (51 active SSL routes)
                </p>
                <p style={{ margin: "0.2rem 0", color: "#e8ecf4" }}>
                  <span style={{ color: "var(--primary)", fontWeight: 600 }}>Identity Gate:</span> Authentik SSO (Homepage Dashboard Entrypoint)
                </p>
                <p style={{ margin: "0.2rem 0", color: "#e8ecf4" }}>
                  <span style={{ color: "var(--primary)", fontWeight: 600 }}>Uptime:</span> 100% Operational (Container Auto-Healing enabled)
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: Docker Compose Workloads */}
          {activeTab === "docker" && (
            <div style={{ color: "var(--text-muted)", fontSize: "0.8rem", overflowX: "auto" }}>
              <div style={{ color: "#00d4ff", fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "0.3rem", marginBottom: "0.4rem" }}>
                CONTAINER NAME        STATUS               INGRESS / ROLE
              </div>
              <p style={{ margin: "0.2rem 0", color: "#e8ecf4" }}>
                <span style={{ color: "#10b981" }}>●</span> homepage              <span style={{ color: "#10b981" }}>Up (healthy)</span>        https://homepage.airiel.space
              </p>
              <p style={{ margin: "0.2rem 0", color: "#e8ecf4" }}>
                <span style={{ color: "#10b981" }}>●</span> authentik-server      <span style={{ color: "#10b981" }}>Up (healthy)</span>        SSO Identity Provider (Gate)
              </p>
              <p style={{ margin: "0.2rem 0", color: "#e8ecf4" }}>
                <span style={{ color: "#10b981" }}>●</span> nginx-proxy-mgr       <span style={{ color: "#10b981" }}>Up (healthy)</span>        Port 80/443 SSL Ingress Router
              </p>
              <p style={{ margin: "0.2rem 0", color: "#e8ecf4" }}>
                <span style={{ color: "#10b981" }}>●</span> cloudflared           <span style={{ color: "#10b981" }}>Up (healthy)</span>        Zero-Trust Outbound Tunnel
              </p>
              <p style={{ margin: "0.2rem 0", color: "#e8ecf4" }}>
                <span style={{ color: "#10b981" }}>●</span> jellyfin              <span style={{ color: "#10b981" }}>Up (healthy)</span>        Port 8096 (Media Server Stack)
              </p>
              <p style={{ margin: "0.2rem 0", color: "#e8ecf4" }}>
                <span style={{ color: "#10b981" }}>●</span> nextcloud-aio         <span style={{ color: "#10b981" }}>Up (healthy)</span>        Port 8080 (Cloud File Sync)
              </p>
              <p style={{ margin: "0.2rem 0", color: "#e8ecf4" }}>
                <span style={{ color: "#10b981" }}>●</span> grafana + prometheus  <span style={{ color: "#10b981" }}>Up (healthy)</span>        Real-time Observability Stack
              </p>
              <p style={{ margin: "0.2rem 0", color: "var(--primary)", fontStyle: "italic", marginTop: "0.5rem" }}>
                + 33 additional containers running under Docker Compose stacks...
              </p>
            </div>
          )}

          {/* Tab 3: Cloudflare Tunnel Ingress */}
          {activeTab === "tunnel" && (
            <div style={{ color: "#e8ecf4", fontSize: "0.825rem" }}>
              <p style={{ margin: "0.25rem 0" }}>
                <span style={{ color: "#f59e0b", fontWeight: 600 }}>Tunnel Name:</span> airiel-space-tunnel (cloudflared daemon)
              </p>
              <p style={{ margin: "0.25rem 0" }}>
                <span style={{ color: "#f59e0b", fontWeight: 600 }}>Connector ID:</span> 8c3a-45fe-9d3c-homelab
              </p>
              <p style={{ margin: "0.25rem 0" }}>
                <span style={{ color: "#f59e0b", fontWeight: 600 }}>Edge PoPs:</span> KUL (Kuala Lumpur, MY) &amp; SIN (Singapore, SG)
              </p>
              <p style={{ margin: "0.25rem 0" }}>
                <span style={{ color: "#f59e0b", fontWeight: 600 }}>Routing:</span> Outbound-only TLS over QUIC / HTTP3 (Zero Inbound WAN Ports)
              </p>
              <p style={{ margin: "0.25rem 0" }}>
                <span style={{ color: "#f59e0b", fontWeight: 600 }}>DDoS Protection:</span> Cloudflare Edge Layer 7 WAF &amp; Enterprise DNS
              </p>
              <p style={{ margin: "0.5rem 0 0", color: "#10b981", fontWeight: 600 }}>
                ● Status: Active &amp; Routing traffic securely to Nginx Proxy Manager
              </p>
            </div>
          )}

          {/* Tab 4: Security Audit */}
          {activeTab === "security" && (
            <div style={{ color: "#e8ecf4", fontSize: "0.825rem" }}>
              <p style={{ margin: "0.25rem 0" }}>
                <span style={{ color: "#ef4444", fontWeight: 600 }}>Inbound Ports Forwarded:</span> 0 (Zero router port forwarding)
              </p>
              <p style={{ margin: "0.25rem 0" }}>
                <span style={{ color: "var(--primary)", fontWeight: 600 }}>Public Entrypoint:</span> Cloudflare Tunnel → Authentik SSO Protected
              </p>
              <p style={{ margin: "0.25rem 0" }}>
                <span style={{ color: "var(--secondary)", fontWeight: 600 }}>Mesh Network:</span> Tailscale WireGuard (Internal admin access only)
              </p>
              <p style={{ margin: "0.25rem 0" }}>
                <span style={{ color: "#10b981", fontWeight: 600 }}>SSL/TLS Strategy:</span> Wildcard SSL certificates automated via Let&apos;s Encrypt &amp; NPM
              </p>
              <p style={{ margin: "0.5rem 0 0", color: "#10b981", fontWeight: 600 }}>
                ● Security Posture: Air-gapped ingress, automated renewal, MFA enforced
              </p>
            </div>
          )}

          {/* Terminal Blinking Cursor */}
          <div style={{ marginTop: "0.85rem", color: "var(--primary)" }}>
            <span style={{ color: "var(--text-muted)" }}>$ </span>
            <span className="terminal-cursor" />
          </div>
        </div>

        {/* Telemetry Hardware Metrics Bar */}
        <div className="hero-telemetry-bar">
          <div className="telemetry-item">
            <div className="telemetry-value">
              <span style={{ color: "#00d4ff" }}>1</span>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 400 }}>Node</span>
            </div>
            <div className="telemetry-label">Bare-Metal Host</div>
          </div>

          <div className="telemetry-item">
            <div className="telemetry-value">
              <span style={{ color: "#10b981" }}>40+</span>
            </div>
            <div className="telemetry-label">Active Containers</div>
          </div>

          <div className="telemetry-item">
            <div className="telemetry-value">
              <span style={{ color: "#7c3aed" }}>51</span>
            </div>
            <div className="telemetry-label">SSL Proxy Rules</div>
          </div>

          <div className="telemetry-item">
            <div className="telemetry-value">
              <span style={{ color: "#f59e0b" }}>0</span>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 400 }}>WAN</span>
            </div>
            <div className="telemetry-label">Ports Forwarded</div>
          </div>
        </div>
      </div>

      {/* Bounce Arrow indicator */}
      <div
        style={{
          marginTop: "2.5rem",
          animation: "bounce 2s infinite",
          opacity: 0.7,
        }}
      >
        <a href="#about" aria-label="Scroll to About section" style={{ color: "var(--text-muted)" }}>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </a>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-8px);
          }
          60% {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </section>
  );
}
