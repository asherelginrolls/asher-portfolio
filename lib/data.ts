// =============================================================================
// SINGLE SOURCE OF TRUTH — every number traces to a real file (resume v7,
// SIFF analytics, Magic Fiber one-pager, Saikat brief, ClaimRight repo).
// Voice rules enforced here: no em dashes, no "not just X but Y", no
// "X, not Y" negation framing. Keep "AI-native growth operator".
// =============================================================================

export const hero = {
  kicker: "AI-native growth operator · San Francisco",
  leadA: "I take products to their first",
  figure: "100,000",
  leadB: "users.",
  line2: "I build the AI that gets them there.",
  dek: "Media to growth to deep-tech sales to building. A YouTube channel from 7K to 100K subscribers in nine months, a $1M enterprise pipeline from zero, and a RAG product shipped solo. The same person did all of it.",
  sub: "Product sense, marketing instinct, sales rigor, and an analyst's discipline in one early hire.",
  contexts: ["EdTech", "Deep-tech", "DTC", "Congressional campaign"],
  email: "asherelginrolls@gmail.com",
};

export type Stat = {
  value: string;
  prefix?: string;
  suffix?: string;
  target: number;
  cap: string;
  src: string;
};

export const proof: Stat[] = [
  {
    value: "100",
    suffix: "K",
    target: 100,
    cap: "YouTube subscribers, grown from 7K in nine months",
    src: "SIFF Ventures · 2023 to 2024",
  },
  {
    value: "1",
    prefix: "$",
    suffix: "M+",
    target: 1,
    cap: "Enterprise pipeline from a standing start",
    src: "MTech-X · 2025",
  },
  {
    value: "107",
    suffix: "K+",
    target: 107,
    cap: "Campaign Instagram, from 10K to 107K",
    src: "Saikat for Congress · 2025 to 2026",
  },
  {
    value: "200",
    suffix: "+",
    target: 200,
    cap: "User interactions across my live AI tools",
    src: "Independent builds · 2024 to now",
  },
];

export const marquee = [
  "YouTube 7K to 100K",
  "$1M+ enterprise pipeline",
  "Daikin",
  "Japan Airlines",
  "Kerala Government",
  "Chicking",
  "Instagram 10K to 107K",
  "ClaimRight RAG product",
  "Hult Prize SF",
  "6 AI tools live",
];

export type SignalState = "horizon" | "growth" | "pipeline" | "system" | "settle";

export type Act = {
  no: string;
  kicker: string;
  title: string;
  body: string;
  stat: { k: string; v: string };
  signal: SignalState;
};

export const acts: Act[] = [
  {
    no: "01",
    kicker: "Media",
    title: "Four years learning how attention moves",
    body: "Advertising, copywriting, mass communication. The mechanics of it. Why something gets clicked, what earns the read, how you hold attention once you have it. Four years inside that craft. Every job since has run on it.",
    stat: { k: "4 yrs", v: "the craft" },
    signal: "horizon",
  },
  {
    no: "02",
    kicker: "Growth",
    title: "Seven thousand subscribers. Then a hundred thousand.",
    body: "I took a 7K-subscriber YouTube channel and pushed it past 100K in nine months. I built the KPI dashboards, ran the A/B tests, found the formats that compounded, and rebuilt the channel around them. I left it at 100K. It crossed 200K after handoff, on my systems.",
    stat: { k: "100K", v: "from 7K in nine months" },
    signal: "growth",
  },
  {
    no: "03",
    kicker: "Sales",
    title: "A nanofiber material, translated into a $1M pipeline.",
    body: "MTech-X makes Magic Fiber, a nanofiber oil absorbent. My job was translation: turning materials science into language a C-suite acts on, in rooms with Daikin, Japan Airlines, and the Kerala state government. I built the outbound system from zero with whatever tools fit the job. Seven months later: $1M+ in enterprise pipeline.",
    stat: { k: "$1M+", v: "pipeline" },
    signal: "pipeline",
  },
  {
    no: "04",
    kicker: "AI",
    title: "One operator. Working like a team.",
    body: "The AI layer runs underneath everything now. ClaimRight, a full RAG product I built solo. Custom Claude skills. n8n automations. A field intelligence system I built for a congressional campaign. The tools that compress what used to take a team into what one person can carry.",
    stat: { k: "6", v: "AI tools, live" },
    signal: "system",
  },
];

