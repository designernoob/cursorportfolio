/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT YOUR PORTFOLIO HERE
 * ─────────────────────────────────────────────────────────────
 *  This is the only file you need to touch to update your site's
 *  content. Change the text between the quotes. Keep the quotes,
 *  commas and brackets exactly as they are.
 *
 *  Tip: to change the accent colour, edit --accent in src/index.css
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Pranav",
  role: "Product Designer",
  // Short one-liner used in the browser tab & meta
  tagline: "Designing clear, human interfaces for complex products.",
  location: "Bengaluru, India",
  // Used for the live clock in the footer (IANA timezone)
  timezone: "Asia/Kolkata",
  email: "hello@pranav.design",
  availability: "Open to select projects & conversations",
  // Shown as the status pill in the hero
  currentlyAt: "Currently designing Rubrik's Security Cloud",
  // Link your resume here (a PDF in /public, or a hosted link)
  resumeUrl: "#",
  // Contact menu (nav hover)
  linkedinUrl: "https://www.linkedin.com/",
  calendlyUrl: "https://calendly.com/",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Dribbble", href: "https://dribbble.com/" },
    { label: "Twitter / X", href: "https://x.com/" },
    { label: "Read.cv", href: "https://read.cv/" },
  ],
};

/**
 * Top navigation. The homepage is always Home / Work, so the nav
 * only surfaces these three actions.
 *   kind: "section"  → smoothly scrolls to a section id on the home page
 *   kind: "external" → opens a link (e.g. your resume) in a new tab
 */
export type NavLink =
  | { label: string; kind: "section"; target: string }
  | { label: string; kind: "external"; href: string };

export const navLinks: NavLink[] = [
  { label: "About", kind: "section", target: "about" },
  { label: "Beyond Design", kind: "section", target: "beyond" },
  { label: "Resume", kind: "external", href: site.resumeUrl },
];

/* ─────────────────────────────────────────────────────────────
 *  HERO
 * ─────────────────────────────────────────────────────────────
 *  The headline is a flow of "tokens" so we can weave images and
 *  interactive words directly into the sentence (inspired by the
 *  inline media on vemula.me). Types you can use:
 *
 *   { type: "text", text: "plain words" }
 *   { type: "em",   text: "italic accent word" }
 *   { type: "media", label: "alt text", shape: "rect" | "circle" | "pill",
 *            src?: "/your-image.gif" }         ← inline image/GIF chip
 *   { type: "hover", text: "word", label: "caption", src?: "/img.gif" }
 *            ← a word that reveals a floating image/GIF on hover
 *
 *  Leave `src` empty to show a styled placeholder for now. Drop a
 *  file in /public later and set src to swap in real media.
 * ───────────────────────────────────────────────────────────── */

export type HeroToken =
  | { type: "text"; text: string }
  | { type: "em"; text: string }
  | {
      type: "media";
      label: string;
      shape?: "rect" | "circle" | "pill";
      src?: string;
    }
  | { type: "hover"; text: string; label: string; src?: string };

export const hero = {
  // Read the tokens left-to-right — they form one big sentence.
  statement: [
    { type: "text", text: "I'm a product designer" },
    { type: "media", label: "A portrait of Pranav", shape: "circle" },
    { type: "text", text: "who turns" },
    { type: "hover", text: "complex", label: "the messy middle of software" },
    { type: "text", text: "problems into" },
    { type: "media", label: "A calm product flow", shape: "rect" },
    { type: "text", text: "calm," },
    { type: "em", text: "clear" },
    { type: "text", text: "&" },
    { type: "hover", text: "human", label: "designed for real people" },
    { type: "text", text: "products." },
  ] as HeroToken[],
  // Soft secondary line under the statement (elvinhu-style hierarchy)
  role: {
    before: "Senior Product Designer at ",
    company: "Rubrik",
    href: "https://www.rubrik.com",
  },
};

/* ─────────────────────────────────────────────────────────────
 *  BEYOND DESIGN  (nav → "Beyond Design")
 *  A light section for the things you do outside product design.
 *  Placeholder for now — swap in your real interests later.
 * ───────────────────────────────────────────────────────────── */
export const beyond = {
  kicker: "Beyond Design",
  heading: ["Life happens", "away from the *artboard* too."],
  intro:
    "A placeholder for the things that shape how I think — the hobbies, side quests and curiosities beyond product design. We'll fill this with real content soon.",
  items: [
    { title: "Photography", note: "Chasing light on long walks." },
    { title: "Writing", note: "Short notes on design & craft." },
    { title: "Reading", note: "Non-fiction, slowly, with coffee." },
    { title: "Something new", note: "Always learning one new thing." },
  ],
};

