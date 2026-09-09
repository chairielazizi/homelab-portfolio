"use client";

import ScrollReveal from "./ScrollReveal";

interface DiagramNode {
  id: string;
  label: string;
  sublabel?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  icon: string;
}

interface DiagramConnection {
  from: string;
  to: string;
  label?: string;
  color?: string;
}

const nodes: DiagramNode[] = [
  {
    id: "internet",
    label: "Internet",
    sublabel: "*.airiel.space",
    x: 440,
    y: 30,
    width: 160,
    height: 56,
    color: "#6B7A99",
    icon: "🌐",
  },
  {
    id: "cloudflare",
    label: "Cloudflare",
    sublabel: "DNS + CDN",
    x: 440,
    y: 130,
    width: 160,
    height: 56,
    color: "#F59E0B",
    icon: "☁️",
  },
  {
    id: "tunnel",
    label: "Cloudflare Tunnel",
    sublabel: "cloudflared",
    x: 440,
    y: 230,
    width: 160,
    height: 56,
    color: "#F59E0B",
    icon: "🔒",
  },
  {
    id: "tailscale",
    label: "Tailscale VPN",
    sublabel: "Remote Access",
    x: 720,
    y: 230,
    width: 160,
    height: 56,
    color: "#7C3AED",
    icon: "🔐",
  },
  {
    id: "npm",
    label: "Nginx Proxy Mgr",
    sublabel: "Reverse Proxy + SSL",
    x: 440,
    y: 330,
    width: 160,
    height: 56,
    color: "#10B981",
    icon: "🔀",
  },
  {
    id: "authentik",
    label: "Authentik SSO",
    sublabel: "Guards Homepage",
    x: 720,
    y: 330,
    width: 160,
    height: 56,
    color: "#EF4444",
    icon: "🔑",
  },
  // Stacks
  {
    id: "media",
    label: "Media Stack",
    sublabel: "Jellyfin, Sonarr, Radarr...",
    x: 80,
    y: 480,
    width: 160,
    height: 56,
    color: "#7C3AED",
    icon: "🎬",
  },
  {
    id: "monitoring",
    label: "Monitoring",
    sublabel: "Grafana, Uptime Kuma...",
    x: 280,
    y: 480,
    width: 160,
    height: 56,
    color: "#00D4FF",
    icon: "📊",
  },
  {
    id: "cloud",
    label: "Cloud Storage",
    sublabel: "Nextcloud, Immich...",
    x: 480,
    y: 480,
    width: 160,
    height: 56,
    color: "#10B981",
    icon: "☁️",
  },
  {
    id: "devops",
    label: "DevOps Mgmt",
    sublabel: "Portainer, Dozzle...",
    x: 680,
    y: 480,
    width: 160,
    height: 56,
    color: "#00D4FF",
    icon: "🛠️",
  },
  {
    id: "productivity",
    label: "Productivity",
    sublabel: "Linkding, Mealie...",
    x: 880,
    y: 480,
    width: 160,
    height: 56,
    color: "#7C3AED",
    icon: "📝",
  },
];

const connections: DiagramConnection[] = [
  { from: "internet", to: "cloudflare", label: "HTTPS" },
  { from: "cloudflare", to: "tunnel", label: "Tunnel" },
  { from: "tunnel", to: "npm" },
  { from: "tailscale", to: "npm", label: "VPN" },
  { from: "npm", to: "authentik", label: "Auth" },
  { from: "npm", to: "media" },
  { from: "npm", to: "monitoring" },
  { from: "npm", to: "cloud" },
  { from: "npm", to: "devops" },
  { from: "npm", to: "productivity" },
];

function getNodeCenter(node: DiagramNode): { x: number; y: number } {
  return { x: node.x + node.width / 2, y: node.y + node.height / 2 };
}

function getConnectionPoints(
  from: DiagramNode,
  to: DiagramNode
): { x1: number; y1: number; x2: number; y2: number } {
  const fc = getNodeCenter(from);
  const tc = getNodeCenter(to);

  // Determine which edge to connect from
  let x1 = fc.x;
  let y1 = from.y + from.height; // default: bottom
  let x2 = tc.x;
  let y2 = to.y; // default: top

  // If target is to the right
  if (tc.x - fc.x > 200) {
    x1 = from.x + from.width;
    y1 = fc.y;
    x2 = to.x;
    y2 = tc.y;
  }

  return { x1, y1, x2, y2 };
}

