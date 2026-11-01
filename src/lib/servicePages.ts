// Content for the three hire pages. Every claim here is backed by something real:
// a live URL, a product on sale or Nafis's CV. Don't add numbers that can't be checked.

export const SITE_URL = "https://www.tufanstudio.net";

export type ServiceSlug = "fivem-developer" | "web-developer" | "roblox-developer";

export type ServiceWorkItem = {
  title: string;
  label: string;
  description: string;
  image?: string;
  imageAlt?: string;
  href?: string;
  linkLabel?: string;
};

export type ServicePageContent = {
  slug: ServiceSlug;
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  serviceType: string;
  kicker: string;
  heading: string;
  punchline: string;
  intro: string;
  watermark: string;
  projectType: string;
  stats: readonly { value: string; label: string }[];
  offersKicker: string;
  offersHeading: readonly [string, string];
  offers: readonly { title: string; description: string; icon: string }[];
  workKicker: string;
  workHeading: readonly [string, string];
  workIntro: string;
  work: readonly ServiceWorkItem[];
  processHeading: readonly [string, string];
  process: readonly { title: string; description: string }[];
  stack: readonly string[];
  faqs: readonly { question: string; answer: string }[];
  quoteHeading: readonly [string, string];
  quoteIntro: string;
};

export const SERVICE_PAGES: Record<ServiceSlug, ServicePageContent> = {
  "fivem-developer": {
    slug: "fivem-developer",
    navLabel: "FiveM Developer",
    metaTitle: "FiveM Developer for Custom Scripts & Servers",
    metaDescription:
      "Hire a FiveM developer for custom Lua scripts, React NUI, framework bridges and server setup on Qbox, QBCore and ESX. Written by hand, validated server-side.",
    serviceType: "FiveM script and server development",
    kicker: "Custom FiveM Development",
    heading: "FiveM Developer",
    punchline: "Scripts that hold up when players try to break them.",
    intro:
      "Tufan Studio writes custom FiveM resources in Lua by hand: gameplay systems, React NUI and the framework bridges that let one script run on Qbox, QBCore and ESX. The server decides what is allowed, never the client.",
    watermark: "LUA",
    projectType: "FiveM Script / Resource",
    stats: [
      { value: "3", label: "Frameworks plus standalone" },
      { value: "24", label: "Character select layouts" },
      { value: "v1.12", label: "Our own framework bridge" },
      { value: "Tebex", label: "Sold in our own store" },
    ],
    offersKicker: "What You Can Hire Us For",
    offersHeading: ["BUILT FOR YOUR", "SERVER"],
    offers: [
      {
        title: "Custom scripts",
        description:
          "Jobs, heists, crews, garages and whatever your server's roleplay needs, built around your rules and not a resold pack.",
        icon: "code",
      },
      {
        title: "NUI interfaces",
        description:
          "React and TypeScript menus, HUDs and character screens, kept light enough to stay smooth in the in-game browser.",
        icon: "gamepad",
      },
      {
        title: "Framework bridges and ports",
        description:
          "Move a resource between Qbox, QBCore and ESX, or put one API in front of all three so it stops caring which one it runs on.",
        icon: "cube",
      },
      {
        title: "Server setup",
        description:
          "A clean Qbox or QBCore base on your VPS: database, ox stack and resources configured, with the install explained so you can run it.",
        icon: "server",
      },
    ],
    workKicker: "Real Work",
    workHeading: ["WHAT WE HAVE", "BUILT"],
    workIntro:
      "These are systems we built and run on our own Qbox and QBCore development servers, plus the script we sell on Tebex.",
    work: [
      {
        title: "24-layout character select",
        label: "React NUI",
        description:
          "A multicharacter screen with 24 switchable layouts, from cinematic to data sheet, built on the same data underneath.",
        image: "/images/work-fivem-multichar.webp",
        imageAlt: "Tufan character select screen in GTA V showing a player above the city with character slots",
      },
      {
        title: "Aircraft Carrier Heist",
        label: "On Tebex",
        description:
          "Our standalone heist script, with cutscenes and server-side validation, on sale now in our Tebex store.",
        image: "/images/portfolio-fivem-dev.png",
        imageAlt: "Tufan Studio FiveM development artwork",
        href: "https://tufanstudio.tebex.io/category/scripts",
        linkLabel: "See it on Tebex",
      },
      {
        title: "tufan bridge",
        label: "v1.12",
        description:
          "One API across Qbox, QBCore and ESX for money, items, jobs, housing and more, so feature code never calls a framework directly.",
      },
      {
        title: "Crew, garage and spawn systems",
        label: "Lua + React",
        description:
          "Gang management, a Qbox garage and a spawn selector, each with its own React interface over validated server events.",
      },
    ],
    processHeading: ["HOW WE", "WORK"],
    process: [
      {
        title: "Scope it",
        description: "Tell us your framework, your resources and what the script must do. We read how your server is set up first.",
      },
      {
        title: "Build against the real source",
        description: "We check every export and native against the installed code, because guessing is how FiveM scripts break.",
      },
      {
        title: "Try to break it",
        description: "Every client event gets validated on the server, then tested on our Qbox and QBCore development servers.",
      },
      {
        title: "Hand it over",
        description: "You get the resource, the config and install notes, with support on Discord if something needs another look.",
      },
    ],
    stack: ["Lua", "Qbox", "QBCore", "ESX", "ox_lib", "ox_inventory", "ox_target", "oxmysql", "React", "TypeScript", "NUI"],
    faqs: [
      {
        question: "Which frameworks do you support?",
        answer:
          "Qbox, QBCore and ESX, plus standalone scripts. If your server runs the ox stack, we build for it directly.",
      },
      {
        question: "Can you fix or convert a script I already own?",
        answer:
          "Often, if the code isn't locked by escrow and you have the right to change it. Send it over with the problem and we'll tell you what's realistic.",
      },
      {
        question: "Is the code written by AI?",
        answer:
          "Lua and FiveM are the part we write by hand. It is the platform where a guessed API costs the most, so we read the source and test on our own servers.",
      },
      {
        question: "How do you stop exploits?",
        answer:
          "The client is never trusted. Money, items and permissions are checked on the server, so a modded client can only ask, not decide.",
      },
      {
        question: "How much does a custom script cost?",
        answer:
          "It depends on the scope, so we quote per project. Use the form below with your budget range and we'll tell you what fits.",
      },
    ],
    quoteHeading: ["TELL US WHAT YOUR", "SERVER NEEDS"],
    quoteIntro: "Share your framework and what you want built. We usually reply within 24 hours.",
  },

  "web-developer": {
    slug: "web-developer",
    navLabel: "Web Developer",
    metaTitle: "Web Developer for Custom Websites & Web Apps",
    metaDescription:
      "Custom website development from a studio with 60+ websites built. Laravel and Next.js sites, stores and web apps designed, deployed and run from Bangladesh.",
    serviceType: "Custom website and web application development",
    kicker: "Custom Website Development",
    heading: "Web Developer",
    punchline: "60+ websites built. No templates in the way.",
    intro:
      "Tufan Studio, led by Nafis Iqbal, designs and builds custom websites and web apps, then deploys them and keeps them running. That covers company sites, online stores and full platforms for clients in Bangladesh, the UK, the UAE, Cyprus and Turks and Caicos.",
    watermark: "WEB",
    projectType: "Website / Web App",
    stats: [
      { value: "60+", label: "Websites built" },
      { value: "118", label: "Schools on PRS software" },
      { value: "40+", label: "Active YoPekka stores" },
      { value: "5", label: "Countries with clients" },
    ],
    offersKicker: "What You Can Hire Us For",
    offersHeading: ["ONE TEAM, START TO", "LIVE"],
    offers: [
      {
        title: "Business websites",
        description:
          "Fast, custom-designed sites for healthcare, legal, education, industrial and hospitality businesses, with content you can edit.",
        icon: "cube",
      },
      {
        title: "E-commerce stores",
        description:
          "Stores built for how people actually buy in Bangladesh: cash on delivery, courier integration and fast mobile checkout.",
        icon: "gamepad",
      },
      {
        title: "Web apps and platforms",
        description:
          "Multi-seller marketplaces, school software, restaurant POS and admin panels, built on Laravel and Filament or Next.js.",
        icon: "code",
      },
      {
        title: "Hosting and upkeep",
        description:
          "We run the Linux servers too: deployment, mail that reaches the inbox, security fixes and one-step rollback on every release.",
        icon: "server",
      },
    ],
    workKicker: "Live Work",
    workHeading: ["PRODUCTS RUNNING", "TODAY"],
    workIntro:
      "A few of our own products, all live right now. Open any of them and judge the work for yourself.",
    work: [
      {
        title: "YoPekka",
        label: "Marketplace",
        description:
          "A multi-seller marketplace for Bangladesh with a storefront for each seller, per-seller courier and a landing-page builder.",
        image: "/images/work-yopekka-stores.jpg",
        imageAlt: "YoPekka stores page showing seller store logos",
        href: "https://yopekka.com/",
        linkLabel: "Visit YoPekka",
      },
      {
        title: "PRS Result Software",
        label: "School software",
        description:
          "Used by 118 schools for results, attendance, fees, ID cards, online admission and Bangla or English printing.",
        image: "/images/work-prs.jpg",
        imageAlt: "PRS Result Software homepage with a sample result sheet",
        href: "https://perfectnresults.com/",
        linkLabel: "Visit PRS",
      },
      {
        title: "Thala POS",
        label: "Restaurant POS",
        description:
          "A restaurant billing system with a web app and an Android app that works offline and prints to thermal receipt printers.",
        image: "/images/work-thala.jpg",
        imageAlt: "Thala POS homepage showing a billing screen and printed receipt",
        href: "https://resturantbilling.virtualonline.website/",
        linkLabel: "Visit Thala POS",
      },
      {
        title: "Dominator Championship",
        label: "Esports platform",
        description:
          "A Free Fire tournament platform that draws groups, scores matches, keeps standings and advances stages.",
        image: "/images/portfolio-dominator.jpg",
        imageAlt: "Dominator Championship tournament website",
        href: "https://dominatorofficial.tufanstudio.net/",
        linkLabel: "Visit Dominator",
      },
    ],
    processHeading: ["HOW WE", "WORK"],
    process: [
      {
        title: "Understand the business",
        description: "We start with who your customers are and what the site has to make them do, then pick the stack to suit.",
      },
      {
        title: "Design it to be yours",
        description: "Every site gets its own direction, type and layout, so it doesn't look like a template with a new logo.",
      },
      {
        title: "Build AI-first, reviewed by hand",
        description: "Nafis sets the architecture and design, directs the AI and reviews every change. Nothing ships unread.",
      },
      {
        title: "Launch and keep it running",
        description: "We check it at phone and desktop sizes, deploy it, confirm it live and stay on hand for the fixes that follow.",
      },
    ],
    stack: ["Laravel", "Filament", "Livewire", "Next.js", "React", "TypeScript", "Astro", "Tailwind CSS", "GSAP", "Three.js", "MySQL", "Redis", "Nginx", "Cloudflare"],
    faqs: [
      {
        question: "Do you use WordPress or templates?",
        answer:
          "No. We build on Laravel, Next.js or Astro depending on the job, and design each site from scratch. You still get an admin panel when you need to edit content.",
      },
      {
        question: "Do you work with clients outside Bangladesh?",
        answer:
          "Yes. We have built for clients in the UK, the UAE, Cyprus and Turks and Caicos, and we take international payment through Payoneer and Wise.",
      },
      {
        question: "How do you use AI?",
        answer:
          "We work AI-first for web projects. Nafis sets the architecture and design, directs the AI, reviews every change and runs the result in production. You get the speed without unreviewed code.",
      },
      {
        question: "Can you host and maintain the site?",
        answer:
          "Yes. We run our own Linux servers and can handle hosting, mail and security updates. We can also deploy to a server you already have.",
      },
      {
        question: "How much does a website cost?",
        answer:
          "A company site and a multi-seller platform are very different jobs, so we quote per project. Pick a budget range in the form and we'll tell you what it can cover.",
      },
    ],
    quoteHeading: ["TELL US WHAT YOU", "WANT BUILT"],
    quoteIntro: "A rough idea is enough to start. We usually reply within 24 hours.",
  },

  "roblox-developer": {
    slug: "roblox-developer",
    navLabel: "Roblox Developer",
    metaTitle: "Roblox Developer for Games & Luau Scripts",
    metaDescription:
      "Hire a Roblox developer for Luau gameplay scripts, catalog avatar systems, emote menus, Studio plugins and 3D assets. Built and reviewed by Tufan Studio.",
    serviceType: "Roblox game and Luau script development",
    kicker: "Roblox Game Development",
    heading: "Roblox Developer",
    punchline: "Gameplay systems, avatar tools and the assets behind them.",
    intro:
      "Tufan Studio builds Roblox systems in Luau: client and server gameplay scripts, avatar and catalog features, and Studio tooling. Our 3D artists and level designers can supply the models and maps to go with them.",
    watermark: "LUAU",
    projectType: "Roblox Game / Script",
    stats: [
      { value: "Luau", label: "Client and server code" },
      { value: "API", label: "Roblox Catalog systems" },
      { value: "3D", label: "Models and level design" },
      { value: "AI-first", label: "Reviewed before delivery" },
    ],
    offersKicker: "What You Can Hire Us For",
    offersHeading: ["SYSTEMS FOR YOUR", "GAME"],
    offers: [
      {
        title: "Gameplay scripting",
        description:
          "Client and server systems in Luau, with the important decisions kept on the server so exploiters have less to work with.",
        icon: "code",
      },
      {
        title: "Avatar and catalog features",
        description:
          "Let players browse and try on catalog items in your game, or add emote menus powered by the Roblox Catalog API.",
        icon: "users",
      },
      {
        title: "Studio plugins and tools",
        description:
          "Custom plugins that speed up your team's work inside Roblox Studio, like generating repeat builds from modular pieces.",
        icon: "gamepad",
      },
      {
        title: "3D assets and levels",
        description:
          "Models from Blender, cleaned up with PBR materials for Roblox, plus level design from our own artists.",
        icon: "cube",
      },
    ],
    workKicker: "Real Work",
    workHeading: ["WHAT WE HAVE", "BUILT"],
    workIntro:
      "Gram Bangla is the game we are working on now, and these are the systems we have built so far. We don't claim player numbers we can't back up.",
    work: [
      {
        title: "Gram Bangla",
        label: "Coming soon",
        description: "A Roblox life sim and roleplay game set in rural Bengal. This is a 3D render of its village market.",
        image: "/images/work-gram-bangla-shops.jpg",
        imageAlt: "3D render of a Bengal village market with Bangla shop signs and tin roofs",
      },
      {
        title: "Village 3D assets",
        label: "Blender to Studio",
        description: "Tea stall, benches, clay stove and more, modelled with PBR materials for Gram Bangla's village.",
        image: "/images/work-gram-bangla-stall.jpg",
        imageAlt: "3D render of a bamboo tea stall with a rusted tin roof and wooden benches",
      },
      {
        title: "Catalog avatar creator",
        label: "In-game system",
        description: "Players browse the Roblox catalog from inside the game and try items on their avatar before deciding.",
      },
      {
        title: "Emote menu",
        label: "Catalog API",
        description: "An in-game emote browser built on the Roblox Catalog API, so the list doesn't have to be maintained by hand.",
      },
      {
        title: "Gameplay scripts",
        label: "Client + server",
        description: "Scripts for client and server gameplay systems, written in Luau and tested in Roblox Studio.",
      },
      {
        title: "Tufan Modular Builder",
        label: "Studio plugin, paused",
        description: "A Studio plugin that generates houses from modular pieces, choosing each part by what sits next to it.",
      },
      {
        title: "3D asset pipeline",
        label: "Blender to Studio",
        description: "A pipeline covering Blender, Meshy, mesh cleanup and PBR materials to get assets ready for a game.",
      },
    ],
    processHeading: ["HOW WE", "WORK"],
    process: [
      {
        title: "Share the game",
        description: "Tell us what you are building and what already exists. A place file or a short clip helps more than a long brief.",
      },
      {
        title: "Agree the system",
        description: "We define what runs on the client, what runs on the server and how it fits your existing scripts.",
      },
      {
        title: "Build AI-first, then review",
        description: "We direct the AI, review every change and play-test it in Studio before you see it.",
      },
      {
        title: "Deliver into your place",
        description: "You get the scripts or assets in your place, organised and explained, ready for your team to build on.",
      },
    ],
    stack: ["Luau", "Roblox Studio", "Catalog API", "Client-server scripts", "Studio plugins", "Blender", "Meshy", "PBR materials"],
    faqs: [
      {
        question: "Can you build a full Roblox game?",
        answer:
          "Send us the idea and we'll be straight about it. Our strength so far is systems, tools and assets, so we'll scope what we can deliver properly and say so if it's beyond that.",
      },
      {
        question: "Can you work on a game I already have?",
        answer:
          "Yes, adding systems to an existing place is a good fit. Share what's there and we'll check how the new work should connect to your scripts.",
      },
      {
        question: "Do you make scripts for exploiting other games?",
        answer: "No. We only build for games you own or have permission to work on.",
      },
      {
        question: "Is the code written by AI?",
        answer:
          "We build Roblox work AI-first. We set the design, direct the AI, review every change and test it in Studio. Nothing is delivered unread.",
      },
      {
        question: "How much does Roblox development cost?",
        answer:
          "It depends on the system, so we quote per project. Pick a budget range in the form and tell us what you need.",
      },
    ],
    quoteHeading: ["TELL US ABOUT YOUR", "GAME"],
    quoteIntro: "Share what you're building and what you need added. We usually reply within 24 hours.",
  },
};

export const SERVICE_PAGE_LIST = Object.values(SERVICE_PAGES);
