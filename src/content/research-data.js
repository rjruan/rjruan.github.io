const research = {
  hero: {
    eyebrow: "Research direction",
    title:
      "I’m developing a research practice around how people understand, trust, and maintain agency in complex systems.",
    lede:
      "My current evidence comes from exploratory UX research, accessibility evaluation, synthesis, and prototyping. I am building toward more formal HCI and Human Factors research training."
  },
  themes: [
    {
      number: "01",
      title: "Dignity, autonomy, and accessible care",
      question:
        "How can health technology support safety without reducing a person’s autonomy, dignity, or sense of self?",
      status: "Current project evidence",
      body:
        "FamilyPulse gives me a starting point for examining how visible dependence, monitoring, accessibility, and family care can create competing needs.",
      evidence: "FamilyPulse · exploratory UX class project",
      path: "/expeditions/health-monitoring/",
      boundary:
        "The project did not include older-adult participants, clinical validation, or a defined privacy and data-sharing model."
    },
    {
      number: "02",
      title: "Agency, trust, and system transparency",
      question:
        "What information helps people understand a system well enough to choose, act, and remain in control?",
      status: "Developing direction",
      body:
        "My accessibility work and Field Notes are helping me frame questions about visible system state, constraints, uncertainty, and the difference between useful simplification and hidden complexity.",
      evidence: "Field Notes · accessibility practice",
      path: "/field-notes/",
      boundary:
        "This is an evolving research direction. I do not yet have a formal study or a public safety-critical-system case to support findings."
    },
    {
      number: "03",
      title: "Situation awareness and cognitive workload",
      question:
        "How should automated, XR, and safety-critical interfaces communicate system state without overwhelming people?",
      status: "Future research direction",
      body:
        "I want to study how people supervise or cooperate with complex technology when attention, workload, uncertainty, and human error matter.",
      evidence: "Research questions · no direct project evidence yet",
      path: null,
      boundary:
        "This direction describes the training and research opportunities I am seeking; it is not an area in which I claim established expertise."
    }
  ],
  questions: [
    "How should automated systems communicate uncertainty and system state without overwhelming people?",
    "What helps people maintain situation awareness when control is shared with intelligent systems?",
    "How can health technology support safety without reducing autonomy or dignity?",
    "How should XR and other complex interfaces account for cognitive workload, accessibility, and human error?"
  ],
  experience: [
    {
      title: "Exploratory interviews and questionnaires",
      evidence:
        "Used in course and independent UX projects to surface experiences, concerns, and language before narrowing a design direction.",
      boundary:
        "These were informal project methods; detailed protocols, full sample records, and formal qualitative coding were not retained."
    },
    {
      title: "Competitive and desk research",
      evidence:
        "Used to compare product patterns, frame opportunity areas, and identify questions for FamilyPulse and Echo PenPal.",
      boundary:
        "The original projects did not use a formal scoring framework or systematic review protocol."
    },
    {
      title: "Research synthesis and question framing",
      evidence:
        "Used to distinguish observations, interpretations, design principles, assumptions, and unresolved questions across case studies.",
      boundary:
        "Synthesis supports design reasoning here; it should not be read as peer-reviewed or statistically representative research."
    },
    {
      title: "Formative usability evaluation",
      evidence:
        "Paper prototypes, task scenarios, classroom critique, and informal usability feedback informed interaction changes.",
      boundary:
        "I did not retain a formal test log or quantitative outcome measures for the class projects shown."
    },
    {
      title: "Accessibility evaluation",
      evidence:
        "Applied through professional UX practice and this coded portfolio’s semantic, keyboard, contrast, responsive, and preference-based checks.",
      boundary:
        "Permission-sensitive professional evidence is not publicly shown, and accessibility conformance is never inferred from visual review alone."
    },
    {
      title: "Prototyping and information architecture",
      evidence:
        "Figma and coded prototypes help me examine hierarchy, discoverability, cross-device roles, and accessible interaction structure.",
      boundary:
        "A prototype communicates and tests a hypothesis; it is not evidence of a launched or validated product."
    }
  ],
  developing: [
    "Formal experimental design",
    "Advanced qualitative coding and thematic analysis",
    "Statistics and tools such as R, JASP, or SPSS",
    "Eye-tracking study design and analysis",
    "Academic manuscript writing",
    "Formal human-subject research under IRB or ethics review"
  ],
  selectedWork: [
    {
      title: "FamilyPulse",
      label: "Current project evidence",
      path: "/expeditions/health-monitoring/",
      body:
        "A dignity-centered connected-care concept that makes its assumptions, research limits, and unanswered privacy questions visible."
    },
    {
      title: "SSIM",
      label: "Independent exploratory work",
      path: "/expeditions/ssim/",
      body:
        "An exploration of family memory, cultural stewardship, ownership, and the responsibilities that follow preservation."
    },
    {
      title: "Field Notes",
      label: "Questions in progress",
      path: "/field-notes/",
      body:
        "Short records that separate observation from interpretation and name the questions that still need evidence."
    }
  ]
};

module.exports = { research };
