export type ServiceCategory =
  | "media"
  | "monitoring"
  | "security"
  | "cloud"
  | "devops"
  | "productivity";

export interface Service {
  name: string;
  description: string;
  githubUrl: string;
  category: ServiceCategory;
  icon: string; // emoji fallback
}

export const categories: Record<
  ServiceCategory,
  { label: string; icon: string; color: string }
> = {
  media: { label: "Media & Entertainment", icon: "🎬", color: "#7C3AED" },
  monitoring: {
    label: "Monitoring & Observability",
    icon: "📊",
    color: "#00D4FF",
  },
  security: { label: "Security & Networking", icon: "🔐", color: "#F59E0B" },
  cloud: { label: "Cloud & Storage", icon: "☁️", color: "#10B981" },
  devops: { label: "DevOps & Management", icon: "🛠️", color: "#00D4FF" },
  productivity: { label: "Productivity", icon: "📝", color: "#7C3AED" },
};

export const services: Service[] = [
  // ── Media & Entertainment ──
  {
    name: "Jellyfin",
    description: "Free software media system for streaming movies & TV",
    githubUrl: "https://github.com/jellyfin/jellyfin",
    category: "media",
    icon: "🎬",
  },
  {
    name: "Navidrome",
    description: "Modern music server and streamer compatible with Subsonic",
    githubUrl: "https://github.com/navidrome/navidrome",
    category: "media",
    icon: "🎵",
  },
  {
    name: "Sonarr",
    description: "Smart PVR for newsgroup and BitTorrent TV shows",
    githubUrl: "https://github.com/Sonarr/Sonarr",
    category: "media",
    icon: "📺",
  },
  {
    name: "Radarr",
    description: "Movie collection manager for Usenet and BitTorrent",
    githubUrl: "https://github.com/Radarr/Radarr",
    category: "media",
    icon: "🎥",
  },
  {
    name: "Lidarr",
    description: "Music collection manager for Usenet and BitTorrent",
    githubUrl: "https://github.com/Lidarr/Lidarr",
    category: "media",
    icon: "🎶",
  },
  {
    name: "Prowlarr",
    description: "Indexer manager/proxy for the Servarr stack",
    githubUrl: "https://github.com/Prowlarr/Prowlarr",
    category: "media",
    icon: "🔍",
  },
  {
    name: "qBittorrent",
    description: "Free and open-source BitTorrent client",
    githubUrl: "https://github.com/qbittorrent/qBittorrent",
    category: "media",
    icon: "⬇️",
  },
  {
    name: "YoutubeDL",
    description: "YouTube downloader with automation features",
    githubUrl: "https://github.com/jmbannon/ytdl-sub",
    category: "media",
    icon: "📹",
  },

  // ── Monitoring & Observability ──
  {
    name: "Grafana",
    description: "Open-source analytics and monitoring platform",
    githubUrl: "https://github.com/grafana/grafana",
    category: "monitoring",
    icon: "📈",
  },
  {
    name: "Netdata",
    description: "Real-time performance and health monitoring",
    githubUrl: "https://github.com/netdata/netdata",
    category: "monitoring",
    icon: "📊",
  },
  {
    name: "Uptime Kuma",
    description: "Self-hosted uptime monitoring tool",
    githubUrl: "https://github.com/louislam/uptime-kuma",
    category: "monitoring",
    icon: "🟢",
  },
  {
    name: "Dozzle",
    description: "Real-time Docker container log viewer",
    githubUrl: "https://github.com/amir20/dozzle",
    category: "monitoring",
    icon: "📋",
  },
  {
    name: "Scrutiny",
    description: "Hard drive S.M.A.R.T health monitoring dashboard",
    githubUrl: "https://github.com/AnalogJ/scrutiny",
    category: "monitoring",
    icon: "💾",
  },
  {
    name: "Glances",
    description: "Cross-platform system monitoring tool",
    githubUrl: "https://github.com/nicolargo/glances",
    category: "monitoring",
    icon: "👀",
  },
  {
    name: "Speedtest Tracker",
    description: "Automated internet speed tracking with analytics",
    githubUrl: "https://github.com/alexjustesen/speedtest-tracker",
    category: "monitoring",
    icon: "🚀",
  },
  {
    name: "NTFY",
    description: "Simple HTTP-based pub-sub push notifications",
    githubUrl: "https://github.com/binwiederhier/ntfy",
    category: "monitoring",
    icon: "🔔",
  },
  {
    name: "NetAlertX",
    description: "Network device monitoring and alerting",
    githubUrl: "https://github.com/jokob-sk/NetAlertX",
    category: "monitoring",
    icon: "🌐",
  },

  // ── Security & Networking ──
  {
    name: "Authentik",
    description: "Identity provider & SSO for Homepage dashboard",
    githubUrl: "https://github.com/goauthentik/authentik",
    category: "security",
    icon: "🔑",
  },
  {
    name: "Nginx Proxy Manager",
    description: "Easy-to-use reverse proxy with Let's Encrypt SSL",
    githubUrl: "https://github.com/NginxProxyManager/nginx-proxy-manager",
    category: "security",
    icon: "🔀",
  },
  {
    name: "Cloudflare Tunnel",
    description: "Secure tunnel to expose services without port forwarding",
    githubUrl: "https://github.com/cloudflare/cloudflared",
    category: "security",
    icon: "🛡️",
  },
  {
    name: "Tailscale",
    description: "Zero-config WireGuard VPN mesh network",
    githubUrl: "https://github.com/tailscale/tailscale",
    category: "security",
    icon: "🔒",
  },
  {
    name: "MeshCentral",
    description: "Full-featured remote management web application",
    githubUrl: "https://github.com/Ylianst/MeshCentral",
    category: "security",
    icon: "🖥️",
  },

  // ── Cloud & Storage ──
  {
    name: "Nextcloud",
    description: "Self-hosted productivity and file sync platform",
    githubUrl: "https://github.com/nextcloud/server",
    category: "cloud",
    icon: "☁️",
  },
  {
    name: "Immich",
    description: "High-performance self-hosted photo and video backup",
    githubUrl: "https://github.com/immich-app/immich",
    category: "cloud",
    icon: "📷",
  },
  {
    name: "Syncthing",
    description: "Continuous peer-to-peer file synchronization",
    githubUrl: "https://github.com/syncthing/syncthing",
    category: "cloud",
    icon: "🔄",
  },
  {
    name: "File Browser",
    description: "Web-based file manager with a clean interface",
    githubUrl: "https://github.com/filebrowser/filebrowser",
    category: "cloud",
    icon: "📁",
  },

  // ── DevOps & Management ──
  {
    name: "Portainer",
    description: "Container management GUI for Docker environments",
    githubUrl: "https://github.com/portainer/portainer",
    category: "devops",
    icon: "🐳",
  },
  {
    name: "Dozzle",
    description: "Lightweight Docker log viewer for real-time streaming",
    githubUrl: "https://github.com/amir20/dozzle",
    category: "devops",
    icon: "📜",
  },
  {
    name: "Web SSH",
    description: "Browser-based SSH terminal client",
    githubUrl: "https://github.com/huashengdun/webssh",
    category: "devops",
    icon: "💻",
  },
  {
    name: "Homepage",
    description: "Highly customizable application dashboard",
    githubUrl: "https://github.com/gethomepage/homepage",
    category: "devops",
    icon: "🏠",
  },

  // ── Productivity ──
  {
    name: "Linkding",
    description: "Self-hosted bookmark manager with tagging",
    githubUrl: "https://github.com/sissbruecker/linkding",
    category: "productivity",
    icon: "🔖",
  },
  {
    name: "Mealie",
    description: "Recipe manager and meal planner with shopping lists",
    githubUrl: "https://github.com/mealie-recipes/mealie",
    category: "productivity",
    icon: "🍳",
  },
  {
    name: "Tracktor",
    description: "Vehicle and mileage tracking application",
    githubUrl: "https://github.com/Jesch101/Tracktor",
    category: "productivity",
    icon: "🚗",
  },
  {
    name: "Kutt",
    description: "Modern URL shortener with analytics",
    githubUrl: "https://github.com/thedevs-network/kutt",
    category: "productivity",
    icon: "✂️",
  },
  {
    name: "Open Recall",
    description: "Fully local privacy-first screen recall assistant",
    githubUrl: "https://github.com/openrecall/openrecall",
    category: "productivity",
    icon: "🧠",
  },
  {
    name: "Whoogle",
    description: "Self-hosted, ad-free, privacy-respecting Google metasearch",
    githubUrl: "https://github.com/benbusby/whoogle-search",
    category: "productivity",
    icon: "🔎",
  },
];
