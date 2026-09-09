import ScrollReveal from "./ScrollReveal";

interface SkillGroup {
  category: string;
  color: string;
  skills: string[];
}

const skillGroups: SkillGroup[] = [
  {
    category: "Backend",
    color: "#F59E0B",
    skills: ["Java", "Spring Boot", "Oracle DB", "REST API"],
  },
  {
    category: "Frontend",
    color: "#7C3AED",
    skills: ["React", "Vue.js", "AngularJS", "TypeScript", "Next.js"],
  },
  {
    category: "DevOps & Infra",
    color: "#00D4FF",
    skills: [
      "Docker",
      "Docker Compose",
      "GitLab CI/CD",
      "Nginx",
      "Linux",
      "Cloudflare",
    ],
  },
  {
    category: "Monitoring",
    color: "#10B981",
    skills: ["Grafana", "Prometheus", "Netdata", "Uptime Kuma"],
  },
  {
    category: "Networking",
    color: "#EF4444",
    skills: [
      "Cloudflare Tunnel",
      "Tailscale VPN",
      "Reverse Proxy",
      "SSL/TLS",
      "DNS",
    ],
  },
  {
    category: "Learning",
    color: "#F59E0B",
    skills: ["AWS", "Kubernetes", "Terraform", "Ansible"],
  },
];

export default function SkillsTools() {
  return (
    <section id="skills" style={{ position: "relative", zIndex: 1 }}>
      <div className="gradient-divider" />
      <div className="section-container">
        <ScrollReveal>
          <div className="section-label">// skills & tools</div>
          <h2 className="section-title">
            Technical <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="section-subtitle">
            Professional skills from enterprise software delivery combined with
            homelab-forged DevOps capabilities.
          </p>
        </ScrollReveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
            marginTop: "3rem",
          }}
        >
          {skillGroups.map((group, gi) => (
            <ScrollReveal key={group.category} delay={gi * 100}>
              <div className="glass-card" style={{ padding: "1.5rem" }}>
                <div
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: "0.6875rem",
                    color: group.color,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    marginBottom: "1rem",
                  }}
                >
                  {group.category}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                  }}
                >
                  {group.skills.map((skill) => (
                    <span key={skill} className="skill-badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
