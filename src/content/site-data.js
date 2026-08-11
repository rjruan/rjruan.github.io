const site = {
  name: "Ruby Ruan",
  title: "Ruby Ruan UX Portfolio",
  url: "https://rjruan.github.io",
  description:
    "A coded UX portfolio for Ruby Ruan, an emerging researcher exploring how people understand, navigate, and maintain agency within complex systems.",
  contact: {
    email: "TBD",
    linkedin: "TBD",
    resumePdf: "TBD"
  }
};

const navigation = [
  {
    label: "Base Camp",
    path: "/",
    title: "Base Camp - Home"
  },
  {
    label: "Expeditions",
    path: "/expeditions/",
    title: "Expeditions - Projects and Case Studies"
  },
  {
    label: "Field Notes",
    path: "/field-notes/",
    title: "Field Notes - Research, Process, and Experiments"
  },
  {
    label: "About Ruby",
    path: "/about/",
    title: "About Ruby"
  },
  {
    label: "Resume",
    path: "/resume/",
    title: "Resume"
  }
];

const profile = {
  currentRole: "UX Design Intern",
  positioning:
    "I'm Ruby - a curious explorer, designer, and emerging researcher investigating how people understand, navigate, and maintain agency within complex systems.",
  supportingCopy:
    "Her path connects graphic design, philosophy, and web development with growing interests in HCI, Human Factors, accessibility, XR, human-centered AI, and emerging human-centered technologies.",
  trajectory:
    "Ruby's portfolio is structured as digital field notes: a place to document observations, project decisions, constraints, open questions, and the bridge between research thinking and designed systems."
};

const workingMethods = [
  {
    title: "Observe People and Systems",
    detail:
      "Start by noticing context, behavior, friction, constraints, and the surrounding system before narrowing toward a solution."
  },
  {
    title: "Frame the Question",
    detail:
      "Translate messy situations into useful design and research questions, while keeping assumptions visible."
  },
  {
    title: "Prototype for Understanding",
    detail:
      "Use visual design, interaction design, and coded prototypes to test structure, clarity, accessibility, and agency."
  },
  {
    title: "Document What Remains Unknown",
    detail:
      "Treat open questions as part of the work, especially where evidence, permission, or deeper research is still needed."
  }
];

const inquiries = [
  "How can interfaces reduce cognitive load without hiding important complexity?",
  "What helps people keep agency when systems become technical, automated, or high-stakes?",
  "How can accessibility practices become part of early framing instead of late correction?",
  "What might HCI, Human Factors, XR, and human-centered AI learn from everyday observation?"
];

