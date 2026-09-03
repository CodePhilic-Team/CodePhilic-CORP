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
      "en-GB": "https://code-philic.com",
      en: "https://codephilic.com",
    },
  },
  title: "CodePhilic | We Architect Imagination",
  description:
    "CodePhilic builds scalable SaaS and AI products while helping organizations transform their operations through custom digital systems.",

  // Keywords for SEO - Focused primary and secondary keywords
  keywords: [
    // Primary Keywords (Core Offerings)
    "custom software development agency",
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
    "YC-experienced software developers",

    // Supporting Keywords
    "software development",
    "custom software",
    "web development agency",
    "mobile app development",
    "fullstack development",
    "React development",
    "React JS",
    "Next.js development",
    "Node.js backend",
    "Python development",
    "AI software",
    "CodePhilic",
    "software engineering",
    "enterprise software",
    "digital transformation",
    "web applications",
    "system architecture",
    "scalable applications",
    "secure software solutions",
    "software development services",
  ],

  // Open Graph metadata for social sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codephilic.com",
    siteName: "CodePhilic",
    title: "CodePhilic | We Architect Imagination",
    description:
      "CodePhilic builds scalable SaaS and AI products while helping organizations transform their operations through custom digital systems.",
    images: [
      {
        url: "https://www.codephilic.com/CodePhilic.jpg",
        width: 1200,
        height: 630,
        alt: "CodePhilic - Custom Software & AI Development Agency",
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
    images: ["https://www.codephilic.com/CodePhilic.jpg"],
    creator: "@codephilic",
    site: "@codephilic",
  },

  // Additional SEO metadata
  authors: [{ name: "Rakibul Islam", url: "https://codephilic.com" }],
  creator: "CodePhilic",
  publisher: "CodePhilic",
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

  // Verification codes
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
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
    icon: { url: "/CodePhilic.jpg", type: "image/jpeg" },
    other: [
      {
        rel: "mask-icon",
        url: "/CodePhilic.jpg",
        color: "#3B82F6",
      },
    ],
  },
};

// Structured Data for Organization - Enhanced with Founder Information
export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "CodePhilic",
  url: "https://codephilic.com",
  logo: "https://codephilic.com/CodePhilic.jpg",
  image: "https://codephilic.com/og-image.jpg",
  description:
    "CodePhilic builds scalable SaaS and AI products while helping organizations transform their operations through custom digital systems.",
  knowsAbout: [
    "Software Development",
    "Web Applications",
    "Mobile Apps",
    "AI Integration",
    "Full-Stack Development",
    "React JS",
    "Next.js",
    "Node.js",
    "Python",
    "System Architecture",
  ],
  founder: [
    {
      "@type": "Person",
      name: "Md. Rakibul Islam",
      jobTitle: "Leading Founder & CEO · Managing Director · Director",
      description:
        "Primary responsibilities include:\n• Company leadership\n• Technology and product direction\n• Engineering\n• Business strategy\n• Overall operations",
      sameAs: [
        "https://www.linkedin.com/in/rakibul-islam-8372852bb/",
        "https://github.com/rakibtkg",
      ],
    },
    {
      "@type": "Person",
      name: "Dhruba",
      jobTitle: "Co-Founder & CMO · Director",
      description:
        "Primary responsibilities include:\n• Marketing\n• Brand strategy\n• Growth\n• Business development\n• Product and company operations",
      sameAs: [
        "https://www.linkedin.com/in/dhruba-paul-69342b363/",
        "https://github.com/DHRUBA-NIRO",
      ],
    },
    {
      "@type": "Person",
      name: "Shuvo",
      jobTitle: "Co-Founder & CFO · Director",
      description:
        "Primary responsibilities include:\n• Finance\n• Financial planning\n• Business operations\n• Administration\n• Product development",
      sameAs: [
        "https://www.linkedin.com/in/iftekhar-alam-shuvo-4742842bb/",
        "https://github.com/SHUVOika",
      ],
    },
    {
      "@type": "Person",
      name: "Habib",
      jobTitle: "Co-Founder & COO · Director",
      description:
        "Primary responsibilities include:\n• Operations\n• Project coordination\n• Process management\n• Delivery\n• Product development",
      sameAs: [
        "https://www.linkedin.com/in/habib007/",
        "https://github.com/himaloy007",
      ],
    },
  ],
  sameAs: [
    "https://code-philic.com",
    "https://www.linkedin.com/company/codephilic-limited/",
    "https://www.facebook.com/share/1UyoDxc6iB/",
    "https://github.com/codephilic",
  ],
};

