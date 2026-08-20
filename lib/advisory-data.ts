// Data + logic for the Advisory intake wizard.
// Ported from the AdvisoryBridge reference — the decision graph, programme
// catalogue and matching engine live here so the page stays presentational.

export const CONTACT_EMAIL = "contactus@neurogati.com"
export const WORKSHOP_EMAIL = "workshops@neurogati.com"
export const PROGRAMS_URL = "https://www.neurogati.com/workshops"
export const WORD_LIMIT = 500
export const WORD_MIN = 30

// ─── Tracks (destination routes) ────────────────────────────────────────────
export type TrackCode = "PATH" | "RSCH" | "INTERN" | "COLLAB" | "CLIN" | "PROG"

export const TRACKS: Record<TrackCode, { code: TrackCode; name: string; color: string }> = {
  PATH: { code: "PATH", name: "learning and career", color: "blue" },
  RSCH: { code: "RSCH", name: "research", color: "teal" },
  INTERN: { code: "INTERN", name: "internships and projects", color: "amber" },
  COLLAB: { code: "COLLAB", name: "collaboration", color: "violet" },
  CLIN: { code: "CLIN", name: "clinical and applied", color: "cyan" },
  PROG: { code: "PROG", name: "courses and workshops", color: "pink" },
}

// ─── The map: inputs → operations → destinations ────────────────────────────
export const INPUTS = [
  { cats: ["high"], icon: "cap", label: "School student", note: "exploring, not specialising yet" },
  { cats: ["ug_eng", "prof_eng"], icon: "code", label: "Engineering, CS or ECE", note: "can build, missing the brain" },
  { cats: ["ug_med", "prof_med"], icon: "stetho", label: "Medicine or physiotherapy", note: "sees patients, wants the quantitative side" },
  { cats: ["ug_bio"], icon: "dna", label: "Biology or life sciences", note: "knows the biology, missing the maths" },
  { cats: ["pg_res"], icon: "flask", label: "PhD student or researcher", note: "question, method, model" },
  { cats: ["founder"], icon: "rocket", label: "Startup or lab", note: "looking for a collaborator" },
]

export const OPERATIONS = [
  { left: "Scope", leftIcon: "compass", right: "Your background and constraints", rightIcon: "layers" },
  { left: "Diagnose", leftIcon: "brain", right: "What is actually blocking you", rightIcon: "signal" },
  { left: "Design", leftIcon: "sigma", right: "Method, model or roadmap", rightIcon: "chip" },
  { left: "Hand over", leftIcon: "folder", right: "Written response + next steps", rightIcon: "check" },
]

export const DESTINATIONS = [
  { id: "d1", track: "PATH", icon: "route", label: "A sequenced learning roadmap" },
  { id: "d2", track: "PATH", icon: "folder", label: "A first project and portfolio plan" },
  { id: "d3", track: "RSCH", icon: "pen", label: "A sharpened research question" },
  { id: "d4", track: "RSCH", icon: "sigma", label: "Method and modelling direction" },
  { id: "d5", track: "INTERN", icon: "chip", label: "A project brief matched to your level" },
  { id: "d6", track: "COLLAB", icon: "handshake", label: "A defined collaboration or pilot" },
  { id: "d7", track: "COLLAB", icon: "chart", label: "A validation and evidence plan" },
  { id: "d8", track: "CLIN", icon: "signal", label: "Measurement that fits your clinic" },
  { id: "d9", track: "PROG", icon: "cap", label: "A course or workshop at your level" },
] as const

// ─── Programmes we actually run (mirrors /workshops) ────────────────────────
export interface Program {
  id: string
  name: string
  meta: string
  price: string
  status: string
  open: boolean
  blurb: string
  cats: string[]
  goals: string[]
  topics: string[]
  levels: string[]
  loadTag: string
}