const projects = [
  {
    slug: "health-monitoring",
    title: "FamilyPulse",
    inquiry:
      "How might connected care support safety without turning care into surveillance?",
    type: "Deep case study",
    portfolioRole: "Dignity-centered HCI and Human Factors case",
    role: "UX Researcher & UX Designer",
    context: "Independent concept project",
    year: "Sep–Dec 2024",
    status: "Case study",
    availability: "Published case study",
    detailPath: "/expeditions/health-monitoring/",
    themes: [
      "Dignity",
      "Human Factors",
      "Accessibility",
      "Cross-device UX",
      "Health technology"
    ],
    summary:
      "A cross-device concept exploring how older adults living independently and the people they trust could stay informed, connected, and ready to respond while preserving dignity and autonomy.",
    visualLabel: "Watch + phone support system",
    visualStyle: "family-pulse",
    caseStudy: {
      headline: "Designing connected support without turning care into surveillance",
      lede:
        "FamilyPulse explores how an older adult and the people they trust could share health-status context, communicate, and respond to urgent moments without making care feel conspicuous or controlling.",
      conceptLabel: "Independent concept — not a medical device",
      sourceLinks: [
        {
          label: "View interactive prototype",
          url: "https://www.figma.com/proto/VbzeWWmS8IEhteLz8vr9SK?node-id=1-13"
        },
        {
          label: "View presentation",
          url: "https://www.figma.com/slides/gMDM2OerKufD8sL4DWkexR/FamilyPulse-App"
        },
        {
          label: "View original published case study",
          url: "https://rubyruan.framer.website/familypulse"
        }
      ],
      stat: {
        value: "28%",
        body:
          "of U.S. adults age 65+ living in the community lived alone in 2023. Living independently is not itself a problem; access to help matters when an urgent event occurs and a phone is out of reach.",
        sourceLabel: "U.S. Administration for Community Living",
        sourceUrl:
          "https://acl.gov/news-and-events/announcements/acl-releases-2023-profile-older-americans"
      },
      research: {
        intro:
          "I reviewed medical-alert products and spoke informally with parents, friends, and classmates about experiences and concerns related to older family members. I also ran several small, informal usability sessions with paper wireframes and later checked the final prototype.",
        methods: [
          "Competitive review of medical-alert products",
          "Informal conversations with parents, friends, and classmates",
          "Paper-wireframe exploration and usability sessions",
          "Low-fidelity watch and phone flows",
          "Final cross-device prototype checks"
        ],
        limits:
          "This was exploratory work, not a clinical or statistically representative study. I did not retain exact participant counts, standardized scripts, or quantitative task measures, so the case study does not claim proven usability gains."
      },
      insight: {
        statement:
          "A safety tool can fail even when it technically works if using it undermines a person’s identity.",
        body:
          "People I spoke with raised a human concern: visibly specialized alert devices could identify an older adult as frail or dependent. That shifted my goal from monitoring a person to supporting independence."
      },
      systemNodes: [
        {
          label: "Older adult",
          detail: "Chooses when and how to ask for help or share a concern."
        },
        {
          label: "Smartwatch",
          detail: "Prioritizes status, urgent help, family contact, and reminders."
        },
        {
          label: "Companion phone",
          detail: "Supports review, communication, reminder setup, and concern sharing."
        },
        {
          label: "Trusted contacts",
          detail: "Receive context and respond without becoming invisible overseers."
        }
      ],
      decisions: [
        {
          number: "01",
          title: "Use a familiar device to reduce stigma",
          body:
            "A mainstream smartwatch can support urgent access while remaining part of everyday life. The form factor is a dignity decision, not only a hardware decision."
        },
        {
          number: "02",
          title: "Give each device a different job",
          body:
            "The watch is not a miniature phone. It prioritizes short, recognizable actions; the phone makes room for review, filters, communication, and setup."
        },
        {
          number: "03",
          title: "Support urgent and everyday connection",
          body:
            "Emergency access sits alongside messaging, calling, reminders, and recent-status review so support is not defined only by crisis."
        },
        {
          number: "04",
          title: "Show status without overclaiming certainty",
          body:
            "Three high-level states can support a conversation or earlier response, but they do not diagnose a condition or predict an emergency."
        }
      ],
      flows: [
        {
          title: "Urgent help",
          steps: ["Notice concern", "Open SOS", "Contact emergency service"]
        },
        {
          title: "Family connection",
          steps: ["Choose contact", "Send voice or text message", "Continue by call"]
        },
        {
          title: "Share a concern",
          steps: ["Review recent status", "Choose date range", "Attach context for guidance"]
        },
        {
          title: "Create a reminder",
          steps: ["Add reminder", "Set time and repeat", "Confirm in daily routine"]
        }
      ],
      iteration: {
        before:
          "Early exploration exposed crowded watch screens, unclear settings, and weak discoverability on the phone.",
        after:
          "I simplified the watch hierarchy, removed nonessential elements, and gave the broader phone tasks more explicit structure. Later prototype checks focused on continuity between devices.",
        caveat:
          "Because formal study documentation was not retained, these are qualitative design learnings rather than measured improvements."
      },
      designSystem: {
        body:
          "I created a small system with separate color directions for the older-adult and family contexts, Inter typography, shared icon logic, buttons, recipient and time-filter components, and health-status graphics.",
        principle:
          "Consistency across devices does not mean duplication: interaction priority, density, and hierarchy must respond to the physical surface and the person’s task."
      },
      boundaries: [
        "The concept assumes compatible smartwatch sensors and linked medical records.",
        "Blood-pressure and blood-sugar data may require a compatible medical device or records integration, not a standard smartwatch.",
        "FamilyPulse was not clinically validated and does not diagnose, predict emergencies, or replace emergency services or professional medical care.",
        "The project did not evaluate long-term effects on health outcomes or family relationships."
      ],
      nextSteps: [
        "Co-design language, controls, and consent settings with older adults.",
        "Test readability, motor accessibility, cognitive load, and error recovery on the watch.",
        "Let an older adult decide who sees which information and revoke access at any time.",
        "Validate sensor feasibility, provenance, thresholds, false alarms, and missing-data states with technical and clinical experts.",
        "Separate emergency escalation from non-emergency guidance and make responsibility clear.",
        "Study whether shared status feels supportive or intrusive over time."
      ],
      reflection:
        "I began with a feature question about emergency support and ended with a deeper research question about dignity, consent, and identity. Conversations with family and peers helped frame the problem, but they cannot replace direct participation from older adults or expert validation of a health system. That gap defines the work I want to pursue through HCI, Human Factors, accessibility, and dignity-centered technology.",
      media: [
        {
          id: "hero-cross-device",
          nodeId: "528:3697",
          title: "Cross-device concept",
          caption:
            "The final direction pairs a familiar smartwatch touchpoint with a companion phone experience.",
          alt:
            "FamilyPulse phone and smartwatch concept shown together, including an emergency call on the watch.",
          src: null
        },
        {
          id: "status-home",
          nodeId: "1:14",
          title: "Status at a glance",
          caption:
            "A family-facing home view surfaces recent signals and routes to reminders or deeper review.",
          alt:
            "FamilyPulse home screen with a health score and recent heart, blood-pressure, and blood-sugar status.",
          src: null
        },
        {
          id: "analysis-history",
          nodeId: "1:21",
          title: "Recent-history review",
          caption:
            "The companion phone supports date filtering and sharing context when guidance may be needed.",
          alt:
            "FamilyPulse analysis screen with recent health-status cards and date controls.",
          src: null
        },
        {
          id: "family-chat",
          nodeId: "1:17",
          title: "Everyday connection",
          caption:
            "Messaging and calling keep the system from appearing only when something goes wrong.",
          alt: "FamilyPulse family chat screen.",
          src: null
        },
        {
          id: "reminder-setup",
          nodeId: "134:294",
          title: "Reminder setup",
          caption:
            "Family members can prepare recurring reminders that fit into the older adult’s daily experience.",
          alt: "FamilyPulse reminder setup screen with time and repeat controls.",
          src: null
        }
      ]
    }
  },
  {
    slug: "ssim",
    title: "SSIM",
    inquiry:
      "An independent making project connecting visual design, interaction thinking, prototyping, and coded implementation.",
    type: "Deep case study",
    portfolioRole: "Independent making and technical-bridge case",
    role: "TBD",
    context: "Independent project",
    year: "TBD",
    status: "In progress",
    availability: "Published scaffold",
    detailPath: "/expeditions/ssim/",
    themes: [
      "Visual design",
      "Interaction design",
      "Prototyping",
      "Coded implementation"
    ],
    summary:
      "A reserved deep-case position for SSIM while its final meaning, process, and outcomes remain incomplete.",
    visualLabel: "Visual system + coded prototype",
    sections: {
      overview:
        "SSIM is reserved as an independent making and technical-bridge case study. Final framing, project definition, and outcomes are TBD.",
      context:
        "Context is TBD. This section should eventually explain the project origin, constraints, tools, and intended audience without overstating the work.",
      question:
        "What can Ruby learn by moving between visual design, interaction prototyping, and coded implementation?",
      role:
        "Ruby's role is TBD. Future updates should separate design, prototyping, and development contributions clearly.",
      evidence:
        "Evidence and observations are TBD. Include process artifacts only when they can be accurately described.",
      process:
        "Process documentation should show how visual decisions, interaction behavior, and technical implementation informed one another.",
      decisions:
        "Key decisions are TBD. Avoid claiming project results until the case study is complete.",
      outcome:
        "Outcome or current state is in progress. This page intentionally uses a scaffold until final content is ready.",
      reflection:
        "Reflection should focus on what changed through making, what the coded artifact made visible, and what remains unresolved.",
      openQuestions: [
        "What interaction decisions became clearer only after implementation?",
        "Which visual-system choices improved clarity or usability?",
        "What should be tested or documented before presenting SSIM as a complete case study?"
      ]
    }
  },
  {
    slug: "professional-systems-placeholder",
    title: "Professional Systems Case Study",
    inquiry:
      "A permission-sensitive professional case-study placeholder for systems, collaboration, constraints, and organizational-scale product work.",
    type: "Deep case study preview",
    portfolioRole: "Professional systems and organizational-scale case",
    role: "UX Design Intern",
    context: "Professional work",
    year: "TBD",
    status: "Preparing sanitized version",
    availability: "Unavailable until public-sharing permission is confirmed",
    detailPath: null,
    themes: [
      "Professional constraints",
      "Shared systems",
      "Collaboration",
      "Complex products",
      "Confidentiality"
    ],
    summary:
      "This neutral placeholder protects confidential product names, screenshots, internal processes, metrics, stakeholder details, and unreleased work.",
    visualLabel: "Protected professional case"
  },
  {
    slug: "portfolio-system",
    title: "Portfolio System",
    inquiry:
      "How can a portfolio structure make research thinking, design process, and coded implementation easier to maintain over time?",
    type: "Medium project",
    portfolioRole: "Coded portfolio architecture",
    role: "Designer and developer",
    context: "Personal portfolio",
    year: "2026",
    status: "Version 0.1",
    availability: "Visible as current site system",
    detailPath: null,
    themes: ["Information architecture", "Content modeling", "Accessibility"],
    summary:
      "A living medium-project entry for the portfolio system itself, to be expanded if Ruby wants to document the build process.",
    visualLabel: "Reusable content + page templates"
  }
];

