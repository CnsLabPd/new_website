// Centralized game data with multi-category support

export type CategoryId =
  | "motor-execution"
  | "postural-control"
  | "perception-action"
  | "spatial-cognition"
  | "cognitive-control"
  | "social-synchronization";

export interface Game {
  id: string;
  name: string;
  tagline: string;
  overview: string;
  tech?: string | null;
  videoUrl?: string | null;
  images: string[];
  features: string[];
  applications: string[];
  categories: CategoryId[];
  action?: {
    label: string;
    href: string;
    external?: boolean;
  } | null;
  isPlatform?: boolean; // For cRGS which is a platform, not a game
}

export interface Category {
  id: CategoryId;
  title: string;
  description: string;
  color: string;
  slug: string;
}

export const categories: Category[] = [
  {
    id: "motor-execution",
    title: "Motor Execution & Coordination",
    description: "Transform intention into controlled movement.",
    color: "blue",
    slug: "motor-execution"
  },
  {
    id: "postural-control",
    title: "Postural Control & Dynamic Stability",
    description: "Maintain and adapt whole-body equilibrium.",
    color: "violet",
    slug: "postural-control"
  },
  {
    id: "perception-action",
    title: "Perception–Action Integration",
    description: "Map sensory signals into motor output.",
    color: "cyan",
    slug: "perception-action"
  },
  {
    id: "spatial-cognition",
    title: "Spatial Cognition & Navigation",
    description: "Construct and use internal representations of space.",
    color: "amber",
    slug: "spatial-cognition"
  },
  {
    id: "cognitive-control",
    title: "Cognitive Control & Executive Function",
    description: "Regulate goal-directed behavior.",
    color: "green",
    slug: "cognitive-control"
  },
  {
    id: "social-synchronization",
    title: "Social & Interactive Synchronization",
    description: "Align behavior with others.",
    color: "pink",
    slug: "social-synchronization"
  }
];