// growth curves (normalized 0..1) for the 3D instrument + hero chart
export const youtubeSeries = [
  0.04, 0.05, 0.07, 0.1, 0.14, 0.2, 0.3, 0.44, 0.6, 0.78, 0.92, 1.0,
];
// Campaign Instagram, 10K to 107K
export const instagramSeries = [
  0.08, 0.1, 0.12, 0.16, 0.21, 0.28, 0.37, 0.49, 0.64, 0.81, 0.93, 1.0,
];

export const pipeline = [
  { name: "Daikin", w: 0.95, stage: "C-suite" },
  { name: "Japan Airlines", w: 0.88, stage: "C-suite" },
  { name: "Kerala Gov.", w: 0.8, stage: "Final review" },
  { name: "Chicking", w: 0.72, stage: "Active" },
];

export type CaseStudy = {
  headline: string;
  intro: string;
  sections: { kicker: string; title: string; body: string }[];
  numbers: { n: string; l: string }[];
  coda?: string;
};

export type Work = {
  id: string;
  tag: string;
  role: string;
  metric?: string;
  journey?: { from: string; to: string; pill: string };
  title: string;
  body: string;
  chips?: string[];
  feature?: {
    label: string;
    text: string;
    stats: { n: string; l: string }[];
  };
  duo?: { name: string; title: string; body: string }[];
  study: CaseStudy;
};

