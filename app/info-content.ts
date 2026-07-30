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
    title: "Privacy terms for leads, clients, chats, and store projects.",
    intro:
      "This policy explains how Open Limits handles contact details, lead forms, chatbot conversations, analytics events, project files, and Shopify store information shared with us.",
    accent: "#64e6c0",
    stat: "No sale",
    statLabel: "we do not sell personal information",
    sections: [
      {
        title: "Who we are",
        body:
          "Open Limits provides Shopify design, development, redesign, landing page, conversion, launch, and support services for ecommerce brands. When you use this website or work with us, the information you share is handled for business communication, project delivery, support, and website improvement.",
      },
      {
        title: "Information we collect",
        body:
          "We may collect your name, email, phone number, company or brand name, website URL, niche, budget, timeline, project goals, form submissions, chatbot messages, call booking details, support requests, and files or references you provide for a project. We may also collect basic technical data such as page visits, clicks, scroll depth, device type, browser information, IP-related request data, and cookies or identifiers used for analytics and advertising measurement.",
        points: [
          "Lead details are used to qualify inquiries and respond with useful next steps.",
          "Project details are used to quote, plan, design, build, revise, launch, and support Shopify work.",
          "Visitor analytics help us understand what pages and offers are working.",
        ],
      },
      {
        title: "How we use information",
        body:
          "We use information to reply to inquiries, prepare proposals, manage project communication, create and deliver work, provide post-launch support, improve the website, measure advertising performance, prevent misuse, and keep reasonable business records. We do not sell your personal information.",
      },
      {
        title: "Shopify and client access",
        body:
          "If a project requires Shopify, app, domain, analytics, marketplace, or hosting access, you are responsible for granting the correct level of access and removing it when the work is complete. We use access only for the agreed project or support scope. We may ask you to provide collaborator access instead of sharing passwords whenever possible.",
      },
      {
        title: "Tools and third parties",
        body:
          "We may use trusted service providers for hosting, database storage, analytics, advertising measurement, payment or marketplace processing, scheduling, email, chat, file sharing, and project delivery. Examples can include Vercel, Neon, Meta, Google services, Fiverr, Upwork, Shopify, and similar tools used to operate the business. These providers process information under their own terms and privacy practices.",
      },
      {
        title: "Cookies, analytics, and advertising",
        body:
          "The website may use cookies, pixels, server-side events, and similar technologies to understand site activity and measure advertising performance. This can include Meta Pixel and Conversions API events such as page views and lead submissions. You can control cookies through your browser settings, but some measurement or personalization may stop working.",
      },
      {
        title: "Retention and deletion",
        body:
          "We keep lead, chat, project, and support records for as long as reasonably needed for communication, delivery, legal, tax, fraud prevention, and business continuity purposes. You can ask us to update or delete your contact details by emailing admin@theopenlimits.com. We may retain limited records where required for legitimate business, legal, or accounting reasons.",
      },
      {
        title: "Security",
        body:
          "We use reasonable technical and organizational measures to protect information, but no website, database, email system, or third-party platform can be guaranteed completely secure. Please avoid sending sensitive passwords, payment card details, or confidential business secrets unless we specifically request a secure method.",
      },
      {
        title: "Contact",
        body:
          "For privacy questions, updates, or deletion requests, email admin@theopenlimits.com. If your request relates to a marketplace order, we may also ask you to contact us through Fiverr or Upwork so the platform record stays accurate.",
      },
    ],
  },
  "refund-policy": {
    slug: "refund-policy",
    eyebrow: "REFUND POLICY",
    title: "Refund terms for custom Shopify design and build projects.",
    intro:
      "Open Limits sells custom creative and technical services. Refunds are handled around scope, milestones, approvals, work completed, and whether we have had a fair chance to fix the issue.",
    accent: "#ffdd55",
    stat: "Milestone",
    statLabel: "refund decisions follow approved project stages",
    sections: [
      {
        title: "Service nature",
        body:
          "Our work includes strategy, design, Shopify theme development, page building, ecommerce setup, integrations, launch help, conversion improvements, and support. Because custom service work uses time, planning, design judgment, development effort, and third-party coordination, refunds are not treated like returns for physical products.",
      },
      {
        title: "Before work begins",
        body:
          "If you pay a deposit or milestone and cancel before meaningful work has started, we may refund the unused portion after deducting any payment processing, marketplace, planning, research, consultation, or administrative costs already incurred.",
      },
      {
        title: "Milestones and approvals",
        body:
          "Milestone payments are accepted because they protect both sides. Once a milestone has been delivered and approved, that milestone is normally non-refundable. If a delivered milestone does not match the agreed scope, you should tell us clearly and quickly so we can correct it before the next stage begins.",
        points: [
          "Design approvals confirm direction, layout, and visual approach for that stage.",
          "Build approvals confirm implementation of the agreed pages, sections, or features.",
          "Launch approval confirms the site is ready to go live or hand off, except for support-period fixes.",
        ],
      },
      {
        title: "When refunds may apply",
        body:
          "A partial or full refund may be considered when we are unable to deliver the agreed core scope, when a serious issue is reported within a reasonable review window and cannot be fixed, or when we mutually agree that ending the project is the fairest outcome. The amount depends on work completed, assets delivered, approvals already given, and costs already paid to third parties.",
      },
      {
        title: "What is not refundable",
        body:
          "Refunds do not normally cover approved milestones, completed strategy or design work, completed development work, urgent booking fees, consultation time, third-party app fees, paid themes, domains, hosting, fonts, stock assets, ad spend, platform fees, payment processing fees, or marketplace fees charged by Fiverr, Upwork, or other platforms.",
      },
      {
        title: "Scope changes and delays",
        body:
          "Refunds are not provided because of delays caused by missing content, late feedback, unavailable client approvals, third-party platform issues, app limitations, Shopify account restrictions, changed requirements, or requests outside the agreed scope. We can quote additional work when the project changes direction.",
      },
      {
        title: "Marketplace orders",
        body:
          "Fiverr and Upwork orders must follow the refund, dispute, milestone, and cancellation rules of those platforms. Fiverr orders may include additional marketplace overhead. Upwork orders can be structured by milestones. If you ordered through a platform, refund communication should stay on that platform.",
      },
      {
        title: "Support after launch",
        body:
          "Qualifying custom projects include 3 months of support for reasonable fixes and questions related to the delivered scope. Support is meant for bugs, handoff help, and light polish related to approved work. It does not include new pages, redesigns, new features, new app setup, or major business changes unless separately agreed.",
      },
      {
        title: "How to request a refund",
        body:
          "Email admin@theopenlimits.com with your project name, order platform if any, the specific issue, screenshots or links, and the outcome you want. We will review the request in good faith and may first offer fixes, revised delivery, credit, partial refund, or cancellation depending on the situation.",
      },
    ],
  },
  "terms-of-use": {
    slug: "terms-of-use",
    eyebrow: "TERMS OF USE",
    title: "Terms for using Open Limits and starting a project.",
    intro:
      "These terms keep expectations clear when you use the website, submit a lead, book a call, request a quote, or start a Shopify design and development project with us.",
    accent: "#ff9068",
    stat: "Scope",
    statLabel: "clear deliverables, approvals, payments, and support",
    sections: [
      {
        title: "Using this website",
        body:
          "You can browse the website, contact us, submit forms, use the chatbot, book calls, and share project details. You agree not to misuse the website, attempt to access private systems, scrape protected areas, interfere with security, upload malicious content, or copy our work in a way that misrepresents ownership.",
      },
      {
        title: "Quotes and project scope",
        body:
          "Project scope, price, milestones, timeline, deliverables, revision expectations, and support terms are agreed before work begins through a written quote, proposal, invoice, message thread, marketplace order, or other clear written confirmation. Anything not included in the agreed scope may require a new quote or change order.",
      },
      {
        title: "Client responsibilities",
        body:
          "You are responsible for providing accurate project information, timely feedback, brand assets, product content, Shopify access, app access, domain access, legal copy, policies, media, and approvals needed to complete the work. Timelines can move if required materials, decisions, or third-party access are delayed.",
      },
      {
        title: "Design, revisions, and approvals",
        body:
          "We provide custom creative and technical work based on the agreed direction. Reasonable revisions are handled within the agreed scope and project stage. Approval of a design, section, page, milestone, or launch confirms that stage is accepted, except for bugs or support-period fixes related to the delivered scope.",
      },
      {
        title: "Payments and platforms",
        body:
          "Flexible payment modes and milestone payments are accepted. Work may pause if payments are late. Fiverr orders may include 20% extra because of marketplace fees and added platform overhead. Upwork orders are available for no extra cost from our side, subject to the platform's own fees and terms.",
      },
      {
        title: "Third-party services",
        body:
          "Shopify, themes, apps, domains, hosting, payment processors, analytics tools, email tools, ad platforms, marketplaces, and other third-party services are controlled by their own providers. We are not responsible for outages, policy changes, rejected accounts, app limitations, fees, or restrictions from those providers.",
      },
      {
        title: "Ownership and portfolio rights",
        body:
          "After final payment, approved custom work created specifically for your project is yours to use for your brand. Open Limits may retain ownership of pre-existing tools, methods, reusable code patterns, internal systems, concepts not selected, and general know-how. Unless agreed otherwise, we may reference completed work in our portfolio, case studies, proposals, social posts, and sales materials.",
      },
      {
        title: "Content and legal compliance",
        body:
          "You are responsible for the accuracy, legality, permissions, and rights for content, products, claims, policies, images, videos, fonts, trademarks, customer data, and other materials you provide. We can help place or format policy pages, but we do not provide legal, tax, financial, medical, or regulatory advice.",
      },
      {
        title: "Launch and support",
        body:
          "Qualifying custom projects include 3 months of support for reasonable fixes and questions related to the delivered scope. Support does not include new features, new campaigns, new app integrations, ongoing maintenance, SEO guarantees, ad management, or conversion results unless separately agreed.",
      },
      {
        title: "No guaranteed results",
        body:
          "We build with strong design, UX, conversion, and Shopify practices, but we cannot guarantee revenue, ranking, ad performance, conversion rate, traffic, platform approval, or business outcomes. Results depend on your offer, product, pricing, traffic quality, operations, market, and many factors outside our control.",
      },
      {
        title: "Liability limits",
        body:
          "To the fullest extent allowed by law, Open Limits is not liable for indirect, incidental, special, consequential, lost-profit, lost-revenue, lost-data, platform, or business interruption damages. Our total liability for a project is limited to the amount paid to Open Limits for the specific service giving rise to the claim.",
      },
      {
        title: "Contact",
        body:
          "For questions about these terms, project scope, payments, or support, email admin@theopenlimits.com. If your order is on Fiverr or Upwork, platform-related communication may need to happen through that marketplace.",
      },
    ],
  },
};