export const games: Game[] = [
  // cRGS Platform - Motor Execution
  {
    id: "crgs-platform",
    name: "cRGS™ Gaming Platform",
    tagline: "Personalized neuro-rehabilitation",
    overview: "A clinically-validated rehabilitation platform that gamifies therapy and progress tracking. Using AI-driven feedback, cRGS™ provides targeted exercises that adapt to each patient's unique recovery curve, maximizing motor function improvement and cognitive engagement.",
    tech: "cRGS™ : Completed clinical trials at Sree Chitra Tirunal Institute (SCTIMST) and NIMHANS",
    images: ["/images/crgs_games.jpeg"],
    features: [
      "Adaptive exercise programs that scale with patient progress",
      "Real-time postural and movement tracking via computer vision",
      "Remote monitoring portal for clinicians and therapists",
      "Gamified modules designed for high patient compliance"
    ],
    applications: [
      "Post-stroke upper extremity motor recovery",
      "Cognitive rehabilitation and neuroplasticity training",
      "Balance, coordination, and proprioception therapy",
      "In-clinic and remote home-rehabilitation programs"
    ],
    categories: ["motor-execution"],
    action: null, // No play button, will show contact us
    isPlatform: true
  },

  // Posabets - Postural Control & ADHD
  {
    id: "posabets",
    name: "Posabets",
    tagline: "Cognitive Focus & Alphabet Challenge",
    overview: "Posabets supports movement-based learning and can be a valuable tool for educators and parents working with children with ADHD.",
    tech: "Dynamic Difficulty Adjustment (DDA)",
    images: ["/posabets game card.png"],
    features: [
      "Adaptive speed based on focus levels",
      "Minimalist UI to reduce sensory overload",
      "Immediate feedback loops for positive reinforcement"
    ],
    applications: [
      "Improvement of sustained attention span",
      "Enhancement of working memory",
      "Executive function skill building"
    ],
    categories: ["postural-control"],
    action: {
      label: "Play Here",
      href: "/gaming/play/posabets"
    }
  },

  // Frosty Flicks - Motor Execution
  {
    id: "frosty-flicks",
    name: "Frosty Flicks",
    tagline: "Gesture-based Snowball Challenge",
    overview: "Step into a winter wonderland with Frosty Flicks, an exergaming experience designed for players of all abilities. Using standard laptop webcams, it translates physical movement into in-game action, encouraging mobility through immersive play.",
    tech: null,
    videoUrl: "/frostyFlicks.mp4",
    images: ["/images/crgs_games.jpeg"],
    features: [
      "Intuitive gesture-based controls (No specialized hardware)",
      "Reward systems and levels to incentivize training",
      "Immersive environments for sustained engagement"
    ],
    applications: [
      "Upper-extremity movement encouragement",
      "Hand-eye coordination training",
      "Engagement tool for pediatric and elderly rehab"
    ],
    categories: ["motor-execution"],
    action: {
      label: "Play Now!",
      href: "https://apps.microsoft.com/detail/9nzj8mbk1btt?hl=en-US&gl=IN",
      external: true
    }
  },

  // Dunk-it - Motor Execution
  {
    id: "dunk-it",
    name: "Dunk-it",
    tagline: "Gesture-based Basketball Challenge",
    overview: "Hit the court with Dunk-it!!, an immersive basketball exergaming experience that turns your physical rehabilitation into a high-energy competition. Using advanced motion tracking, the game translates your arm and upper-body movements into precise shots and slam dunks, making repetitive therapeutic exercises feel like a trip to the arena.",
    tech: null,
    videoUrl: "/DunkIt.mp4",
    images: ["/images/crgs_games.jpeg"],
    features: [
      "Real-time skeletal tracking via standard webcam (No wearables required)",
      "Adaptive difficulty scaling based on range of motion",
      "Dynamic scoring and visual feedback for motor precision"
    ],
    applications: [
      "Shoulder and elbow extension reinforcement",
      "Proprioception and spatial awareness development",
      "Bilateral coordination and reaching-task therapy"
    ],
    categories: ["motor-execution"],
    action: {
      label: "Play Now!",
      href: "https://apps.microsoft.com/detail/9n3201tlsnvf?hl=en-GB&gl=IN",
      external: true
    }
  },

  // Mandala Painting - Motor Execution
  {
    id: "mandala-painting",
    name: "Mandala Painting",
    tagline: "Gesture-based Art Therapy Experience",
    overview: "Experience the therapeutic power of art with Mandala Painting, an interactive digital art system where creativity meets technology. Paint beautiful mandalas using intuitive gesture controls or traditional mouse input, transforming art therapy into an engaging, accessible experience for all ages and abilities.",
    tech: null,
    images: ["/mandala painting game card.png"],
    features: [
      "Gesture control with air-hand movements or mouse (No specialized hardware)",
      "Automatic image segmentation for any uploaded template",
      "Multiplayer support for collaborative creativity",
      "Save, continue, and share your artwork"
    ],
    applications: [
      "Fine motor skills and hand-eye coordination",
      "Cognitive engagement and creative expression",
      "Stress relief and mindfulness therapy for seniors"
    ],
    categories: ["motor-execution"],
    action: {
      label: "Play Now!",
      href: "/gaming/play/mandala-painting"
    }
  },

  // Sonic Drive - Perception-Action Integration
  {
    id: "sonic-drive",
    name: "Sonic Drive",
    tagline: "Precision Audio-Spatial Racing",
    overview: "Sonic Drive is a groundbreaking experience designed specifically for the visually impaired. By utilizing binaural 3D audio cues, players navigate complex racing circuits at high speeds, transforming auditory feedback into a competitive racing simulation.",
    tech: "Binaural Audio Engine & Haptic Integration",
    images: ["/sonic drive game card.png"],
    features: [
      "Advanced 3D Spatial Audio (Requires Headphones)",
      "Dynamic Haptic feedback for obstacle detection",
      "Adaptive speed scaling"
    ],
    applications: [
      "Development of auditory spatial mapping",
      "Enhancement of reactive listening skills",
      "Inclusive gaming"
    ],
    categories: ["perception-action"],
    action: {
      label: "Play Here",
      href: "/gaming/play/sonic-drive"
    }
  },

  // Sonic Pop - Perception-Action Integration
  {
    id: "sonic-pop",
    name: "Sonic Pop",
    tagline: "Echo-Location Reaction Trainer",
    overview: "Test your auditory reflexes in this fast-paced spatial challenge. Sonic bubbles float around a virtual 3D space, emitting unique sound signatures. Use echo-location cues to track and 'pop' them before they drift away.",
    tech: "Dynamic Spatial Sound-Mapping",
    images: ["/sonic pop game card.jpeg"],
    features: [
      "360-degree sound field tracking",
      "Progression system with increasing audio complexity",
      "Calibrated for high-precision auditory rehab"
    ],
    applications: [
      "Fine-tuning auditory localization",
      "Upper-extremity coordination (when paired with gesture)",
      "Cognitive processing speed training"
    ],
    categories: ["perception-action"],
    action: {
      label: "Play Here",
      href: "/gaming/play/sonic-pop"
    }
  },

  // Dart Knight - Motor Execution
  {
    id: "dart-knight",
    name: "Dart Knight",
    tagline: "Gesture-based Dart Challenge",
    overview: "Step up to the line with Dart Knight, the gesture-based dart game that turns your laptop screen into a dartboard. Challenge a friend in offline multiplayer mode and see who has the steadiest hand and the sharpest eye. Simply aim and throw with your natural hand movements to rack up points and hit that Bullseye.",
    tech: null,
    images: ["/images/dart_knight_game_card.jpeg"],
    features: [
      "Gesture-based dart throwing (No controllers, no buttons)",
      "Offline multiplayer mode for competitive play",
      "All you need is a computer and a webcam",
      "Natural hand movement tracking"
    ],
    applications: [
      "Hand-eye coordination training",
      "Upper-extremity precision and control",
      "Fine motor skill development",
      "Social engagement through multiplayer"
    ],
    categories: ["motor-execution"],
    action: {
      label: "Play Now!",
      href: "https://apps.microsoft.com/detail/9N2MDG4LXCKR?hl=en-us&gl=IN&ocid=pdpshare",
      external: true
    }
  },

  // Shoot Froot - Motor Execution
  {
    id: "shoot-froot",
    name: "Shoot Froot",
    tagline: "Gesture-based Slingshot Game",
    overview: "Aim and release the stone to hit all the mangoes in the tree. Collect them all before the timer runs out. A gesture-based slingshot game where all you need is a laptop and a webcam. No controllers, no buttons - just natural hand movements.",
    tech: "Note: Play in a well-lit room. Make sure the light is not creating any camera glare for effective hand detection.",
    images: ["/images/shoot_froot_game_card.jpeg"],
    features: [
      "Intuitive slingshot mechanics using hand gestures",
      "Time-based challenge mode",
      "Webcam-based motion tracking (No controllers needed)",
      "Works in any well-lit environment"
    ],
    applications: [
      "Upper-extremity range of motion training",
      "Timing and coordination development",
      "Aiming precision and motor control",
      "Reaction time improvement"
    ],
    categories: ["motor-execution"],
    action: {
      label: "Play Now!",
      href: "https://apps.microsoft.com/detail/9NCT5BCN7D6G?hl=en-us&gl=IN&ocid=pdpshare",
      external: true
    }
  }
];

// Helper functions
export function getGamesByCategory(categoryId: CategoryId): Game[] {
  return games.filter(game => game.categories.includes(categoryId));
}

export function getCategoryById(categoryId: CategoryId): Category | undefined {
  return categories.find(cat => cat.id === categoryId);
}

export function getGameById(gameId: string): Game | undefined {
  return games.find(game => game.id === gameId);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(cat => cat.slug === slug);
}
