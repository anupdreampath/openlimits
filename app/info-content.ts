export type InfoPageContent = {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  accent: string;
  stat: string;
  statLabel: string;
  sections: {
    title: string;
    body: string;
    points?: string[];
  }[];
};

export const infoPages: Record<string, InfoPageContent> = {
  about: {
    slug: "about",
    eyebrow: "ABOUT OPEN LIMITS",
    title: "A small sharp team for brands that refuse to look rented.",
    intro:
      "Open Limits was built for founders who care about taste and revenue at the same time. We work like a studio, think like operators, and keep the room small enough that the best idea can still move fast.",
    accent: "#b7ef66",
    stat: "60+",
    statLabel: "commerce launches shaped, shipped, or sharpened",
    sections: [
      {
        title: "The origin story",
        body:
          "We started after seeing too many good brands trapped inside forgettable templates. The product was strong, the founders were serious, but the storefront felt like a costume. Open Limits exists to close that gap: brand, UX, conversion, and build quality moving together from day one.",
      },
      {
        title: "How the team works",
        body:
          "Every project is led by a tight group: strategy, design, development, and launch thinking in the same conversation. No maze of handoffs. No vague presentation theater. You get direct thinking, fast decisions, and a site your team can actually run after launch.",
        points: [
          "Designers who understand conversion pressure.",
          "Developers who care about the brand feeling, not just tickets.",
          "Project leadership that keeps scope, time, and quality visible.",
        ],
      },
      {
        title: "What we believe",
        body:
          "A website should make the customer feel the brand before they compare prices. It should be easy to buy from, easy to trust, and hard to forget. That is the line we build toward.",
      },
    ],
  },
  process: {
    slug: "process",
    eyebrow: "PROCESS",
    title: "Clear milestones, fast feedback, no agency fog.",
    intro:
      "Our process is built around momentum. You always know what is being decided, what is being made, and what comes next.",
    accent: "#8bdcff",
    stat: "4",
    statLabel: "core phases from first call to launch support",
    sections: [
      {
        title: "01. Discover",
        body:
          "We map your niche, current site, product catalog, customer objections, references, timeline, and budget. The goal is to find the commercial shape of the project before design starts.",
      },
      {
        title: "02. Direction",
        body:
          "We define the creative lane: homepage structure, product journey, interaction feel, content priorities, and technical needs. This keeps design exciting without becoming random.",
      },
      {
        title: "03. Design and build",
        body:
          "We move through approved sections and milestones. You can pay by milestone, review work in stages, and keep decisions practical. Flexible payment modes are accepted.",
      },
      {
        title: "04. Launch and support",
        body:
          "After launch, we include 3 months of support for reasonable fixes, guidance, and polish related to the delivered scope.",
      },
    ],
  },
  pricing: {
    slug: "pricing",
    eyebrow: "PRICING AND TRUST",
    title: "Custom design starts at $2,000. Payment can stay flexible.",
    intro:
      "Most custom Shopify design and storefront projects sit between $2,000 and $10,000 USD depending on depth, motion, pages, apps, products, and launch speed.",
    accent: "#ffb7db",
    stat: "$2k",
    statLabel: "starting point for custom fresh design packages",
    sections: [
      {
        title: "Direct projects",
        body:
          "Working direct gives the cleanest budget. We accept flexible payment modes and milestone payments, so the project can move in practical stages instead of one heavy payment.",
        points: [
          "Milestone payments accepted for design, build, and launch.",
          "Scope can be shaped for early-stage brands without killing quality.",
          "The quote is always tied to deliverables, not mystery hours.",
        ],
      },
      {
        title: "Order on Fiverr",
        body:
          "If you prefer marketplace protection and public order history, you can order on Fiverr. Fiverr orders carry 20% extra to cover marketplace fees and added platform overhead.",
        points: ["Fiverr link: https://www.fiverr.com/s/m5qDeDN"],
      },
      {
        title: "Order on Upwork",
        body:
          "If you want platform trust without extra cost from our side, Upwork is available too. We can set milestones there and keep the project flow simple.",
        points: [
          "Upwork link: https://www.upwork.com/freelancers/~016de1057b0e843c6b?mp_source=share",
        ],
      },
    ],
  },
  support: {
    slug: "support",
    eyebrow: "SUPPORT",
    title: "Launch is not the end of the relationship.",
    intro:
      "We stay close after handoff so your team can settle into the new site, catch small issues, and keep selling without panic.",
    accent: "#c8b5ff",
    stat: "3",
    statLabel: "months of included post-launch support",
    sections: [
      {
        title: "Included support",
        body:
          "For 3 months after launch, we help with reasonable bug fixes, theme guidance, light polish, and questions related to the delivered scope.",
      },
      {
        title: "What happens after",
        body:
          "After the support period, you can book small improvement blocks, conversion work, new sections, landing pages, or a monthly maintenance plan if your store needs ongoing care.",
      },
      {
        title: "How to reach us",
        body:
          "Email admin@theopenlimits.com, WhatsApp +15572093217, or book a call from the calendar link whenever the project needs a human decision.",
      },
    ],
  },
  "privacy-policy": {
    slug: "privacy-policy",
    eyebrow: "PRIVACY POLICY",
    title: "We collect only what helps us respond and deliver.",
    intro:
      "This policy explains how Open Limits handles contact details, lead forms, chatbot conversations, analytics events, and project information.",
    accent: "#64e6c0",
    stat: "Plain",
    statLabel: "privacy terms written for humans",
    sections: [
      {
        title: "Information we collect",
        body:
          "We may collect your name, email, phone, website, niche, budget, timeline, chat messages, form submissions, and basic visitor events such as clicks or scroll depth. This helps us qualify leads, improve the site, and respond faster.",
      },
      {
        title: "How we use it",
        body:
          "We use your information to reply to inquiries, prepare quotes, manage projects, improve the website, and keep records of conversations. We do not sell your personal information.",
      },
      {
        title: "Storage and requests",
        body:
          "Project and lead records may be stored in our database and service tools. You can ask us to update or delete your contact details by emailing admin@theopenlimits.com.",
      },
    ],
  },
  "refund-policy": {
    slug: "refund-policy",
    eyebrow: "REFUND POLICY",
    title: "Fair work, easy conversations, lenient refunds.",
    intro:
      "We want clients to feel protected. If the service is genuinely not up to the agreed mark, we will work with you in good faith to fix it or refund fairly.",
    accent: "#ffdd55",
    stat: "Fair",
    statLabel: "refunds when the delivered service misses the agreed scope",
    sections: [
      {
        title: "Our promise",
        body:
          "If delivered work does not match the agreed scope or quality bar, tell us clearly and quickly. We will first try to correct the issue. If it still is not right, we can offer a partial or full refund depending on what was delivered and approved.",
      },
      {
        title: "Milestone safety",
        body:
          "Milestone payments are accepted because they protect both sides. You review work in stages, approve what is working, and avoid carrying all the risk upfront.",
      },
      {
        title: "Reasonable limits",
        body:
          "Refunds do not normally cover approved milestones, third-party app fees, domain costs, marketplace fees, or major scope changes requested after approval. But we keep the conversation human and flexible when something is genuinely off.",
      },
      {
        title: "Support after launch",
        body:
          "Every qualifying custom project includes 3 months of support for reasonable fixes and questions related to the delivered scope.",
      },
    ],
  },
  "terms-of-use": {
    slug: "terms-of-use",
    eyebrow: "TERMS OF USE",
    title: "Simple terms for working with Open Limits.",
    intro:
      "These terms keep expectations clear when you use the website, submit a lead, book a call, or start a project with us.",
    accent: "#ff9068",
    stat: "Clear",
    statLabel: "scope, approvals, payments, and support",
    sections: [
      {
        title: "Using this website",
        body:
          "You can browse the website, contact us, and share project details. Please do not misuse the site, attempt to access private systems, or copy our work in a way that misrepresents ownership.",
      },
      {
        title: "Project work",
        body:
          "Project scope, price, milestones, timeline, and deliverables are agreed before work begins. Timelines depend on feedback speed, content readiness, third-party tools, and scope changes.",
      },
      {
        title: "Payments and platforms",
        body:
          "Flexible payment modes and milestone payments are accepted. Fiverr orders include 20% extra because of marketplace overhead. Upwork orders are available for no extra cost from our side.",
      },
      {
        title: "Ownership and support",
        body:
          "After final payment, approved custom work made for your project is yours to use for your brand. Qualifying custom projects include 3 months of support for delivered-scope issues.",
      },
    ],
  },
};
