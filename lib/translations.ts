export type Language = 'fr' | 'en'

export const translations = {
  fr: {
    header: {
      requestQuote: 'Demander un devis',
    },
    hero: {
      badge: 'Enseignes lumineuses',
      title1: "L'enseigne,",
      title2: 'repensée.',
      description1: 'BLIGHT conçoit et vend des enseignes lumineuses pour les professionnels.',
      description2: 'Un projet plus ambitieux est en préparation.',
      requestQuote: 'Demander un devis',
      projectEvolution: "Projet en évolution. Ce que vous voyez aujourd'hui n'est que le début.",
    },
    features: {
      customSigns: {
        title: 'Enseignes lumineuses sur mesure',
        description: 'Conçues pour votre façade, votre contexte et votre activité. Lisibles, sobres et efficaces.',
      },
      logos: {
        title: 'Logos lumineux',
        description: 'Reprise fidèle de votre identité visuelle, avec une lumière propre et maîtrisée.',
      },
      panels: {
        title: 'Panneaux, boîtiers et lettres LED',
        description: 'Solutions simples ou plus ambitieuses, pour être vu clairement, sans excès.',
      },
    },
    whatWeDo: {
      title: "Ce que fait BLIGHT aujourd'hui",
      description: 'Nous concevons des enseignes lumineuses efficaces, propres et durables. Chaque projet est pensé pour être visible, lisible et cohérent avec votre activité.',
      items: [
        "Analyse du lieu, de la façade et du contexte urbain",
        "Conseil sur les dimensions, le type d'enseigne et la lumière",
        "Accompagnement de la conception à la pose (en option)",
        'Suivi simple et échanges clairs, sans jargon',
      ],
    },
    process: {
      title: 'Process BLIGHT',
      description: "De la conception à l'installation, un accompagnement clair et professionnel.",
      step1: {
        label: 'ÉTAPE 1',
        title: 'Conception & Visualisation',
        description: 'Analyse de votre façade, visualisation 3D et validation des dimensions.',
        items: [
          "Analyse du contexte",
          'Conseil dimensions',
          'Validation projet',
        ],
      },
      step2: {
        label: 'ÉTAPE 2',
        title: 'Fabrication & Validation',
        description: 'Fabrication sur mesure avec matériaux de qualité, contrôle à chaque étape.',
        items: [
          'Fabrication sur mesure',
          'Contrôle qualité',
          'Validation finale',
          'Préparation livraison',
        ],
      },
      step3: {
        label: 'ÉTAPE 3',
        title: 'Installation & Résultat',
        description: 'Installation professionnelle, mise en service et suivi post-installation.',
        items: [
          'Installation qualifiée',
          'Mise en service',
          'Conseils maintenance',
          'Suivi post-installation',
        ],
      },
    },
    comingSoon: {
      title: 'La suite arrive',
      description1: "BLIGHT travaille sur l'évolution du projet. L'enseigne ne sera plus seulement un support visuel. Ce que vous voyez aujourd'hui n'est que le début.",
      description2: 'En attendant, nous continuons à concevoir des enseignes lumineuses simples, fiables et claires.',
      requestQuote: 'Demander un devis',
    },
    footer: {
      copyright: '© 2026 BLIGHT. All rights reserved.',
    },
  },
  en: {
    header: {
      requestQuote: 'Request a quote',
    },
    hero: {
      badge: 'Light signs',
      title1: 'The sign,',
      title2: 'reimagined.',
      description1: 'BLIGHT designs and sells light signs for professionals.',
      description2: 'A more ambitious project is in preparation.',
      requestQuote: 'Request a quote',
      projectEvolution: 'Project in evolution. What you see today is just the beginning.',
    },
    features: {
      customSigns: {
        title: 'Custom light signs',
        description: 'Designed for your facade, your context and your business. Readable, sober and effective.',
      },
      logos: {
        title: 'Light logos',
        description: 'Faithful reproduction of your visual identity, with clean and controlled lighting.',
      },
      panels: {
        title: 'Panels, boxes and LED letters',
        description: 'Simple or more ambitious solutions, to be seen clearly, without excess.',
      },
    },
    whatWeDo: {
      title: 'What BLIGHT does today',
      description: 'We design effective, clean and durable light signs. Each project is designed to be visible, readable and consistent with your business.',
      items: [
        'Analysis of the location, facade and urban context',
        'Advice on dimensions, sign type and lighting',
        'Support from design to installation (optional)',
        'Simple follow-up and clear communication, without jargon',
      ],
    },
    process: {
      title: 'BLIGHT Process',
      description: 'From design to installation, clear and professional support.',
      step1: {
        label: 'STEP 1',
        title: 'Design & Visualization',
        description: 'Analysis of your facade, 3D visualization and validation of dimensions.',
        items: [
          'Context analysis',
          'Dimension advice',
          'Project validation',
        ],
      },
      step2: {
        label: 'STEP 2',
        title: 'Manufacturing & Validation',
        description: 'Custom manufacturing with quality materials, quality control at each step.',
        items: [
          'Custom manufacturing',
          'Quality control',
          'Final validation',
          'Delivery preparation',
        ],
      },
      step3: {
        label: 'STEP 3',
        title: 'Installation & Result',
        description: 'Professional installation, commissioning and post-installation follow-up.',
        items: [
          'Qualified installation',
          'Commissioning',
          'Maintenance advice',
          'Post-installation follow-up',
        ],
      },
    },
    comingSoon: {
      title: 'More to come',
      description1: 'BLIGHT is working on the evolution of the project. The sign will no longer be just a visual support. What you see today is just the beginning.',
      description2: 'In the meantime, we continue to design simple, reliable and clear light signs.',
      requestQuote: 'Request a quote',
    },
    footer: {
      copyright: '© 2026 BLIGHT. All rights reserved.',
    },
  },
} as const

export const getTranslation = (lang: Language) => translations[lang]

