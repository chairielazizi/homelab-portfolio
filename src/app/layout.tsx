import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Orbitron } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chairiel's Homelab | Self-Hosted Infrastructure Portfolio",
  description:
    "Explore Chairiel Azizi's self-hosted homelab — 40+ Docker Compose services running on EndeavourOS Linux, featuring monitoring, media, security, and cloud storage stacks.",
  keywords: [
    "homelab",
    "self-hosted",
    "docker",
    "docker compose",
    "devops",
    "cloud engineering",
    "portfolio",
    "infrastructure",
  ],
  authors: [{ name: "Chairiel Azizi" }],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Chairiel's Homelab",
    description:
      "40+ self-hosted services on a single node with Docker Compose",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${orbitron.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
