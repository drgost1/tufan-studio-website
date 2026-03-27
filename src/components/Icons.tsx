"use client";

const iconProps = {
  width: 28,
  height: 28,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function GamepadIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps} viewBox="0 0 24 24" className={className}>
      <path d="M6 11h4M8 9v4" />
      <circle cx="15" cy="10" r="0.5" fill="currentColor" />
      <circle cx="17" cy="12" r="0.5" fill="currentColor" />
      <path d="M2 15.5V12a6 6 0 0 1 6-6h8a6 6 0 0 1 6 6v3.5a3.5 3.5 0 0 1-6.66 1.5H8.66A3.5 3.5 0 0 1 2 15.5Z" />
    </svg>
  );
}

export function FilmIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps} viewBox="0 0 24 24" className={className}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 8h20M2 16h20M6 4v16M18 4v16" />
    </svg>
  );
}

export function PaletteIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps} viewBox="0 0 24 24" className={className}>
      <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2Z" />
    </svg>
  );
}

export function ServerIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps} viewBox="0 0 24 24" className={className}>
      <rect x="3" y="3" width="18" height="6" rx="1" />
      <rect x="3" y="15" width="18" height="6" rx="1" />
      <path d="M7 6h0M7 18h0M12 10v2M12 12v2" />
    </svg>
  );
}

export function CodeIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps} viewBox="0 0 24 24" className={className}>
      <polyline points="16,18 22,12 16,6" />
      <polyline points="8,6 2,12 8,18" />
      <line x1="14" y1="4" x2="10" y2="20" />
    </svg>
  );
}

export function UsersIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps} viewBox="0 0 24 24" className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function DiscordIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
    </svg>
  );
}

export function YoutubeIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function ShoppingBagIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps} viewBox="0 0 24 24" className={className}>
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

export function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps} viewBox="0 0 24 24" className={className}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function DiamondIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className={className}>
      <path d="M6 0 L12 6 L6 12 L0 6 Z" />
    </svg>
  );
}

export function ArrowDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps} viewBox="0 0 24 24" className={className} width="20" height="20">
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
  );
}

export function MenuIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps} viewBox="0 0 24 24" className={className}>
      <line x1="4" y1="8" x2="20" y2="8" />
      <line x1="4" y1="16" x2="20" y2="16" />
    </svg>
  );
}

export function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps} viewBox="0 0 24 24" className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function ExternalLinkIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps} viewBox="0 0 24 24" className={className} width="16" height="16">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export function CubeIcon({ className = "" }: { className?: string }) {
  return (
    <svg {...iconProps} viewBox="0 0 24 24" className={className}>
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

export const SERVICE_ICONS: Record<string, React.FC<{ className?: string }>> = {
  gamepad: GamepadIcon,
  film: FilmIcon,
  palette: PaletteIcon,
  server: ServerIcon,
  cube: CubeIcon,
  code: CodeIcon,
  users: UsersIcon,
};
