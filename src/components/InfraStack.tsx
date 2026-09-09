import ScrollReveal from "./ScrollReveal";

interface InfraTech {
  name: string;
  description: string;
  role: string;
  color: string;
  icon: string;
}

const infraTech: InfraTech[] = [
  {
    name: "Docker",
    description: "Containerization platform powering every service",
    role: "Runtime",
    color: "#00D4FF",
    icon: "🐳",
  },
  {
    name: "Docker Compose",
    description: "Declarative multi-container orchestration with YAML",
    role: "Orchestration",
    color: "#00D4FF",
    icon: "📄",
  },
  {
    name: "Nginx Proxy Manager",
    description: "Reverse proxy with automatic SSL certificate management",
    role: "Reverse Proxy",
    color: "#10B981",
    icon: "🔀",
  },
  {
    name: "Cloudflare Tunnel",
    description: "Secure tunnel exposing services without port forwarding",
    role: "Exposure",
    color: "#F59E0B",
    icon: "🛡️",
  },
  {
    name: "Tailscale",
    description: "Zero-config WireGuard VPN for secure remote access",
    role: "VPN",
    color: "#7C3AED",
    icon: "🔐",
  },
  {
    name: "Authentik",
    description: "Identity provider & SSO protecting Homepage dashboard",
    role: "Authentication",
    color: "#EF4444",
    icon: "🔑",
  },
  {
    name: "EndeavourOS",
    description: "Arch-based Linux distribution — lightweight and rolling",
    role: "Host OS",
    color: "#7C3AED",
    icon: "🐧",
  },
  {
    name: "Cloudflare DNS",
    description: "DNS management and CDN for *.airiel.space domain",
    role: "DNS / CDN",
    color: "#F59E0B",
    icon: "☁️",
  },
];

export default function InfraStack() {
  return (
    <section id="infrastructure" style={{ position: "relative", zIndex: 1 }}>
      <div className="gradient-divider" />
      <div className="section-container">
        <ScrollReveal>
          <div className="section-label">// infrastructure stack</div>
          <h2 className="section-title">
            The <span className="gradient-text">Foundation</span>
          </h2>
          <p className="section-subtitle">
            Core technologies that power the homelab — from the OS layer up
            through containerization, networking, and security.
          </p>
        </ScrollReveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.25rem",
            marginTop: "3rem",
          }}
        >
          {infraTech.map((tech, i) => (
            <ScrollReveal key={tech.name} delay={i * 80}>
              <div
                className="glass-card gradient-border"
                style={{
                  padding: "1.5rem",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <span style={{ fontSize: "1.5rem" }}>{tech.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "1rem" }}>
                      {tech.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: "0.6875rem",
                        color: tech.color,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {tech.role}
                    </div>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.6,
                  }}
                >
                  {tech.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