export default function ArchitectureDiagram() {
  return (
    <section id="architecture" style={{ position: "relative", zIndex: 1 }}>
      <div className="gradient-divider" />
      <div className="section-container">
        <ScrollReveal>
          <div className="section-label">// architecture</div>
          <h2 className="section-title">
            Network <span className="gradient-text">Topology</span>
          </h2>
          <p className="section-subtitle">
            How traffic flows from the internet to your services — secured by
            Cloudflare Tunnel and Nginx Proxy Manager.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div
            className="glass-card"
            style={{
              marginTop: "3rem",
              padding: "2rem",
              overflowX: "auto",
            }}
          >
            <svg
              viewBox="0 0 1060 580"
              style={{
                width: "100%",
                maxWidth: 1060,
                height: "auto",
                minWidth: 600,
              }}
            >
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <marker
                  id="arrowhead"
                  markerWidth="8"
                  markerHeight="6"
                  refX="8"
                  refY="3"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 8 3, 0 6"
                    fill="var(--primary)"
                    opacity="0.6"
                  />
                </marker>
              </defs>

              {/* Docker Host boundary */}
              <rect
                x="50"
                y="440"
                width="1000"
                height="120"
                rx="16"
                fill="rgba(0, 212, 255, 0.03)"
                stroke="var(--primary)"
                strokeWidth="1"
                strokeDasharray="6 3"
                opacity="0.4"
              />
              <text
                x="70"
                y="465"
                fill="var(--primary)"
                fontSize="10"
                fontFamily="var(--font-mono), monospace"
                opacity="0.6"
                letterSpacing="0.1em"
              >
                DOCKER HOST — AMD RYZEN 7 4800H / 32GB RAM / ENDEAVOUROS
              </text>

              {/* Connections */}
              {connections.map((conn, i) => {
                const from = nodes.find((n) => n.id === conn.from)!;
                const to = nodes.find((n) => n.id === conn.to)!;
                const pts = getConnectionPoints(from, to);

                // Use curved path
                const midY = (pts.y1 + pts.y2) / 2;

                return (
                  <g key={i}>
                    <path
                      d={`M ${pts.x1} ${pts.y1} C ${pts.x1} ${midY}, ${pts.x2} ${midY}, ${pts.x2} ${pts.y2}`}
                      fill="none"
                      stroke={conn.color || "var(--primary)"}
                      strokeWidth="1.5"
                      opacity="0.4"
                      className="arch-line"
                      markerEnd="url(#arrowhead)"
                    />
                    {conn.label && (
                      <text
                        x={(pts.x1 + pts.x2) / 2 + 8}
                        y={midY}
                        fill="var(--text-muted)"
                        fontSize="9"
                        fontFamily="var(--font-mono), monospace"
                      >
                        {conn.label}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Nodes */}
              {nodes.map((node) => (
                <g
                  key={node.id}
                  className="arch-node"
                  filter="url(#glow)"
                >
                  <rect
                    x={node.x}
                    y={node.y}
                    width={node.width}
                    height={node.height}
                    rx="12"
                    fill="var(--surface)"
                    stroke={node.color}
                    strokeWidth="1"
                    opacity="0.9"
                  />
                  {/* Icon */}
                  <text
                    x={node.x + 14}
                    y={node.y + node.height / 2 + 1}
                    fontSize="16"
                    dominantBaseline="middle"
                  >
                    {node.icon}
                  </text>
                  {/* Label */}
                  <text
                    x={node.x + 36}
                    y={node.y + 22}
                    fill="var(--foreground)"
                    fontSize="12"
                    fontWeight="600"
                    fontFamily="var(--font-sans), sans-serif"
                  >
                    {node.label}
                  </text>
                  {/* Sublabel */}
                  {node.sublabel && (
                    <text
                      x={node.x + 36}
                      y={node.y + 40}
                      fill="var(--text-muted)"
                      fontSize="9"
                      fontFamily="var(--font-mono), monospace"
                    >
                      {node.sublabel}
                    </text>
                  )}
                </g>
              ))}
            </svg>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
