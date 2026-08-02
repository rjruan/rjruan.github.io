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
    title: "Health Monitoring",
    inquiry:
      "How might a monitoring experience help people understand changing health information without overwhelming them?",
    type: "Deep case study",
    portfolioRole: "Research-thinking and Human Factors case",
    role: "TBD",
    context: "TBD",
    year: "TBD",
    status: "Case study scaffold",
    availability: "Published scaffold",
    detailPath: "/expeditions/health-monitoring/",
    themes: [
      "Human Factors",
      "Cognitive load",
      "Trust",
      "Information hierarchy",
      "Accessibility"
    ],
    summary:
      "A case-study position for contextual observation, problem framing, information prioritization, cognitive load, trust, accessibility, and unanswered research questions.",
    visualLabel: "Monitoring signals + sensemaking",
    sections: {
      overview:
        "This scaffold reserves space for a Health Monitoring case study focused on research thinking and Human Factors. Final project details, evidence, and outcomes are TBD.",
      context:
        "Context and constraints are TBD. This section should eventually clarify setting, users or participants when appropriate, project boundaries, and ethical or accessibility constraints.",
      question:
        "How might health-monitoring information be organized so people can notice what matters, understand uncertainty, and retain agency without unnecessary cognitive load?",
      role:
        "Ruby's role, collaborators, and responsibilities are TBD. Do not add unverified responsibilities or metrics here.",
      evidence:
        "Evidence and observations are TBD. Future updates may include contextual observations, task flows, interface audits, accessibility notes, or research artifacts.",
      process:
        "Process documentation should show how observations became design criteria, how information priorities were evaluated, and where prototyping clarified interaction decisions.",
      decisions:
        "Key decisions are TBD. This section should distinguish evidence-backed decisions from informed hypotheses.",
      outcome:
        "Outcome or current state is TBD. Do not publish health claims, impact metrics, or participant findings until they are verified and approved for sharing.",
      reflection:
        "Reflection should connect the work to Human Factors, trust, cognitive load, accessibility, and ethical communication of complex information.",
      openQuestions: [
        "What information should be surfaced immediately versus made available on demand?",
        "How should uncertainty, confidence, or missing data be communicated?",
        "Where might accessibility needs change the structure of alerts, charts, or status language?"
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
