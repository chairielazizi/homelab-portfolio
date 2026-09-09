"use client";

import { useState } from "react";
import { services, categories, type ServiceCategory } from "@/data/services";
import ServiceCard from "./ServiceCard";
import ScrollReveal from "./ScrollReveal";

type FilterKey = "all" | ServiceCategory;

export default function ServiceCatalog() {
  const [active, setActive] = useState<FilterKey>("all");

  const filtered =
    active === "all"
      ? services
      : services.filter((s) => s.category === active);

  const tabs: { key: FilterKey; label: string; icon: string }[] = [
    { key: "all", label: "All Services", icon: "⚡" },
    ...Object.entries(categories).map(([key, cat]) => ({
      key: key as ServiceCategory,
      label: cat.label,
      icon: cat.icon,
    })),
  ];

  return (
    <section id="services" style={{ position: "relative", zIndex: 1 }}>
      <div className="gradient-divider" />
      <div className="section-container">
        <ScrollReveal>
          <div className="section-label">// services catalog</div>
          <h2 className="section-title">
            <span className="gradient-text">{services.length}+</span> Self-Hosted
            Services
          </h2>
          <p className="section-subtitle">
            Every service running in Docker Compose — from media streaming to
            network monitoring. Click any card to visit its GitHub repository.
          </p>
        </ScrollReveal>

        {/* Category tabs */}
        <ScrollReveal delay={100}>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`category-tab ${active === tab.key ? "active" : ""}`}
                onClick={() => setActive(tab.key)}
              >
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Service grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
          }}
        >
          {filtered.map((service, i) => (
            <ScrollReveal key={`${service.name}-${service.category}`} delay={i * 40}>
              <ServiceCard
                service={service}
                categoryColor={
                  categories[service.category]?.color || "var(--primary)"
                }
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Count badge */}
        <div
          style={{
            textAlign: "center",
            marginTop: "2rem",
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.8125rem",
            color: "var(--text-muted)",
          }}
        >
          Showing {filtered.length} of {services.length} services
          {active !== "all" && (
            <button
              onClick={() => setActive("all")}
              style={{
                marginLeft: "0.75rem",
                color: "var(--primary)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "inherit",
                textDecoration: "underline",
              }}
            >
              Show all →
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
