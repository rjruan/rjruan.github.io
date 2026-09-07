const site = {
  name: "Ruby Ruan",
  title: "Ruby Ruan UX Portfolio",
  url: "https://rjruan.github.io",
  description:
    "A coded UX portfolio for Ruby Ruan, an emerging researcher exploring how people understand, navigate, and maintain agency within complex systems.",
  contact: {
    email: null,
    linkedin: null,
    github: "https://github.com/rjruan",
    resumePdf: null
  }
};

const navigation = [
  {
    label: "Research",
    path: "/research/",
    title: "Research questions, methods, and evidence"
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
    "I design for the moment a person has to trust a system.",
  supportingCopy:
    "I'm Ruby—a curious explorer, UX designer, and emerging researcher. My path connects graphic design, philosophy, and web development with HCI, Human Factors, accessibility, XR, and human-centered AI.",
  trajectory:
    "I collect questions the way some people collect souvenirs. These digital field notes document observations, project decisions, constraints, and the questions I am still carrying."
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
    homeQuestion:
      "Why can care feel like surveillance—even when it is meant to protect us?",
    inquiry:
      "How might connected care support safety without turning care into surveillance?",
    type: "Deep case study",
    portfolioRole: "Dignity-centered HCI and Human Factors case",
    role: "Sole UX researcher and designer",
    context: "Individual UX Design class project",
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
        "FamilyPulse began with a memory of my grandparent falling in a bathroom in Taiwan. It explores how an older adult and the people they trust might share health context, communicate, and respond to urgent moments without making care feel conspicuous or controlling.",
      conceptLabel: "Course concept — not a medical device",
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
          "I reviewed medical-alert products, explored recurring concerns around aging and visible dependence, and used paper wireframes plus classroom critique to examine the concept.",
        methods: [
          "Competitive review of medical-alert products",
          "Informal conversations about aging, falls, independence, and support",
          "Paper-wireframe task sessions with classmates",
          "Low-fidelity watch and phone flows",
          "Instructor and classroom critique of the final concept"
        ],
        findings: [
          "Several products in my competitive review depended on a dedicated medical-alert device rather than a familiar everyday object.",
          "The concepts I reviewed emphasized responding after an incident; they offered less context for noticing changes before someone chose to ask for help.",
          "The project exposed a design tension: family members may want clearer status context, while constant monitoring could make an older adult feel watched or dependent.",
          "A recurring concern was stigma: visibly medical devices can signal frailty or dependence instead of supporting everyday identity."
        ],
        limits:
          "This was exploratory classroom work, not a clinical or statistically representative study. No individual research responses are included in this public version. Older adults were not directly involved in the research, so the case study does not claim proven usability, accessibility, or health outcomes."
      },
      audiences: [
        {
          title: "Older adult",
          context:
            "A person living independently who wants support to remain available without becoming the center of their identity.",
          needs: [
            "Reach urgent help when a phone is not nearby",
            "Contact family through short, familiar actions",
            "Ask for non-emergency guidance without navigating a dense interface"
          ]
        },
        {
          title: "Family or trusted contact",
          context:
            "A person who wants enough context to respond thoughtfully without becoming a constant monitor.",
          needs: [
            "Review recent status and share relevant context",
            "Create reminders that fit an existing routine",
            "Respond to messages or concerns through the same connected system"
          ]
        }
      ],
      designGoals: [
        "Make urgent help and family contact easier to find.",
        "Use a familiar smartwatch so support does not look like a stigmatizing medical device.",
        "Give family members useful context without presenting surveillance as care.",
        "Keep status language understandable while being honest that the concept was not clinically defined."
      ],
      insight: {
        statement:
          "A safety tool can fail even when it technically works if using it undermines a person’s identity.",
        body:
          "The products I reviewed covered many basic alert functions, but their specialized appearance could label someone as a person who needs help. Thinking about my grandparent shifted my goal from monitoring an older adult to supporting independence without taking away pride or dignity."
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
          title: "Make support feel like a desirable everyday device",
          body:
            "A mainstream smartwatch can feel current and desirable while also supporting urgent access. Someone can wear a device because it is useful and appealing—not because it announces that they need medical assistance."
        },
        {
          number: "02",
          title: "Give each device a different job",
          body:
            "I assigned interactions according to what each device made easiest to access. The watch prioritizes short actions close to the body; the phone makes room for review, filters, communication, and setup."
        },
        {
          number: "03",
          title: "Let Vivi carry part of the emotional burden",
          body:
            "A small character named Vivi reports status and helps frame the information. The goal was to make the system feel like a shared helper rather than positioning a family member as someone who must constantly watch and manage another person."
        },
        {
          number: "04",
          title: "Keep important tasks within a short path",
          body:
            "After early screens felt insufficiently direct, I simplified the hierarchy so checking recent status, sharing information, or contacting family could be reached in roughly two or three taps. This was a design target, not a measured usability result."
        },
        {
          number: "05",
          title: "Show status without pretending certainty",
          body:
            "Three high-level health states communicate a concept for noticing change and starting a conversation. The project did not define or clinically validate the thresholds behind those states."
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
      scenarios: [
        {
          audience: "Older adult",
          title: "Reach urgent help",
          body:
            "An 85-year-old with a history of heart concerns feels faint after a shower. Their phone is not within reach, so they use the smartwatch to contact emergency services."
        },
        {
          audience: "Older adult",
          title: "Send a family message",
          body:
            "An older adult living alone misses their family and wants to send a short text, voice message, or photo without moving through a complicated menu."
        },
        {
          audience: "Older adult",
          title: "Ask for non-emergency guidance",
          body:
            "After noticing a sore neck and a racing heartbeat, the person wants to share recent context and ask an advisor what to do next."
        },
        {
          audience: "Trusted contact",
          title: "Review and share context",
          body:
            "A family member reviews recent status, chooses a date range, and attaches relevant information when asking for guidance."
        },
        {
          audience: "Trusted contact",
          title: "Create a reminder",
          body:
            "A family member sets a recurring reminder that can appear in the older adult’s daily watch experience."
        },
        {
          audience: "Trusted contact",
          title: "Respond to a concern",
          body:
            "A family member sees a message or concern, contacts the older adult, and decides whether additional guidance or urgent help is appropriate."
        }
      ],
      iteration: {
        before:
          "During paper-prototype tasks, some screens were not direct enough for checking the previous three days of status, sharing information with a medical advisor, or sending text, voice, and photos to family.",
        after:
          "I simplified the hierarchy and shortened the main paths, aiming to make each important destination reachable within roughly two or three taps. The watch retained immediate actions while the phone handled more detailed review and communication.",
        caveat:
          "The final concept was reviewed in class. Because formal study documentation and outcome measures were not retained, the case study presents design rationale—not proof of impact or measured improvement."
      },
      designSystem: {
        body:
          "I created separate but related visual directions for the watch and companion phone. The older-adult watch experience uses stronger contrast for fast recognition, while the family-facing phone uses a softer care-oriented language and the Vivi character to communicate status without making surveillance the emotional center of the experience.",
        principle:
          "Consistency across devices does not mean duplication: access, contrast, density, hierarchy, and emotional responsibility must respond to both the physical surface and the person using it."
      },
      boundaries: [
        "The concept assumes compatible smartwatch sensors and linked medical records.",
        "Blood-pressure and blood-sugar data may require a compatible medical device or records integration, not a standard smartwatch.",
        "The three health-status states were conceptual; their clinical thresholds and error states were not defined.",
        "The original class project did not design consent, privacy, access revocation, or granular information-sharing permissions.",
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
        "I began with the memory of my grandparent’s fall and a feature question about emergency support. What stayed with me was more human: a person’s body may change while their pride, identity, and need for dignity remain. FamilyPulse made me interested in a harder design problem—how to help someone without making them feel reduced to a person who needs help. I would now bring older adults directly into the research and treat consent, privacy, access, and clinical feasibility as foundational rather than future details.",
      media: [
        {
          id: "hero-cross-device",
          nodeId: "528:3697",
          title: "Cross-device concept",
          caption:
            "The final direction pairs a familiar smartwatch touchpoint with a companion phone experience.",
          alt:
            "FamilyPulse phone and smartwatch concept shown together, including an emergency call on the watch.",
          src: "/assets/familypulse/hero-cross-device.png",
          width: 2048,
          height: 1306
        },
        {
          id: "vivi-character",
          title: "Vivi, the support character",
          caption:
            "Vivi was intended to help report health context so family members did not have to feel like they were constantly monitoring someone they loved.",
          alt:
            "Orange Vivi character illustration from the FamilyPulse concept, shown between the words Health and Respect.",
          src: "/assets/familypulse/source/older-adult.png",
          width: 499,
          height: 590
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
          src: "/assets/familypulse/analysis-history.png",
          width: 780,
          height: 1688
        },
        {
          id: "family-chat",
          nodeId: "1:17",
          title: "Everyday connection",
          caption:
            "Messaging and calling keep the system from appearing only when something goes wrong.",
          alt: "FamilyPulse family chat screen.",
          src: "/assets/familypulse/family-chat.png",
          width: 780,
          height: 1688
        },
        {
          id: "reminder-setup",
          nodeId: "134:294",
          title: "Reminder setup",
          caption:
            "Family members can prepare recurring reminders that fit into the older adult’s daily experience.",
          alt: "FamilyPulse reminder setup screen with time and repeat controls.",
          src: "/assets/familypulse/reminder-setup.png",
          width: 780,
          height: 1688
        },
        {
          id: "competitive-review",
          title: "Medical-alert landscape",
          caption:
            "The original competitive review looked across dedicated medical-alert services before I reframed the opportunity around a familiar smartwatch.",
          alt:
            "Logos of medical-alert products included in the original FamilyPulse competitive review.",
          src: "/assets/familypulse/source/competitive-review.png",
          width: 1147,
          height: 442
        },
        {
          id: "dignity-framing",
          title: "Health and respect",
          caption:
            "An early framing artifact connected health support with the project’s central concern: respect.",
          alt:
            "Early FamilyPulse illustration of the Vivi character between the words Health and Respect.",
          src: "/assets/familypulse/source/research-board.jpg",
          width: 3150,
          height: 3008
        },
        {
          id: "concept-map",
          title: "Early concept map",
          caption:
            "This early artifact explored how Vivi, respectful care, status review, and an advisor might relate within the concept.",
          alt:
            "Early FamilyPulse concept map with the Vivi character and circles labeled Respectful Care, Medical Advisor, and Analysis Health.",
          src: "/assets/familypulse/source/outcomes-map.png",
          width: 1500,
          height: 1500
        },
        {
          id: "paper-prototype",
          title: "Paper prototype",
          caption:
            "I used paper screens to map the first watch and phone paths before committing to visual detail.",
          alt:
            "FamilyPulse paper prototype sheets showing early phone navigation and messaging ideas.",
          src: "/assets/familypulse/source/paper-prototype.png",
          width: 1561,
          height: 1076
        },
        {
          id: "lowfi-watch",
          title: "Low-fidelity watch flow",
          caption:
            "The watch exploration tested urgent calling, family contact, advisor access, reminders, and status on a small surface.",
          alt:
            "Low-fidelity FamilyPulse smartwatch screens arranged as a flow.",
          src: "/assets/familypulse/source/lowfi-watch.png",
          width: 1447,
          height: 1161
        },
        {
          id: "lowfi-phone",
          title: "Low-fidelity phone flow",
          caption:
            "The companion-phone exploration made room for recent-status review, communication, and setup.",
          alt:
            "Low-fidelity FamilyPulse companion-phone screens arranged as a flow.",
          src: "/assets/familypulse/source/lowfi-phone.png",
          width: 1444,
          height: 774
        },
        {
          id: "watch-design-system",
          title: "Watch design system",
          caption:
            "The watch direction emphasized strong contrast, restrained controls, and compact components.",
          alt:
            "FamilyPulse watch design-system board with colors, typography, icons, buttons, and components.",
          src: "/assets/familypulse/source/design-system-watch.png",
          width: 3476,
          height: 1569
        },
        {
          id: "phone-design-system",
          title: "Phone design system",
          caption:
            "The phone system extended the same product identity while supporting denser information and the Vivi character.",
          alt:
            "FamilyPulse phone design-system board with components, colors, type, and Vivi character variations.",
          src: "/assets/familypulse/source/design-system-phone.png",
          width: 3451,
          height: 1687
        }
      ]
    }
  },
  {
    slug: "ssim",
    title: "SSIM",
    homeQuestion:
      "Why do the memories that matter most become the easiest to lose?",
    inquiry:
      "How might families preserve stories, recipes, places, and emotional context across generations?",
    type: "Deep case study",
    portfolioRole: "Emotion-centered memory and cultural stewardship case",
    role: "Sole researcher and designer",
    context: "Independent passion project",
    year: "Oct–Nov 2025",
    status: "Case study",
    availability: "Published case study",
    detailPath: "/expeditions/ssim/",
    themes: [
      "Family memory",
      "Exploratory research",
      "Cultural stewardship",
      "Interaction design",
      "Prototyping"
    ],
    summary:
      "SSIM is MISS reversed: a mobile-app concept exploring what families might reach for when they miss someone, and how memory can be revisited through stories, recipes, places, images, and repeatable acts.",
    visualLabel: "Something to reach for when you miss someone",
    visualStyle: "ssim",
    caseStudy: {
      variant: "ssim",
      headline: "Something to reach for when you miss someone",
      lede:
        "SSIM is MISS reversed: an independent mobile-app concept exploring how families might preserve and revisit stories, recipes, photographs, places, and emotional context across generations.",
      conceptLabel: "Figma concept — not coded or launched",
      sourceLinks: [
        {
          label: "View Figma design",
          url: "https://www.figma.com/design/3tTR7suhNtcOZILBTiqsMc/Ssim?node-id=0-1&p=f&t=H2ZBTetVrqH4YFnB-0"
        },
        {
          label: "View FigJam process",
          url: "https://www.figma.com/board/UgPDlIWBP6JRRlbrrp2XV2/Ssim?t=H2ZBTetVrqH4YFnB-0"
        }
      ],
      brief: [
        "Family memories rarely live in one place. A recipe may be written on paper, a photograph stored on a phone, a voice message buried in LINE, and the story connecting them remembered by only one person.",
        "SSIM explores a more connected way to preserve these fragments. Rather than treating family history as names and dates alone, the project asks how food, people, place, language, images, and emotion might become part of the same memory—and what someone might reach for in the moment they miss another person."
      ],
      question:
        "How might a digital platform help families preserve stories, recipes, places, and emotional context across generations?",
      discovery: {
        body: [
          "I began SSIM several months after severe flooding in Taiwan, my home country. Seeing people lose family members, homes, and precious belongings made me think about another layer of loss: physical objects often carry stories that cannot be replaced.",
          "I was also inspired by an account documenting recipes found on gravestones. A woman would cook each dish and imagine the person who once made or loved it. That act showed me that remembrance can be participatory: we can cook, walk, listen, make, and continue—not only look back."
        ],
        northStar:
          "When I miss someone, help me feel close to them through something I can see, hear, make, revisit, or continue."
      },
      research: {
        intro:
          "I used desk research, affinity synthesis, and early prototypes to explore how family memories are stored, revisited, and shared.",
        publicEvidenceNote:
          "This public version contains no individual research data, quotations, or session images.",
        stats: [],
        methods: [
          "Exploratory research",
          "Desk and competitive research",
          "Mind mapping and affinity synthesis",
          "Paper and digital prototyping",
          "Formative prototype critique"
        ],
        insights: [
          {
            title: "Emotion before information",
            body: "Food and family stories gave factual records personal meaning."
          },
          {
            title: "Memories are fragmented",
            body: "Memory material can be spread across messaging apps, photo libraries, cloud storage, and physical objects without one dependable structure."
          },
          {
            title: "Voice and video carry more",
            body: "Recordings can preserve language, performance, rhythm, and personality."
          },
          {
            title: "Access is part of preservation",
            body: "Preservation also requires decisions about who can see a memory and whether it belongs to a family, community, or wider public."
          },
          {
            title: "Recording must feel approachable",
            body: "Interest in a dedicated platform depended on simple guidance and a low barrier to entry."
          }
        ],
        limits:
          "The original research was exploratory. Because consent for public disclosure was not retained, no individual evidence is included here. Treat these themes as design directions—not representative findings about families, older adults, or cultural groups."
      },
      principles: [
        {
          number: "01",
          title: "Make memory emotional, not archival only",
          body: "Connect recipes, images, stories, people, and place so a record still carries context."
        },
        {
          number: "02",
          title: "Lower the capture barrier",
          body: "Offer Scan, Type, and conversational guidance instead of asking everyone to begin with one blank form."
        },
        {
          number: "03",
          title: "Give memory multiple shapes",
          body: "Use structured records for detail and feeds, collages, or timelines for relationships and return."
        },
        {
          number: "04",
          title: "Treat access as part of the memory",
          body: "Make ownership and privacy visible, while recognizing that the full legacy-permission model remains unresolved."
        }
      ],
      prototype: {
        intro:
          "I moved from device-sized paper sketches into a digital Figma prototype and used formative critique to identify unclear interaction paths.",
        testingNote:
          "This public version contains no individual testing data. The notes below are design issues and responses—not validated outcomes.",
        findings: [
          {
            observed: "Design issue: the path for adding a memory was unclear.",
            response: "I made capture paths more explicit and separated Story, Recipe, Scan, Type, and guided-assistant entry points."
          },
          {
            observed: "Design issue: the upload icon and content types were ambiguous.",
            response: "I replaced icon-only assumptions with clearer labels and step-by-step prompts."
          },
          {
            observed: "Design issue: privacy and legacy access remained unresolved.",
            response: "The prototype surfaced privacy at entry level; a complete legacy-access model remained future work."
          }
        ]
      },
      flows: [
        {
          title: "Feed",
          need: "Browse different forms of family memory",
          body: "A shared discovery surface brings recipes, stories, people, and historical material together with content filters and saved items.",
          boundary: "The social, moderation, and permission model was not defined.",
          mediaId: "feed"
        },
        {
          title: "AI-assisted capture",
          need: "Replace the blank page with a guided conversation",
          body: "Conversational prompts break a memory or recipe into smaller questions and give someone a gentler place to begin.",
          boundary: "This is a guided-input concept, not a tested production AI system.",
          mediaId: "ai"
        },
        {
          title: "Scan",
          need: "Move a physical artifact into a structured record",
          body: "The flow starts with a handwritten recipe or scrapbook page and continues into owner, privacy, photos, story, ingredients, and instructions.",
          boundary: "The prototype does not establish OCR accuracy, automatic extraction, or preservation durability.",
          mediaId: "scan"
        },
        {
          title: "Memo Board",
          need: "See memory as a collage or timeline",
          body: "An expressive board helps people notice relationships among people, food, photographs, events, and time without forcing memory into one hierarchy.",
          boundary: "Creation, connection, search, reordering, and sharing still require design and testing.",
          mediaId: "memo-board"
        }
      ],
      homeReflection: {
        original:
          "The 2025 Home centered Memory of Today, Surprise Me, an add control, and Home / Explore / Memory / Profile navigation.",
        future:
          "If I continued, I would begin with Who are you missing today? and resurface one calm, contextual memory with an action such as Cook this recipe, Listen to their story, or Continue this tradition.",
        reason:
          "This later reflection reframes Home as a personal doorway into remembrance rather than another archive or feed. It is a next-version concept—not part of the original final prototype."
      },
      nextSteps: [
        "Recruit intentionally across generations and document tasks and findings systematically.",
        "Co-design culturally specific preservation features with the communities represented.",
        "Test ownership, privacy, legacy access, and long-term stewardship alongside the interface.",
        "Evaluate accessibility with older adults instead of assuming one cross-generational flow will work.",
        "Prototype how memory can be reenacted through recipes, movement, place, ritual, and family contribution."
      ],
      reflection:
        "SSIM began as a question about saving memories when physical objects disappear. It taught me that preservation is not only capture; it is also ownership, privacy, consent, cultural context, accessibility, and stewardship. The question I now carry forward is simpler: what do we reach for when we miss someone—and how might technology protect that experience with dignity?",
      media: [
        {
          id: "hero",
          title: "SSIM identity and original home",
          caption: "The original 2025 concept pairs a warm family-memory identity with Memory of Today and gentle resurfacing.",
          alt: "SSIM logo, launch screen, and original Memory of Today home screen shown on a black presentation slide.",
          src: "/assets/ssim/page-15.jpg",
          note: "The first Home organized memories. My later question was more emotional: who are you reaching for?",
          width: 1920,
          height: 1080
        },
        {
          id: "paper",
          title: "Paper-prototype artifact withheld",
          caption: "The original classroom-process slide is not included in this public version.",
          alt: "A private research-process artifact is intentionally omitted.",
          src: null,
          note: "The non-identifying takeaway remains: the capture path needed a clearer starting point.",
          width: 1920,
          height: 1080
        },
        {
          id: "digital",
          title: "Digital-testing artifact withheld",
          caption: "The original classroom-process slide is not included in this public version.",
          alt: "A private research-process artifact is intentionally omitted.",
          src: null,
          note: "The non-identifying takeaway remains: visual polish did not resolve access and ownership questions.",
          width: 1920,
          height: 1080
        },
        {
          id: "feed",
          title: "Feed",
          caption: "Recipe, story, and family-history cards can be filtered within Explore.",
          alt: "Two SSIM phone screens showing a two-column feed of recipes, stories, and family history.",
          src: "/assets/ssim/page-16.jpg",
          note: "One shared surface, many memory shapes. The unresolved part is whose stories are allowed to appear here.",
          width: 1920,
          height: 1080
        },
        {
          id: "ai",
          title: "AI-assisted capture",
          caption: "A conversational assistant offers Story or Recipe and gathers details through smaller prompts.",
          alt: "Three SSIM phone screens showing the original home add menu and a guided recipe conversation.",
          src: "/assets/ssim/page-17.jpg",
          note: "A conversation felt gentler than an empty form—but this remained an interaction concept, not a tested AI system.",
          width: 1920,
          height: 1080
        },
        {
          id: "scan",
          title: "Scan",
          caption: "A handwritten artifact becomes the starting point for a structured family record.",
          alt: "Three SSIM phone screens showing a camera scan of a handwritten recipe and a structured recipe form.",
          src: "/assets/ssim/page-18.jpg",
          note: "The physical artifact is the invitation. The structured record is only the container that follows.",
          width: 1920,
          height: 1080
        },
        {
          id: "memo-board",
          title: "Memo Board",
          caption: "Collage and timeline modes explore associative rather than strictly hierarchical memory.",
          alt: "Three SSIM phone screens showing family-memory collages and a vertical life timeline.",
          src: "/assets/ssim/page-19.jpg",
          note: "Memory rarely behaves like a folder. Collage and timeline let relationships stay a little messy.",
          width: 1920,
          height: 1080
        }
      ]
    }
  },
  {
    slug: "professional-systems-placeholder",
    title: "Professional Systems Case Study",
    homeQuestion: "Why do shared systems lose clarity as they scale?",
    inquiry:
      "A permission-sensitive case-study placeholder for shared systems, accessibility, and organizational-scale product work.",
    type: "Deep case study preview",
    portfolioRole: "Protected professional case-study placeholder",
    role: "Not published",
    context: "Permission-sensitive professional work",
    year: "Not published",
    status: "Protected until sharing approval",
    availability: "Unavailable until public-sharing permission is confirmed",
    detailPath: "/expeditions/church-professional-work/",
    themes: [
      "Shared systems",
      "Accessibility",
      "Confidentiality"
    ],
    summary:
      "A protected case-study position. Employer, product names, screenshots, internal processes, metrics, stakeholder details, and unreleased work remain withheld until public-sharing permission is confirmed.",
    visualLabel: "Protected professional case",
    caseStudy: {
      variant: "protected",
      headline: "Why do shared systems lose clarity as they scale?",
      lede:
        "A permission-sensitive professional case study about shared systems and accessibility. The full story is being reviewed before public release.",
      notice:
        "To protect confidential work, employer and product names, screenshots, internal processes, metrics, stakeholder details, and unreleased work remain withheld until public-sharing permission is confirmed."
    }
  },
  {
    slug: "pen-pal",
    title: "Echo PenPal",
    homeQuestion:
      "Why can connection feel less intentional even when technology makes it easier to reach people?",
    inquiry:
      "How might technology help people build more intentional connections that extend beyond the screen?",
    type: "UX case study",
    portfolioRole: "Intentional connection and social interaction exploration",
    role: "Sole researcher and designer",
    context: "Individual UX Design class project",
    year: "Sep–Dec 2024",
    status: "Case study",
    availability: "Published case study",
    detailPath: "/expeditions/pen-pal/",
    themes: [
      "Intentional connection",
      "Social interaction",
      "Interaction design",
      "Concept development"
    ],
    summary:
      "Echo PenPal explores how a digital product might help people form more intentional international relationships—and carry those relationships beyond the screen through physical letters.",
    visualLabel: "A connection that continues beyond the screen",
    visualStyle: "pen-pal",
    caseStudy: {
      variant: "snapshot",
      headline:
        "Why can connection feel less intentional even when technology makes it easier to reach people?",
      lede:
        "Echo PenPal is an individual UX Design class project for people who feel lonely or disconnected and want more genuine human contact. The concept uses technology as a bridge: people can find a pen pal, write across languages, and continue the exchange through a physical letter.",
      conceptLabel: "Course concept — not a released product",
      sourceLinks: [
        {
          label: "View Figma design",
          url: "https://www.figma.com/design/bN2EFLzQMgoTnCxXabHeI5/Echo-PenPal-App?node-id=0-1&t=H2ZBTetVrqH4YFnB-1"
        },
        {
          label: "View original case study",
          url: "https://rubyruan.framer.website/echo-pen-pal-app"
        },
        {
          label: "View paper prototype motion",
          url: "https://giphy.com/embed/SM4VbcYlLIVdVRnohT"
        }
      ],
      question: {
        origin:
          "The project began with a tension I noticed in everyday life: technology makes contact faster, but speed does not automatically make a relationship feel close. I wanted to explore whether a digital tool could create space for slower, more thoughtful communication instead of replacing it.",
        hmw:
          "How might we help people build deeper relationships through pen-pal exchange while still benefiting from digital access?",
        intendedOutcomes: [
          "For people: make it easier to begin and sustain a meaningful international relationship.",
          "For the product: create reasons for people to return and continue an exchange."
        ]
      },
      research: {
        intro:
          "I used informal exploratory conversations and a competitive review to examine why people seek pen pals, why interest can fade, and where current platforms create friction.",
        methods: [
          "Informal exploratory conversations",
          "Competitive review of contemporary pen-pal platforms",
          "Synthesized persona and empathy-map exploration",
          "Paper prototype and wireframe task scenarios",
          "Course critique and informal usability feedback"
        ],
        signals: [
          {
            title: "Awareness and continued use",
            body: "Initial interest does not always turn into continued platform use."
          },
          {
            title: "Perception of older platforms",
            body:
              "An outdated interface can make a service feel inactive and reduce trust or interest."
          },
          {
            title: "Competition from instant messaging",
            body: "A slower letter exchange needs to offer value that instant messaging does not."
          }
        ],
        limits:
          "The original project did not retain a detailed research log or quantitative outcomes. This public version includes no individual research evidence, and it does not claim that the concept reduces loneliness or creates deeper relationships."
      },
      competitive: {
        intro:
          "The review showed that pen-pal products already support multiple ways to connect, but the experience can break down before a meaningful exchange begins.",
        strengths: [
          "Some services support both online communication and traditional postal exchange.",
          "Detailed matching can help people look for compatible interests, locations, or languages.",
          "Established platforms can provide access to an active international community."
        ],
        gaps: [
          "Some interfaces feel outdated or difficult to navigate.",
          "Physical-letter services may provide few digital tools for drafting or translation.",
          "International exchanges can encounter language barriers when translation support is absent.",
          "Slow replies may conflict with expectations shaped by instant messaging.",
          "Niche communities may have fewer active potential matches."
        ]
      },
      persona: {
        label: "Synthesized persona",
        name: "The Deep Connector",
        epithet: "The Deep Connector",
        age: "College-age audience",
        location: "International context",
        background:
          "This synthesized persona wants to connect with people around the world through thoughtful communication and seeks an alternative to online interactions that feel superficial.",
        goals: [
          "Build authentic international relationships",
          "Improve her English through conversation",
          "Learn about other cultures"
        ],
        frustrations: [
          "Online connections can feel superficial",
          "Language differences can interrupt an exchange",
          "It is difficult to judge whether a potential connection will feel meaningful"
        ],
        caveat:
          "This is a design synthesis for the project’s intended audience, not a real person or a claim about an individual."
      },
      scenarios: [
        {
          number: "01",
          title: "Match with a pen pal",
          body:
            "A young adult discovers Echo and wants to meet someone who shares enough interests or context to begin a more intentional friendship."
        },
        {
          number: "02",
          title: "Write and save a letter",
          body:
            "After making a connection, the person drafts a letter, uses language support if needed, and saves or prints the finished letter."
        },
        {
          number: "03",
          title: "Prepare a handwritten exchange",
          body:
            "The person wants to send a handwritten letter and needs a confirmation ID plus clear instructions for where the letter should be mailed."
        }
      ],
      flows: [
        {
          title: "Set matching preferences",
          body:
            "People can indicate age, gender, number of matches, interests, and language before pairing. These fields appear in the original Figma concept and still require safety and inclusion review."
        },
        {
          title: "Meet potential pen pals",
          body:
            "A matches view introduces people from different countries and provides a direct path to learn more or begin writing a letter."
        },
        {
          title: "Write across languages",
          body:
            "The writing flow includes language context, a translation action, drafting, and a save-and-print path designed to move the exchange toward a physical letter."
        }
      ],
      iteration: [
        "Make important actions easier to discover instead of assuming people will explore every control.",
        "Use larger, clearer type where early screens felt too difficult to scan.",
        "Show enough detail about a potential pen pal to help someone decide whether to begin a first letter.",
        "Introduce unfamiliar steps—especially the transition to physical mail—through lightweight onboarding."
      ],
      designSystem: {
        typeface: "Inter",
        weights: "Semibold, Medium, Regular, and Light",
        body:
          "I created a small interface system around Inter typography, restrained neutral surfaces, a blue action color, country and language cues, and repeated navigation patterns. The system helped the matching, pen-pal list, and writing flows feel connected even though the project was still an early concept."
      },
      boundaries: [
        "A detailed research and usability-test record was not retained.",
        "The competitive review identifies product patterns, but the original comparison criteria and scoring were not documented.",
        "The project did not test whether the experience reduced loneliness or produced deeper relationships over time.",
        "Identity verification, privacy, moderation, blocking, unwanted contact, translation errors, and physical-address safety were not designed or validated.",
        "The operational model for receiving, routing, or protecting physical letters was not defined."
      ],
      reflection:
        "Echo PenPal taught me that reviving an older behavior is not only a styling exercise. People who are used to instant communication need a clear reason—and enough guidance—to choose a slower exchange. It also reinforced three lessons I still carry: designers are not their users, usability testing must shape the work, and a design system makes it easier to keep a growing product coherent.",
      media: [
        {
          id: "hero",
          title: "Echo PenPal concept",
          caption:
            "The concept combines digital drafting and account tools with a path toward printed or handwritten exchange.",
          alt:
            "Echo PenPal mobile screens for preferences, writing, confirmation, and a physical-letter workflow.",
          src: "/assets/penpal/hero.png",
          width: 1024,
          height: 507
        },
        {
          id: "competitive-analysis",
          title: "Competitive landscape",
          caption:
            "I reviewed a range of pen-pal services to identify patterns in matching, community, postal exchange, and interface quality.",
          alt: "Logos of pen-pal services included in the Echo PenPal competitive review.",
          src: "/assets/penpal/competitive-analysis.png",
          width: 2537,
          height: 2218
        },
        {
          id: "persona",
          title: "The Deep Connector — synthesized persona",
          caption:
            "This artifact represents the goals and frustrations synthesized for the intended audience.",
          alt: "Portrait used for the fictional Echo PenPal persona called The Deep Connector.",
          src: "/assets/penpal/persona.jpg",
          width: 6552,
          height: 3672
        },
        {
          id: "wireframe-home",
          title: "Early home and navigation exploration",
          caption:
            "An early wireframe explored how people might move between the home, pen-pal list, letters, and profile areas.",
          alt: "Early Echo PenPal wireframe showing the app home and navigation structure.",
          src: "/assets/penpal/wireframe-01.png",
          width: 2240,
          height: 2000
        },
        {
          id: "wireframe-matches",
          title: "Early pen-pal list",
          caption:
            "The early wireframe established a place to review matches before starting a letter.",
          alt: "Early Echo PenPal wireframe showing a pen-pal list.",
          src: "/assets/penpal/wireframe-02.png",
          width: 2240,
          height: 2000
        },
        {
          id: "wireframe-letter",
          title: "Early letter editor",
          caption:
            "The first editor explored language context, translation, drafting, saving, and printing.",
          alt: "Early Echo PenPal wireframe showing a letter editor.",
          src: "/assets/penpal/wireframe-03.png",
          width: 2240,
          height: 2000
        },
        {
          id: "final-matches",
          title: "Review potential pen pals",
          caption:
            "The later matches view provides country context and a direct path to learn more or write.",
          alt: "Echo PenPal final concept showing pen-pal matches from different countries.",
          src: "/assets/penpal/final-01.png",
          width: 2240,
          height: 2000
        },
        {
          id: "final-preferences",
          title: "Set matching preferences",
          caption:
            "People can specify preferences before pairing; these fields still require inclusion and safety review.",
          alt: "Echo PenPal final matching-preferences screen.",
          src: "/assets/penpal/final-02.png",
          width: 2240,
          height: 2000
        },
        {
          id: "final-letter",
          title: "Write across languages",
          caption:
            "The later letter flow keeps translation, drafting, saving, and printing in one place.",
          alt: "Echo PenPal final letter-writing screen.",
          src: "/assets/penpal/final-03.png",
          width: 2240,
          height: 2000
        }
      ]
    }
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
    date: "Working note · 2026",
    topic: "HCI / Human Factors",
    context:
      "A living set of questions I return to across projects involving technical, automated, or high-stakes systems.",
    observation:
      "People often need to make decisions inside systems whose logic, constraints, or status are only partially visible.",
    interpretation:
      "This is a working interpretation, not a validated research finding. Future notes should connect this question to specific observations, readings, or project evidence.",
    openQuestions: [
      "What makes a system feel understandable enough to act within?",
      "When does simplification support agency, and when does it hide important context?",
      "How should interfaces reveal constraints without increasing unnecessary cognitive load?"
    ],
    relatedExpedition: "FamilyPulse",
    relatedProjectSlug: "health-monitoring"
  },
  {
    slug: "accessibility-as-framing",
    title: "Accessibility as Early Framing",
    date: "Working note · 2026",
    topic: "Accessibility",
    context:
      "A process reflection on treating accessibility as part of the initial design question rather than a final compliance pass.",
    observation:
      "Accessibility decisions can shape information hierarchy, interaction patterns, content strategy, and technical implementation.",
    interpretation:
      "This remains a working interpretation. I am documenting where specific project examples, audits, and experiments can test it.",
    openQuestions: [
      "Which accessibility considerations should be documented before visual exploration begins?",
      "How can prototypes make accessibility tradeoffs visible earlier?",
      "What recurring accessibility checks belong in Ruby's project template?"
    ],
    relatedExpedition: "Across expeditions",
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
    "A concise record of the education, experience, and methods behind my work in UX, HCI, Human Factors, accessibility, and coded prototyping.",
  sections: [
    {
      title: "Education",
      items: [
        {
          heading: "Brigham Young University–Idaho",
          meta: "B.A. Graphic Design · UX/UI emphasis · Web Development minor · GPA 3.53 · 2025",
          detail: "Interdisciplinary coursework across visual communication, interaction design, research, accessibility, and front-end development."
        },
        {
          heading: "Soochow University",
          meta: "Earlier study in Philosophy · Taipei, Taiwan",
          detail: "Philosophical inquiry continues to shape how I frame questions about agency, responsibility, dignity, and technology."
        }
      ]
    },
    {
      title: "Experience",
      items: [
        {
          heading: "UX Design Internship",
          meta: "2025–2026",
          detail:
            "Professional UX experience is being prepared for public sharing; employer and project details remain withheld until permission is confirmed."
        }
      ]
    },
    {
      title: "Skills and Interests",
      items: [
        {
          heading: "Design and Research",
          meta: "UX · HCI · Human Factors · accessibility",
          detail:
            "Exploratory research, interviews and questionnaires, synthesis, information architecture, interaction design, prototyping, usability testing, and accessibility review."
        },
        {
          heading: "Technology",
          meta: "Figma · HTML · CSS · JavaScript · coded prototyping",
          detail:
            "Bridging design intent and implementation through responsive interfaces, reusable patterns, and accessible front-end structure."
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