export const work: Work[] = [
  {
    id: "siff",
    tag: "EdTech · Bengaluru · Nov 2023 to Aug 2024",
    role: "Senior Growth Strategy & Operations",
    journey: { from: "7K", to: "100K", pill: "+14×" },
    title: "A YouTube channel, grown to six figures.",
    body: "Every thumbnail, title, and format was a test. I read the data weekly, found what moved the needle, and rebuilt the channel around the winners. Subscribers climbed from 7K past 100K. Watch-time retention rose 133%. Shorts engagement rose 371%.",
    chips: [
      "Instagram 1K to 50K+",
      "15 KPI dashboards + SOPs",
      "Crossed 200K after handoff, on my systems",
    ],
    study: {
      headline: "Seven thousand to one hundred thousand in nine months.",
      intro:
        "Parikshe is SIFF Ventures' Kannada education channel in Bengaluru. When I joined in November 2023 it had 7K subscribers, good content, and no system. I left it at 100K with a system so documented it kept compounding without me.",
      sections: [
        {
          kicker: "The read",
          title: "First, learn what the audience actually rewards.",
          body: "I categorized every Short into six content types, motivation, academic, help, technique, marketing, trending, and tracked average performance per type. Same exercise for community posts across ten categories: time-management posts alone pulled a 12.31% engagement rate. The channel stopped guessing. Every thumbnail, title, and format became a test with a number attached.",
        },
        {
          kicker: "The system",
          title: "Then build the machine that ships the winners.",
          body: "Fifteen KPI dashboards tracked views, watch time, and engagement by content type, read weekly. A full upload SOP covered titles, descriptions, tags, vidIQ scoring, and scheduling. Community posts ran through an ideation, design, Kannada translation, and QC pipeline. ChatGPT handled bulk comment response and SEO drafts, and two hours a day went to engagement by hand.",
        },
        {
          kicker: "The result",
          title: "The numbers moved the way systems move them.",
          body: "Subscribers climbed from 7K past 100K in nine months. Watch-time retention rose 133%. Shorts engagement rose 371%. Instagram went from 1K to 50K+ on the same playbook. And the part I am proudest of: the channel crossed 200K after I handed it off, running on the SOPs I left behind.",
        },
      ],
      numbers: [
        { n: "100K", l: "subscribers, from 7K in nine months" },
        { n: "133%", l: "watch-time retention lift" },
        { n: "371%", l: "Shorts engagement lift" },
        { n: "50K+", l: "Instagram followers, from 1K" },
        { n: "15", l: "KPI dashboards, read weekly" },
        { n: "200K+", l: "crossed after handoff, on my systems" },
      ],
      coda: "Growth that depends on the operator is a job. Growth that survives the operator is a system.",
    },
  },
  {
    id: "saikat",
    tag: "Congressional Campaign · San Francisco · Nov 2025 to Jun 2026",
    role: "Growth & Outreach Lead",
    metric: "35 to 50%",
    title: "An AI layer that made a field team sharper every day.",
    body: "I led a 10-person canvass team with a Claude intelligence layer I built. Each night it read the field data, flagged the scripts that were losing, and fed back sharper messaging. Average team persuasion climbed from 35% to 50%. On the content side I helped grow @saikatforcongress from 10K to 107K+ followers, and I personally worked 100+ voter contacts a day at a 65% persuasion rate.",
    chips: [
      "Instagram from 10K to 107K+",
      "100+ daily contacts",
      "15% engagement rate",
    ],
    study: {
      headline: "A field team that got sharper every night.",
      intro:
        "Saikat Chakrabarti ran for Congress in San Francisco. From November 2025 through June 2026 I led growth and outreach: a 10-person canvass team, the campaign's Instagram, and 100+ of my own voter conversations a day.",
      sections: [
        {
          kicker: "The problem",
          title: "Canvassing data usually dies in a spreadsheet.",
          body: "A canvass team generates hundreds of conversations a day, and almost all of the signal in them evaporates by morning. Which script lost the room, which objection kept recurring, which message actually moved someone: that knowledge lived in canvassers' heads, briefly, and then it was gone.",
        },
        {
          kicker: "The build",
          title: "A Claude layer that read the field every night.",
          body: "I built an intelligence layer on Claude that ingested each day's field data, flagged the scripts that were losing, and fed sharper messaging back to the team before the next shift. The canvass became a loop instead of a grind: every conversation made the next day's conversations slightly better.",
        },
        {
          kicker: "The result",
          title: "Persuasion is the campaign metric that matters. It moved.",
          body: "Average team persuasion climbed from 35% to 50% across the 10-person team. I personally worked 100+ voter contacts a day at a 65% persuasion rate. On the content side, @saikatforcongress grew from 10K to 107K+ followers at a 15% engagement rate, and 20+ local businesses a day heard from us about co-branded visibility.",
        },
      ],
      numbers: [
        { n: "50%", l: "team persuasion, up from 35%" },
        { n: "65%", l: "my own persuasion rate at 100+ contacts a day" },
        { n: "107K+", l: "Instagram followers, from 10K" },
        { n: "15%", l: "engagement rate at that scale" },
      ],
      coda: "The AI did not talk to a single voter. It just made sure no conversation was wasted on a script that had already failed.",
    },
  },
  {
    id: "mtech",
    tag: "Deep-Tech · Nanofiber · Mar 2025 to Oct 2025",
    role: "Growth & Outreach Lead",
    metric: "$1M+",
    title: "Magic Fiber, from a blank CRM to C-suite review.",
    body: "MTech-X makes Magic Fiber, the world's first mass-produced nanofiber oil absorbent. I built the outbound engine from zero and carried a $1M+ pipeline to final-stage C-suite review across four markets: Daikin, Japan Airlines, Chicking, and the Kerala state government. I wrote the ICP, the messaging library, the battle cards, and the discovery framework the team ran.",
    feature: {
      label: "What I was selling",
      text: "The product earns its story. After a 2019 factory spill in Japan, Magic Fiber pulled 54,000 liters of oil from the water in two weeks. In Mauritius it helped clean a 1,000-ton spill and protect 300,000 mangroves. It is SGS-certified, holds eight patents, and TV Tokyo named it a product of the year out of 242. My job was to make serious buyers feel that.",
      stats: [
        { n: "50×", l: "its weight in oil" },
        { n: "70%", l: "less waste" },
        { n: "100+", l: "daily touches, automated" },
      ],
    },
    study: {
      headline: "A blank CRM, a Japanese nanofiber, and seven months.",
      intro:
        "MTech-X is a Japanese deep-tech company expanding out of Japan and Malaysia. Its product, Magic Fiber, is the world's first mass-produced nanofiber oil absorbent. I joined in March 2025 to build its outbound motion from zero.",
      sections: [
        {
          kicker: "The product",
          title: "The material had already earned its story.",
          body: "After a 2019 factory spill in Japan, Magic Fiber pulled 54,000 liters of oil from the water in two weeks. In Mauritius it helped clean a 1,000-ton spill and protect 300,000 mangroves. It absorbs roughly 50 times its weight, cuts waste by about 70%, is SGS-certified, holds eight patents, and TV Tokyo named it a product of the year out of 242 entries.",
        },
        {
          kicker: "The translation",
          title: "Buyers act on cost and risk, never on polymer science.",
          body: "A C-suite room does not buy nanofiber. It buys faster spill response, lower disposal cost, and a compliance story that holds. My job was that translation. I wrote the ICP, the messaging library, the battle cards, and the discovery framework the team ran, every asset converting lab specification into operational language a decision-maker could act on.",
        },
        {
          kicker: "The engine",
          title: "One person, running outbound like a department.",
          body: "I built the system with whatever fit the job: PhantomBuster and n8n pushing 100+ automated outbound touches a day, ChatGPT in the research loop, and an internal research-and-strategy bot I built for senior management. A blank CRM in March was a working pipeline by autumn.",
        },
        {
          kicker: "The result",
          title: "$1M+ in pipeline, all of it at C-suite stage.",
          body: "Seven months in, the pipeline held $1M+ in enterprise opportunities at final-stage C-suite review across four markets: Daikin, Japan Airlines, Chicking, and the Kerala state government.",
        },
      ],
      numbers: [
        { n: "$1M+", l: "enterprise pipeline from a standing start" },
        { n: "4", l: "markets at C-suite stage" },
        { n: "100+", l: "automated outbound touches a day" },
        { n: "7", l: "months from blank CRM to final review" },
      ],
      coda: "Selling deep tech is a translation job. The science earns the meeting. The language closes it.",
    },
  },
  {
    id: "founder",
    tag: "Founder · 2022 to 2025",
    role: "VOIDX · TAPP",
    metric: "2",
    title: "Ran two companies before I worked for anyone.",
    body: "Before I was anyone's growth hire, I owned the P&L. Two companies, two real numbers, and the instinct for what a founder is actually carrying.",
    duo: [
      {
        name: "VOIDX",
        title: "DTC streetwear, profitable in month one",
        body: "A drop-based brand I founded at 19. 1,000+ units sold and profitable in the first month, ₹9,00,000+ (about $11K) in revenue.",
      },
      {
        name: "TAPP",
        title: "A marketplace the judges believed in",
        body: "A two-sided marketplace linking 20+ farmers to enterprise buyers. Second runner-up at Hult Prize SF, with an invitation to present at Google.",
      },
    ],
    study: {
      headline: "Two companies before any employer.",
      intro:
        "Before I was anyone's growth hire I owned a P&L twice: VOIDX, a streetwear brand I founded at 19 in Bengaluru, and TAPP, an agri-trade marketplace built at Hult in San Francisco.",
      sections: [
        {
          kicker: "VOIDX · 2022 to 2023",
          title: "A drop-based brand, profitable in month one.",
          body: "VOIDX sold design-forward streetwear in limited drops, collections like Skullflower and 2 Birds 1 Stoned, every tee at 180gsm minimum. I ran the whole machine: design direction, pricing, lifecycle marketing, inventory. It sold 1,000+ units, turned profitable in the first month, and did ₹9,00,000+ in revenue, about $11K, as a college-room operation.",
        },
        {
          kicker: "TAPP · 2024 to 2025",
          title: "Rubber farmers, connected straight to enterprise buyers.",
          body: "TAPP was a two-sided marketplace for the $40B rubber trade, built to route smallholder farmers around the middlemen who take most of their earnings. The pilot connected 20+ farmers with enterprise buyers, with escrow-secured payment on delivery at its core. It took second runner-up at Hult Prize San Francisco and an invitation to present at Google.",
        },
        {
          kicker: "What it left",
          title: "The instinct for what a founder is carrying.",
          body: "Running two companies means cash-flow math at 2am, suppliers who miss dates, and pricing decisions with your own money on the line. When I work for a founder now, I know the weight of the decisions on their desk, because smaller versions of them used to be on mine.",
        },
      ],
      numbers: [
        { n: "1,000+", l: "VOIDX units sold" },
        { n: "₹9L+", l: "VOIDX revenue, profitable month one" },
        { n: "20+", l: "farmers connected through TAPP" },
        { n: "2nd", l: "runner-up, Hult Prize SF" },
      ],
      coda: "Both ventures are closed. The judgment they bought stays open.",
    },
  },
];