// Structured Data for Services
export const servicesStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "CodePhilic",
  url: "https://codephilic.com",
  hasOfferingDescription: [
    {
      "@type": "OfferingDescription",
      name: "Web Development",
      description:
        "Modern web applications using Next.js, React, JavaScript, TypeScript, and Node.js backend",
    },
    {
      "@type": "OfferingDescription",
      name: "Mobile Development",
      description:
        "Native and cross-platform mobile apps using Flutter, React Native, iOS, and Android",
    },
    {
      "@type": "OfferingDescription",
      name: "Full-Stack Solutions",
      description:
        "Complete end-to-end development from frontend UI/UX design to backend, databases, and cloud deployment",
    },
    {
      "@type": "OfferingDescription",
      name: "AI & Machine Learning",
      description:
        "AI-powered software solutions, ChatGPT integration, LLM APIs, natural language processing, and generative AI",
    },
    {
      "@type": "OfferingDescription",
      name: "SaaS Development",
      description:
        "Scalable Software-as-a-Service platforms with microservices architecture and cloud infrastructure",
    },
    {
      "@type": "OfferingDescription",
      name: "Enterprise Software",
      description:
        "Custom enterprise solutions, system design, software architecture, and digital transformation",
    },
    {
      "@type": "OfferingDescription",
      name: "DevOps & Cloud Solutions",
      description:
        "Docker, Kubernetes, AWS, Azure, Google Cloud, CI/CD pipelines, and cloud infrastructure management",
    },
    {
      "@type": "OfferingDescription",
      name: "Backend Development",
      description:
        "Node.js, Python, Java, C#, C++, PHP backend systems, API development, REST, GraphQL, and database design",
    },
    {
      "@type": "OfferingDescription",
      name: "Progressive Web Apps",
      description:
        "PWA development, single-page applications (SPA), server-side rendering, and static site generation",
    },
    {
      "@type": "OfferingDescription",
      name: "Tech Consulting",
      description:
        "Software consulting, architecture design, Agile methodology, best practices, and technology strategy",
    },
  ],
};

// Structured Data for Projects
export const projectsStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "MBSTU WHEELs Mobile APP",
    description:
      "Official MBSTU Wheels mobile app for real-time GPS tracking of university transport with live location and route history",
    applicationCategory: "MobileApplication",
    operatingSystem: ["Android", "iOS"],
    url: "https://play.google.com/store/search?q=mbstu+wheels&c=apps",
    creator: {
      "@type": "Organization",
      name: "CodePhilic",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "MBSTU WHEELS WEB APP",
    description:
      "Web dashboard for MBSTU Wheels with live bus tracking, route analytics, and admin controls",
    applicationCategory: "WebApplication",
    url: "https://transport.mbstu.ac.bd/MBSTU-Wheels",
    creator: {
      "@type": "Organization",
      name: "CodePhilic",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MBSTU Transport Website",
    description:
      "Official website for MBSTU transport with schedules, routes, and transport news",
    url: "https://transport.mbstu.ac.bd/",
    creator: {
      "@type": "Organization",
      name: "CodePhilic",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CPS DEPT ALUMNI WEBSITE",
    description:
      "Alumni portal for the Department of CPS with member directory, events, and news",
    url: "https://cpsaa.org/",
    creator: {
      "@type": "Organization",
      name: "CodePhilic",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TourizBook Tourism Website",
    description:
      "Comprehensive tourism website promoting local attractions and travel experiences",
    url: "https://tourphilia.codephilic.com/",
    creator: {
      "@type": "Organization",
      name: "CodePhilic",
    },
  },
];

// Structured Data for BreadcrumbList
export const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://codephilic.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: "https://codephilic.com#services",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Projects",
      item: "https://codephilic.com#work",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Team",
      item: "https://codephilic.com#team",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Contact",
      item: "https://codephilic.com#contact",
    },
  ],
};

