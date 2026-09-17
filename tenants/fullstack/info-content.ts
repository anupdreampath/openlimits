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
    eyebrow: "ABOUT MORGAN RETAILERS",
    title: "A small sharp technology team for companies that need more than a site.",
    intro:
      "TheFullStack Guys is the website of MORGAN RETAILERS, serving founders who care about product, taste, speed, and revenue at the same time. We work like a studio, think like operators, and engineer the digital systems that sit behind serious growth.",
    accent: "#b7ef66",
    stat: "MR.",
    statLabel: "Morgan Retailers — the business behind TheFullStack Guys",
    sections: [
      {
        title: "The origin story",
        body:
          "We started after seeing too many good companies trapped inside forgettable templates, fragile tools, and disconnected workflows. The product was strong, the founders were serious, but the digital layer felt smaller than the ambition. Morgan Retailers exists to close that gap: brand, UX, software, automation, conversion, and build quality moving together from day one.",
      },
      {
        title: "How the team works",
        body:
          "Every project is led by a tight group: strategy, design, engineering, and launch thinking in the same conversation. No maze of handoffs. No vague presentation theater. You get direct thinking, fast decisions, and systems your team can actually run after launch.",
        points: [
          "Designers who understand conversion pressure.",
          "Engineers who care about the product feeling, not just tickets.",
          "Project leadership that keeps scope, time, and quality visible.",
        ],
      },
      {
        title: "What we believe",
        body:
          "Technology should make the company feel sharper, not heavier. Whether it is a public website, iOS app, Shopify system, dashboard, or automation layer, it should be easy to trust, easy to use, and hard to forget. That is the line we build toward.",
      },
    ],
  },
  process: {
    slug: "process",
    eyebrow: "PROCESS",
    title: "Clear milestones, fast feedback, no agency fog.",
    intro:
      "Our process is built around momentum across web, software, iOS, commerce, and automation work. You always know what is being decided, what is being made, and what comes next.",
    accent: "#8bdcff",
    stat: "4",
    statLabel: "core phases from first call to launch support",
    sections: [
      {
        title: "01. Discover",
        body:
          "We map your business, users, current website or product, workflows, customer objections, technical constraints, references, timeline, and budget. The goal is to find the commercial and technical shape of the project before design starts.",
      },
      {
        title: "02. Direction",
        body:
          "We define the product lane: information architecture, user journeys, interface feel, content priorities, data needs, integrations, and technical architecture. This keeps design exciting without becoming random.",
      },
      {
        title: "03. Design and build",
        body:
          "We move through approved sections, screens, features, and milestones. You can pay by milestone, review work in stages, and keep decisions practical. Flexible payment modes are accepted.",
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
    title: "Custom digital work starts at $2,000. Payment can stay flexible.",
    intro:
      "Most focused websites, commerce builds, app prototypes, dashboards, automations, and software sprints start around $2,000 USD and can scale to $10,000+ depending on depth, integrations, screens, apps, and launch speed.",
    accent: "#ffb7db",
    stat: "$2k",
    statLabel: "starting point for focused custom technology work",
    sections: [
      {
        title: "Direct projects",
        body:
          "Working direct gives the cleanest budget. We accept flexible payment modes and milestone payments, so websites, apps, software and commerce projects can move in practical stages instead of one heavy payment.",
        points: [
          "Milestone payments accepted for design, build, and launch.",
          "Scope can be shaped for early-stage teams without killing quality.",
          "The quote is always tied to deliverables, not mystery hours.",
        ],
      },
      { title: "Before you pay", body: "Your quote and invoice identify Morgan Retailers, the currency, applicable taxes, scope, payment stages and agreed fees. Ask for clarification before paying if any detail is inconsistent." },
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
          "For 3 months after launch, we help with reasonable bug fixes, CMS or admin guidance, light polish, and questions related to the delivered scope.",
      },
      {
        title: "What happens after",
        body:
          "After the support period, you can book small improvement blocks, conversion work, new sections, landing pages, app updates, automations, integrations, or a monthly maintenance plan if your digital system needs ongoing care.",
      },
      {
        title: "How to reach us",
        body:
          "Use the website inquiry form to contact Morgan Retailers or write to the business address below. TheFullStack Guys is our website name. The business is MORGAN RETAILERS, GSTIN 07ANVPC6122B1ZA, at 1st Floor, House No-29, Tiggipur, New Delhi, North Delhi, Delhi, 110036, India.",
      },
    ],
  },
  "privacy-policy": {
  "slug": "privacy-policy",
  "eyebrow": "PRIVACY POLICY",
  "title": "Your information. Clear purposes. A named business.",
  "intro": "Privacy policy for TheFullStack Guys, operated by MORGAN RETAILERS. Last updated: 17 September 2026. This notice describes information handled when you browse, ask a question, request a quote, or engage our digital services.",
  "accent": "#64e6c0",
  "stat": "Your choice",
  "statLabel": "No sale of personal information; no optional ad tracking in this version",
  "sections": [
    {
      "title": "01. Who is responsible",
      "body": "MORGAN RETAILERS is the business and brand operating this website. TheFullStack Guys is the website name only, not a separate contracting business. GSTIN: 07ANVPC6122B1ZA. Business address: 1st Floor, House No-29, Tiggipur, New Delhi, North Delhi, Delhi, PIN 110036, India. For privacy requests, corrections, complaints, or project support, use the website inquiry form or write to Morgan Retailers at our business address. State that your request concerns TheFullStack Guys so we can route it correctly."
    },
    {
      "title": "02. Information you provide",
      "body": "We process information you choose to submit when contacting us, using the inquiry form or automated chat, booking a call, or commissioning work. Please provide only information needed for your inquiry.",
      "points": [
        "Contact and inquiry details: name, email, phone or WhatsApp number, company, industry, website, budget, requirements, expected timeline, and correspondence.",
        "Project records: proposals, agreed scope, approvals, files, account-access invitations, invoices, payment confirmations, and support communications.",
        "Chat content: your messages, replies, and project details inferred from the conversation. Do not enter payment card details, government identity documents, passwords, health information, or other sensitive personal data into chat."
      ]
    },
    {
      "title": "03. Technical information and browser storage",
      "body": "Website requests necessarily include technical information such as IP address, browser or device information, requested URL, and request time. Infrastructure providers may use request logs for delivery, troubleshooting, and security. The interface uses browser storage for chat session continuity, motion preferences, and remembering dismissed panels. These identifiers are not payment credentials. Clearing browser storage resets these preferences but does not delete records already submitted to us."
    },
    {
      "title": "04. Why information is used",
      "body": "Morgan Retailers uses information to answer your questions, assess requirements, prepare quotes, deliver and support agreed services, administer contracts and invoices, investigate problems, and meet applicable record-keeping obligations. Contacting us requests a response to that inquiry; it does not enroll you in a newsletter. We do not sell personal information or use inquiry submissions as permission for unrelated promotional campaigns. Where consent is required, we seek it for the relevant purpose and provide a way to withdraw it."
    },
    {
      "title": "05. Automated chat and human review",
      "body": "The site provides an automated project assistant, not a human adviser. When an AI provider is configured, message history may be processed by Groq to generate replies and summarize requirements; Hugging Face may classify inquiry intent if configured. Authorized staff may review saved conversations and inquiry details to respond and provide support. Automated summaries or scores help organize inquiries; they do not determine a binding price, credit eligibility, or other legal entitlement. Ask for human review of inaccurate responses. When AI services are unavailable, the assistant uses a rules-based fallback."
    },
    {
      "title": "06. Service providers and external links",
      "body": "Where configured for service delivery, providers may process information for databases (Neon), AI responses (Groq), intent classification (Hugging Face), infrastructure, email, and business administration. Only information needed for the relevant task should be shared. Opening a portfolio website takes you to an independently operated service with its own privacy practices. Portfolio media on this site is served from this site’s own asset paths. External links do not imply endorsement or ownership by Morgan Retailers."
    },
    {
      "title": "07. Advertising, cookies, and tracking choices",
      "body": "This version does not load Meta or OpenAI advertising pixels or send server-side advertising conversion events. We may record first-party website activity such as page views, clicks, scroll depth, approximate device type, session identifiers, requested paths, and chat or inquiry interactions to understand site performance, prevent abuse, and improve service delivery. Seeing or clicking an ad on another platform is governed by that platform’s privacy settings. If optional third-party advertising measurement is introduced later, we will update this notice, identify the data and recipients, and obtain consent where required before activating it. Declining optional advertising tracking must not prevent you from reading policies or contacting us."
    },
    {
      "title": "08. Access to client systems",
      "body": "For an agreed project we may need limited access to a website, store, repository, domain, or other business system. Use individual collaborator invitations and the least access needed; do not send passwords in chat. We use that access for the agreed work and coordinate removal at handoff. If we handle your customers’ personal data on your instructions, additional written confidentiality or data-processing terms may be needed before access is granted."
    },
    {
      "title": "09. Storage, transfers, and disclosure",
      "body": "Information may be processed in India or in countries where selected providers operate. Before using providers for personal data, we assess the purpose, access requirements, and applicable transfer safeguards. We may disclose information when legally required, to respond to a valid legal request, or when necessary to investigate misuse or protect rights. We do not claim all provider systems are located in India."
    },
    {
      "title": "10. Retention and deletion",
      "body": "Inquiry and chat records are retained only as needed to respond, manage an active relationship, handle disputes, and satisfy applicable obligations. We review continued need when a request is closed or a deletion request is received. Project, invoice, tax, and dispute records may need longer retention than a sales inquiry. Deletion may be delayed where a lawful retention obligation applies or backups must expire through their normal cycle. We will explain any relevant limitation when responding to your request; this notice does not promise an automatic deletion timer."
    },
    {
      "title": "11. Your choices and requests",
      "body": "You may ask what personal information we hold about you, request correction or deletion, withdraw consent for consent-based uses, ask us to stop promotional contact, or raise a grievance. We may request proportionate verification before disclosing or changing a record; do not send identity documents unless a secure, necessary method is agreed. Withdrawal does not invalidate earlier lawful processing or prevent records required by law from being retained. Applicable rights, procedures, and escalation options depend on the law in force. Contact us using the details in this policy; you may also approach an authority or forum available under applicable law."
    },
    {
      "title": "12. Security and children",
      "body": "We aim to restrict access to authorized people and use appropriate security controls for the information and service involved. No system can promise absolute security. Report suspected unauthorized access through our support contact promptly. The service is intended for adults able to enter a contract and authorized business representatives, not children under 18. If you believe a child has submitted personal information, contact us so we can investigate and remove it where appropriate."
    },
    {
      "title": "13. Complaints, contact, and policy changes",
      "body": "For privacy requests, corrections, complaints, or project support, use the website inquiry form or write to Morgan Retailers at our business address. State that your request concerns TheFullStack Guys so we can route it correctly. Include the relevant page or service, a description of the issue, and your preferred reply method. We will review requests and respond within the time required by applicable law. Material changes will be reflected here with an updated date; a new purpose requiring consent will not be activated merely by changing this text."
    }
  ]
},
  "refund-policy": {
  "slug": "refund-policy",
  "eyebrow": "REFUND POLICY",
  "title": "Fair cancellation and refund terms.",
  "intro": "Refund policy for digital services supplied by MORGAN RETAILERS through TheFullStack Guys. Last updated: 17 September 2026. This policy is subject to your project agreement and rights that cannot be excluded under applicable law.",
  "accent": "#ffdd55",
  "stat": "Fair review",
  "statLabel": "Completed work, unused funds, and legal rights all count",
  "sections": [
    {
      "title": "01. Who supplies the service",
      "body": "MORGAN RETAILERS is the business and brand operating this website. TheFullStack Guys is the website name only, not a separate contracting business. GSTIN: 07ANVPC6122B1ZA. Business address: 1st Floor, House No-29, Tiggipur, New Delhi, North Delhi, Delhi, PIN 110036, India."
    },
    {
      "title": "02. Before work begins",
      "body": "If you cancel before work begins, request return of unused funds. Any deduction must relate to an actual, reasonable, non-recoverable cost that was disclosed and authorized; we will explain the calculation. We do not use an undisclosed blanket administrative charge."
    },
    {
      "title": "03. After a project has started",
      "body": "We assess work completed against agreed milestones and the usable deliverables provided. Payment for correctly completed and accepted work is normally retained, subject to defects and mandatory rights. Unused prepaid amounts for undelivered work are considered for refund after any agreed, lawful, documented deductions. We provide an explanation rather than relying solely on a non-refundable label."
    },
    {
      "title": "04. If work does not meet scope",
      "body": "Report the issue with the agreed requirement and relevant examples. Where appropriate, we will offer a reasonable correction period. If the agreed service cannot be supplied or a material problem cannot be resolved, a proportionate refund, cancellation, or another remedy may be due under the contract and applicable law. Acceptance does not waive remedies that cannot legally be waived."
    },
    {
      "title": "05. External costs and marketplace orders",
      "body": "Domains, licenses, hosting, themes, platform charges, and other third-party costs follow their provider’s terms. We will identify costs already committed with your approval and pursue any available recovery where appropriate. Fiverr or Upwork orders also follow the platform’s dispute and payment process. Neither platform rules nor this policy remove non-excludable rights."
    },
    {
      "title": "06. Requests and payment of refunds",
      "body": "For privacy requests, corrections, complaints, or project support, use the website inquiry form or write to Morgan Retailers at our business address. State that your request concerns TheFullStack Guys so we can route it correctly. Include the invoice or project reference, payment date, issue, and requested resolution. Do not send full card or account credentials. We will confirm the outcome and, for an approved refund, the amount, payment route, and expected processing time in writing. Refunds normally return through the original payment method where available; provider processing times vary."
    },
    {
      "title": "07. Support, delays, and changes",
      "body": "Contact us promptly about delays or defects. We will review who controls the delay and its effect on delivery. Client changes or missing materials may require a revised schedule or quote, but do not automatically forfeit all unused funds. The advertised support period and any specific remedies are defined in your project agreement. Statutory remedies remain available."
    }
  ]
},
  "terms-of-use": {
  "slug": "terms-of-use",
  "eyebrow": "TERMS OF USE",
  "title": "Clear terms for working with Morgan Retailers.",
  "intro": "Terms of use for TheFullStack Guys. Last updated: 17 September 2026. These terms explain website use and the basis on which digital services are proposed and delivered. Read these together with the privacy and refund policies and your written project agreement.",
  "accent": "#ff9068",
  "stat": "MORGAN",
  "statLabel": "RETAILERS — the business behind TheFullStack Guys",
  "sections": [
    {
      "title": "01. Business identity and contracting party",
      "body": "MORGAN RETAILERS is the business and brand operating this website. TheFullStack Guys is the website name only, not a separate contracting business. GSTIN: 07ANVPC6122B1ZA. Business address: 1st Floor, House No-29, Tiggipur, New Delhi, North Delhi, Delhi, PIN 110036, India. Quotes, agreements, payment instructions, and tax invoices for direct projects must identify Morgan Retailers. The website name does not replace the identity of the supplier."
    },
    {
      "title": "02. Website use and eligibility",
      "body": "You may browse and submit a genuine inquiry without purchasing. To commission services you must be at least 18, have capacity to contract, and have authority to act for any organization you represent. Do not impersonate others, submit deceptive material, attempt unauthorized access, disrupt the site, or use the service for unlawful activities."
    },
    {
      "title": "03. Services and project agreements",
      "body": "Services include website design and development, commerce integrations, software, apps, automation, design, and agreed support. A project starts only after written agreement on scope, price, payment schedule, deliverables, dependencies, timelines, revisions, and acceptance arrangements. A website visit, inquiry, automated chat reply, or calendar booking is not acceptance of a paid contract. A specific written agreement controls over general website statements for that project, subject to mandatory law."
    },
    {
      "title": "04. Prices, GST, and payment identity",
      "body": "Displayed starting prices are indicative starting points in USD, not a promise that every project is available at that price. Before payment, the written quote must state the final scope, currency, applicable GST or other taxes, payment or platform charges, due dates, and any recurring third-party costs. GSTIN: 07ANVPC6122B1ZA. Tax treatment depends on the transaction and applicable rules. Verify that the invoice and authorized payment beneficiary identify Morgan Retailers; query inconsistent instructions before paying. We do not collect card numbers or banking passwords in website chat."
    },
    {
      "title": "05. Offers and discounts",
      "body": "A displayed promotional code is a request to apply the advertised discount to eligible new work. Where the 30% new-project offer is used, the written quote must show the ordinary eligible service fee, discount, and final payable amount before you commit. It does not apply to taxes, ad spend, third-party subscriptions, marketplace charges, or existing work, and cannot be combined with other offers unless agreed. A code is not cash, a booking guarantee, or a payment receipt. We will explain eligibility before accepting payment and will not silently replace an agreed price."
    },
    {
      "title": "06. Milestones, timelines, and revisions",
      "body": "Work is delivered against agreed stages. Review each stage within the written review period and describe any gap against scope. Silence does not automatically waive a defect or statutory remedy. New features or substantial direction changes require a written change to cost and timing. Schedules depend on timely access, content, approvals, and third-party availability; we communicate material delays and their impact."
    },
    {
      "title": "07. Client materials and system access",
      "body": "You must have permission to provide content, images, trademarks, data, and system access. Supply accurate requirements and lawful materials, and grant only necessary access through secure invitations. Both parties should protect confidential information and avoid unnecessary collection or disclosure of personal data. You remain responsible for decisions about your products and business claims; we remain responsible for our agreed professional work."
    },
    {
      "title": "08. AI-assisted answers",
      "body": "The website assistant helps explain services and collect requirements. It may make mistakes and is not legal, tax, financial, or other regulated advice. Automated estimates, summaries, or statements are not binding project commitments; obtain written confirmation from Morgan Retailers. You may request human clarification before making a purchase."
    },
    {
      "title": "09. Intellectual property and confidentiality",
      "body": "Your existing materials remain yours. Rights in final custom deliverables are transferred or licensed as specified in your agreement after applicable payment. Pre-existing tools, reusable components, open-source code, and third-party assets remain subject to their owners’ rights and licenses, which must be disclosed where relevant to use. Neither party may disclose the other’s confidential information except for authorized delivery or a lawful requirement. Public portfolio use of confidential work or your brand requires appropriate permission."
    },
    {
      "title": "10. External platforms and profiles",
      "body": "Marketplace orders are also subject to that platform’s payment, dispute, and cancellation rules. External profiles, portfolios, and review pages belong to their stated account holders; a link is not a claim that a platform endorses Morgan Retailers. Third-party hosting, domains, themes, apps, and software may carry separate charges or limitations. We remain accountable for our contractual obligations and will not use a third-party issue to exclude rights that cannot lawfully be excluded."
    },
    {
      "title": "11. Cancellation, refunds, and incomplete work",
      "body": "You may request cancellation through our published contact details. The refund policy explains how completed work, unused funds, non-recoverable authorized costs, and failures to meet agreed scope are assessed. If we cannot deliver agreed work, we will discuss correction, revised delivery, cancellation, and any refund due. No approved milestone or cancellation term removes mandatory consumer rights or remedies for defective services, fraud, or misrepresentation."
    },
    {
      "title": "12. Support and handoff",
      "body": "The advertised three months of post-launch support covers reasonable bug fixes and questions within the delivered scope. The project agreement should define the launch date, support channel, response expectations, and exclusions before payment. New functionality, redesigns, ongoing campaigns, and third-party subscriptions require separate agreement. At handoff, we provide agreed files and access and coordinate removal of access no longer required."
    },
    {
      "title": "13. Honest claims and independent platform decisions",
      "body": "We do not guarantee revenue, search rankings, conversion rates, traffic, advertising results, ad-account approval, or approval by ChatGPT, OpenAI, or any other platform. Names and examples describe services or independent platforms, not a claim of endorsement or partnership. Advertising must accurately identify Morgan Retailers, the offer, location, and destination; platform eligibility and review decisions remain with the platform."
    },
    {
      "title": "14. Responsibility and lawful limitations",
      "body": "Each party is responsible for losses arising from its breach as determined under the agreement and applicable law. Any negotiated liability cap must be stated in the written project agreement and is effective only to the extent permitted by law. Nothing in these terms excludes or limits liability or rights that cannot legally be excluded, including mandatory consumer remedies and liability for fraud or wilful misconduct."
    },
    {
      "title": "15. Suspension and termination",
      "body": "We may suspend work for material non-payment, security risks, unlawful requests, or a material contractual breach, with notice and a reasonable opportunity to resolve the issue where practicable. Urgent security issues may require immediate action. Ending a project does not erase refund obligations, accrued payment obligations, confidentiality, or rights in already paid deliverables. Any handoff or unused funds will be addressed fairly under the project agreement and applicable law."
    },
    {
      "title": "16. Complaints, governing law, and changes",
      "body": "For privacy requests, corrections, complaints, or project support, use the website inquiry form or write to Morgan Retailers at our business address. State that your request concerns TheFullStack Guys so we can route it correctly. Indian law applies, subject to mandatory protections and jurisdiction rules that apply to you. We encourage written discussion first, but this does not restrict access to a competent court, consumer forum, regulator, or other remedy available by law. Updates apply prospectively; changes to a signed project require agreement and do not silently rewrite previously accepted terms."
    }
  ]
},
};