export const claimright = {
  eyebrow: "AI side project",
  title:
    "ClaimRight, an AI co-pilot I built for families fighting insurance denials.",
  lead: "I built ClaimRight on the side to see how far one operator could take a real AI product. It reads a rejected health-insurance claim, scores how fightable it is against nine IRDAI-grounded categories, and drafts a citing dispute letter for ₹99.",
  origin: "The first claim it ever ran end to end was my mother's.",
  steps: [
    {
      n: "01",
      k: "Retrieve",
      h: "Pull the regulation",
      p: "Embeds the claim and pulls matching IRDAI circulars and ombudsman awards from pgvector. Below a 0.65 similarity floor, it writes nothing.",
      gate: false,
    },
    {
      n: "02",
      k: "Draft",
      h: "Write the letter",
      p: "Claude drafts the dispute point by point, citing a source on every claim it makes.",
      gate: false,
    },
    {
      n: "03",
      k: "Check",
      h: "Grade every citation",
      p: "Each cited sentence is matched back to its source text and scored. Weak support gets softened. Under 0.40, the sentence is cut.",
      gate: true,
    },
    {
      n: "04",
      k: "Ship",
      h: "Send it grounded",
      p: "The letter goes out citing only sources it can point to, line by line.",
      gate: false,
    },
  ],
  note: "A 27-case regression test, 9 rejection categories against 3 retrieval scenarios each, fails the build if a single unsupported citation slips through.",
  stack: [
    "Next.js 14",
    "TypeScript",
    "Supabase / pgvector",
    "Claude Sonnet + Haiku",
    "Voyage embeddings",
    "Sarvam OCR",
    "Razorpay",
    "Resend",
  ],
  stats: [
    { b: "5", s: "official sources in the vector store" },
    { b: "9", s: "rejection categories grounded in IRDAI text" },
    { b: "0.65", s: "similarity floor before it claims anything" },
    { b: "27", s: "cases in the regression gate" },
  ],
  repo: "https://github.com/asherelginrolls/ClaimRightV.1",
};