export const PROGRAMS: Program[] = [
  {
    id: "ycnp",
    name: "Young Computational Neuroscientist Program",
    meta: "12 weeks · 24 live sessions · online",
    price: "Fees on request · merit discounts offered",
    status: "Applications close 31 August 2026 · classes begin 21 September",
    open: true,
    blurb:
      "Guided research mentorship for school students. Six teams, one brain mystery each — motion illusion, face recognition, memory loss, mood states, Parkinsonian freezing, ADHD exploration. You end with a working model and a symposium presentation.",
    cats: ["high"],
    goals: ["explore", "project", "apps", "program", "intern"],
    topics: ["basics", "model", "research"],
    levels: ["beginner", "some"],
    loadTag: "steady",
  },
  {
    id: "crt2",
    name: "Computational Neuroscience Research Training — Phase 2",
    meta: "10 weeks · 2 hrs/week live · US$375",
    price: "US$375",
    status: "Cohort in progress (Jul–Sep 2026) · next intake listed on the workshops page",
    open: false,
    blurb:
      "Mentorship-driven research training across six tracks: PD diagnostics, deep oscillatory networks, spatial decision making, EEG analysis, autism games, 3D movement analysis. Ends in a supervised project and a conference-ready abstract.",
    cats: ["ug_eng", "ug_bio", "ug_med", "pg_res", "prof_eng"],
    goals: ["intern", "statement", "method", "program", "skill", "transition"],
    topics: ["research", "model", "eeg", "ml", "disease"],
    levels: ["some", "coding", "research"],
    loadTag: "steady",
  },
  {
    id: "rtp5",
    name: "5-Month Research Training Program",
    meta: "20 weeks · Phase 1 (10w) + Phase 2 (10w) · online",
    price: "Phase 1 ₹25,000 · Phase 2 ₹35,000",
    status: "Next intake to be announced",
    open: false,
    blurb:
      "The long route: foundational coursework first, then a supervised research project. Built for people who want depth rather than a survey.",
    cats: ["ug_eng", "ug_bio", "ug_med", "pg_res", "prof_eng"],
    goals: ["transition", "program", "intern", "skill"],
    topics: ["basics", "model", "research"],
    levels: ["beginner", "some", "coding"],
    loadTag: "heavy",
  },
  {
    id: "medicos",
    name: "Brain Modeling for Medicos",
    meta: "7 days · online · no coding background needed",
    price: "Selection-based admission",
    status: "Runs periodically · next dates to be announced",
    open: false,
    blurb:
      "Neurons to disease models for clinicians and medical students: epilepsy, Parkinson's and depression treated as dynamical disorders rather than lists of symptoms.",
    cats: ["ug_med", "prof_med"],
    goals: ["transition", "program", "skill", "clinic", "statement"],
    topics: ["disease", "basics", "model"],
    levels: ["beginner", "some"],
    loadTag: "intensive",
  },
  {
    id: "aibrain",
    name: "AI + Brain Science Summer Program",
    meta: "2 weeks · online · Grades 8–12",
    price: "Selection-based admission",
    status: "Next cohort to be announced",
    open: false,
    blurb:
      "How AI is used to study the brain: how neurons compute, foundations of neural networks, EEG signal analysis, and computational models of neurological disorders. Feeds into the Phase II research programmes.",
    cats: ["high"],
    goals: ["explore", "program", "project", "apps"],
    topics: ["basics", "eeg", "ml", "disease"],
    levels: ["beginner"],
    loadTag: "intensive",
  },
  {
    id: "brainmodel",
    name: "Workshop on Brain Modeling with ML",
    meta: "5 days · online",
    price: "UG ₹3,000 · PG ₹3,500 · professionals ₹4,000",
    status: "Runs periodically · next dates to be announced",
    open: false,
    blurb:
      "Machine learning approaches to modelling brain function: network architectures, brain dynamics, and implementations you run yourself.",
    cats: ["ug_eng", "ug_bio", "pg_res", "prof_eng"],
    goals: ["skill", "program", "transition", "method"],
    topics: ["model", "ml", "basics"],
    levels: ["some", "coding", "research"],
    loadTag: "intensive",
  },
  {
    id: "eeg",
    name: "AI Applications in EEG",
    meta: "3 to 5 days · online or at IIT Madras",
    price: "UG ₹3,000 · PG ₹3,500 · professionals ₹4,000",
    status: "Runs periodically · next dates to be announced",
    open: false,
    blurb:
      "Hands-on EEG: acquisition, processing and AI decoding, with pipelines for seizure detection and neurodegeneration analysis.",
    cats: ["ug_eng", "ug_bio", "ug_med", "pg_res", "prof_eng", "prof_med"],
    goals: ["skill", "program", "method", "transition"],
    topics: ["eeg", "ml", "bci"],
    levels: ["some", "coding", "research"],
    loadTag: "intensive",
  },
  {
    id: "summer",
    name: "Neurogati Summer School",
    meta: "10 days · 30+ lectures from international speakers",
    price: "Announced with each edition",
    status: "Annual · returns 2027",
    open: false,
    blurb:
      "The wide survey: neural modelling and data analysis, AI for EEG and neural signals, brain–computer interfaces, neurorehabilitation, with poster presentations.",
    cats: ["high", "ug_eng", "ug_bio", "ug_med", "pg_res", "prof_eng"],
    goals: ["explore", "program", "transition"],
    topics: ["basics", "bci", "ml", "eeg"],
    levels: ["beginner", "some", "coding"],
    loadTag: "intensive",
  },
]

