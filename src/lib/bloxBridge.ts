// Everything the Tufan-Blox-Bridge page says lives here, so the structured data
// is built from the same words a visitor reads.

export const BLOX_BRIDGE = {
  name: "Tufan-Blox-Bridge",
  slug: "roblox-studio-mcp",
  githubUrl: "https://github.com/drgost1/Tufan-Blox-Bridge",
  npmUrl: "https://www.npmjs.com/package/tufan-blox-bridge",
  releasesUrl: "https://github.com/drgost1/Tufan-Blox-Bridge/releases/latest",
  installCommand: "npx -y tufan-blox-bridge@latest setup",
  metaTitle: "Roblox Studio MCP Server and Plugin | Tufan-Blox-Bridge",
  metaDescription:
    "Free Roblox Studio MCP server and plugin. Connect Claude Code, Cursor or any MCP client to Studio with 85 tools, git history, snapshots and a backdoor scanner.",
  intro:
    "Tufan-Blox-Bridge connects Claude Code, Cursor or any MCP client to Roblox Studio. Your AI gets 85 tools for Luau scripts, instances and properties, and you get snapshots, git history and a backdoor scanner to keep its work safe.",
  homePitch:
    "A free Roblox Studio MCP server and plugin. Connect Claude Code or Cursor to Studio, and every AI edit comes with snapshots, git history and a backdoor scanner.",
  images: {
    widget: {
      src: "/images/roblox-mcp/plugin-widget.png?v=2",
      alt: "The Tufan-Blox-Bridge plugin panel in Roblox Studio, connected to a place",
      width: 282,
      height: 282,
    },
    studio: {
      src: "/images/roblox-mcp/studio-plugin.webp",
      alt: "Roblox Studio with the Tufan-Blox-Bridge plugin panel open beside a place",
      width: 1600,
      height: 867,
    },
    social: {
      src: "/images/roblox-mcp/social-preview.png?v=2",
      alt: "Tufan-Blox-Bridge, a Roblox Studio MCP server and plugin",
      width: 1280,
      height: 640,
    },
  },
} as const;

export const BLOX_BRIDGE_AI_PROMPT = `Set up Tufan-Blox-Bridge, a Roblox Studio MCP server and plugin, for this project.

1. Run \`${BLOX_BRIDGE.installCommand}\` in this folder. It installs the server and the Studio plugin, and registers with Claude Code or Cursor.
2. If it says nothing was registered, add the config it prints to your MCP settings, keeping any servers already there.
3. Don't ask me for API keys. They're optional.
4. Tell me what it did and the next steps it printed.`;

export const BLOX_BRIDGE_STATS = [
  { value: "85", label: "MCP tools" },
  { value: "MIT", label: "Open source" },
  { value: "$0", label: "Free to use" },
] as const;

export const BLOX_BRIDGE_STEPS = [
  {
    title: "Run setup",
    description: "You need Node.js 18 or newer. Run the command in your Roblox project folder, or paste the prompt below into your AI agent.",
  },
  {
    title: "Restart Studio and your AI client",
    description: "Setup installs the MCP server and the Studio plugin, and registers with Claude Code or Cursor.",
  },
  {
    title: "Look for the green pill",
    description: "Open the Tufan Studio button in the Studio toolbar. A green pill means your AI is connected.",
  },
] as const;

export const BLOX_BRIDGE_FLOW = [
  { title: "Your AI client", detail: "Claude Code, Cursor or any MCP client", link: "MCP over stdio" },
  { title: "MCP server", detail: "Queues commands, syncs files and runs git on your machine", link: "HTTP on 127.0.0.1:58741" },
  { title: "Studio plugin", detail: "Runs each command inside Roblox Studio and mirrors your scripts", link: null },
] as const;

export const BLOX_BRIDGE_FEATURES = [
  {
    title: "Reversible AI edits",
    description: "snapshot checkpoints any part of your place and restore brings it back exactly, long after Studio's undo stack has moved on.",
    icon: "undo",
  },
  {
    title: "Scripts on disk, both ways",
    description: "Open a place and its scripts mirror to a folder. Edit a file and Studio updates. Edit in Studio and the file updates.",
    icon: "refresh",
  },
  {
    title: "Git history per place",
    description: "12 git tools, off until you switch them on. Commit, diff, push to GitHub, and get deleted scripts back with git_recover.",
    icon: "branch",
  },
  {
    title: "Roblox backdoor scanner",
    description: "scan_backdoors checks scripts, attributes and values for hidden require payloads, obfuscation and Discord webhooks in free models.",
    icon: "shield",
  },
  {
    title: "Luau lint, types and format",
    description: "Selene, luau-lsp and StyLua run over your synced scripts, so your AI catches type errors and bad requires before the code runs.",
    icon: "code",
  },
  {
    title: "Bulk builds in one call",
    description: "batch, create_tree and mass_edit make thousands of changes in one round trip and one undo step, with no throwaway Luau to debug.",
    icon: "cube",
  },
  {
    title: "Performance and UI audits",
    description: "project_health, scan_perf and scan_responsive give you a census of the place, a ranked list of frame killers and tap targets that are too small.",
    icon: "gpu",
  },
  {
    title: "Live game access",
    description: "With your own Open Cloud key: read and edit DataStores, run server Luau against the published game, read production logs and upload assets.",
    icon: "server",
  },
  {
    title: "Read-only mode",
    description: "Set TUFAN_READONLY=1 and the 36 write tools disappear, so an AI can explore your game with no chance of changing it.",
    icon: "search",
  },
] as const;

