"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about", label: "About" },
    { href: "#architecture", label: "Architecture" },
    { href: "#infrastructure", label: "Stack" },
    { href: "#services", label: "Services" },
    { href: "#skills", label: "Skills" },
  ];

  return (
    <nav
      className="navbar"
      style={{
        boxShadow: scrolled
          ? "0 4px 30px rgba(0, 0, 0, 0.3)"
          : "none",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "4rem",
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <span
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              fontFamily: "var(--font-mono), monospace",
            }}
          >
            <span className="gradient-text">~/</span>
            <span style={{ color: "var(--foreground)" }}>chairiel</span>
          </span>
        </a>

        {/* Desktop links */}
        <div
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
          }}
          className="hidden md:flex"
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
          <a
            href="https://github.com/chairielazizi"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "0.5rem 1rem",
              borderRadius: 9999,
              background: "var(--gradient-primary)",
              color: "#0B0E17",
              fontWeight: 600,
              fontSize: "0.875rem",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
          >
            GitHub
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          style={{
            background: "none",
            border: "none",
            color: "var(--foreground)",
            cursor: "pointer",
            padding: "0.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <span
            style={{
              width: 20,
              height: 2,
              background: "var(--foreground)",
              borderRadius: 1,
              transition: "all 0.3s",
              transform: mobileOpen ? "rotate(45deg) translateY(6px)" : "none",
            }}
          />
          <span
            style={{
              width: 20,
              height: 2,
              background: "var(--foreground)",
              borderRadius: 1,
              opacity: mobileOpen ? 0 : 1,
              transition: "all 0.3s",
            }}
          />
          <span
            style={{
              width: 20,
              height: 2,
              background: "var(--foreground)",
              borderRadius: 1,
              transition: "all 0.3s",
              transform: mobileOpen
                ? "rotate(-45deg) translateY(-6px)"
                : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            padding: "1rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            borderTop: "1px solid var(--border-color)",
          }}
          className="md:hidden"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
