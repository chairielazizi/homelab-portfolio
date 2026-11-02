"use client";

import { useState, useRef, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";
import { services, categories, ServiceCategory } from "../data/services";

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
  category: ServiceCategory;
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
    category: "security",
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
    category: "security",
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
    category: "security",
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
    category: "security",
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
    category: "security",
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
    category: "security",
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
    category: "media",
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
    category: "monitoring",
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
    category: "cloud",
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
    category: "devops",
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
    category: "productivity",
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

  let x1 = fc.x;
  let y1 = from.y + from.height;
  let x2 = tc.x;
  let y2 = to.y;

  if (tc.x - fc.x > 200) {
    x1 = from.x + from.width;
    y1 = fc.y;
    x2 = to.x;
    y2 = tc.y;
  }

  return { x1, y1, x2, y2 };
}

function getPopoutStyle(node: DiagramNode): React.CSSProperties {
  const popoutWidth = 270;

  // Bottom row stacks (y: 480) -> popout summons above the card
  if (node.y >= 440) {
    let left = node.x + node.width / 2 - popoutWidth / 2;
    left = Math.max(16, Math.min(1060 - popoutWidth - 16, left));
    return {
      position: "absolute",
      left: `${left}px`,
      bottom: `${580 - node.y + 12}px`,
      width: `${popoutWidth}px`,
    };
  }

  // Right-hand nodes (tailscale, authentik at x: 720) -> popout summons to the left
  if (node.x >= 600) {
    return {
      position: "absolute",
      left: `${node.x - popoutWidth - 14}px`,
      top: `${Math.max(20, node.y - 25)}px`,
      width: `${popoutWidth}px`,
    };
  }

  // Center nodes (tunnel and npm) -> summon to the left open area
  if (node.id === "tunnel" || node.id === "npm") {
    return {
      position: "absolute",
      left: `${node.x - popoutWidth - 14}px`,
      top: `${Math.max(20, node.y - 25)}px`,
      width: `${popoutWidth}px`,
    };
  }

  // Internet and Cloudflare -> summon to the right open area
  return {
    position: "absolute",
    left: `${node.x + node.width + 14}px`,
    top: `${Math.max(16, node.y - 10)}px`,
    width: `${popoutWidth}px`,
  };
}