const fieldNotes = [
  {
    slug: "agency-in-complex-systems",
    title: "Agency in Complex Systems: Working Questions",
    date: "TBD",
    topic: "HCI / Human Factors",
    context:
      "A first field-note structure for tracking questions Ruby may return to across projects.",
    observation:
      "People often need to make decisions inside systems whose logic, constraints, or status are only partially visible.",
    interpretation:
      "This is a working interpretation, not a validated research finding. Future notes should connect this question to specific observations, readings, or project evidence.",
    openQuestions: [
      "What makes a system feel understandable enough to act within?",
      "When does simplification support agency, and when does it hide important context?",
      "How should interfaces reveal constraints without increasing unnecessary cognitive load?"
    ],
    relatedExpedition: "Health Monitoring",
    relatedProjectSlug: "health-monitoring"
  },
  {
    slug: "accessibility-as-framing",
    title: "Accessibility as Early Framing",
    date: "TBD",
    topic: "Accessibility",
    context:
      "A placeholder for process reflections on treating accessibility as part of the initial design question.",
    observation:
      "Accessibility decisions can shape information hierarchy, interaction patterns, content strategy, and technical implementation.",
    interpretation:
      "This note should eventually be grounded in specific project examples, audits, or experiments.",
    openQuestions: [
      "Which accessibility considerations should be documented before visual exploration begins?",
      "How can prototypes make accessibility tradeoffs visible earlier?",
      "What recurring accessibility checks belong in Ruby's project template?"
    ],
    relatedExpedition: "TBD",
    relatedProjectSlug: null
  }
];

