export const navigation = [
  { label: "Meet the pets", href: "#residents" },
  { label: "How it works", href: "#journey" },
  { label: "Before you visit", href: "#prepare" },
  { label: "Our mission", href: "#mission" },
] as const;

export const siteCopy = {
  hero: {
    intro: "Big personalities. Small bios. One very good reason to meet.",
    proofTitle: "Start with fit.",
    proofBody: "Save the pets who feel like your kind of weird.",
    proofNote: "Your shortlist stays on this device.",
  },
  introduction: {
    title: "Somebody here is your type.",
    body: "PawFriend puts personality before paperwork, so you can begin with the pets who genuinely fit your life.",
  },
  residents: {
    title: "Meet the residents.",
    body: "Five very different reasons to leave with fur on your clothes.",
    catalogTitle: "All residents.",
    catalogBody: "Take your time. Compare personalities, save the ones who fit, and bring your questions to the first meeting.",
    viewAll: (count: number) => `View all ${count} residents`,
    showFeatured: "Back to featured residents",
  },
  personality: {
    title: "Not just cute faces.",
    body: "Every pet has a personality. Find the one that fits yours.",
    note: "Read the paw print →",
  },
  journey: {
    title: "The adoption journey.",
    body: "Four honest steps. Zero pressure.",
  },
  story: {
    title: "The right home is worth the wait.",
    accent: "Let the quiet ones set the pace.",
    body: "Luna did not need a perfect first impression. She needed room, repeat visits, and someone who listened to her signals.",
    detail: "Luna watched from a quiet corner during the first hello. Sam sat nearby without rushing her. Another visit brought a cautious head bump; the next brought a lap. Their connection grew from patience, not pressure.",
  },
  preparation: {
    title: "Make the first hello count.",
    body: "A little preparation gives you and the pet more room to focus on the match.",
  },
  faq: {
    title: "Good questions are part of a good match.",
    body: "The practical details matter. Bring them into the conversation early.",
  },
  featured: {
    label: "Personality snapshot",
    link: "Compare resident profiles",
  },
  mission: {
    title: "Room for the overlooked.",
    body: "We make space for the forgotten, the nervous, the noisy, and the gloriously weird.",
    support: "No perfect pets. No perfect people. Just honest matches and patient support.",
    note: "That’s the good stuff.",
  },
  final: {
    title: "Someone is waiting for you.",
    note: "Save a few favorites and build a shortlist that feels right.",
  },
  notifications: {
    savedLabel: "Tiny victory.",
    savedMessage: (name: string) => `${name} joined your shortlist.`,
    removedLabel: "Shortlist updated.",
    removedMessage: (name: string) => `${name} was removed.`,
  },
  footer: {
    tagline: "Personality-first pet adoption, made for thoughtful matches.",
    disclosure: "Pet profiles and availability can change. Confirm the details before planning your visit.",
  },
} as const;