/* ─────────────────────────────────────────────────────────────
 *  EXPERIENCE & EDUCATION
 *  Document-like list of roles + school. Rename the kicker later.
 *  kind: "Full-time" | "Intern" | "Education" (or whatever fits)
 * ───────────────────────────────────────────────────────────── */
export type ExperienceEntry = {
  org: string;
  duration: string;
  kind: string;
  note?: string; // optional role / degree under the org name
  logo: string; // path under /public
};

export const experience = {
  kicker: "Experience & Education",
  heading: "A short paper trail.",
  entries: [
    {
      org: "Rubrik",
      note: "Senior Product Designer",
      duration: "2023 — Now",
      kind: "Full-time",
      logo: "/logos/rubrik.svg",
    },
    {
      org: "Sprinklr",
      note: "UX Design Intern",
      duration: "Jan ’22 — Jul ’22",
      kind: "Intern",
      logo: "/logos/sprinklr.svg",
    },
    {
      org: "Nutanix",
      note: "UX Design Intern",
      duration: "Sep ’21 — Dec ’21",
      kind: "Intern",
      logo: "/logos/nutanix.svg",
    },
    {
      org: "UpGrad",
      note: "Product Design Intern",
      duration: "Jan ’21 — Aug ’21",
      kind: "Intern",
      logo: "/logos/upgrad.svg",
    },
    {
      org: "BITS Pilani",
      note: "B.E. — Computer Science",
      duration: "2018 — 2022",
      kind: "Education",
      logo: "/logos/bits.svg",
    },
  ] as ExperienceEntry[],
};

// The scrolling ticker between hero and work.
export const marqueeItems = [
  "Product Design",
  "Design Systems",
  "Interaction",
  "Prototyping",
  "0 → 1",
  "Enterprise UX",
  "Motion",
  "Research",
];

export type Project = {
  index: string;
  // slug becomes the case study URL, e.g. /work/security-cloud
  slug: string;
  title: string;
  company: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
  // A gradient used as the hover preview. Any valid CSS background.
  accent: string;
};

export const projects: Project[] = [
  {
    index: "01",
    slug: "security-cloud",
    title: "Security Cloud",
    company: "Rubrik",
    role: "Product Designer",
    period: "2023 — Now",
    description:
      "Designing new features across Rubrik's Security Cloud — turning dense security telemetry into calm, decision-ready workflows for enterprise teams.",
    tags: ["Enterprise", "Data-heavy UX", "Design Systems"],
    accent: "linear-gradient(135deg, #ff5b26 0%, #ffb03a 100%)",
  },
  {
    index: "02",
    slug: "modern-care",
    title: "Modern Care",
    company: "Sprinklr",
    role: "UX Design Intern",
    period: "Jan '22 — Jul '22",
    description:
      "Shipped multiple features for Modern Care, Sprinklr's customer experience platform, streamlining how agents resolve conversations at scale.",
    tags: ["CX Platform", "0 → 1 Features", "Agent Tooling"],
    accent: "linear-gradient(135deg, #7c5cff 0%, #37c0ff 100%)",
  },
  {
    index: "03",
    slug: "operations-dashboard",
    title: "Operations Dashboard V2.0",
    company: "Nutanix",
    role: "UX Design Intern",
    period: "Sep '21 — Dec '21",
    description:
      "Rethought Nutanix India's operations dashboard from the ground up, improving how internal teams monitor and act on live operational data.",
    tags: ["Dashboards", "Data Viz", "Redesign"],
    accent: "linear-gradient(135deg, #17e1a6 0%, #0fb0ff 100%)",
  },
  {
    index: "04",
    slug: "payments-for-graders",
    title: "Payments for Graders",
    company: "UpGrad",
    role: "Product Design Intern",
    period: "Jan '21 — Aug '21",
    description:
      "Built a payments management experience for graders, replacing a fragmented manual process with a clear, trustworthy end-to-end flow.",
    tags: ["Fintech Flows", "Internal Tools", "0 → 1"],
    accent: "linear-gradient(135deg, #ff4d8d 0%, #ff9a3d 100%)",
  },
];