const galleryItems = [
  {
    title: "Graphic Design Study",
    image: null,
    category: "Graphic design gallery item",
    year: "TBD",
    role: "TBD",
    caption:
      "Placeholder entry for future selected visual work. Replace with approved image, category, year, role, caption, and alt text.",
    alt:
      "Neutral placeholder for a future graphic design gallery item. Final image is TBD.",
    detailPath: null
  }
];

const resume = {
  intro:
    "This page is a structured resume placeholder. Replace TBD fields with verified education, experience, skills, and resume access details.",
  sections: [
    {
      title: "Education",
      items: [
        {
          heading: "TBD",
          meta: "Graphic Design, philosophy, and Web Development background",
          detail: "Add institution, program, dates, honors, and relevant coursework when verified."
        }
      ]
    },
    {
      title: "Experience",
      items: [
        {
          heading: "UX Design Intern",
          meta: "Current role",
          detail:
            "Add organization, dates, team, scope, and public-safe responsibilities when verified."
        }
      ]
    },
    {
      title: "Skills and Interests",
      items: [
        {
          heading: "Design and Research",
          meta: "UX, HCI, Human Factors, accessibility",
          detail:
            "Add tools, methods, research experience, and technical skills as verified."
        },
        {
          heading: "Technology",
          meta: "Web Development and coded prototyping",
          detail:
            "Add languages, frameworks, prototyping tools, and implementation examples as verified."
        }
      ]
    }
  ]
};

module.exports = {
  site,
  navigation,
  profile,
  workingMethods,
  inquiries,
  projects,
  fieldNotes,
  galleryItems,
  resume
};