export const PROG_TOPICS = [
  { key: "basics", label: "Foundations", note: "neurons, networks, Python", icon: "brain" },
  { key: "model", label: "Neural modelling", note: "dynamics, circuits, simulation", icon: "chip" },
  { key: "eeg", label: "EEG and brain signals", note: "acquisition, processing, decoding", icon: "signal" },
  { key: "ml", label: "AI and machine learning", note: "for neural and clinical data", icon: "layers" },
  { key: "disease", label: "Disease models", note: "Parkinson's, epilepsy, depression", icon: "stetho" },
  { key: "bci", label: "BCI and neurorehab", note: "interfaces, movement, recovery", icon: "chart" },
  { key: "research", label: "A supervised project", note: "mentorship to an abstract or paper", icon: "flask" },
]

export const SIDE_TO_TOPIC: Record<string, string> = {
  math: "basics", code: "basics", bio: "basics", writing: "research",
  model: "model", signals: "eeg", ml: "ml", clinical: "disease",
}

export const LOAD_FROM_DAILY: Record<string, string> = {
  lt30: "light", "30to60": "steady", "1to2": "heavy", gt2: "intensive",
}

export function matchPrograms({
  cat, goal, topics, level, loadTag,
}: {
  cat: string | null
  goal: string | null
  topics: string[]
  level: string | null
  loadTag: string | null
}) {
  return PROGRAMS.map((p) => {
    let score = 0
    const why: string[] = []
    if (cat && p.cats.includes(cat)) { score += 4; why.push("your background") }
    if (goal && p.goals.includes(goal)) { score += 3; why.push("what you asked for") }
    const overlap = topics.filter((t) => p.topics.includes(t))
    if (overlap.length) {
      score += overlap.length
      why.push(overlap.length > 1 ? `${overlap.length} topics you picked` : "a topic you picked")
    }
    if (level && p.levels.includes(level)) { score += 2; why.push("your level") }
    if (loadTag && p.loadTag === loadTag) { score += 2; why.push("the time you have") }
    if (p.open) score += 1
    return { ...p, score, why }
  })
    .filter((p) => p.score >= 5)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
}

export const HELP_SIDES = [
  { key: "math", label: "Maths", note: "linear algebra, calculus, probability", icon: "sigma" },
  { key: "code", label: "Coding", note: "Python, data handling, tooling", icon: "code" },
  { key: "bio", label: "Neuroscience and biology", note: "systems, circuits, behaviour", icon: "brain" },
  { key: "model", label: "Modelling", note: "networks, dynamics, simulation", icon: "chip" },
  { key: "signals", label: "Signals and data", note: "EEG, kinematics, imaging, analysis", icon: "signal" },
  { key: "ml", label: "AI and machine learning", note: "training, evaluation, RL", icon: "layers" },
  { key: "clinical", label: "Clinical framing", note: "patients, outcomes, workflows", icon: "stetho" },
  { key: "writing", label: "Writing and presenting", note: "papers, statements, talks", icon: "pen" },
]

