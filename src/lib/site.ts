export const site = {
  name: "Foz Mineral Park",
  tagline: "Onde a Terra guarda seus tesouros mais antigos",
  shortDescription:
    "Museu e parque de minerais em Foz do Iguaçu. Três experiências em um só lugar: gruta de ametista, museu com mais de mil espécimes e loja de peças lapidadas por artesãos.",
  longDescription:
    "Um destino imperdível no caminho das Cataratas do Iguaçu. Conheça formações naturais gigantes de ametista, aprenda sobre a origem dos minerais em um acervo com mais de mil exemplares e leve para casa peças lapidadas à mão.",
  url: "https://fozmineralpark.com.br",
  locale: "pt-BR",

  company: {
    legalName: "Foz Mineral Park LTDA",
    cnpj: "56.199.013/0001-96",
  },

  address: {
    street: "Av. das Cataratas, 6025",
    neighborhood: "Yolanda",
    city: "Foz do Iguaçu",
    state: "PR",
    postalCode: "85853-000",
    country: "BR",
    full: "Av. das Cataratas, 6025 — Yolanda, Foz do Iguaçu/PR — CEP 85.853-000",
  },

  hours: {
    summary: "Todos os dias, das 09h às 18h",
    lastEntry: "17h30",
    days: [
      { day: "Segunda a Domingo", open: "09:00", close: "18:00" },
    ],
  },

  geo: {
    latitude: -25.614,
    longitude: -54.481,
  },

  contact: {
    phone: "+55 45 9 0000-0000",
    phoneDisplay: "(45) 9 0000-0000",
    whatsapp: "+554590000000",
    email: "contato@fozmineralpark.com.br",
    securityEmail: "seguranca@fozmineralpark.com.br",
  },

  social: {
    instagram: "https://instagram.com/fozmineralpark",
    facebook: "https://facebook.com/fozmineralpark",
    tripadvisor: "https://www.tripadvisor.com.br/",
    googleMaps:
      "https://www.google.com/maps/search/?api=1&query=Foz+Mineral+Park+Foz+do+Iguacu",
  },

  attractions: [
    {
      slug: "gruta-de-ametista",
      name: "Gruta de Ametista",
      tagline: "Uma catedral natural de cristais",
      short:
        "Caminhe entre formações gigantes da pedra que representa a calma e a transformação.",
      long: "Uma gruta construída com ametistas de formação natural, algumas com mais de um metro de altura. A iluminação estudada revela a estrutura cristalina de cada drusa e transporta o visitante para dentro de uma geoda viva. É a atração mais fotografada do parque.",
      badge: "Experiência sensorial",
      duration: "20 min",
      accent: "amethyst",
      image: "/media/attractions/gruta-de-ametista.jpg",
    },
    {
      slug: "museu-de-minerais",
      name: "Museu de Minerais",
      tagline: "Mil cristais, uma história só",
      short:
        "Um acervo raro que explica como a Terra forma suas pedras mais belas.",
      long: "Mais de mil espécimes catalogados de todos os continentes, expostos em circuito guiado que conecta geologia, química e arte. Inclui seção sobre gemas brasileiras e história da lapidação em Foz do Iguaçu.",
      badge: "+1.000 espécimes",
      duration: "40 min",
      accent: "citrine",
      image: "/media/attractions/museu-de-minerais.jpg",
    },
    {
      slug: "loja-de-pedras",
      name: "Loja de Pedras",
      tagline: "Peças únicas, lapidadas à mão",
      short:
        "Joias, decoração e curiosidades produzidas por artesãos locais com minerais brasileiros.",
      long: "Do pingente discreto ao centro de mesa monumental. Todas as peças são lapidadas na própria Foz do Iguaçu, com minerais de origem certificada. É possível acompanhar parte do processo durante a visita.",
      badge: "Artesanato local",
      duration: "Livre",
      accent: "quartz",
      image: "/media/attractions/loja-de-pedras.jpg",
    },
  ],

  hero: {
    video: "/media/video/hero-1.mp4",
    poster: "/media/attractions/gruta-de-ametista.jpg",
  },

  keywords: [
    "Foz Mineral Park",
    "Mineral Park Foz do Iguaçu",
    "parque de pedras Foz do Iguaçu",
    "ametista Foz do Iguaçu",
    "museu de minerais Foz do Iguaçu",
    "o que fazer em Foz do Iguaçu",
    "atrações Foz do Iguaçu",
    "gruta de ametista",
    "loja de pedras Foz",
    "turismo Foz do Iguaçu",
  ],
} as const;

export type Attraction = (typeof site.attractions)[number];
