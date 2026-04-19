import type { Dictionary } from "./pt";

const dict: Dictionary = {
  meta: {
    shortDescription:
      "A mineral museum and park in Foz do Iguaçu, Brazil. Three experiences in one stop: amethyst cave, curated mineral collection and a shop with handcrafted stone pieces.",
    longDescription:
      "A stop on the road to the Iguazu Falls. Walk through amethyst formations, explore a rare mineral collection, and take home pieces cut by hand by local artisans.",
    tagline: "Where the Earth keeps its oldest treasures",
    keywords: [
      "Foz Mineral Park",
      "Mineral Park Foz do Iguaçu",
      "what to do in Foz do Iguaçu",
      "amethyst cave Foz do Iguaçu",
      "mineral museum Brazil",
      "Iguazu Falls attractions",
      "things to do Iguazu",
      "amethyst geode",
      "gemstone shop Brazil",
      "Foz tourism",
    ],
  },

  common: {
    skipToContent: "Skip to content",
    openInMaps: "Open in Google Maps",
    whatsapp: "Chat on WhatsApp",
    loading: "Loading...",
    back: "Back",
  },

  navbar: {
    menuOpen: "Open menu",
    menuClose: "Close menu",
    ctaBuy: "Buy ticket",
    links: [
      { href: "#atracoes", label: "Attractions" },
      { href: "/ingressos", label: "Tickets" },
      { href: "/como-chegar", label: "Getting there" },
      { href: "/sobre", label: "About" },
      { href: "/contato", label: "Contact" },
    ],
  },

  utility: {
    addressLabel: "Av. das Cataratas · Yolanda",
    mapLabel: "Google Maps",
  },

  attractions: {
    eyebrow: "Three experiences · one visit",
    titleLead: "What you'll",
    titleEm: "live",
    titleTail: "inside the park",
    description:
      "A route built to last around an hour — it fits into the same day as the Falls and the Bird Park, and yields the best photos.",
    selectHint: "Pick an experience",
    accessible: "Accessible",
    learnMore: "Learn more",
    nextAttraction: "Keep exploring",
    nextAttractionTitleLead: "Next stop",
    nextAttractionTitleEm: "on the circuit",
    prev: "Previous",
    next: "Next",
    items: {
      "gruta-de-ametista": {
        name: "Amethyst Cave",
        tagline: "A natural cathedral of crystals",
        short:
          "Walk among amethyst formations arranged to feel like stepping inside a geode.",
        long: "A cave built with naturally-formed amethysts. The lighting reveals the crystalline structure of every druzy and turns the walk into one of the most photographed rooms in the park.",
        badge: "Sensory experience",
        duration: "20 min",
      },
      "museu-de-minerais": {
        name: "Mineral Museum",
        tagline: "Crystals from every continent",
        short: "A rare collection that explains how the Earth forms its most beautiful stones.",
        long: "Minerals catalogued from across several continents, shown in a guided circuit that ties geology, chemistry and art. Includes a section on Brazilian gems and the history of local stone cutting.",
        badge: "Rare collection",
        duration: "40 min",
      },
      "loja-de-pedras": {
        name: "Stone Shop",
        tagline: "Unique pieces, cut by hand",
        short:
          "Jewelry, décor and curiosities in Brazilian minerals, made by artisans from the region.",
        long: "From a discreet pendant to a monumental centerpiece. All pieces are cut by hand, using minerals of certified origin. During your visit you can watch part of the process at the bench.",
        badge: "Local craft",
        duration: "Open-ended",
      },
    },
    detail: {
      breadcrumb: "All attractions",
      timeAvgKey: "Average time",
      audienceKey: "Who it's for",
      audienceValue: "All ages",
      audienceDetail: "Families, tour operators and school groups.",
      includedKey: "Same ticket covers",
      includedValue: "3 attractions",
      includedDetail: "Cave, museum and shop in one circuit.",
    },
  },

  hero: {
    locationBadge: "Av. das Cataratas, 6025 — Foz do Iguaçu / Brazil",
    titleLead: "Where the Earth keeps its",
    titleEm: "oldest treasures",
    titleTail: ".",
    description:
      "Three experiences in one place, on the road to the Iguazu Falls. Walk through an amethyst cave, explore a mineral collection, and take home pieces cut by hand by local artisans.",
    ctaBuy: "Buy ticket",
    ctaHowTo: "Getting there",
    stats: [
      { k: "Attractions", v: "3", d: "in one route" },
      { k: "Visit", v: "~1h", d: "no rush, no queues" },
      { k: "Open", v: "9–6", d: "every day" },
    ],
    photoBadge: {
      k: "Highlight",
      title: "Amethyst Cave",
      sub: "Sensory experience",
    },
    pillLocation: "Foz do Iguaçu · Brazil",
  },

  quickFacts: [
    { label: "Open every day", value: "9am — 6pm", detail: "Last entry 5:30pm" },
    {
      label: "On the Falls road",
      value: "Av. das Cataratas",
      detail: "Yolanda, Foz do Iguaçu",
    },
    {
      label: "Fully accessible",
      value: "For all ages",
      detail: "Flat floor, tactile signage",
    },
  ],

  reveal: {
    eyebrow: "From rock to crystal",
    titleLead: "Every gem started out",
    titleEm: "rough",
    titleTail: ".",
    description:
      "What looks plain hides something unique inside. Hover to open the geode.",
    hintClosed: "Reveal",
    hintOpened: "Natural amethyst",
    tapHint: "Tap to reveal",
  },

  whyVisit: {
    eyebrow: "Why it's worth the stop",
    titleLead: "A stop travelers",
    titleEm: "talk about at home",
    titleTail: "",
    description:
      "Foz do Iguaçu is one of the most visited cities in Brazil. We exist to deliver the memory that's missing between the Falls and dinner.",
    points: [
      {
        title: "Minerals up close",
        body: "A collection of pieces from different origins, shown in a short circuit that weaves geology, chemistry and aesthetics.",
      },
      {
        title: "Kids leave amazed",
        body: "The cave and the cutting bench tend to become the kids' favorite topic for days. Short route, no fatigue.",
      },
      {
        title: "Photos that look great",
        body: "The cave's lighting was designed to highlight color and structure — delivering the best photos of the day.",
      },
      {
        title: "Everyone welcome",
        body: "We want every visitor to have a smooth experience. If you have specific needs, tell our team when you book.",
      },
    ],
  },

  testimonials: {
    eyebrow: "Visitors come back",
    titleLead: "Real reviews,",
    titleEm: "written by visitors",
    titleTail: ".",
    description:
      "We believe in honest social proof. Rate your visit on the official platforms — read what other travelers say, and share yours when you get home.",
    rateGoogle: "Rate on Google",
    rateTripadvisor: "See on TripAdvisor",
  },

  visitPlan: {
    eyebrow: "Plan your visit",
    titleLead: "Between the Falls,",
    titleEm: "Three Borders",
    titleTail: "and the Bird Park.",
    description:
      "The ideal stop for travelers who want to make the most of a full day. We welcome agencies, families and school groups by appointment.",
    labels: {
      address: "Address",
      hours: "Hours",
      parking: "Parking",
      accessibility: "Accessibility",
    },
    values: {
      parking: "On Av. das Cataratas, right in front of the park.",
      accessibility: "Message the team to confirm what applies to your visit.",
    },
    ctaBuy: "Buy ticket",
    ctaMaps: "Open in Google Maps",
  },

  finalCta: {
    eyebrow: "Next stop, us",
    titleLead: "The",
    titleEm: "brightest",
    titleTail: "memory from your trip can start here.",
    description:
      "Book your ticket online and skip the reception queue. Pay by PIX, card or bank slip.",
    ctaBuy: "Buy ticket",
    ctaContact: "Talk to the team",
  },

  tickets: {
    pageTitle: "Tickets",
    heroTitleLead: "Book your visit in",
    heroTitleEm: "a few minutes",
    heroTitleTail: ".",
    heroDescription:
      "Our team confirms day, time and package on WhatsApp. Full online checkout with automatic e-mail voucher is coming soon.",
    card: {
      eyebrow: "WhatsApp booking",
      titleLead: "Reach the team and",
      titleEm: "get confirmed",
      titleTail: "in minutes.",
      description:
        "Current prices and day/time availability are confirmed case by case by our team. Once full online checkout is live, you'll be able to complete the purchase right here with PIX, card or bank slip.",
      ctaReserve: "Book now",
      ctaWhatsapp: "WhatsApp direct",
    },
    included: {
      eyebrow: "What's included",
      titleLead: "One ticket,",
      titleEm: "three attractions",
      items: [
        "Access to the Amethyst Cave",
        "Entry to the Mineral Museum",
        "Visit to the Stone Shop",
        "Parking right at the entrance",
      ],
    },
    considerations: {
      eyebrow: "Before you come",
      titleLead: "Things that are",
      titleEm: "good to know",
      items: [
        "Discounts and free entry follow Brazilian legislation.",
        "Bundles for families, tour operators and school groups are negotiated directly with our sales team.",
        "On busy days, come with extra time so you can enjoy it unhurried.",
      ],
    },
    agencies: {
      eyebrow: "Agencies and school groups",
      titleLead: "Dedicated commercial",
      titleEm: "terms",
      description:
        "Voucher, commission and protected availability are arranged case by case. Service in Portuguese, Spanish and English.",
      cta: "Contact sales",
    },
  },

  about: {
    pageTitle: "About us",
    heroTitleLead: "A family, a collection,",
    heroTitleEm: "an invitation",
    heroTitleTail: ".",
    milestones: [
      {
        numeral: "I",
        label: "The collection",
        title: "A passion that became a collection",
        body: "It started with the Colla family's love for minerals and gems. Piece by piece, a collection took shape and found its home in Foz do Iguaçu.",
      },
      {
        numeral: "II",
        label: "The address",
        title: "Between the Falls and the city",
        body: "The park opened its doors on Avenida das Cataratas — the road millions of tourists travel every year on their way to Iguaçu.",
      },
      {
        numeral: "III",
        label: "Today",
        title: "Three attractions, one visit",
        body: "A mineral museum, an amethyst cave, and a shop with pieces cut by hand by local artisans. All open to the public every day.",
      },
    ],
    manifestoEyebrow: "What moves us",
    manifestoTitleLead: "Celebrating the Earth's beauty,",
    manifestoTitleEm: "one crystal",
    manifestoTitleTail: "at a time",
    manifesto: [
      "Loving minerals is a deeply personal thing. Every stone carries a story told in layers that took millions of years to form. We enjoy translating that into a short, clear and beautiful visit.",
      "We believe in responsible tourism and in an honest website — one that says what it delivers, in the language of whoever's coming.",
    ],
    ctaEyebrow: "Come say hi",
    ctaTitleLead: "We'll put the coffee on, you bring",
    ctaTitleEm: "the curiosity",
    ctaTitleTail: ".",
    ctaBuy: "Book a visit",
    ctaHowTo: "Getting there",
  },

  howTo: {
    pageTitle: "Getting there",
    heroTitleLead: "On the road to the Falls, the",
    heroTitleEm: "Three Borders Mark",
    heroTitleTail: "and the Bird Park.",
    heroDescription:
      "Our address is easy: Av. das Cataratas, 6025, Foz do Iguaçu. Open every day.",
    routes: [
      {
        title: "By car",
        body: "Av. das Cataratas — the main tourist road in Foz. Parking right in front of the park.",
      },
      {
        title: "By bus",
        body: "Linha Cataratas (TTU → Cataratas) passes by the entrance. Ask to get off at Foz Mineral Park.",
      },
      {
        title: "From the airport (IGU)",
        body: "Around 15 minutes on BR-469. Taxis, Uber and tourist transfers run throughout the day.",
      },
    ],
    infoLabels: {
      address: "Address",
      hours: "Hours",
      accessibility: "Accessibility",
    },
    accessibility: "For specifics, reach out on WhatsApp before your visit.",
    ctaEyebrow: "Ready to come",
    ctaTitleLead: "Confirm date and time",
    ctaTitleEm: "in minutes",
    ctaMaps: "Open in Google Maps",
    ctaWhatsapp: "Chat on WhatsApp",
  },

  faq: {
    pageTitle: "Frequently asked questions",
    heroTitleLead: "Questions we get",
    heroTitleEm: "every day",
    heroTitleTail: ".",
    heroDescription:
      "Didn't find what you need? Message us — we reply quickly on WhatsApp.",
    items: [
      {
        q: "Where is it and what are the hours?",
        a: "Av. das Cataratas, 6025 — Yolanda, Foz do Iguaçu, Brazil. Open every day from 9am to 6pm, last entry at 5:30pm.",
      },
      {
        q: "How long does the visit take?",
        a: "About an hour at a family pace. You can extend it in the shop and the rest area as you like.",
      },
      {
        q: "How does ticket booking work?",
        a: "For now, booking happens on WhatsApp, with fast confirmation from our team. Full online checkout with e-mail voucher is coming soon.",
      },
      {
        q: "Are there student / senior / disabled discounts?",
        a: "Yes, according to Brazilian legislation (Law 12.933/13 for students and other legal cases). Talk to our team to confirm which category applies to your visit.",
      },
      {
        q: "Is the park accessible?",
        a: "Yes. For specifics (ramps, adapted restrooms, wheelchairs available, service animals), reach out on WhatsApp — the team will confirm what applies to your visit.",
      },
      {
        q: "Where can I park?",
        a: "Parking is available right on Av. das Cataratas, in front of the park.",
      },
      {
        q: "Do you work with travel agencies and school groups?",
        a: "Yes. We have dedicated service for tour operators and school groups — voucher, commission and scheduling are arranged case by case by our commercial team.",
      },
      {
        q: "What languages does the team speak?",
        a: "We welcome visitors from many nationalities; the team speaks Portuguese and, whenever possible, Spanish and English. If you need specific support, let us know when booking.",
      },
    ],
    ctaStill: "I still have a question",
    ctaWhatsapp: "Chat on WhatsApp",
  },

  contact: {
    pageTitle: "Contact",
    heroTitleLead: "We love knowing",
    heroTitleEm: "you're coming",
    heroTitleTail: ".",
    heroDescription:
      "We reply in minutes on WhatsApp during business hours. Agencies and school groups have a dedicated team.",
    form: {
      name: "Your name",
      email: "E-mail",
      phone: "Phone or WhatsApp",
      subject: "Subject",
      subjects: {
        visita: "Plan a visit",
        ingressos: "Tickets",
        agencias: "Travel agency",
        escolas: "School group",
        imprensa: "Press",
        outro: "Other",
      },
      message: "How can we help?",
      messagePlaceholder: "Planning to visit on day X, we're Y people...",
      consent:
        "I consent to the processing of my data to respond to this contact, as described in the Privacy Policy.",
      submit: "Send message",
      submitting: "Sending...",
      toastSuccess: "Message received!",
      toastSuccessDesc:
        "We'll reply through your preferred channel within one business day.",
      toastError: "We couldn't send right now.",
    },
    aside: {
      eyebrow: "Direct channels",
      titleLead: "Prefer",
      titleEm: "a quicker route",
      labels: {
        whatsapp: "WhatsApp · Phone",
        email: "E-mail",
        address: "Address",
        hours: "Hours",
      },
    },
  },

  notFound: {
    eyebrow: "Error 404",
    titleLead: "This gem hasn't",
    titleEm: "been cut yet",
    titleTail: ".",
    description:
      "The page you're looking for doesn't exist, was moved or lost its shine. But we have three much more interesting places to suggest.",
    ctaHome: "Back to home",
    ctaAttractions: "See attractions",
  },

  footer: {
    description:
      "Mineral museum and park in Foz do Iguaçu, Brazil. Three experiences in one visit: amethyst cave, mineral museum, and a shop of hand-cut stone pieces.",
    columns: {
      park: {
        title: "The park",
        items: [
          { href: "#atracoes", label: "Attractions" },
          { href: "/sobre", label: "About us" },
          { href: "/faq", label: "FAQ" },
          { href: "/ingressos", label: "Tickets" },
        ],
      },
      visit: {
        title: "Visit",
        items: [
          { href: "/como-chegar", label: "Getting there" },
          { href: "/contato", label: "Talk to us" },
          { href: "@googleMaps", label: "Open in Google Maps", external: true },
        ],
      },
      legal: {
        title: "Institutional",
        items: [
          { href: "/politica-de-privacidade", label: "Privacy Policy" },
          { href: "/termos-de-uso", label: "Terms of Use" },
          { href: "/.well-known/security.txt", label: "Security", external: true },
        ],
      },
    },
    info: {
      address: "Address",
      hours: "Hours",
      hoursDetail: "Last entry at 5:30pm",
      phone: "Phone",
      email: "E-mail",
    },
    copyrightSuffix:
      "All rights reserved. Independently owned website. Data handled under Brazil's LGPD — see our Privacy Policy.",
    privacyLink: "Privacy Policy",
  },

  cookie: {
    title: "Your privacy",
    titleEm: "matters",
    body: "We only use essential cookies to run the site. Anonymous visit data helps us improve — you choose.",
    policyLink: "Read the Policy",
    acceptEssential: "Essential only",
    acceptAll: "Accept all",
  },

  whatsappMessage: "Hello! I'd like to know more about Foz Mineral Park.",
};

export default dict;