// Team Members Data
export const teamMembers = [
  {
    name: "Md. Rakibul Islam",
    role: "Leading Founder & CEO · Managing Director · Director",
    bio: "Primary responsibilities include:\n• Company leadership\n• Technology and product direction\n• Engineering\n• Business strategy\n• Overall operations",
    image: "https://codephilic.com/team/rakibx.jpg",
    linkedin: "https://www.linkedin.com/in/rakibul-islam-8372852bb/",
    github: "https://github.com/rakibtkg",
    email: "rakibul@codephilic.com",
    phone: "+8801812049163",
  },
  {
    name: "Dhruba",
    role: "Co-Founder & CMO · Director",
    bio: "Primary responsibilities include:\n• Marketing\n• Brand strategy\n• Growth\n• Business development\n• Product and company operations",
    image: "https://codephilic.com/team/dhrubax.jpg",
    linkedin: "https://www.linkedin.com/in/dhruba-paul-69342b363/",
    github: "https://github.com/DHRUBA-NIRO",
    email: "dhruba@codephilic.com",
    phone: "+8801765848893",
  },
  {
    name: "Shuvo",
    role: "Co-Founder & CFO · Director",
    bio: "Primary responsibilities include:\n• Finance\n• Financial planning\n• Business operations\n• Administration\n• Product development",
    image: "https://codephilic.com/team/shuvox.jpg",
    linkedin: "https://www.linkedin.com/in/iftekhar-alam-shuvo-4742842bb/",
    github: "https://github.com/SHUVOika",
    email: "shuvo@codephilic.com",
    phone: "+8801777990263",
  },
  {
    name: "Habib",
    role: "Co-Founder & COO · Director",
    bio: "Primary responsibilities include:\n• Operations\n• Project coordination\n• Process management\n• Delivery\n• Product development",
    image: "https://codephilic.com/team/himaloyx.jpg",
    linkedin: "https://www.linkedin.com/in/habib007/",
    github: "https://github.com/himaloy007",
    email: "habib@codephilic.com",
    phone: "+880172889798",
  },
];

// Structured Data for Team Members
export const teamStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CodePhilic",
  url: "https://codephilic.com",
  logo: "https://codephilic.com/CodePhilic.jpg",
  description: "Premium software development agency",
  founders: teamMembers.map((member) => ({
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    description: member.bio,
    image: member.image,
    sameAs: [member.linkedin, member.github].filter(Boolean),
    email: member.email,
    telephone: member.phone,
  })),
};

// Structured Data for Individual Team Members
export const individualTeamStructuredData = teamMembers.map((member) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: member.name,
  jobTitle: member.role,
  description: member.bio,
  image: member.image,
  url: "https://codephilic.com#team",
  affiliation: {
    "@type": "Organization",
    name: "CodePhilic",
    url: "https://codephilic.com",
  },
  sameAs: [member.linkedin, member.github].filter(Boolean),
  email: member.email,
  telephone: member.phone,
  knowsAbout: [
    "Software Development",
    "Web Development",
    "Mobile Development",
    "Full-Stack Engineering",
    "System Architecture",
    "UI/UX Design",
  ],
}));

