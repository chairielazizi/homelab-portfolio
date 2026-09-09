import type { Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
  categoryColor: string;
}

export default function ServiceCard({ service, categoryColor }: ServiceCardProps) {
  return (
    <a
      href={service.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="service-card"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <span
          style={{
            fontSize: "1.5rem",
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            background: "var(--surface-elevated)",
            flexShrink: 0,
          }}
        >
          {service.icon}
        </span>
        <div>
          <div style={{ fontWeight: 600, fontSize: "0.9375rem" }}>
            {service.name}
          </div>
          <div
            style={{
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono), monospace",
              color: categoryColor,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {service.category}
          </div>
        </div>
      </div>

      <p
        style={{
          fontSize: "0.8125rem",
          color: "var(--text-muted)",
          lineHeight: 1.5,
          flex: 1,
        }}
      >
        {service.description}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontSize: "0.75rem",
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono), monospace",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ opacity: 0.7 }}
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {service.githubUrl.replace("https://github.com/", "")}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ marginLeft: "auto", opacity: 0.5, flexShrink: 0 }}
        >
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </div>
    </a>
  );
}
