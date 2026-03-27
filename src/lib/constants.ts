export const BRAND = {
  name: "Tufan Studio",
  tagline: "We Are The Storm",
  description:
    "Game development, cinematics, graphic design, and digital experiences — crafted with the force of a storm.",
} as const;

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
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
    image: null,
    link: "https://tufanstudio.tebex.io/",
    comingSoon: false,
  },
  {
    title: "FiveM Server Development",
    category: "FiveM",
    description: "Custom scripts, resources, and server development",
    image: null,
    link: "https://tufanstudio.tebex.io/",
    comingSoon: false,
  },
  {
    title: "Cinematic Videos",
    category: "Cinematics",
    description: "GTA V-style and ancient cinema video productions",
    image: null,
    link: "https://youtube.com/@tufanstudio_ts",
    comingSoon: false,
  },
  {
    title: "Next Creation",
    category: "Coming Soon",
    description: "Something massive is brewing in the storm",
    image: null,
    link: null,
    comingSoon: true,
  },
  {
    title: "The Untold",
    category: "Coming Soon",
    description: "Stay tuned for the next chapter",
    image: null,
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
    tags: ["Level Designer"],
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
