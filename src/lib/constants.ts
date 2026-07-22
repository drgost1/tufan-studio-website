export const BRAND = {
  name: "Tufan Studio",
  tagline: "We Are The Storm",
  description:
    "Game development, cinematics, graphic design, and digital experiences — crafted with the force of a storm.",
} as const;

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Terminal", href: "/tufan-terminal" },
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
] as const;

export const SERVICES = [
  {
    title: "FiveM Servers",
    description: "Full server setup, management, optimization, and infrastructure — built to handle any load.",
    icon: "server",
  },
  {
    title: "FiveM Scripts",
    description: "Custom scripts and resources that hit the market. 10+ sales without any marketing.",
    icon: "code",
  },
  {
    title: "GTA V Cinematics",
    description: "Cinematic videos with GTA V-style production quality and ancient cinema aesthetics.",
    icon: "film",
  },
  {
    title: "Websites",
    description: "High-end web development — from portfolio sites to full-stack applications.",
    icon: "cube",
  },
] as const;

export const PORTFOLIO_ITEMS = [
  {
    title: "FiveM Server Management",
    category: "FiveM",
    description: "Full-stack server management and infrastructure solutions",
    image: "/images/portfolio-fivem-server.png",
    link: "https://tufanstudio.tebex.io/",
    comingSoon: false,
  },
  {
    title: "FiveM Server Development",
    category: "FiveM",
    description: "Custom scripts, resources, and server development",
    image: "/images/portfolio-fivem-dev.png",
    link: "https://tufanstudio.tebex.io/",
    comingSoon: false,
  },
  {
    title: "Cinematic Videos",
    category: "Cinematics",
    description: "GTA V-style and ancient cinema video productions",
    image: "/images/portfolio-cinematics.png",
    link: "https://youtube.com/@tufanstudio_ts",
    comingSoon: false,
  },
  {
    title: "Next Creation",
    category: "Coming Soon",
    description: "Something massive is brewing in the storm",
    image: "/images/portfolio-coming1.png",
    link: null,
    comingSoon: true,
  },
  {
    title: "The Untold",
    category: "Coming Soon",
    description: "Stay tuned for the next chapter",
    image: "/images/portfolio-coming2.png",
    link: null,
    comingSoon: true,
  },
] as const;

export const TEAM_MEMBERS = [
  {
    name: "Nafis Iqbal",
    username: "DRgost1",
    aka: "Obai ZORO",
    role: "Founder",
    tags: ["Full-Stack Developer", "Animator", "Administrator"],
  },
  {
    name: "Nayeem Hossain",
    username: "alhossain",
    aka: "LiQuid Gaming",
    role: "Co-Founder",
    tags: ["3D Modeler / 3D Artist", "Video Editor", "Administrator"],
  },
  {
    name: "Foysal Ahmed",
    username: ".bugfire",
    aka: "Mukhosh",
    role: "Owner",
    tags: ["Level Designer", "Administrator"],
  },
  {
    name: "Md Shohanur Rahman",
    username: "Qtnwte",
    aka: "Reed",
    role: "Creative Member",
    tags: ["3D Modeler", "AI Artist"],
  },
] as const;

export const STATS = [
  { label: "Projects Delivered", value: 15, suffix: "+" },
  { label: "Scripts Sold", value: 10, suffix: "+" },
  { label: "Communities Built", value: 5, suffix: "+" },
  { label: "Lines of Code", value: 50, suffix: "K+" },
] as const;

export const SOCIALS = {
  discord: "https://discord.gg/tufanstudio",
  youtube: "https://youtube.com/@tufanstudio_ts",
  tebex: "https://tufanstudio.tebex.io/",
} as const;

// ======================== //
// TUFAN TERMINAL PRODUCT   //
// ======================== //

export const TUFAN_TERMINAL = {
  name: "Tufan Terminal",
  punchline: "One window. Every shell. Zero chaos.",
  subhead:
    "A frameless, GPU-accelerated terminal workspace for Windows. Group your shells by project, split panes any direction, and never lose a running process to a closed tab again.",
  downloadUrl: "https://www.tufanstudio.net/downloads/Tufan-Terminal-Setup.exe",
  requirements: "Free · Windows 10/11 · 64-bit · ~6 MB · Auto-updates",
  smartScreenNote:
    'Windows may show a SmartScreen prompt on first run since the app isn’t code-signed yet — click "More info" → "Run anyway".',
  homePitch:
    "We build FiveM servers and websites all day — so we built ourselves the terminal we always wanted. Now it's yours too, free.",
} as const;

export const TUFAN_TERMINAL_FEATURES = [
  {
    title: "Projects, not tabs",
    description:
      "Group terminals by what you're working on; your shells survive project switches, running in the background.",
    icon: "folder",
  },
  {
    title: "Visual pane management",
    description:
      "Drag to re-dock, split any direction, stack as tabs, zoom to fullscreen, double-click to rename.",
    icon: "layout",
  },
  {
    title: "Real Windows terminal behavior",
    description:
      "Ctrl+C copies on selection (SIGINT otherwise), Ctrl+V pastes, arrow-key history survives TUIs, mouse works in htop/vim/tmux, true color including Claude Code.",
    icon: "terminal",
  },
  {
    title: "Per-project directories",
    description: "Every project remembers its folder; new terminals open where they belong.",
    icon: "folderOpen",
  },
  {
    title: "Per-pane font zoom",
    description: "Ctrl+scroll zooms only the terminal under your cursor.",
    icon: "zoom",
  },
  {
    title: "4 themes",
    description: "Tufan Crimson, Midnight Blue, Emerald, Porcelain, with matching terminal palettes.",
    icon: "palette",
  },
  {
    title: "Full keyboard control",
    description: "Ctrl+Shift+T/W/D/F/Z, splits with Alt+Shift+arrows, built-in cheatsheet.",
    icon: "keyboard",
  },
  {
    title: "Find in terminal",
    description: "Ctrl+Shift+F with match cycling.",
    icon: "search",
  },
  {
    title: "GPU-accelerated rendering",
    description: "Heavy build logs stay smooth.",
    icon: "gpu",
  },
  {
    title: "Self-updating",
    description: "New versions install themselves from our own server, cryptographically signed.",
    icon: "refresh",
  },
  {
    title: "Four shells",
    description: "PowerShell, CMD, Git Bash, WSL, each in its own directory.",
    icon: "shells",
  },
] as const;

export const TUFAN_TERMINAL_BENEFITS = [
  {
    title: "Everything persists",
    description: "Layouts, shells, themes, sizes, and projects — exactly as you left them.",
  },
  {
    title: "Frameless & theme-matched",
    description: "A draggable, borderless window that looks like part of your OS, not a plugin.",
  },
  {
    title: "Featherweight",
    description: "Built on Tauri + Rust, not Electron — starts instantly, sips memory.",
  },
  {
    title: "Free",
    description: "No license, no trial, no catch. Just download and go.",
  },
] as const;

export const TUFAN_TERMINAL_THEMES = [
  { name: "Tufan Crimson", color: "#E63946" },
  { name: "Midnight Blue", color: "#3A86FF" },
  { name: "Emerald", color: "#2DD4A7" },
  { name: "Porcelain", color: "#F5F5F0" },
] as const;

export const TUFAN_TERMINAL_PROJECTS = [
  { name: "yopekka", color: "#E63946" },
  { name: "termdeck", color: "#3A86FF" },
  { name: "tufan-smp", color: "#2DD4A7" },
] as const;
