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
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Dribbble", href: "https://dribbble.com/" },
    { label: "Twitter / X", href: "https://x.com/" },
    { label: "Read.cv", href: "https://read.cv/" },
  ],
};

// Big statement shown in the hero. Words wrapped in *asterisks*
// render in the editorial serif italic style for emphasis.
export const hero = {
  intro: "Portfolio — 2026",
  headline: ["Design that", "makes the *complex*", "feel effortless."],
  summary:
    "I'm Pranav, a product designer shaping Rubrik's Security Cloud. Previously at Sprinklr, Nutanix & UpGrad. Computer Science engineer from BITS Pilani who cares as much about the last 5% of polish as the first idea.",
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
  title: string;
  company: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
  // A gradient used as the hover preview. Any valid CSS background.
  accent: string;
  href?: string;
};

export const projects: Project[] = [
  {
    index: "01",
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
