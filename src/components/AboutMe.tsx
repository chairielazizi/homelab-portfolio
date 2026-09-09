import ScrollReveal from "./ScrollReveal";

export default function AboutMe() {
  return (
    <section id="about" style={{ position: "relative", zIndex: 1 }}>
      <div className="gradient-divider" />
      <div className="section-container">
        <ScrollReveal>
          <div className="section-label">// about me</div>
          <h2 className="section-title">
            Building{" "}
            <span className="gradient-text">Infrastructure</span>{" "}
            That Matters
          </h2>
        </ScrollReveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            marginTop: "2rem",
          }}
          className="about-grid"
        >
          {/* Bio */}
          <ScrollReveal delay={100}>
            <div className="glass-card" style={{ padding: "2rem" }}>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  marginBottom: "1rem",
                  color: "var(--primary)",
                }}
              >
                Who I Am
              </h3>
              <p
                style={{
                  color: "var(--text-muted)",
                  lineHeight: 1.8,
                  marginBottom: "1rem",
                }}
              >
                Software Developer at <strong style={{ color: "var(--foreground)" }}>Accenture</strong> delivering
                enterprise, regulated (GxP) applications end-to-end. I combine{" "}
                <strong style={{ color: "var(--foreground)" }}>Java/Spring Boot</strong> and Oracle on the backend
                with <strong style={{ color: "var(--foreground)" }}>AngularJS, Vue JS, and React JS</strong> on the
                frontend.
              </p>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>
                Experienced with CI/CD pipelines (<strong style={{ color: "var(--foreground)" }}>GitLab CI/CD</strong>),
                Docker containerization and Linux, with a growing focus on{" "}
                <strong className="gradient-text">DevOps and Cloud Engineering</strong>. Currently expanding
                skills in <strong style={{ color: "var(--foreground)" }}>AWS, Kubernetes, and Terraform</strong>.
              </p>
            </div>
          </ScrollReveal>

          {/* Why Homelab */}
          <ScrollReveal delay={200}>
            <div className="glass-card" style={{ padding: "2rem" }}>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  marginBottom: "1rem",
                  color: "var(--secondary)",
                }}
              >
                Why a Homelab?
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  {
                    icon: "🔧",
                    title: "Hands-On Learning",
                    desc: "Real-world infrastructure automation, containerization, and observability — beyond tutorials.",
                  },
                  {
                    icon: "🛡️",
                    title: "Data Sovereignty",
                    desc: "Full control over personal data — from photos to bookmarks to recipes.",
                  },
                  {
                    icon: "🚀",
                    title: "Career Transition",
                    desc: "Building depth in DevOps practices that translate directly to cloud engineering roles.",
                  },
                  {
                    icon: "🧪",
                    title: "Experimentation",
                    desc: "A safe sandbox to try new tools, break things, and learn from failures.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      alignItems: "flex-start",
                    }}
                  >
                    <span style={{ fontSize: "1.25rem", flexShrink: 0, marginTop: "0.15rem" }}>
                      {item.icon}
                    </span>
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "0.9375rem",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {item.title}
                      </div>
                      <div
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--text-muted)",
                          lineHeight: 1.6,
                        }}
                      >
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Host Machine Spec */}
        <ScrollReveal delay={300}>
          <div
            className="glass-card gradient-border"
            style={{
              marginTop: "2rem",
              padding: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "0.8125rem",
                color: "var(--primary)",
                letterSpacing: "0.05em",
              }}
            >
              HOST MACHINE
            </div>
            {[
              { label: "CPU", value: "AMD Ryzen 7 4800H (8C/16T)" },
              { label: "RAM", value: "32 GB DDR4" },
              { label: "Storage", value: "1 TB NVMe SSD" },
              { label: "OS", value: "EndeavourOS Linux" },
              { label: "Stack", value: "Docker Compose" },
            ].map((spec) => (
              <div
                key={spec.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.6875rem",
                    fontFamily: "var(--font-mono), monospace",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {spec.label}
                </span>
                <span
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "var(--foreground)",
                  }}
                >
                  {spec.value}
                </span>
                <span style={{ color: "var(--border-color)" }}>│</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