// ─── The decision graph ─────────────────────────────────────────────────────
export type NodeKind = "single" | "multi" | "text" | "contact"

export interface NodeOption {
  key: string
  label: string
  note?: string
  icon: string
  cat?: string
  track?: TrackCode
  dest?: string[]
  next: string
}

export interface GraphNode {
  stage: number
  kind: NodeKind
  short: string
  title: string
  help?: string
  max?: number
  placeholder?: string
  options?: NodeOption[] | { key: string; label: string; note?: string; icon: string }[]
  next?: string
}

export const NODES: Record<string, GraphNode> = {
  start: {
    stage: 0,
    kind: "single",
    short: "Who",
    title: "Who is asking?",
    help: "Pick the closest description. It changes every question after this one.",
    options: [
      { key: "high", label: "School student", note: "Class 9 to 12", icon: "cap", cat: "high", next: "goal_school" },
      { key: "ug_eng", label: "Engineering, CS or ECE student", note: "B.Tech, M.Tech, dual degree", icon: "code", cat: "ug_eng", next: "goal_student" },
      { key: "ug_med", label: "Medical or physiotherapy student", note: "MBBS, BPT, allied health", icon: "stetho", cat: "ug_med", next: "goal_student" },
      { key: "ug_bio", label: "Biology or life sciences student", note: "biotech, zoology, psychology", icon: "dna", cat: "ug_bio", next: "goal_student" },
      { key: "pg_res", label: "PhD student or researcher", note: "doctoral, postdoc, lab staff", icon: "flask", cat: "pg_res", next: "goal_research" },
      { key: "prof_med", label: "Practising clinician", note: "neurologist, physiatrist, therapist, psychologist", icon: "hospital", cat: "prof_med", next: "goal_clinician" },
      { key: "prof_eng", label: "Working professional", note: "software, data, hardware, ML", icon: "chip", cat: "prof_eng", next: "goal_prof" },
      { key: "founder", label: "Startup or lab seeking collaboration", note: "neurotech, healthtech, research group", icon: "rocket", cat: "founder", next: "goal_founder" },
    ],
  },

  goal_school: {
    stage: 1, kind: "single", short: "Looking for", title: "What are you looking for?",
    help: "At this stage the point is informed exploration, not early specialisation.",
    options: [
      { key: "explore", label: "A way into neuroscience", note: "what to read, watch and try first", icon: "compass", track: "PATH", dest: ["d1"], next: "time" },
      { key: "project", label: "Help with a project or science fair", note: "scoping something doable", icon: "flask", track: "PATH", dest: ["d2"], next: "statement" },
      { key: "intern", label: "A holiday project or internship", note: "supervised work over a break", icon: "chip", track: "INTERN", dest: ["d5"], next: "intern_when" },
      { key: "apps", label: "Guidance for undergraduate applications", note: "which degrees keep this door open", icon: "route", track: "PATH", dest: ["d1"], next: "time" },
      { key: "program", label: "The right course or workshop", note: "matched to my class and level", icon: "cap", track: "PROG", dest: ["d9"], next: "prog_topics" },
    ],
  },
  goal_student: {
    stage: 1, kind: "single", short: "Looking for", title: "What do you want help with?",
    options: [
      { key: "transition", label: "Moving into computational neuroscience", note: "a roadmap from where I already am", icon: "route", track: "PATH", dest: ["d1"], next: "time" },
      { key: "statement", label: "A research statement or proposal", note: "PhD, fellowship or grant application", icon: "pen", track: "RSCH", dest: ["d3"], next: "statement" },
      { key: "intern", label: "An internship or project", note: "semester project, thesis, summer work", icon: "chip", track: "INTERN", dest: ["d5"], next: "intern_when" },
      { key: "skill", label: "One specific skill I keep failing at", note: "modelling, signals, maths, code", icon: "sigma", track: "PATH", dest: ["d2"], next: "time" },
      { key: "program", label: "The right course or workshop", note: "matched to my background and level", icon: "cap", track: "PROG", dest: ["d9"], next: "prog_topics" },
    ],
  },
  goal_research: {
    stage: 1, kind: "single", short: "Looking for", title: "What do you want from the response?",
    options: [
      { key: "statement", label: "Sharpen a research question or statement", note: "make it testable and defensible", icon: "pen", track: "RSCH", dest: ["d3"], next: "statement" },
      { key: "method", label: "Method or modelling direction", note: "analysis stuck, or model choice unclear", icon: "sigma", track: "RSCH", dest: ["d4"], next: "statement" },
      { key: "collab", label: "A collaboration", note: "data, models or a joint study", icon: "handshake", track: "COLLAB", dest: ["d6"], next: "collab_text" },
      { key: "review", label: "A read before I submit", note: "paper, thesis chapter or grant", icon: "check", track: "RSCH", dest: ["d3"], next: "statement" },
      { key: "program", label: "A course or workshop to fill a gap", note: "EEG, modelling, ML, disease models", icon: "cap", track: "PROG", dest: ["d9"], next: "prog_topics" },
    ],
  },
  goal_clinician: {
    stage: 1, kind: "single", short: "Looking for", title: "What are you trying to do?",
    options: [
      { key: "transition", label: "Move into computational or research work", note: "keep practising, add the quantitative side", icon: "route", track: "PATH", dest: ["d1"], next: "time" },
      { key: "clinic", label: "Make measurement objective in my practice", note: "progress tracking, screening, reporting", icon: "signal", track: "CLIN", dest: ["d8"], next: "clin_focus" },
      { key: "statement", label: "A research statement or protocol", note: "a study I want to run", icon: "pen", track: "RSCH", dest: ["d3"], next: "statement" },
      { key: "collab", label: "A clinical collaboration", note: "trial site, validation study, pilot", icon: "handshake", track: "COLLAB", dest: ["d6"], next: "collab_text" },
      { key: "program", label: "A course or workshop for clinicians", note: "brain modelling without a coding background", icon: "cap", track: "PROG", dest: ["d9"], next: "prog_topics" },
    ],
  },
  goal_prof: {
    stage: 1, kind: "single", short: "Looking for", title: "What do you want help with?",
    options: [
      { key: "transition", label: "A career transition into neuro or neurotech", note: "from industry into the field", icon: "route", track: "PATH", dest: ["d1"], next: "time" },
      { key: "statement", label: "A research statement or PhD application", note: "going back into research", icon: "pen", track: "RSCH", dest: ["d3"], next: "statement" },
      { key: "skill", label: "The neuroscience I am missing", note: "I can build, I cannot frame the problem", icon: "brain", track: "PATH", dest: ["d2"], next: "time" },
      { key: "collab", label: "To build or collaborate on something", note: "side project, open source, a company", icon: "handshake", track: "COLLAB", dest: ["d7"], next: "collab_text" },
      { key: "program", label: "The right course or workshop", note: "matched to my level and hours", icon: "cap", track: "PROG", dest: ["d9"], next: "prog_topics" },
    ],
  },
  goal_founder: {
    stage: 1, kind: "single", short: "Looking for", title: "What kind of collaboration?",
    options: [
      { key: "research", label: "Research collaboration", note: "joint study, models, publications", icon: "flask", track: "COLLAB", dest: ["d6"], next: "collab_text" },
      { key: "validation", label: "Validation and evidence planning", note: "what proof your payer will need", icon: "chart", track: "COLLAB", dest: ["d7"], next: "collab_text" },
      { key: "talent", label: "Interns and project pipeline", note: "supervised student projects", icon: "people", track: "INTERN", dest: ["d5"], next: "collab_text" },
      { key: "clinical", label: "Clinical deployment and measurement", note: "getting it to work in a real clinic", icon: "hospital", track: "CLIN", dest: ["d8"], next: "collab_text" },
      { key: "program", label: "Training for my team", note: "a workshop matched to what they need", icon: "cap", track: "PROG", dest: ["d9"], next: "prog_topics" },
    ],
  },

  time: {
    stage: 1, kind: "single", short: "Time per day", title: "How much time can you give this on a normal day?",
    help: "A roadmap you cannot follow is not a roadmap. Answer for a busy week, not your best week.",
    options: [
      { key: "lt30", label: "Under 30 minutes", note: "squeezed between other commitments", icon: "clock", next: "sides" },
      { key: "30to60", label: "30 to 60 minutes", icon: "clock", next: "sides" },
      { key: "1to2", label: "1 to 2 hours", icon: "clock", next: "sides" },
      { key: "gt2", label: "More than 2 hours", note: "this is my main focus right now", icon: "clock", next: "sides" },
    ],
  },
  sides: {
    stage: 1, kind: "multi", short: "Help needed on", title: "Which side do you want help on?",
    help: "Pick up to three. We add what is missing rather than teaching everyone the same thing.",
    max: 3, options: HELP_SIDES, next: "current_state",
  },
  current_state: {
    stage: 1, kind: "text", short: "Current state", title: "Where are you now, in your own words?",
    help: "What you have already studied or built, what you have tried, and what you are stuck on. Specifics beat summaries.",
    placeholder:
      "e.g. Final-year ECE. Comfortable with Python and signal processing, did a course on ML. I have read a bit about spiking models but cannot tell how to go from a paper to working code, and I do not know which neuroscience I actually need first.",
    next: "contact",
  },

  statement: {
    stage: 1, kind: "text", short: "The problem", title: "Describe the problem you are working on",
    help: `Up to ${WORD_LIMIT} words. Name the question, the data or model you have, what you have already tried, and the decision you are stuck on.`,
    placeholder:
      "e.g. I have 20 minutes of scalp EEG per patient from 40 patients and want to flag seizure onset earlier. I have tried band-power features with a random forest and get 0.71 AUC. I cannot tell whether a network model is worth the effort at this sample size, or whether the labelling is my real problem.",
    next: "statement_stage",
  },
  statement_stage: {
    stage: 1, kind: "single", short: "Stage", title: "Where is this work right now?",
    options: [
      { key: "idea", label: "An idea, nothing written", icon: "compass", dest: ["d3"], next: "contact" },
      { key: "draft", label: "A rough draft or outline", icon: "pen", dest: ["d3"], next: "contact" },
      { key: "data", label: "Data collected, analysis under way", icon: "signal", dest: ["d4"], next: "contact" },
      { key: "deadline", label: "Written, with a deadline coming", icon: "clock", dest: ["d3"], next: "contact" },
    ],
  },

  intern_when: {
    stage: 1, kind: "single", short: "Availability", title: "When are you free, and for how long?",
    options: [
      { key: "short", label: "A few weeks in a break", note: "under a month", icon: "clock", next: "intern_skills" },
      { key: "summer", label: "A full summer or winter break", note: "one to three months", icon: "clock", next: "intern_skills" },
      { key: "semester", label: "Alongside a semester", note: "part-time over months", icon: "clock", next: "intern_skills" },
      { key: "thesis", label: "A thesis or final-year project", note: "a full academic term or more", icon: "cap", next: "intern_skills" },
    ],
  },
  intern_skills: {
    stage: 1, kind: "multi", short: "Can already do", title: "What can you already do?",
    help: "Be honest rather than generous. It decides which project you get, not whether you get one.",
    max: 4, options: HELP_SIDES, next: "current_state",
  },

  collab_text: {
    stage: 1, kind: "text", short: "The collaboration", title: "What do you do, and what would the collaboration be?",
    help: `Up to ${WORD_LIMIT} words. What you build or study, where you are stuck, what you would bring, and what you need from us.`,
    placeholder:
      "e.g. We build a tablet-based cognitive screener, 2,000 sessions from three clinics. We need help turning session data into a trajectory measure clinicians trust, and a validation design a hospital ethics committee will accept. We can bring data, clinical sites and engineering time.",
    next: "contact",
  },

  clin_focus: {
    stage: 1, kind: "single", short: "To make objective", title: "What are you trying to make objective?",
    options: [
      { key: "motor", label: "Motor recovery progress", icon: "chart", dest: ["d8"], next: "clin_today" },
      { key: "cog", label: "Attention or cognitive screening", icon: "brain", dest: ["d8"], next: "clin_today" },
      { key: "adherence", label: "Adherence to home exercise", icon: "clock", dest: ["d8"], next: "clin_today" },
      { key: "reporting", label: "Reporting to referrers and families", icon: "folder", dest: ["d8"], next: "clin_today" },
    ],
  },
  clin_today: {
    stage: 1, kind: "single", short: "In place today", title: "What do you have in place today?",
    options: [
      { key: "paper", label: "Paper scales only", icon: "pen", next: "collab_text" },
      { key: "digital", label: "Some digital records", icon: "folder", next: "collab_text" },
      { key: "sensors", label: "Camera or sensor tools already running", icon: "chip", next: "collab_text" },
      { key: "unsure", label: "Not sure what is worth keeping", icon: "compass", next: "collab_text" },
    ],
  },

  prog_topics: {
    stage: 1, kind: "multi", short: "Wants to learn", title: "What do you want to learn?",
    help: "Pick up to three. This is matched against the courses and workshops we actually run.",
    max: 3, options: PROG_TOPICS, next: "prog_level",
  },
  prog_level: {
    stage: 1, kind: "single", short: "Level", title: "Where are you starting from?",
    help: "Answer for what you can do unaided. Being placed above your level wastes the cohort as much as your time.",
    options: [
      { key: "beginner", label: "Complete beginner", note: "no coding, no neuroscience yet", icon: "compass", next: "prog_load" },
      { key: "some", label: "Some basics", note: "a course or two, can follow a tutorial", icon: "cap", next: "prog_load" },
      { key: "coding", label: "Comfortable with code", note: "Python and data are not the obstacle", icon: "code", next: "prog_load" },
      { key: "research", label: "Research experienced", note: "I have run projects or published", icon: "flask", next: "prog_load" },
    ],
  },
  prog_load: {
    stage: 1, kind: "single", short: "Commitment", title: "How much time can you commit?",
    help: "Some of these are day-long intensives over a week; others are a couple of live hours a week for months.",
    options: [
      { key: "light", label: "Up to 2 hours a week", note: "alongside a full schedule", icon: "clock", next: "contact" },
      { key: "steady", label: "2 to 5 hours a week, for months", note: "a long programme with mentorship", icon: "clock", next: "contact" },
      { key: "heavy", label: "5 to 10 hours a week", note: "a serious side commitment", icon: "clock", next: "contact" },
      { key: "intensive", label: "Full days, in a short block", note: "a week or two I can clear", icon: "clock", next: "contact" },
    ],
  },

  contact: {
    stage: 2, kind: "contact", short: "Contact", title: "Where do we send the response?",
    help: "A CV or portfolio link is optional for guidance, and expected for internships and collaborations.",
    next: "route",
  },
}