export const about = {
  heading: ["A designer who", "sweats the *details*."],
  paragraphs: [
    "I design for the messy middle of enterprise software — the workflows where a single confusing screen costs someone their afternoon. My job is to make that complexity disappear.",
    "I move fluidly between research, systems thinking and pixel-level craft. I like shipping, learning from real usage, and refining until an interface feels obvious in hindsight.",
  ],
  // Small stat blocks
  stats: [
    { value: "4+", label: "Years designing products" },
    { value: "12+", label: "Features shipped to production" },
    { value: "4", label: "Product teams collaborated with" },
    { value: "∞", label: "Pixels nudged into place" },
  ],
  // Capabilities list
  capabilities: [
    "Product & Interaction Design",
    "Design Systems",
    "Prototyping & Motion",
    "User Research",
    "Enterprise & Data-heavy UX",
    "Design Engineering hand-off",
  ],
};

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Pranav is what we call an obvious yes for a team member — meticulous, reliable, collaborative, a learning machine with an open mind to feedback and a real sense of trade-offs. You'd be lucky to have him on your team.",
    name: "Hozefa Ayyajiwala",
    title: "Sr. Design Manager, Coinbase",
  },
  {
    quote:
      "It is commendable that his contribution improved the experience in Nutanix India's operations dashboard. He has a great sense of taking many aspects into consideration while thinking of the right solution.",
    name: "Sojan Anto",
    title: "Staff Designer, Nutanix",
  },
  {
    quote:
      "It was a pleasure to work with Pranav. He showed strong team leadership and amazing design sense along with hard work and creativity during the hackathon.",
    name: "Kadri Kõivik",
    title: "COO, Garage48",
  },
  {
    quote:
      "Pranav is a talented designer with skills that reach beyond just design — he's always looking for ways to push the boundaries of how a product can be better.",
    name: "Joyneel Acharya",
    title: "Co-founder, NirogGyan",
  },
];

/* ─────────────────────────────────────────────────────────────
 *  CASE STUDIES  (the page you see when a project is clicked)
 * ─────────────────────────────────────────────────────────────
 *  Each project below has a full case study. The structure is
 *  intentionally ordered for busy design hiring managers:
 *  outcomes first, then the thinking behind them.
 *
 *  A section is made of "blocks". Add, remove or reorder blocks:
 *    { type: "text",  text: "A paragraph." }
 *    { type: "bullets", items: ["One", "Two"] }
 *    { type: "quote", text: "A key insight.", by: "Optional source" }
 *    { type: "figure", label: "What this image is", caption: "Caption",
 *              ratio: "wide" | "square" | "tall" }
 *    { type: "gallery", items: [{ label, caption }, { label, caption }] }
 *
 *  Figures are placeholders now — replace them with real screens
 *  later by dropping images into /public and setting `src`.
 * ───────────────────────────────────────────────────────────── */

export type CaseMeta = { label: string; value: string };
export type CaseMetric = { value: string; label: string };

export type CaseBlock =
  | { type: "text"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "quote"; text: string; by?: string }
  | {
      type: "figure";
      label?: string;
      caption?: string;
      ratio?: "wide" | "square" | "tall";
      src?: string;
    }
  | {
      type: "gallery";
      items: { label?: string; caption?: string; src?: string }[];
    };

export type CaseSection = {
  id: string;
  label: string; // short label used in the side navigation
  heading: string;
  blocks: CaseBlock[];
};

export type CaseStudy = {
  slug: string;
  company: string;
  year: string;
  title: string;
  subtitle: string;
  accent: string;
  cover: string; // caption shown on the hero cover placeholder
  overview: {
    summary: string;
    meta: CaseMeta[];
    impact: CaseMetric[];
  };
  sections: CaseSection[];
};

/**
 * Default section scaffold shared by every project. This is the
 * "template" — realistic placeholder copy that shows the ideal
 * narrative. Replace the text with your real story per project.
 */
