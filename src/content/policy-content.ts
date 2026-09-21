export const privacyPolicy = {
  title: "Privacy, in plain language.",
  description: "What PawFriend stores, what it does not collect, and what stays under your control.",
  updated: "August 22, 2026",
  sections: [
    {
      title: "Your shortlist stays local",
      body: [
        "When you save a pet, PawFriend stores that pet’s identifier in your browser’s local storage. The shortlist does not leave your device unless you choose to share it.",
        "You can remove individual pets at any time. Clearing this site’s browser data removes the entire shortlist.",
      ],
    },
    {
      title: "No account or personal profile",
      body: [
        "This version of PawFriend does not ask for your name, email address, phone number, payment details, or an account.",
        "There are no advertising pixels, behavioral analytics, or third-party form submissions in the current site.",
      ],
    },
    {
      title: "Sharing is your choice",
      body: [
        "The Share controls use your device’s native share options when available. PawFriend does not know which app or person you choose after the share panel opens.",
      ],
    },
    {
      title: "Connected services",
      body: [
        "If PawFriend adds pet-data feeds, analytics, contact forms, donations, or appointment tools, this policy will name those services and explain how personal information is handled.",
      ],
    },
  ],
} as const;

export const accessibilityStatement = {
  title: "Built so more people can meet the right pet.",
  description: "PawFriend’s accessibility approach, current safeguards, and known limitations.",
  updated: "August 22, 2026",
  sections: [
    {
      title: "Our target",
      body: [
        "PawFriend aims to meet WCAG 2.2 Level AA. The site uses semantic headings, native controls, visible keyboard focus, meaningful image descriptions, and touch targets designed for comfortable use.",
      ],
    },
    {
      title: "Motion and input",
      body: [
        "Cinematic scroll storytelling is limited to larger screens with a fine pointer. Touch devices use normal page flow, and the experience removes pinned and directional movement when your device requests reduced motion.",
        "Every primary task, including browsing pets, saving favorites, opening the shortlist, reading FAQs, and sharing, is available without hover.",
      ],
    },
    {
      title: "Reading and navigation",
      body: [
        "The page includes a skip link, a logical heading order, clear control labels, and status announcements for saved pets and sharing outcomes.",
        "Color supports the design but does not carry essential meaning on its own.",
      ],
    },
    {
      title: "Known limitations",
      body: [
        "Pet profiles rely heavily on photography, so each profile also includes text descriptions and personality details. We continue testing the experience with keyboard navigation, reduced-motion settings, and assistive technology.",
      ],
    },
  ],
} as const;
