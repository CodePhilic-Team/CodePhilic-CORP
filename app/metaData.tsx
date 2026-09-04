import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  // Basic metadata
  metadataBase: new URL("https://codephilic.com"),
  alternates: {
    canonical: "https://codephilic.com",
    languages: {
      "en-US": "https://codephilic.com",
      en: "https://codephilic.com",
    },
  },
  title: "CodePhilic | We Architect Imagination",
  description:
    "CodePhilic builds scalable SaaS and AI products while helping organizations transform their operations through custom digital systems.",

  // Keywords for SEO - Authentic core offerings and technology capabilities
  keywords: [
    // Primary Keywords (Core Offerings)
    "custom software development agency",
    "Bangladesh software company",
    "web application development",
    "enterprise mobile apps",
    "AI integration services",
    "full-stack development company",
    "scalable software solutions",

    // Secondary & Long-Tail Keywords (Technologies & Intent)
    "Next.js and React JS web development",
    "secure Node.js backend development",
    "Python and Java AI software engineering",
    "cloud application digital transformation",
    "hire expert software architecture team",
    "custom SaaS development Bangladesh",
    "IoT and GPS tracking system development",

    // Supporting Keywords
    "software development",
    "custom software",
    "web development agency",
    "mobile app development",
    "fullstack development",
    "React development",
    "Next.js development",
    "Node.js backend",
    "Python development",
    "AI software",
    "CodePhilic",
    "CodePhilic Limited",
    "software engineering Tangail Dhaka Bangladesh",
    "enterprise software",
    "digital transformation",
    "system architecture",
    "scalable applications",
    "secure software solutions",
    "software development services",
  ],

  // Open Graph metadata for social sharing & search engines
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codephilic.com",
    siteName: "CodePhilic Limited",
    title: "CodePhilic | We Architect Imagination",
    description:
      "CodePhilic builds scalable SaaS and AI products while helping organizations transform their operations through custom digital systems.",
    images: [
      {
        url: "https://codephilic.com/og-image.jpg",
        secureUrl: "https://codephilic.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CodePhilic Limited - Custom Software & AI Development Company",
        type: "image/jpeg",
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "CodePhilic | We Architect Imagination",
    description:
      "CodePhilic builds scalable SaaS and AI products while helping organizations transform their operations through custom digital systems.",
    images: [
      {
        url: "https://codephilic.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CodePhilic Limited - We Architect Imagination",
      },
    ],
    creator: "@codephilic",
    site: "@codephilic",
  },

  // Verification & Other Metadata
  verification: {
    other: {
      "msvalidate.01": "A121669086E98BFFA9212E3622A5DC5D",
    },
  },
  other: {
    copyright: "© 2026 CodePhilic Limited. All rights reserved.",
  },

  // Additional SEO metadata
  authors: [{ name: "CodePhilic Limited", url: "https://codephilic.com" }],
  creator: "CodePhilic Limited",
  publisher: "CodePhilic Limited",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  // Application metadata
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CodePhilic",
  },

  // Format detection
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },

  // Icons
  icons: {
    icon: { url: "/favicon.ico?v=2", sizes: "32x32", type: "image/x-icon" },
    apple: "/apple-touch-icon.png?v=2",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png?v=2",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png?v=2",
      },
      {
        rel: "mask-icon",
        url: "/CodePhilic.jpg",
        color: "#3B82F6",
      },
    ],
  },
};

