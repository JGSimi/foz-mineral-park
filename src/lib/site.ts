/**
 * Fonte única de dados editoriais do site.
 *
 * Campos marcados com `PENDING` contêm placeholders que **precisam ser
 * preenchidos pelo cliente antes do go-live** (telefone, e-mail, redes
 * sociais, fotos reais). Ver /Users/joaosimi/.claude/plans/validacao-conteudo-fozmineral.md
 * para o relatório completo de auditoria.
 *
 * Descrições curtas de textos factuais só afirmam o que foi verificado em
 * fontes públicas (cadastro da empresa e site-cliente original).
 */

export const site = {
  name: "Foz Mineral Park",
  tagline: "Onde a Terra guarda seus tesouros mais antigos",
  shortDescription:
    "Museu e parque de minerais em Foz do Iguaçu. Três experiências em um só lugar: gruta de ametista, museu com acervo de minerais e loja de peças lapidadas por artesãos.",
  longDescription:
    "Um destino no caminho das Cataratas do Iguaçu. Conheça formações de ametista, um acervo de minerais raros e uma loja com peças lapidadas à mão.",
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
    days: [{ day: "Segunda a Domingo", open: "09:00", close: "18:00" }],
  },

  geo: {
    // Coordenadas aproximadas derivadas do endereço cadastrado.
    // Cliente deve confirmar pin exato no Google Business Profile.
    latitude: -25.614,
    longitude: -54.481,
  },

  contact: {
    // PENDING: fontes externas indicam (45) 99977-****. Aguardando número
    // completo com o cliente.
    phone: "+55 45 99977-0000",
    phoneDisplay: "(45) 99977-0000",
    whatsapp: "+554599977000",
    // PENDING: domínio próprio ainda não registrado. Trocar quando o
    // fozmineralpark.com.br estiver ativo.
    email: "contato@fozmineralpark.com.br",
    securityEmail: "seguranca@fozmineralpark.com.br",
  },

  social: {
    // PENDING: handles não verificados em busca pública. Cliente precisa
    // confirmar ou criar os perfis.
    instagram: "https://instagram.com/fozmineralpark",
    facebook: "https://facebook.com/fozmineralpark",
    googleMaps: "https://maps.app.goo.gl/jW4goc33JkoCYsMu8",
  },

  attractions: [
    {
      slug: "gruta-de-ametista",
      name: "Gruta de Ametista",
      tagline: "Uma catedral natural de cristais",
      short:
        "Caminhe entre formações de ametista montadas para transportar o visitante para dentro de uma geoda.",
      long: "Uma gruta composta por ametistas de formação natural. A iluminação revela a estrutura cristalina de cada drusa e transforma a passagem em uma das atrações mais fotografadas do parque.",
      badge: "Experiência sensorial",
      duration: "20 min",
      accent: "amethyst",
      image: "/media/attractions/gruta-de-ametista.jpg",
    },
    {
      slug: "museu-de-minerais",
      name: "Museu de Minerais",
      tagline: "Cristais de todos os continentes",
      short:
        "Um acervo raro que explica como a Terra forma suas pedras mais belas.",
      long: "Minerais catalogados de diversos continentes, expostos em circuito guiado que conecta geologia, química e arte. Inclui seção sobre gemas brasileiras e história da lapidação na região.",
      badge: "Acervo raro",
      duration: "40 min",
      accent: "citrine",
      image: "/media/attractions/museu-de-minerais.jpg",
    },
    {
      slug: "loja-de-pedras",
      name: "Loja de Pedras",
      tagline: "Peças únicas, lapidadas à mão",
      short:
        "Joias, decoração e curiosidades em minerais brasileiros, produzidas por artesãos da região.",
      long: "Do pingente discreto ao centro de mesa monumental. Peças lapidadas à mão, com minerais de origem certificada. Durante a visita é possível acompanhar parte do processo na bancada.",
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