// ─── Route result copy ──────────────────────────────────────────────────────
export const ROUTES: Record<TrackCode, { title: string; tier: string; lead: string; gets: string[] }> = {
  PATH: {
    title: "Learning and career route",
    tier: "Introductory advisory — limited, complimentary",
    lead: "You get a sequence, not a syllabus: what to learn, in what order, and what to build so the learning shows.",
    gets: [
      "A staged roadmap sized to the time you said you have",
      "The two or three resources worth your time, and what to skip",
      "A first project that starts from the background you already have",
    ],
  },
  RSCH: {
    title: "Research route",
    tier: "Research advisory — pricing shared after scope assessment",
    lead: "We work on the question before the method, so the analysis you run is one you can defend.",
    gets: [
      "Your question restated as something testable, with its assumptions named",
      "A method or modelling direction, and the failure modes to expect",
      "What a convincing result would look like, and what would falsify it",
    ],
  },
  INTERN: {
    title: "Internship and project route",
    tier: "Reviewed against current openings and supervision capacity",
    lead: "Projects are matched to what you can already do and how long you actually have, not to a generic list.",
    gets: [
      "A project brief scoped to your availability window",
      "The three things to learn before you start",
      "A clear yes, no, or not yet — with the reason",
    ],
  },
  COLLAB: {
    title: "Collaboration route",
    tier: "Discussed after an initial scoping exchange",
    lead: "We separate the scientific question from the product question, then define what a first joint step looks like.",
    gets: [
      "A defined first collaboration or pilot, with what each side brings",
      "The evidence your payer or reviewer will ask for",
      "An honest read on fit, including when there is none",
    ],
  },
  PROG: {
    title: "Course and workshop match",
    tier: "Fees and dates vary by programme, and are listed on the workshops page",
    lead: "Rather than pointing you at the catalogue, we name the one or two programmes that fit your level and your hours — and say when none of them does.",
    gets: [
      "The programmes that match, with why each one was picked",
      "What to learn before it starts, so you are not the person catching up",
      "An honest note when the right cohort is not running yet",
    ],
  },
  CLIN: {
    title: "Clinical and applied route",
    tier: "Applied advisory — pricing shared after scope assessment",
    lead: "We design measurement that survives a real clinic: short, repeatable, and readable by whoever sees the report.",
    gets: [
      "Which metrics to track, and which to leave alone",
      "How the measurement fits inside an existing session, not beside it",
      "A reporting format referrers and families can read",
    ],
  },
}

