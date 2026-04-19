import type { Dictionary } from "./pt";

const dict: Dictionary = {
  meta: {
    shortDescription:
      "Museo y parque de minerales en Foz do Iguaçu, Brasil. Tres experiencias en un solo lugar: gruta de amatista, museo con colección de minerales y tienda de piezas talladas por artesanos.",
    longDescription:
      "Un destino en el camino de las Cataratas del Iguazú. Conoce formaciones de amatista, un acervo de minerales raros y una tienda con piezas talladas a mano.",
    tagline: "Donde la Tierra guarda sus tesoros más antiguos",
    keywords: [
      "Foz Mineral Park",
      "Mineral Park Foz do Iguaçu",
      "qué hacer en Foz do Iguaçu",
      "gruta de amatista",
      "museo de minerales Brasil",
      "atracciones Cataratas del Iguazú",
      "turismo Iguazú",
      "amatista Brasil",
      "tienda de piedras Brasil",
      "turismo Foz",
    ],
  },

  common: {
    skipToContent: "Saltar al contenido",
    openInMaps: "Abrir en Google Maps",
    whatsapp: "Hablar por WhatsApp",
    loading: "Cargando...",
    back: "Volver",
  },

  navbar: {
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    ctaBuy: "Comprar entrada",
    links: [
      { href: "#atracoes", label: "Atracciones" },
      { href: "/ingressos", label: "Entradas" },
      { href: "/como-chegar", label: "Cómo llegar" },
      { href: "/sobre", label: "Sobre" },
      { href: "/contato", label: "Contacto" },
    ],
  },

  utility: {
    addressLabel: "Av. das Cataratas · Yolanda",
    mapLabel: "Google Maps",
  },

  attractions: {
    eyebrow: "Tres experiencias · una sola visita",
    titleLead: "Lo que van a",
    titleEm: "vivir",
    titleTail: "dentro del parque",
    description:
      "Un recorrido pensado para durar una hora, que cabe en el mismo día de las Cataratas y del Parque de las Aves — y rinde las mejores fotos.",
    selectHint: "Elige una experiencia",
    accessible: "Accesible",
    learnMore: "Saber más",
    nextAttraction: "Sigue explorando",
    nextAttractionTitleLead: "Próxima parada",
    nextAttractionTitleEm: "del circuito",
    prev: "Anterior",
    next: "Siguiente",
    items: {
      "gruta-de-ametista": {
        name: "Gruta de Amatista",
        tagline: "Una catedral natural de cristales",
        short:
          "Camina entre formaciones de amatista montadas para transportarte al interior de una geoda.",
        long: "Una gruta compuesta por amatistas de formación natural. La iluminación revela la estructura cristalina de cada drusa y convierte el paso en una de las atracciones más fotografiadas del parque.",
        badge: "Experiencia sensorial",
        duration: "20 min",
      },
      "museu-de-minerais": {
        name: "Museo de Minerales",
        tagline: "Cristales de todos los continentes",
        short: "Un acervo raro que explica cómo la Tierra forma sus piedras más bellas.",
        long: "Minerales catalogados de varios continentes, expuestos en un circuito guiado que conecta geología, química y arte. Incluye una sección sobre gemas brasileñas y la historia de la lapidación en la región.",
        badge: "Acervo raro",
        duration: "40 min",
      },
      "loja-de-pedras": {
        name: "Tienda de Piedras",
        tagline: "Piezas únicas, talladas a mano",
        short:
          "Joyas, decoración y curiosidades en minerales brasileños, hechas por artesanos de la región.",
        long: "Desde un colgante discreto hasta una pieza monumental para el centro de mesa. Todo tallado a mano, con minerales de origen certificado. Durante la visita se puede ver parte del proceso en el banco.",
        badge: "Artesanía local",
        duration: "Libre",
      },
    },
    detail: {
      breadcrumb: "Todas las atracciones",
      timeAvgKey: "Tiempo promedio",
      audienceKey: "Para quién es",
      audienceValue: "Todas las edades",
      audienceDetail: "Familias, agencias receptivas y grupos escolares.",
      includedKey: "En la misma entrada",
      includedValue: "3 atracciones",
      includedDetail: "Gruta, museo y tienda en un solo circuito.",
    },
  },

  hero: {
    locationBadge: "Av. das Cataratas, 6025 — Foz do Iguaçu / Brasil",
    titleLead: "Donde la Tierra guarda sus",
    titleEm: "tesoros más antiguos",
    titleTail: ".",
    description:
      "Tres experiencias en un mismo lugar, en el camino de las Cataratas. Cruza una gruta de amatista, recorre un acervo de minerales y llévate a casa piezas talladas a mano por artesanos de la región.",
    ctaBuy: "Comprar entrada",
    ctaHowTo: "Cómo llegar",
    stats: [
      { k: "Atracciones", v: "3", d: "en un recorrido" },
      { k: "Visita", v: "~1h", d: "sin prisa, sin filas" },
      { k: "Abierto", v: "9–18h", d: "todos los días" },
    ],
    photoBadge: {
      k: "Destacado",
      title: "Gruta de Amatista",
      sub: "Experiencia sensorial",
    },
    pillLocation: "Foz do Iguaçu · Brasil",
  },

  quickFacts: [
    { label: "Abierto todos los días", value: "09h a 18h", detail: "Último ingreso 17h30" },
    {
      label: "En el camino de las Cataratas",
      value: "Av. das Cataratas",
      detail: "Yolanda, Foz do Iguaçu",
    },
    {
      label: "Totalmente accesible",
      value: "Todas las edades",
      detail: "Suelo plano, señalización táctil",
    },
  ],

  whyVisit: {
    eyebrow: "Por qué vale la visita",
    titleLead: "Una parada que los turistas",
    titleEm: "cuentan en casa",
    titleTail: "",
    description:
      "Foz do Iguaçu es una de las ciudades más visitadas de Brasil. Existimos para entregar la memoria que falta entre las Cataratas y la cena.",
    points: [
      {
        title: "Minerales de cerca",
        body: "Acervo con piezas de distintos orígenes, mostradas en un recorrido corto que conecta geología, química y estética.",
      },
      {
        title: "Encanta a los niños",
        body: "La gruta y el banco de lapidación suelen ser el tema de conversación de los más pequeños durante días. Recorrido corto, sin cansar.",
      },
      {
        title: "Fotos que rinden",
        body: "La iluminación de la gruta fue pensada para resaltar color y estructura — rinde las mejores fotos del día.",
      },
      {
        title: "Para todos",
        body: "Queremos que cada visitante tenga una experiencia tranquila. Si tienes alguna necesidad específica, avísanos al reservar.",
      },
    ],
  },

  testimonials: {
    eyebrow: "Quien visita, vuelve",
    titleLead: "Reseñas de verdad,",
    titleEm: "escritas por quien fue",
    titleTail: ".",
    description:
      "Creemos en la prueba social honesta. Evalúa tu visita en las plataformas oficiales — lee lo que otros viajeros dicen y deja tu relato después de volver a casa.",
    rateGoogle: "Evaluar en Google",
    rateTripadvisor: "Ver en TripAdvisor",
  },

  visitPlan: {
    eyebrow: "Planifica tu visita",
    titleLead: "Entre las Cataratas, el",
    titleEm: "Hito",
    titleTail: "y el Parque de las Aves.",
    description:
      "La parada ideal para quienes quieren aprovechar el día entero. Recibimos agencias, familias y grupos escolares mediante agendamiento.",
    labels: {
      address: "Dirección",
      hours: "Horario",
      parking: "Estacionamiento",
      accessibility: "Accesibilidad",
    },
    values: {
      parking: "Sobre la Av. das Cataratas, enfrente del parque.",
      accessibility: "Escríbele al equipo para confirmar lo que aplica a tu visita.",
    },
    ctaBuy: "Comprar entrada",
    ctaMaps: "Abrir en Google Maps",
  },

  finalCta: {
    eyebrow: "Próxima parada, nosotros",
    titleLead: "El recuerdo más",
    titleEm: "brillante",
    titleTail: "del viaje puede empezar aquí.",
    description:
      "Garantiza tu entrada en línea y evita las filas en recepción. Pago con PIX, tarjeta o boleto.",
    ctaBuy: "Comprar entrada",
    ctaContact: "Hablar con el equipo",
  },

  tickets: {
    pageTitle: "Entradas",
    heroTitleLead: "Agenda tu visita en",
    heroTitleEm: "pocos minutos",
    heroTitleTail: ".",
    heroDescription:
      "Nuestro equipo confirma día, horario y paquete por WhatsApp. Pronto, compra en línea con bono automático al correo.",
    card: {
      eyebrow: "Reserva por WhatsApp",
      titleLead: "Habla con el equipo y",
      titleEm: "recibe la confirmación",
      titleTail: "en minutos.",
      description:
        "Valores actualizados y disponibilidad se confirman caso por caso. Cuando la compra 100% online esté activa, podrás finalizar directo desde aquí, con PIX, tarjeta o boleto.",
      ctaReserve: "Reservar ahora",
      ctaWhatsapp: "WhatsApp directo",
    },
    included: {
      eyebrow: "Qué incluye",
      titleLead: "Una sola entrada,",
      titleEm: "tres atracciones",
      items: [
        "Acceso a la Gruta de Amatista",
        "Entrada al Museo de Minerales",
        "Visita a la Tienda de Piedras",
        "Estacionamiento frente al parque",
      ],
    },
    considerations: {
      eyebrow: "Antes de venir",
      titleLead: "Información que",
      titleEm: "conviene saber",
      items: [
        "Medio precio y gratuidades según la legislación vigente.",
        "Combos para familias, agencias receptivas y grupos escolares se negocian con el área comercial.",
        "En días de alta demanda, llega con holgura para disfrutar sin prisa.",
      ],
    },
    agencies: {
      eyebrow: "Agencias y grupos escolares",
      titleLead: "Condiciones comerciales",
      titleEm: "dedicadas",
      description:
        "Bono, comisión y agenda protegida se acuerdan caso por caso. Atención en portugués, español e inglés.",
      cta: "Hablar con comercial",
    },
  },

  about: {
    pageTitle: "Nosotros",
    heroTitleLead: "Una familia, un acervo,",
    heroTitleEm: "una invitación",
    heroTitleTail: ".",
    milestones: [
      {
        numeral: "I",
        label: "La colección",
        title: "Una pasión que se volvió acervo",
        body: "Todo comenzó con el gusto de la familia Colla por los minerales y las gemas. Pieza a pieza, una colección tomó forma y encontró su lugar en Foz do Iguaçu.",
      },
      {
        numeral: "II",
        label: "La dirección",
        title: "Entre las Cataratas y la ciudad",
        body: "El parque abrió sus puertas en la Avenida das Cataratas — el camino por donde pasan, cada año, millones de turistas que visitan Foz.",
      },
      {
        numeral: "III",
        label: "Hoy",
        title: "Tres atracciones, una sola visita",
        body: "Museo con acervo de minerales, gruta de amatista y tienda con piezas talladas a mano por artesanos locales. Todo abierto al público todos los días.",
      },
    ],
    manifestoEyebrow: "Lo que nos mueve",
    manifestoTitleLead: "Celebrar la belleza de la Tierra,",
    manifestoTitleEm: "un cristal",
    manifestoTitleTail: "a la vez",
    manifesto: [
      "Amar los minerales es un asunto muy personal. Cada piedra tiene una historia contada en capas que tardaron millones de años en formarse. Nos gusta traducir eso en una visita corta, clara y bella.",
      "Creemos en el turismo responsable y en un sitio honesto — que dice lo que entrega, en el idioma de quien llega.",
    ],
    ctaEyebrow: "Ven a conocer",
    ctaTitleLead: "Nosotros ponemos el café, ustedes traen",
    ctaTitleEm: "la curiosidad",
    ctaTitleTail: ".",
    ctaBuy: "Reservar visita",
    ctaHowTo: "Cómo llegar",
  },

  howTo: {
    pageTitle: "Cómo llegar",
    heroTitleLead: "En el camino de las Cataratas, del",
    heroTitleEm: "Hito",
    heroTitleTail: "y del Parque de las Aves.",
    heroDescription:
      "Nuestra dirección es fácil: Av. das Cataratas, 6025, Foz do Iguaçu. Abierto todos los días.",
    routes: [
      {
        title: "En auto",
        body: "Av. das Cataratas — la vía principal del turismo en Foz. Estacionamiento enfrente del parque.",
      },
      {
        title: "En ómnibus",
        body: "Linha Cataratas (TTU → Cataratas) pasa enfrente. Pide bajarte en Foz Mineral Park.",
      },
      {
        title: "Desde el aeropuerto (IGU)",
        body: "Unos 15 minutos por la BR-469. Taxis, Uber y traslados turísticos operan todo el día.",
      },
    ],
    infoLabels: {
      address: "Dirección",
      hours: "Horario",
      accessibility: "Accesibilidad",
    },
    accessibility: "Para detalles específicos, escríbenos por WhatsApp antes de la visita.",
    ctaEyebrow: "Listo para venir",
    ctaTitleLead: "Confirma fecha y hora",
    ctaTitleEm: "en minutos",
    ctaMaps: "Abrir en Google Maps",
    ctaWhatsapp: "Hablar por WhatsApp",
  },

  faq: {
    pageTitle: "Preguntas frecuentes",
    heroTitleLead: "Preguntas que recibimos",
    heroTitleEm: "todos los días",
    heroTitleTail: ".",
    heroDescription:
      "¿No encontraste lo que buscas? Habla con nosotros — respondemos rapidito por WhatsApp.",
    items: [
      {
        q: "¿Dónde queda y cuáles son los horarios?",
        a: "Av. das Cataratas, 6025 — Yolanda, Foz do Iguaçu/Brasil. Abierto todos los días de 09h a 18h, último ingreso a las 17h30.",
      },
      {
        q: "¿Cuánto dura la visita?",
        a: "Alrededor de una hora al ritmo de la familia. Puedes extenderla en la tienda y el área de descanso.",
      },
      {
        q: "¿Cómo funciona la compra de la entrada?",
        a: "Por ahora, la reserva se hace por WhatsApp, con confirmación rápida del equipo. Pronto tendremos compra 100% online con bono al correo.",
      },
      {
        q: "¿Hay medio precio y gratuidad?",
        a: "Sí, conforme a la legislación brasileña (Ley 12.933/13 para estudiantes y demás casos previstos en ley). Consulta con el equipo cuál categoría aplica a tu visita.",
      },
      {
        q: "¿El parque es accesible?",
        a: "Sí. Para detalles específicos (rampas, baños adaptados, sillas de ruedas disponibles, perro-guía), escríbenos por WhatsApp — el equipo confirma lo que aplica a tu visita.",
      },
      {
        q: "¿Dónde puedo estacionar?",
        a: "Hay estacionamiento sobre la Av. das Cataratas, enfrente del parque.",
      },
      {
        q: "¿Reciben agencias y grupos escolares?",
        a: "Sí. Tenemos atención dedicada para agencias receptivas y grupos escolares — bono, comisión y agenda se acuerdan caso por caso con nuestro comercial.",
      },
      {
        q: "¿Qué idiomas habla el equipo?",
        a: "Recibimos visitantes de varias nacionalidades; el equipo habla portugués y, cuando es posible, español e inglés. Si necesitas atención específica, avísanos al reservar.",
      },
    ],
    ctaStill: "Aún tengo dudas",
    ctaWhatsapp: "Hablar por WhatsApp",
  },

  contact: {
    pageTitle: "Contacto",
    heroTitleLead: "Nos encanta saber que",
    heroTitleEm: "estás viniendo",
    heroTitleTail: ".",
    heroDescription:
      "Respondemos en minutos por WhatsApp en horario comercial. Para agencias y grupos escolares, tenemos equipo dedicado.",
    form: {
      name: "Tu nombre",
      email: "E-mail",
      phone: "Teléfono o WhatsApp",
      subject: "Asunto",
      subjects: {
        visita: "Planificar visita",
        ingressos: "Entradas",
        agencias: "Agencia de turismo",
        escolas: "Grupo escolar",
        imprensa: "Prensa",
        outro: "Otro",
      },
      message: "¿Cómo podemos ayudar?",
      messagePlaceholder: "Quiero visitar el día X, somos Y personas...",
      consent:
        "Concuerdo con el tratamiento de mis datos para responder a este contacto, conforme a la Política de Privacidad.",
      submit: "Enviar mensaje",
      submitting: "Enviando...",
      toastSuccess: "¡Mensaje recibido!",
      toastSuccessDesc:
        "Respondemos por el canal que elegiste en hasta un día hábil.",
      toastError: "No pudimos enviar ahora.",
    },
    aside: {
      eyebrow: "Canales directos",
      titleLead: "Si prefieres,",
      titleEm: "habla ahora mismo",
      labels: {
        whatsapp: "WhatsApp · Teléfono",
        email: "E-mail",
        address: "Dirección",
        hours: "Horario",
      },
    },
  },

  notFound: {
    eyebrow: "Error 404",
    titleLead: "Esta gema aún",
    titleEm: "no salió",
    titleTail: "del bruto.",
    description:
      "La página que buscas no existe, fue movida o perdió el brillo. Pero tenemos tres lugares mucho más interesantes para sugerir.",
    ctaHome: "Volver al inicio",
    ctaAttractions: "Ver atracciones",
  },

  footer: {
    description:
      "Museo y parque de minerales en Foz do Iguaçu. Tres experiencias en un mismo lugar: gruta de amatista, museo y tienda de piezas talladas.",
    columns: {
      park: {
        title: "El parque",
        items: [
          { href: "#atracoes", label: "Atracciones" },
          { href: "/sobre", label: "Sobre nosotros" },
          { href: "/faq", label: "Preguntas frecuentes" },
          { href: "/ingressos", label: "Entradas" },
        ],
      },
      visit: {
        title: "Visita",
        items: [
          { href: "/como-chegar", label: "Cómo llegar" },
          { href: "/contato", label: "Escríbenos" },
          { href: "@googleMaps", label: "Abrir en Google Maps", external: true },
        ],
      },
      legal: {
        title: "Institucional",
        items: [
          { href: "/politica-de-privacidade", label: "Política de Privacidad" },
          { href: "/termos-de-uso", label: "Términos de Uso" },
          { href: "/.well-known/security.txt", label: "Seguridad", external: true },
        ],
      },
    },
    info: {
      address: "Dirección",
      hours: "Horario",
      hoursDetail: "Último ingreso a las 17h30",
      phone: "Teléfono",
      email: "E-mail",
    },
    copyrightSuffix:
      "Todos los derechos reservados. Sitio propio. Datos tratados conforme a la LGPD de Brasil — consulta nuestra Política de Privacidad.",
    privacyLink: "Política de Privacidad",
  },

  cookie: {
    title: "Tu privacidad",
    titleEm: "importa",
    body: "Usamos solo cookies esenciales para el funcionamiento del sitio. Datos anónimos de visita ayudan a mejorar la experiencia — tú eliges.",
    policyLink: "Leer la Política",
    acceptEssential: "Solo esenciales",
    acceptAll: "Aceptar todo",
  },

  whatsappMessage: "¡Hola! Me gustaría saber más sobre Foz Mineral Park.",
};

export default dict;