// FAQPage Structured Data for AI Assistants
export const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What services does CodePhilic offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CodePhilic offers comprehensive software development services including web development, mobile app development, full-stack solutions, SaaS development, and digital transformation consulting. We specialize in Next.js, React, Flutter, and custom enterprise solutions.",
      },
    },
    {
      "@type": "Question",
      name: "What is CodePhilic's expertise?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CodePhilic specializes in building scalable, secure, and innovative software solutions. Our team has expertise in full-stack development, cloud architecture, UI/UX design, and enterprise software systems.",
      },
    },
    {
      "@type": "Question",
      name: "How can I contact CodePhilic?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can reach CodePhilic via email at contact@codephilic.com, by phone at +8801812049163, +880172889798, +8801765848893, +8801777990263, or through our contact page on our website at https://codephilic.com#contact",
      },
    },
  ],
};

// WebApplication Schema for AI Understanding
export const webApplicationStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "CodePhilic Portfolio",
  url: "https://codephilic.com",
  applicationCategory: "WebApplication",
  description:
    "CodePhilic builds scalable SaaS and AI products while helping organizations transform their operations through custom digital systems.",
  creator: {
    "@type": "Organization",
    name: "CodePhilic",
    url: "https://codephilic.com",
  },
  offers: [
    {
      "@type": "Offer",
      name: "Web Development Services",
      description: "Custom web applications using modern technologies",
      url: "https://codephilic.com#services",
    },
    {
      "@type": "Offer",
      name: "Mobile Development Services",
      description: "Native and cross-platform mobile applications",
      url: "https://codephilic.com#services",
    },
    {
      "@type": "Offer",
      name: "Full-Stack Development",
      description: "End-to-end application development services",
      url: "https://codephilic.com#services",
    },
  ],
};

// AI-Ready Company Information Export
export const companyInfo = {
  name: "CodePhilic",
  tagline: "We Architect Imagination",
  description:
    "CodePhilic builds scalable SaaS and AI products while helping organizations transform their operations through custom digital systems.",
  website: "https://codephilic.com",
  logo: "https://codephilic.com/CodePhilic.jpg",
  email: "contact@codephilic.com",
  phone: [
    "+8801812049163",
    "+880172889798",
    "+8801765848893",
    "+8801777990263"
  ],
  location: {
    street: "Santosh",
    city: "Tangail",
    region: "Tangail",
    country: "Bangladesh",
    countryCode: "BD",
  },
  founders: [
    "Md. Rakibul Islam",
    "Dhruba",
    "Shuvo",
    "Habib"
  ],
  established: 2026,
  industry: "Custom Software Development, AI Solutions & IT Consulting",
  specialties: [
    "Web Development",
    "Mobile App Development",
    "Full-Stack Solutions",
    "SaaS Development",
    "Digital Transformation",
    "Cloud Solutions",
    "UI/UX Design",
    "AI Integration",
    "ChatGPT Integration",
  ],
  technologies: [
    "Next.js",
    "React",
    "Flutter",
    "Node.js",
    "TypeScript",
    "Express",
    "PostgreSQL",
    "MongoDB",
    "AWS",
    "Azure",
    "OpenAI API",
    "ChatGPT",
    "Claude",
    "Gemini",
    "Docker",
    "Kubernetes",
  ],
  socialLinks: {
    linkedin: "https://www.linkedin.com/company/codephilic-limited/",
    twitter: "https://twitter.com/codephilic",
    facebook: "https://www.facebook.com/share/1UyoDxc6iB/",
    github: "https://github.com/codephilic",
    youtube: "https://www.youtube.com/codephilic",
  },
  servicesAreas: ["Bangladesh", "USA", "UK", "Global"],
  aiAssistantSupport: [
    "ChatGPT",
    "GPT-4",
    "Claude",
    "Gemini",
    "Google Bard",
    "Microsoft Copilot",
    "Perplexity AI",
    "Apple Siri",
    "OpenAI Assistant",
    "Meta Llama",
  ],
};