// Same comparison as the repo README, based on each server's published tool list in November 2026.
export const BLOX_BRIDGE_COMPARISON = [
  { job: "Play test with a real character, keyboard and mouse", builtIn: "Use this", tufan: "Left to the built-in server" },
  { job: "Take a screenshot of the viewport", builtIn: "Use this", tufan: "Left to the built-in server" },
  { job: "Debug inside a running game", builtIn: "Use this", tufan: "Warns the AI and points it there" },
  { job: "Checkpoint and restore after a bad AI edit", builtIn: "Not included", tufan: "snapshot / restore" },
  { job: "Keep scripts on disk with two-way sync", builtIn: "Not included", tufan: "Automatic mirror" },
  { job: "Commit, diff and recover deleted scripts", builtIn: "Not included", tufan: "12 git tools" },
  { job: "Scan free models for backdoors", builtIn: "Not included", tufan: "scan_backdoors" },
  { job: "Lint, type-check and format Luau", builtIn: "Not included", tufan: "Selene, luau-lsp, StyLua" },
  { job: "Read and edit live DataStores", builtIn: "Not included", tufan: "datastore (Open Cloud)" },
  { job: "Build many objects in one call", builtIn: "By writing Luau yourself", tufan: "batch, create_tree, mass_edit" },
] as const;

export const BLOX_BRIDGE_OUTPUT = [
  {
    command: "project_health",
    lines: [
      'Place: "GRAM BANGLA"',
      "Instances: 3960",
      "Scripts:   1  (28.1 KB of Luau)",
      "Parts:     1742  (593 mesh, 0 union)",
      "Particles: 0   Lights: 0",
      "Tags: 104   StreamingEnabled: on",
    ],
  },
  {
    command: "scan_backdoors",
    lines: ["Scanned 1 scripts (+ attributes & values) — no suspicious patterns found."],
  },
] as const;

export const BLOX_BRIDGE_FAQS = [
  {
    question: "What is a Roblox Studio MCP server?",
    answer:
      "MCP, the Model Context Protocol, is how AI coding tools talk to other software. A Roblox Studio MCP server gives your AI tools it can call to read and change your place. Tufan-Blox-Bridge is a free one, with a Studio plugin that carries out each command.",
  },
  {
    question: "How do I connect Claude Code to Roblox Studio?",
    answer:
      "Run npx -y tufan-blox-bridge@latest setup in your Roblox project folder. It installs the server and plugin and registers with Claude Code. Restart Studio and Claude Code, then open the Tufan Studio toolbar button. A green pill means it's connected.",
  },
  {
    question: "Does it work with Cursor and other AI clients?",
    answer:
      "It works with any MCP client over stdio, including Cursor and Claude Desktop, and setup prints the config to add if it can't register for you. We use it every day with Claude Code, so that's the path we've tested most.",
  },
  {
    question: "Does it replace Roblox's built-in Studio MCP?",
    answer:
      "No. It's an add-on. Keep the built-in server for play tests, screenshots and live debugging, and use Tufan for editing, safety, versioning and audits. Tufan tells your AI which server to use for each job.",
  },
  {
    question: "Does it work without the built-in server?",
    answer:
      "Yes, for everything that happens in edit mode. You won't have screenshots or play testing, because Tufan leaves those to the built-in server.",
  },
  {
    question: "Do I need the Studio plugin as well as the npm package?",
    answer:
      "Yes. The npm package is the MCP server your AI talks to, and the plugin carries out the commands inside Studio. The setup command installs both.",
  },
  {
    question: "Is it free?",
    answer:
      "Yes, it's MIT licensed and there's no paid tier. Only the optional AI 3D-asset tools need a paid Meshy plan, and you bring your own keys.",
  },
  {
    question: "Is it safe to use on a real game?",
    answer:
      "You choose how much it can do. Read-only mode hides every write tool, snapshots protect risky edits, and tools that touch your published game need a separate Open Cloud key. Your keys stay on your machine. The backdoor scanner reads your place, not the source of installed plugins, so it can't vouch for those.",
  },
  {
    question: "Does it run on Mac?",
    answer:
      "We build and test it on Windows. A macOS installer is included, but we haven't tested it yet, so please open a GitHub issue if something breaks.",
  },
] as const;