export const HOW_IT_WORKS = [
  { title: "Say who you are", body: "School student, engineering or medical student, researcher, clinician, professional, or a lab looking for a collaborator." },
  { title: "Answer only what applies", body: "Each answer changes the next question. A clinician never sees a student's questions, and nobody fills in a field that does not fit them." },
  { title: "Describe the actual problem", body: "A few hundred words on where you are and what you have already tried. This is the part that decides how useful the response can be." },
  { title: "Get it in writing", body: "What to do next, what to skip, and why — plus the courses or workshops of ours that fit your level, named individually rather than as a catalogue." },
]

export const FACTS = [
  { icon: "clock", label: "Two minutes", value: "to fill in" },
  { icon: "mail", label: "Three to five working days", value: "for the written reply" },
  { icon: "check", label: "Introductory guidance", value: "no charge" },
  { icon: "target", label: "Research, product and clinical work", value: "priced after scoping" },
  { icon: "cap", label: "Matched", value: "to the courses and workshops we run" },
]

export const STAGES = [
  { label: "Input", sub: "who you are" },
  { label: "Scoping", sub: "what is missing" },
  { label: "Details", sub: "contact and CV" },
  { label: "Route", sub: "your next step" },
]

export const FAQS = [
  { q: "What counts as a well-defined question?", a: 'One that names the situation, what you have already tried, and the decision you are stuck on. "How do I model seizure dynamics" is a topic. "I have 20 minutes of scalp EEG per patient and 40 patients — is a network model worth it over a feature-based classifier?" is a question.' },
  { q: "How is this different from a course or workshop?", a: "A course teaches a syllabus to a room. Advisory answers one problem for one person or team, in writing, with the reasoning visible so you can act without us." },
  { q: "How long does a response take?", a: "Three to five working days once the scope is agreed. If the question needs narrowing first, we come back with the narrowing before the clock starts." },
  { q: "Do I need a CV?", a: "Not for guidance questions. For internships, projects and collaborations, yes — it is how we match you to something real rather than something generic." },
  { q: "What if I need ongoing mentorship?", a: "Advisory is one focused exchange. If the work needs sustained supervision, say so in your answer and we will point you to the programme or collaboration that fits instead." },
  { q: "Who answers?", a: "The Neurogati team, drawing on computational neuroscience research from the CNS Lab at IIT Madras and on building clinical products in rehabilitation and diagnostics." },
]

// ─── Helpers ────────────────────────────────────────────────────────────────
export const countWords = (s: string) => (s.trim() ? s.trim().split(/\s+/).length : 0)
export const validEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.trim())