// Complete HTML Head Code Block (as reference)
export const completeHeadHTML = `<!-- Primary Meta Tags -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
<meta name="description" content="CodePhilic builds scalable SaaS and AI products while helping organizations transform their operations through custom digital systems.">
<meta name="keywords" content="software development, web development, mobile development, Next.js, React, Flutter, full-stack development, digital transformation, SaaS development">
<meta name="author" content="Rakibul Islam, CodePhilic">
<meta name="creator" content="CodePhilic">
<meta name="publisher" content="CodePhilic">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
<meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
<meta name="google-site-verification" content="your-google-site-verification-code">
<meta name="revisit-after" content="7 days">
<meta name="copyright" content="© 2024 CodePhilic. All rights reserved.">
<meta name="theme-color" content="#000000">
<meta name="color-scheme" content="dark light">

<!-- Canonical URL -->
<link rel="canonical" href="https://codephilic.com">

<!-- Open Graph Tags (Facebook, LinkedIn, etc.) -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://codephilic.com">
<meta property="og:title" content="CodePhilic | We Architect Imagination">
<meta property="og:description" content="CodePhilic builds scalable SaaS and AI products while helping organizations transform their operations through custom digital systems.">
<meta property="og:image" content="https://codephilic.com/assets/images/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:site_name" content="CodePhilic">
<meta property="og:locale" content="en_US">

<!-- Twitter Card Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="https://codephilic.com">
<meta name="twitter:title" content="CodePhilic | We Architect Imagination">
<meta name="twitter:description" content="CodePhilic builds scalable SaaS and AI products while helping organizations transform their operations through custom digital systems.">
<meta name="twitter:image" content="https://codephilic.com/assets/images/twitter-image.jpg">
<meta name="twitter:creator" content="@codephilic">
<meta name="twitter:site" content="@codephilic">

<!-- Preconnect -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- JSON-LD Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CodePhilic",
  "url": "https://codephilic.com",
  "logo": "https://codephilic.com/CodePhilic.jpg",
  "description": "CodePhilic builds scalable SaaS and AI products while helping organizations transform their operations through custom digital systems.",
  "foundingDate": "2023",
  "founder": [
    {
      "@type": "Person",
      "name": "Md. Rakibul Islam",
      "jobTitle": "Leading Founder & CEO · Managing Director · Director"
    },
    {
      "@type": "Person",
      "name": "Dhruba",
      "jobTitle": "Co-Founder & CMO · Director"
    },
    {
      "@type": "Person",
      "name": "Shuvo",
      "jobTitle": "Co-Founder & CFO · Director"
    },
    {
      "@type": "Person",
      "name": "Habib",
      "jobTitle": "Co-Founder & COO · Director"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Santosh",
    "addressLocality": "Tangail",
    "addressRegion": "Tangail",
    "postalCode": "",
    "addressCountry": "BD"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "contactType": "Business Development",
      "telephone": [
        "+8801812049163",
        "+880172889798",
        "+8801765848893",
        "+8801777990263"
      ],
      "email": "contact@codephilic.com",
      "areaServed": "World",
      "availableLanguage": ["en", "bn"]
    }
  ],
  "sameAs": [
    "https://code-philic.com",
    "https://www.linkedin.com/company/codephilic-limited/",
    "https://twitter.com/codephilic",
    "https://www.facebook.com/share/1UyoDxc6iB/",
    "https://github.com/codephilic"
  ]
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What services does CodePhilic offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CodePhilic offers comprehensive software development services including web development, mobile app development, full-stack solutions, SaaS development, and digital transformation consulting. We specialize in Next.js, React, Flutter, and custom enterprise solutions."
      }
    },
    {
      "@type": "Question",
      "name": "What is CodePhilic's expertise?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CodePhilic specializes in building scalable, secure, and innovative software solutions. Our team has expertise in full-stack development, cloud architecture, UI/UX design, and enterprise software systems."
      }
    },
    {
      "@type": "Question",
      "name": "How can I contact CodePhilic?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can reach CodePhilic via email at contact@codephilic.com, by phone at +8801812049163, +880172889798, +8801765848893, +8801777990263, or through our contact page on our website at https://codephilic.com#contact"
      }
    }
  ]
}
</script>

<!-- Title Tag (Critical for SEO) -->
<title>CodePhilic | We Architect Imagination</title>`;