// Structured Data for Organization (Entity Representation)
export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": "https://codephilic.com/#organization",
  name: "CodePhilic Limited",
  alternateName: ["CodePhilic", "CodePhilic Ltd"],
  url: "https://codephilic.com",
  logo: "https://codephilic.com/CodePhilic.jpg",
  image: "https://codephilic.com/CodePhilic.jpg",
  description:
    "CodePhilic Limited is a Bangladesh-based technology company building scalable SaaS and AI products while developing custom digital systems for organizations, institutions and businesses.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Santosh",
    addressLocality: "Tangail",
    addressRegion: "Dhaka Division",
    postalCode: "1902",
    addressCountry: "BD",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: "+8801812049163",
      email: "contact@codephilic.com",
      areaServed: ["BD", "US", "GB", "Worldwide"],
      availableLanguage: ["English", "Bengali"],
    },
  ],
  knowsAbout: [
    "Custom Software Development",
    "SaaS Platform Engineering",
    "Artificial Intelligence Solutions",
    "Web Application Development",
    "Mobile Application Development",
    "IoT & GPS Tracking Systems",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "System Architecture",
    "Cloud Infrastructure",
  ],
  founder: [
    {
      "@type": "Person",
      name: "Md. Rakibul Islam",
      jobTitle: "Leading Founder & CEO · Managing Director · Director",
      description:
        "Leading Founder, Chief Executive Officer (CEO), Managing Director & Director at CodePhilic Limited. Also oversees technology architecture as CTO and corporate strategy as CSO.",
      sameAs: [
        "https://www.linkedin.com/in/rakibul-islam-8372852bb/",
        "https://github.com/rakibtkg",
      ],
    },
    {
      "@type": "Person",
      name: "Druba Paul",
      alternateName: "Dhruba Paul",
      jobTitle: "Co-Founder & CMO · Director",
      description:
        "Co-Founder, Chief Marketing Officer (CMO) & Director at CodePhilic Limited. Drives marketing, brand operations, product roadmap (CPO), and revenue strategy (CRO).",
      sameAs: [
        "https://www.linkedin.com/in/dhruba-paul-69342b363/",
        "https://github.com/DHRUBA-NIRO",
      ],
    },
    {
      "@type": "Person",
      name: "Iftekhar Alam Shuvo",
      jobTitle: "Co-Founder & CFO · Director",
      description:
        "Co-Founder, Chief Financial Officer (CFO) & Director at CodePhilic Limited. Oversees financial planning, corporate compliance, and advisory corporate strategy (CSO).",
      sameAs: [
        "https://www.linkedin.com/in/iftekhar-alam-shuvo-4742842bb/",
        "https://github.com/SHUVOika",
      ],
    },
    {
      "@type": "Person",
      name: "Md. Habibur Rahman",
      jobTitle: "Co-Founder & COO · Director",
      description:
        "Co-Founder, Chief Operating Officer (COO) & Director at CodePhilic Limited. Directs company operations, business development, client partnerships (CBO), and technical advisory (Advisory CTO).",
      sameAs: [
        "https://www.linkedin.com/in/habib007/",
        "https://github.com/himaloy007",
      ],
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/codephilic-limited/",
    "https://www.facebook.com/share/1UyoDxc6iB/",
    "https://github.com/codephilic",
  ],
};

// Structured Data for WebSite
export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://codephilic.com/#website",
  url: "https://codephilic.com",
  name: "CodePhilic Limited",
  alternateName: "CodePhilic",
  description:
    "Official website of CodePhilic Limited - Bangladesh-based software development company specializing in SaaS, AI, and custom digital systems.",
  publisher: {
    "@id": "https://codephilic.com/#organization",
  },
  inLanguage: "en-US",
};

// Structured Data for Services (Valid Schema.org OfferCatalog)
export const servicesStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://codephilic.com/#services",
  name: "CodePhilic Limited Services",
  url: "https://codephilic.com/#services",
  provider: {
    "@id": "https://codephilic.com/#organization",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Software Engineering & Digital Solutions",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web Architecture & Generic Products",
          description:
            "High-performance web applications built with modern frameworks. Scalable, accessible, and ultra-fast digital experiences using Next.js, React, and TypeScript.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mobile Ecosystems",
          description:
            "Native-feeling iOS and Android applications with engaging transitions, offline-first capabilities, and responsive form factors using Flutter.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "IoT Solutions",
          description:
            "End-to-end IoT platforms, device integration, and real-time data analytics for smart environments and connected devices.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "GPS Tracking Systems",
          description:
            "Custom GPS tracker solutions for fleet management, asset tracking, and personal safety with live location tracking and route analytics.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI-Based Web & App Solutions",
          description:
            "AI-powered websites and mobile apps featuring chatbots, recommendation engines, LLM integrations, and intelligent automation.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SaaS & LMS Platforms",
          description:
            "Custom SaaS products and Learning Management Systems (LMS) for education, business, and productivity—scalable, secure, and feature-rich.",
        },
      },
    ],
  },
};