export default function ArchitectureDiagram() {
  const [selectedNode, setSelectedNode] = useState<DiagramNode | null>(null);
  const popoutRef = useRef<HTMLDivElement>(null);

  // Click outside to dismiss popout
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popoutRef.current && !popoutRef.current.contains(e.target as Node)) {
        const target = e.target as HTMLElement;
        if (!target.closest(".arch-node")) {
          setSelectedNode(null);
        }
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSelectedNode(null);
      }
    }

    if (selectedNode) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedNode]);

  const activeCategory: ServiceCategory = selectedNode?.category || "security";
  const categoryInfo = categories[activeCategory];
  const categoryServices = services.filter((s) => s.category === activeCategory);

  // If node matches a specific service (tunnel, authentik, npm, tailscale), prioritize it to top
  const displayedServices = [...categoryServices].sort((a, b) => {
    if (!selectedNode) return 0;
    const target = selectedNode.id.toLowerCase();
    const aMatches =
      a.name.toLowerCase().includes(target) ||
      (target === "tunnel" && a.name.toLowerCase().includes("tunnel")) ||
      (target === "npm" && a.name.toLowerCase().includes("nginx"));
    const bMatches =
      b.name.toLowerCase().includes(target) ||
      (target === "tunnel" && b.name.toLowerCase().includes("tunnel")) ||
      (target === "npm" && b.name.toLowerCase().includes("nginx"));

    if (aMatches && !bMatches) return -1;
    if (!aMatches && bMatches) return 1;
    return 0;
  });

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
            {/* Interactive hint */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
                flexWrap: "wrap",
                gap: "0.5rem",
                fontSize: "0.85rem",
                color: "var(--text-muted)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span className="pulse-dot" style={{ width: 8, height: 8 }} />
                <span>
                  <strong>Interactive Topology:</strong> Click any card to summon its hosted services
                </span>
              </div>
              {selectedNode && (
                <button
                  onClick={() => setSelectedNode(null)}
                  style={{
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: 6,
                    padding: "0.2rem 0.5rem",
                    color: "var(--primary)",
                    cursor: "pointer",
                    fontSize: "0.775rem",
                    transition: "all 0.2s",
                  }}
                >
                  Dismiss ✕
                </button>
              )}
            </div>

            {/* Inner relative container matching SVG 1060px coordinates */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 1060,
                minWidth: 1060,
                margin: "0 auto",
              }}
            >
              <svg
                viewBox="0 0 1060 580"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
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
                {nodes.map((node) => {
                  const isSelected = selectedNode?.id === node.id;
                  return (
                    <g
                      key={node.id}
                      className={`arch-node ${isSelected ? "active" : ""}`}
                      filter="url(#glow)"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedNode((prev) => (prev?.id === node.id ? null : node));
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`View services for ${node.label}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedNode((prev) => (prev?.id === node.id ? null : node));
                        }
                      }}
                    >
                      <rect
                        x={node.x}
                        y={node.y}
                        width={node.width}
                        height={node.height}
                        rx="12"
                        fill={isSelected ? "rgba(26, 32, 53, 0.95)" : "var(--surface)"}
                        stroke={isSelected ? "var(--primary)" : node.color}
                        strokeWidth={isSelected ? "2.5" : "1"}
                        opacity="0.9"
                        style={{ transition: "all 0.25s ease" }}
                      />
                      {/* Active pulse ring */}
                      {isSelected && (
                        <rect
                          x={node.x - 3}
                          y={node.y - 3}
                          width={node.width + 6}
                          height={node.height + 6}
                          rx="15"
                          fill="none"
                          stroke="var(--primary)"
                          strokeWidth="1.5"
                          opacity="0.8"
                          strokeDasharray="4 2"
                        />
                      )}
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
                        fill={isSelected ? "var(--primary)" : "var(--foreground)"}
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
                          fill={isSelected ? "rgba(232, 236, 244, 0.85)" : "var(--text-muted)"}
                          fontSize="9"
                          fontFamily="var(--font-mono), monospace"
                        >
                          {node.sublabel}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Summoned Translucent Popout Column */}
              {selectedNode && (
                <div
                  ref={popoutRef}
                  className="summoned-topology-popout"
                  style={{
                    ...getPopoutStyle(selectedNode),
                    borderColor: `${selectedNode.color}66`,
                    boxShadow: `0 16px 40px rgba(0, 0, 0, 0.65), 0 0 25px ${selectedNode.color}25`,
                  }}
                >
                  {/* Popout Header */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.6rem",
                      paddingBottom: "0.5rem",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                      <span style={{ fontSize: "1.1rem" }}>{selectedNode.icon}</span>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                          <span
                            style={{
                              fontWeight: 700,
                              fontSize: "0.85rem",
                              color: "var(--foreground)",
                            }}
                          >
                            {selectedNode.label}
                          </span>
                          <span
                            style={{
                              fontSize: "0.65rem",
                              padding: "0.1rem 0.4rem",
                              borderRadius: 9999,
                              background: `${selectedNode.color}22`,
                              color: selectedNode.color,
                              fontWeight: 600,
                              border: `1px solid ${selectedNode.color}44`,
                            }}
                          >
                            {displayedServices.length}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedNode(null)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--text-muted)",
                        cursor: "pointer",
                        fontSize: "0.95rem",
                        padding: "0.1rem 0.35rem",
                        lineHeight: 1,
                        borderRadius: "4px",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--text-muted)";
                      }}
                      aria-label="Close popout"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Compact Single Column of Services */}
                  <div
                    style={{
                      maxHeight: "220px",
                      overflowY: "auto",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.3rem",
                      paddingRight: "0.2rem",
                    }}
                  >
                    {displayedServices.map((service) => (
                      <a
                        key={service.name}
                        href={service.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="topology-popout-item"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "0.4rem 0.55rem",
                          borderRadius: "8px",
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid rgba(255, 255, 255, 0.05)",
                          color: "var(--foreground)",
                          textDecoration: "none",
                          fontSize: "0.825rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            overflow: "hidden",
                          }}
                        >
                          <span style={{ fontSize: "1rem" }}>{service.icon}</span>
                          <span
                            style={{
                              fontWeight: 500,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxWidth: "140px",
                            }}
                          >
                            {service.name}
                          </span>
                        </div>
                        <span
                          style={{
                            color: "var(--primary)",
                            fontSize: "0.725rem",
                            opacity: 0.85,
                            marginLeft: "0.4rem",
                            flexShrink: 0,
                            fontFamily: "var(--font-mono), monospace",
                          }}
                        >
                          GitHub ↗
                        </span>
                      </a>
                    ))}
                  </div>

                  {/* Quick link to catalog */}
                  <div
                    style={{
                      marginTop: "0.6rem",
                      paddingTop: "0.5rem",
                      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                      textAlign: "center",
                    }}
                  >
                    <a
                      href="#services"
                      onClick={() => setSelectedNode(null)}
                      style={{
                        fontSize: "0.725rem",
                        color: "var(--primary)",
                        textDecoration: "none",
                        fontWeight: 500,
                      }}
                    >
                      View in Service Catalog ↓
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