function templateSections(name: string): CaseSection[] {
  return [
    {
      id: "context",
      label: "Context",
      heading: "Setting the scene",
      blocks: [
        {
          type: "text",
          text: `Replace this with the business and product context for ${name}. In two or three sentences, explain what the product does, who it serves, and the moment this project began. Hiring managers read this first — keep it tight and concrete.`,
        },
        {
          type: "text",
          text: "Name the stakes. What was at risk if this stayed unsolved — revenue, retention, trust, efficiency? Anchoring the work in impact signals product maturity.",
        },
        {
          type: "figure",
          label: "Product / feature landscape",
          caption: "A wide shot that orients the reader — the surface you worked on before changes.",
          ratio: "wide",
        },
      ],
    },
    {
      id: "problem",
      label: "The problem",
      heading: "The problem worth solving",
      blocks: [
        {
          type: "text",
          text: "State the core problem in one crisp sentence, then unpack it. Separate the user problem from the business problem so it's clear you understand both.",
        },
        {
          type: "quote",
          text: `“The single sentence that framed everything we built for ${name}.”`,
          by: "Framing / problem statement",
        },
        {
          type: "bullets",
          items: [
            "Constraint one — e.g. legacy system, timeline, or platform limits you designed within.",
            "Constraint two — e.g. accessibility, compliance, or performance bars you had to clear.",
            "What success would look like — the measurable goal you aligned the team around.",
          ],
        },
      ],
    },
    {
      id: "research",
      label: "Research",
      heading: "Research & insights",
      blocks: [
        {
          type: "text",
          text: "Summarise how you learned what you learned — interviews, support tickets, analytics, usability tests, competitive teardown. Focus on method briefly, then on what it changed.",
        },
        {
          type: "gallery",
          items: [
            { label: "Research artifact", caption: "Journey map, affinity diagram, or synthesis board." },
            { label: "Key data point", caption: "A chart or quote that reframed the team's assumptions." },
          ],
        },
        {
          type: "text",
          text: "End with the two or three insights that actually drove decisions. An insight is not a finding — it's the 'so what' that changed your direction.",
        },
      ],
    },
    {
      id: "approach",
      label: "Approach",
      heading: "Approach & explorations",
      blocks: [
        {
          type: "text",
          text: "Show your thinking, not just your final pixels. Walk through the directions you considered and — crucially — why you ruled options out. This is where senior reviewers evaluate judgement.",
        },
        {
          type: "gallery",
          items: [
            { label: "Exploration A", caption: "Early direction — what it optimised for, why it fell short." },
            { label: "Exploration B", caption: "The direction you carried forward, and the trade-off you accepted." },
          ],
        },
        {
          type: "quote",
          text: "“Call out one hard trade-off you made and the reasoning behind it.”",
          by: "Key decision",
        },
      ],
    },
    {
      id: "solution",
      label: "Solution",
      heading: "The solution",
      blocks: [
        {
          type: "text",
          text: `Present the shipped experience for ${name}. Break it into the 2–4 moments that matter most and annotate each with the decision behind it. Let the visuals carry the weight.`,
        },
        {
          type: "figure",
          label: "Hero of the final solution",
          caption: "The single most important screen or flow — full-bleed and high fidelity.",
          ratio: "wide",
        },
        {
          type: "gallery",
          items: [
            { label: "Key screen 1", caption: "What it does and the design decision that makes it work." },
            { label: "Key screen 2", caption: "A detail you're proud of — interaction, empty state, edge case." },
          ],
        },
      ],
    },
    {
      id: "impact",
      label: "Impact",
      heading: "Impact & outcomes",
      blocks: [
        {
          type: "text",
          text: "Restate the results with proof. Pair quantitative outcomes (adoption, time saved, task success, NPS) with qualitative signals (user quotes, stakeholder reactions, what shipped).",
        },
        {
          type: "quote",
          text: "“A quote from a user, PM, or leader that captures the win.”",
          by: "Post-launch feedback",
        },
      ],
    },
    {
      id: "reflection",
      label: "Reflection",
      heading: "Reflection & learnings",
      blocks: [
        {
          type: "text",
          text: "Close with honesty. What worked, what you'd do differently, and what you'd tackle next given more time. Reflective designers read as people who keep getting better.",
        },
        {
          type: "bullets",
          items: [
            "A concrete lesson you carried into later work.",
            "Something you'd change with hindsight.",
            "The next iteration you'd pursue.",
          ],
        },
      ],
    },
  ];
}

function caseFromProject(p: Project): CaseStudy {
  return {
    slug: p.slug,
    company: p.company,
    year: p.period,
    title: p.title,
    subtitle: p.description,
    accent: p.accent,
    cover: "Cover visual — a strong hero shot of the final work",
    overview: {
      summary: `A short, skimmable overview of ${p.title}. In three or four lines, tell the reader what you set out to do, what you shipped, and the outcome — so a busy reviewer gets the whole story before scrolling.`,
      meta: [
        { label: "Role", value: p.role },
        { label: "Company", value: p.company },
        { label: "Timeline", value: p.period },
        { label: "Team", value: "PM, Eng, Design (edit me)" },
        { label: "Platform", value: "Web · Enterprise (edit me)" },
      ],
      impact: [
        { value: "+00%", label: "Headline metric — adoption, efficiency, or task success" },
        { value: "00%", label: "Secondary metric — errors reduced, time saved" },
        { value: "0→1", label: "Scope — features shipped or surface owned" },
      ],
    },
    sections: templateSections(p.title),
  };
}

export const caseStudies: Record<string, CaseStudy> = Object.fromEntries(
  projects.map((p) => [p.slug, caseFromProject(p)])
);

export function getCaseStudy(slug?: string): CaseStudy | undefined {
  return slug ? caseStudies[slug] : undefined;
}

export function adjacentProjects(slug?: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: i > 0 ? projects[i - 1] : projects[projects.length - 1],
    next: i < projects.length - 1 ? projects[i + 1] : projects[0],
  };
}