export const residents = [
  {
    id: "milo",
    name: "Milo",
    image: "/images/residents/milo.webp",
    age: "2 years",
    breed: "Mixed breed",
    trait: "Professional tennis-ball destroyer",
    description: "Fast zoomies. Soft heart. Will trade one sock for a snack.",
    color: "lime",
  },
  {
    id: "luna",
    name: "Luna",
    image: "/images/residents/luna.webp",
    age: "3 years",
    breed: "Domestic shorthair",
    trait: "Window supervisor",
    description: "Likes sunny ledges, serious conversations, and exactly one lap.",
    color: "pink",
  },
  {
    id: "pepper",
    name: "Pepper",
    image: "/images/residents/pepper.webp",
    age: "1 year",
    breed: "Terrier mix",
    trait: "Questionable decision-maker",
    description: "Pocket-sized optimism with a talent for finding every puddle.",
    color: "orange",
  },
  {
    id: "otis",
    name: "Otis",
    image: "/images/residents/otis.webp",
    age: "4 years",
    breed: "Labrador mix",
    trait: "Snack quality inspector",
    description: "Loves people, long walks, and making every room feel friendlier.",
    color: "blue",
  },
  {
    id: "nori",
    name: "Nori",
    image: "/images/residents/nori.webp",
    age: "2 years",
    breed: "Tuxedo cat",
    trait: "Amateur acrobat",
    description: "Will steal your chair, your heart, and possibly your shoelaces.",
    color: "lime",
  },
  {
    id: "miso",
    name: "Miso",
    image: "/images/residents/miso.webp",
    age: "4 years",
    breed: "Shiba Inu",
    trait: "Blanket quality inspector",
    description: "Quiet confidence, tidy paws, and a remarkably accurate dinner clock.",
    color: "pink",
  },
  {
    id: "archie",
    name: "Archie",
    image: "/images/residents/archie.webp",
    age: "2 years",
    breed: "Shepherd mix",
    trait: "Professional hand-holder",
    description: "Gentle hellos, thoughtful eyes, and a strong preference for staying close.",
    color: "blue",
  },
  {
    id: "poppy",
    name: "Poppy",
    image: "/images/residents/poppy.webp",
    age: "1 year",
    breed: "Podenco mix",
    trait: "Full-time optimist",
    description: "Curious ears, quick feet, and enough enthusiasm for the entire household.",
    color: "orange",
  },
  {
    id: "ruby",
    name: "Ruby",
    image: "/images/residents/ruby.webp",
    age: "5 years",
    breed: "Hound mix",
    trait: "Passenger-seat supervisor",
    description: "Calm at home, delighted by car rides, and always ready for the next window view.",
    color: "lime",
  },
] as const;

export const personality = [
  { label: "Energy", score: 4 },
  { label: "Friendliness", score: 5 },
  { label: "Independence", score: 2 },
  { label: "Cuddle level", score: 4 },
  { label: "Chaos level", score: 5 },
] as const;

export const journey = [
  {
    number: "01",
    title: "Meet someone.",
    copy: "Start with personality, pace, and the kind of home you share.",
    image: "/images/story/journey-meet.webp",
  },
  {
    number: "02",
    title: "Fall slightly in love.",
    copy: "Spend real time together. Ask questions. Bring the whole household.",
    image: "/images/story/journey-love.webp",
  },
  {
    number: "03",
    title: "Come say hello.",
    copy: "Our team helps with the practical details and an honest fit check.",
    image: "/images/story/journey-hello.webp",
  },
  {
    number: "04",
    title: "Go home together.",
    copy: "Leave with support, a plan, and one very excited new passenger.",
    image: "/images/story/journey-home.webp",
  },
] as const;

export const preparationSteps = [
  {
    number: "01",
    title: "Save your matches.",
    copy: "Use the heart on any resident. Your shortlist stays ready when you return.",
  },
  {
    number: "02",
    title: "Compare real life.",
    copy: "Think about energy, routine, space, other pets, and who shares your home.",
  },
  {
    number: "03",
    title: "Bring your questions.",
    copy: "Ask about care, history, fees, introductions, and what support comes next.",
  },
] as const;

export const adoptionFaqs = [
  {
    question: "Can I meet more than one pet?",
    answer:
      "Often, yes. Start with a shortlist and ask the shelter team which order will be most comfortable for the animals available that day.",
  },
  {
    question: "What should I bring to a visit?",
    answer:
      "Bring every household decision-maker, a clear picture of your weekly routine, and any rental or housing rules that may affect adoption.",
  },
  {
    question: "Do I need to decide the same day?",
    answer:
      "No. A thoughtful match matters more than a fast one. Use the visit to ask honest questions and notice how the pet responds at their own pace.",
  },
  {
    question: "What do adoption fees cover?",
    answer:
      "Fees vary by shelter and pet. Ask what medical care, registration, supplies, and follow-up support are included before you decide.",
  },
  {
    question: "Can my current pet join the meeting?",
    answer:
      "Ask the shelter before bringing another animal. Some teams arrange pet introductions only after an initial meeting with the household.",
  },
] as const;
