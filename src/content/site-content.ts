export const navigation = [
  { label: "Meet the pets", href: "#residents" },
  { label: "How it works", href: "#journey" },
  { label: "Before you visit", href: "#prepare" },
  { label: "Our mission", href: "#mission" },
] as const;

export const siteCopy = {
  hero: {
    intro: "Meet the personalities behind the paws. Find a familiar kind of weird, save a few favorites, and take it from there.",
    proofTitle: "Start with fit.",
    proofBody: "Save the pets who feel like your kind of weird.",
    proofNote: "Your shortlist stays on this device.",
  },
  introduction: {
    title: "Somebody here is your type.",
    body: "PawFriend puts personality before paperwork, so you can begin with the pets who genuinely fit your life.",
  },
  residents: {
    title: "Find your kind of company.",
    body: "A few faces to start with. Open a profile, get to know the personality, and save the ones you want to meet.",
    catalogTitle: "All residents.",
    catalogBody: "Take your time. Compare personalities, save the ones who fit, and bring your questions to the first meeting.",
    viewAll: (count: number) => `View all ${count} residents`,
    showFeatured: "Back to featured residents",
  },
  discovery: {
    eyebrow: "A face. A personality. A possibility.",
    featured: "The introduction sheet",
    all: "Everyone",
    dogs: "Dogs",
    cats: "Cats",
    filterLabel: "Browse residents by animal",
    results: (count: number) => `${count} ${count === 1 ? "resident" : "residents"} to get to know`,
    profileLabel: "A little more about",
    bioLabel: "A note from the profile",
    questionsTitle: "Could your everyday fit?",
    questionsIntro: "Bring these questions to the shelter. A good match starts with a conversation.",
    householdQuestion: "How should introductions to children or other pets be handled?",
    careQuestion: "What care, costs, and support should I plan for?",
    availability: "Confirm current availability, care needs, and household fit with the shelter before visiting.",
    prepare: "Prepare for a visit",
    back: "Back to the residents",
    meet: (name: string) => `Meet ${name}`,
    save: (name: string) => `Save ${name}`,
    saved: (name: string) => `${name} is saved`,
    shortlist: "View shortlist",
    storyLabel: "Our approach to adoption",
    storyOpen: "Make space for a slow hello",
    storyClose: "Close introduction advice",
    heroEyebrow: "Personality-first pet adoption",
    heroNote: "Good company comes in all shapes.",
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
    title: "Good things take a little patience.",
    accent: "Let the quiet ones set the pace.",
    body: "A first meeting is only a beginning. Give a pet room to approach, notice their signals, and leave time for another hello.",
    detail: "Ask the shelter team how the pet likes to meet new people. A quiet place, a familiar toy, or a shorter visit may help. Let the team guide introductions and talk through what settling in could look like at home.",
  },
  preparation: {
    title: "Before Your First Hello.",
    body: "A little preparation gives you and the pet more room to focus on the match.",
  },
  faq: {
    title: "Good questions. Honest answers.",
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
    species: "dog",
    observation: "Tennis balls, fast zoomies, and a soft heart.",
    question: "How much daily play and training helps Milo settle?",
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
    species: "cat",
    observation: "A sunny window and one favorite lap.",
    question: "How does Luna prefer to meet someone new?",
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
    species: "dog",
    observation: "Small paws. A particular interest in puddles.",
    question: "What routine and training is Pepper learning?",
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
    species: "dog",
    observation: "Long walks, new friends, and snack breaks.",
    question: "What does a comfortable daily walk look like for Otis?",
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
    species: "cat",
    observation: "A chair thief with an acrobatic streak.",
    question: "What play and enrichment does Nori enjoy at home?",
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
    species: "dog",
    observation: "Blankets, quiet confidence, and dinner on time.",
    question: "What home routine helps Miso feel comfortable?",
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
    species: "dog",
    observation: "Gentle hellos and a preference for staying close.",
    question: "How does Archie feel about time alone?",
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
    species: "dog",
    observation: "Curious ears and plenty of enthusiasm.",
    question: "How does Poppy balance activity with quiet time?",
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
    species: "dog",
    observation: "Car rides and a favorite window view.",
    question: "What does Ruby need to feel settled in a new home?",
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
    image: "/images/story/journey-meet-color.webp",
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
    image: "/images/story/journey-hello-color.webp",
  },
  {
    number: "04",
    title: "Go home together.",
    copy: "Leave with support, a plan, and one very excited new passenger.",
    image: "/images/story/journey-home-color.webp",
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