export type Tool = {
  name: string;
  desc: string;
  href: string;
  cta: string;
};

export const tools: Tool[] = [
  {
    name: "AI-Sher",
    desc: "An AI version of me, trained on how I write and think. Ask it anything.",
    href: "https://chatgpt.com/g/g-678064a543b881918dd063eaea67ca55-ai-sher",
    cta: "Open the GPT",
  },
  {
    name: "Hultivate AI",
    desc: "A career-mapping assistant that builds a personalized plan for any student or switcher.",
    href: "https://chatgpt.com/g/g-6756d339194c8191ba57db25b74ab625-hultivate-ai",
    cta: "Open the GPT",
  },
  {
    name: "Storytelling & Impact Insights",
    desc: "Shapes a narrative and sharpens the impact in any pitch, deck, or update.",
    href: "https://chatgpt.com/g/g-679a941d2b948191b0c1857c04c173c1-storytelling-and-impact-insights",
    cta: "Open the GPT",
  },
  {
    name: "Data Viz & Analytics Guide",
    desc: "An analytics co-pilot that helps you build the right chart and find the story in your data.",
    href: "https://chatgpt.com/g/g-67a6a04add488191940da3abb3c6c771-data-visualization-analytics-guide",
    cta: "Open the GPT",
  },
  {
    name: "The Notion Lab",
    desc: "Turns a plain-English brief into a full, structured Notion workspace.",
    href: "https://chatgpt.com/g/g-677c8eb3a46c8191b5390893d55d22a0-the-notion-lab",
    cta: "Open the GPT",
  },
  {
    name: "Custom skills & automations",
    desc: "Custom Claude skills, n8n workflows, and fine-tuned open models wired into daily work.",
    href: "https://linktr.ee/asherelginrolls",
    cta: "See more on Linktree",
  },
];

export const contact = {
  status: "San Francisco · available for what's next",
  heading:
    "If you're building something and it needs to find its market, let's talk.",
  body: "I work best as an early growth hire, the person who turns a good product into a pipeline. I bring the product sense, the marketing instinct, the sales rigor, and the analyst's habit of letting the numbers decide. I move fast, I build my own AI tooling, and I have done it across very different rooms.",
  metaLine:
    "Through June 2026, I led growth and outreach on a congressional campaign in San Francisco.",
  email: "asherelginrolls@gmail.com",
  phone: "+1 628 306 1898",
  tel: "+16283061898",
  linkedin: "https://linkedin.com/in/asherelgin",
  github: "https://github.com/asherelginrolls",
  linktree: "https://linktr.ee/asherelginrolls",
};

export const nav = [
  { label: "Story", href: "#story" },
  { label: "Work", href: "#work" },
  { label: "ClaimRight", href: "#claimright" },
  { label: "Tools", href: "#tools" },
];