// Structured Data for Visible Products & Software Applications
export const projectsStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "TourizBook",
    description:
      "A tourism-focused digital platform developed and owned by CodePhilic, designed to provide a modern experience for discovering destinations, attractions and travel-related services.",
    applicationCategory: "TravelApplication",
    operatingSystem: "Web",
    url: "https://tourizbook.com/",
    creator: {
      "@id": "https://codephilic.com/#organization",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Shahid Osman Hadi Hall Automation System (SOHH)",
    description:
      "A comprehensive hall management and dining automation system developed by CodePhilic for Shahid Osman Hadi Hall at Mawlana Bhashani Science and Technology University (MBSTU).",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://sohh.mbstu.ac.bd/",
    creator: {
      "@id": "https://codephilic.com/#organization",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "MBSTU Wheels Mobile App",
    description:
      "Official MBSTU Wheels mobile app for real-time GPS tracking of university transport with live location and route history.",
    applicationCategory: "MobileApplication",
    operatingSystem: ["Android", "iOS"],
    url: "https://play.google.com/store/search?q=mbstu+wheels&c=apps&hl=bn",
    creator: {
      "@id": "https://codephilic.com/#organization",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "MBSTU Wheels Web Platform",
    description:
      "Web-based transportation platform supporting live vehicle tracking, routes, and transportation operations for MBSTU.",
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    url: "https://transport.mbstu.ac.bd/MBSTU-Wheels/SignIn",
    creator: {
      "@id": "https://codephilic.com/#organization",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "CPSAA Alumni Platform",
    description:
      "Digital alumni platform for the Department of Computer Science and Engineering at MBSTU, supporting alumni information, communication and community engagement.",
    applicationCategory: "SocialNetworkingApplication",
    operatingSystem: "Web",
    url: "https://www.cpsaa.org/",
    creator: {
      "@id": "https://codephilic.com/#organization",
    },
  },
];

// Structured Data for Individual Team Members & Leadership
export const individualTeamStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Md. Rakibul Islam",
    jobTitle: "Leading Founder & CEO · Managing Director · Director",
    description:
      "Leading Founder, Chief Executive Officer (CEO), Managing Director & Director at CodePhilic Limited. Also oversees technology architecture as CTO and corporate strategy as CSO.",
    image: "https://codephilic.com/team/rakibx.jpg",
    url: "https://codephilic.com/#team",
    worksFor: {
      "@id": "https://codephilic.com/#organization",
    },
    sameAs: [
      "https://www.linkedin.com/in/rakibul-islam-8372852bb/",
      "https://github.com/rakibtkg",
    ],
    knowsAbout: [
      "Software Engineering",
      "System Architecture",
      "Executive Leadership",
      "Product Direction",
      "Full-Stack Web Development",
      "Cloud & AI Systems",
      "Corporate Strategy",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Druba Paul",
    alternateName: "Dhruba Paul",
    jobTitle: "Co-Founder & CMO · Director",
    description:
      "Co-Founder, Chief Marketing Officer (CMO) & Director at CodePhilic Limited. Drives marketing, brand operations, product roadmap (CPO), and revenue strategy (CRO).",
    image: "https://codephilic.com/team/dhrubax.jpg",
    url: "https://codephilic.com/#team",
    worksFor: {
      "@id": "https://codephilic.com/#organization",
    },
    sameAs: [
      "https://www.linkedin.com/in/dhruba-paul-69342b363/",
      "https://github.com/DHRUBA-NIRO",
    ],
    knowsAbout: [
      "Marketing Strategy",
      "Revenue Growth",
      "Brand Operations",
      "Product Management",
      "Business Development",
      "Market Expansion",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Iftekhar Alam Shuvo",
    jobTitle: "Co-Founder & CFO · Director",
    description:
      "Co-Founder, Chief Financial Officer (CFO) & Director at CodePhilic Limited. Oversees financial planning, corporate compliance, and advisory corporate strategy (CSO).",
    image: "https://codephilic.com/team/shuvox.jpg",
    url: "https://codephilic.com/#team",
    worksFor: {
      "@id": "https://codephilic.com/#organization",
    },
    sameAs: [
      "https://www.linkedin.com/in/iftekhar-alam-shuvo-4742842bb/",
      "https://github.com/SHUVOika",
    ],
    knowsAbout: [
      "Financial Management & Planning",
      "Corporate Compliance",
      "Strategic Growth",
      "Business Administration",
      "Resource Allocation",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Md. Habibur Rahman",
    jobTitle: "Co-Founder & COO · Director",
    description:
      "Co-Founder, Chief Operating Officer (COO) & Director at CodePhilic Limited. Directs company operations, business development, client partnerships (CBO), and technical advisory (Advisory CTO).",
    image: "https://codephilic.com/team/himaloyx.jpg",
    url: "https://codephilic.com/#team",
    worksFor: {
      "@id": "https://codephilic.com/#organization",
    },
    sameAs: [
      "https://www.linkedin.com/in/habib007/",
      "https://github.com/himaloy007",
    ],
    knowsAbout: [
      "Operations Management",
      "Business Development & Partnerships",
      "Software Delivery & Coordination",
      "Technical Advisory",
      "Full-Stack Engineering",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Dr. Md. Sazzad Hossain",
    jobTitle: "Advisor",
    description:
      "Professor, Department of Computer Science and Engineering (CSE), Mawlana Bhashani Science and Technology University (MBSTU). Advising CodePhilic on advanced technology, strategic development, and academic-industry alignment.",
    image: "https://codephilic.com/team/sazzad_1778071366_2186ca1d.jpeg",
    url: "https://codephilic.com/#team",
    affiliation: {
      "@type": "EducationalOrganization",
      name: "Mawlana Bhashani Science and Technology University (MBSTU)",
      url: "https://cse.mbstu.ac.bd/",
    },
    sameAs: [
      "https://cse.mbstu.ac.bd/teacher/dr-md-sazzad-hossain",
    ],
    knowsAbout: [
      "Computer Science and Engineering",
      "Technology Strategy",
      "Academic-Industry Collaboration",
    ],
  },
];

// FAQPage Structured Data for AI Assistants and Search Engines
export const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is CodePhilic Limited?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CodePhilic Limited is a Bangladesh-registered technology company building its own software products, scalable SaaS platforms and AI solutions, while developing custom digital systems for organizations, institutions and businesses.",
      },
    },
    {
      "@type": "Question",
      name: "Who are the founders and executive leaders of CodePhilic Limited?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CodePhilic Limited is led by its board of directors and founders: Md. Rakibul Islam (Leading Founder & CEO, Managing Director, Director), Druba Paul (Co-Founder & CMO, Director), Iftekhar Alam Shuvo (Co-Founder & CFO, Director), and Md. Habibur Rahman (Co-Founder & COO, Director). The company is advised by Dr. Md. Sazzad Hossain, Professor of Computer Science and Engineering at Mawlana Bhashani Science and Technology University (MBSTU).",
      },
    },
    {
      "@type": "Question",
      name: "What services does CodePhilic provide?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CodePhilic provides Web Architecture & Generic Products, Mobile Ecosystems (iOS & Android via Flutter), IoT Solutions, GPS Tracking Systems, AI-Based Web & App Solutions, and SaaS & LMS Platforms.",
      },
    },
    {
      "@type": "Question",
      name: "Where is CodePhilic located and operating?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CodePhilic Limited is headquartered in Santosh, Tangail, Bangladesh, serving institutional, corporate, and global startup clients across Bangladesh, the US, the UK, and internationally.",
      },
    },
    {
      "@type": "Question",
      name: "What products and software platforms has CodePhilic built?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CodePhilic's portfolio includes TourizBook (a tourism platform owned by CodePhilic), SOHH (Shahid Osman Hadi Hall automation system deployed at MBSTU), MBSTU Wheels Mobile and Web platforms for real-time university transit tracking, and the CPSAA Alumni Platform.",
      },
    },
    {
      "@type": "Question",
      name: "How can I contact CodePhilic Limited?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can reach CodePhilic via email at contact@codephilic.com, support@codephilic.com, or founders@codephilic.com. You can also contact the leadership team directly through the official website at https://codephilic.com/#contact.",
      },
    },
  ],
};

