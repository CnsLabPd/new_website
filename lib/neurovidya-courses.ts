export const NEUROVIDYA_PLATFORM_URL = "https://neurovidya.neurogati.com/"

export const neurovidyaCourseCategories = [
  {
    slug: "brain-signals-and-ai",
    title: "Brain Signals & AI",
    shortDescription: "Explore EEG, brain-signal processing and ways artificial intelligence can help reveal patterns in neural data.",
    description: "Learn how brain activity is recorded and represented in EEG data, then explore signal-processing and AI methods used to study it. This category includes introductory and intensive learning formats.",
    courses: ["AI for EEG", "AI for EEG Bootcamp"],
    image: "/neurovidya-ai-eeg.png",
    alt: "Illustration representing EEG signals and artificial intelligence",
  },
  {
    slug: "neural-dynamics-and-modeling",
    title: "Neural Dynamics & Modelling",
    shortDescription: "Understand how neural activity changes over time, from oscillations to interacting neural systems.",
    description: "Build intuition for neural dynamics and mathematical models of brain activity. Learn how model structure and changing activity can help frame questions about the brain.",
    courses: ["Neural Oscillators"],
    image: "/neurovidya-neural-oscillators.png",
    alt: "Illustration representing neural oscillations and brain dynamics",
  },
  {
    slug: "python-for-neuroscience",
    title: "Python for Neuroscience",
    shortDescription: "Use programming and scientific computing to work with neuroscience questions and data.",
    description: "Develop practical Python skills through neuroscience examples, building a foundation for data handling, analysis and computational exploration.",
    courses: ["Python for Neuroscience"],
    image: "/neurovidya-python.jpg",
    alt: "A neuroscience learner working with Python on a computer",
  },
  {
    slug: "human-movement-analysis",
    title: "Human Movement Analysis",
    shortDescription: "Study movement data and learn how quantitative methods can describe human motion.",
    description: "Explore approaches to observing and analysing human movement, including how movement data can be organised and interpreted for research and applied questions.",
    courses: ["Human Movement Analysis"],
    image: "/images/redesign/neuroleela.jpg",
    alt: "A movement specialist guiding a practice session",
  },
] as const

export type NeurovidyaCourseCategory = (typeof neurovidyaCourseCategories)[number]