// Clean Company Info Export
export const companyInfo = {
  name: "CodePhilic Limited",
  tagline: "We Architect Imagination",
  description:
    "CodePhilic builds scalable SaaS and AI products while helping organizations transform their operations through custom digital systems.",
  website: "https://codephilic.com",
  logo: "https://codephilic.com/CodePhilic.jpg",
  email: "contact@codephilic.com",
  supportEmail: "support@codephilic.com",
  foundersEmail: "founders@codephilic.com",
  location: {
    street: "Santosh",
    city: "Tangail",
    region: "Dhaka Division",
    country: "Bangladesh",
    countryCode: "BD",
    postalCode: "1902",
  },
  founders: [
    "Md. Rakibul Islam",
    "Druba Paul",
    "Iftekhar Alam Shuvo",
    "Md. Habibur Rahman",
  ],
  leadership: [
    {
      name: "Md. Rakibul Islam",
      role: "Leading Founder & CEO · Managing Director · Director",
      executiveRoles: [
        "Leading Founder & CEO (Chief Executive Officer)",
        "Managing Director & Director",
        "CTO (Chief Technology Officer)",
        "CSO (Chief Strategy Officer)",
      ],
    },
    {
      name: "Druba Paul",
      role: "Co-Founder & CMO · Director",
      executiveRoles: [
        "Co-Founder & CMO (Chief Marketing Officer)",
        "Director",
        "CRO (Chief Revenue Officer)",
        "CPO (Chief Product Officer)",
      ],
    },
    {
      name: "Iftekhar Alam Shuvo",
      role: "Co-Founder & CFO · Director",
      executiveRoles: [
        "Co-Founder & CFO (Chief Financial Officer)",
        "Director",
        "Compliance & Finance Lead",
        "Advisory CSO (Strategy and Growth Lead)",
      ],
    },
    {
      name: "Md. Habibur Rahman",
      role: "Co-Founder & COO · Director",
      executiveRoles: [
        "Co-Founder & COO (Chief Operating Officer)",
        "Director",
        "CBO (Chief Business Officer)",
        "Advisory CTO",
      ],
    },
  ],
  advisor: "Dr. Md. Sazzad Hossain",
  industry: "Custom Software Development, SaaS Platforms & AI Solutions",
  specialties: [
    "Web Architecture & Generic Products",
    "Mobile Ecosystems",
    "IoT Solutions",
    "GPS Tracking Systems",
    "AI-Based Web & App Solutions",
    "SaaS & LMS Platforms",
  ],
  technologies: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Express",
    "Flutter",
    "Python",
    "PostgreSQL",
    "MongoDB",
    "Docker",
  ],
  socialLinks: {
    linkedin: "https://www.linkedin.com/company/codephilic-limited/",
    facebook: "https://www.facebook.com/share/1UyoDxc6iB/",
    github: "https://github.com/codephilic",
  },
};
