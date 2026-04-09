import { MetadataRoute } from "next";

/**
 * Dynamic Sitemap Generator for Next.js 13+
 *
 * This file automatically generates a sitemap.xml from your pages.
 * Place this file at: app/sitemap.ts
 *
 * It will be accessible at: https://code-philic.com/sitemap.xml
 *
 * The framework automatically handles:
 * - XML formatting
 * - Last modification dates
 * - Sitemap validation
 * - Gzip compression
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://code-philic.com";
  const currentDate = new Date().toISOString().split("T")[0];

  // ========== PRIMARY PAGES ==========
  const primaryPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  // ========== SERVICE PAGES ==========
  const services = [
    {
      slug: "nextjs-development",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      slug: "react-development",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      slug: "flutter-development",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      slug: "mobile-development",
      priority: 0.88,
      changeFrequency: "monthly" as const,
    },
    {
      slug: "nodejs-development",
      priority: 0.88,
      changeFrequency: "monthly" as const,
    },
    {
      slug: "python-development",
      priority: 0.88,
      changeFrequency: "monthly" as const,
    },
    {
      slug: "ai-chatgpt-integration",
      priority: 0.92,
      changeFrequency: "weekly" as const,
    },
    {
      slug: "fullstack-development",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      slug: "saas-development",
      priority: 0.88,
      changeFrequency: "monthly" as const,
    },
    {
      slug: "devops-cloud-solutions",
      priority: 0.85,
      changeFrequency: "monthly" as const,
    },
    {
      slug: "enterprise-software",
      priority: 0.85,
      changeFrequency: "monthly" as const,
    },
    {
      slug: "digital-transformation",
      priority: 0.83,
      changeFrequency: "monthly" as const,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: currentDate,
    changeFrequency: service.changeFrequency,
    priority: service.priority,
  }));

  // ========== SECONDARY PAGES ==========
  const secondaryPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // ========== PORTFOLIO PROJECTS ==========
  const portfolioProjects = [
    {
      slug: "mbstu-wheels-mobile",
      priority: 0.85,
    },
    {
      slug: "mbstu-wheels-web",
      priority: 0.85,
    },
    {
      slug: "mbstu-transport-website",
      priority: 0.84,
    },
    {
      slug: "cps-alumni-website",
      priority: 0.84,
    },
    {
      slug: "tourphilia-website",
      priority: 0.84,
    },
  ];

  const portfolioPages: MetadataRoute.Sitemap = portfolioProjects.map(
    (project) => ({
      url: `${baseUrl}/portfolio/${project.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: project.priority,
    }),
  );

  // ========== BLOG CATEGORIES ==========
  const blogCategories = [
    { slug: "web-development", priority: 0.75 },
    { slug: "mobile-development", priority: 0.75 },
    { slug: "ai-integration", priority: 0.78 },
    { slug: "devops", priority: 0.74 },
    { slug: "software-architecture", priority: 0.75 },
    { slug: "tech-trends", priority: 0.72 },
  ];

  const blogCategoryPages: MetadataRoute.Sitemap = blogCategories.map(
    (category) => ({
      url: `${baseUrl}/blog/category/${category.slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: category.priority,
    }),
  );

  // ========== SAMPLE BLOG POSTS ==========
  // In production, fetch these from your database or CMS
  const blogPosts = [
    {
      slug: "nextjs-chatgpt-integration-guide",
      date: currentDate,
      priority: 0.75,
    },
    {
      slug: "react-vs-nextjs-complete-comparison",
      date: currentDate,
      priority: 0.75,
    },
    {
      slug: "fullstack-development-nodejs-react",
      date: currentDate,
      priority: 0.74,
    },
    {
      slug: "chatgpt-api-integration-production",
      date: currentDate,
      priority: 0.78,
    },
    {
      slug: "llm-integration-patterns",
      date: currentDate,
      priority: 0.77,
    },
    {
      slug: "ai-chatbot-development-guide",
      date: currentDate,
      priority: 0.76,
    },
    {
      slug: "flutter-vs-react-native-2024",
      date: currentDate,
      priority: 0.74,
    },
    {
      slug: "flutter-best-practices",
      date: currentDate,
      priority: 0.73,
    },
    {
      slug: "nodejs-backend-best-practices",
      date: currentDate,
      priority: 0.73,
    },
    {
      slug: "docker-kubernetes-complete-guide",
      date: currentDate,
      priority: 0.73,
    },
    {
      slug: "devops-best-practices-2026",
      date: currentDate,
      priority: 0.72,
    },
    {
      slug: "microservices-architecture-guide",
      date: currentDate,
      priority: 0.73,
    },
    {
      slug: "saas-architecture-patterns",
      date: currentDate,
      priority: 0.72,
    },
    {
      slug: "web3-blockchain-development",
      date: currentDate,
      priority: 0.7,
    },
  ];

  const blogPostPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: post.priority,
  }));

  // ========== RESOURCE PAGES ==========
  const resourcePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/resources/guides`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${baseUrl}/resources/tutorials`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${baseUrl}/resources/case-studies`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // ========== LEGAL & FOOTER PAGES ==========
  const legalPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.25,
    },
  ];

  // ========== COMBINE ALL PAGES ==========
  return [
    ...primaryPages,
    ...secondaryPages,
    ...servicePages,
    ...portfolioPages,
    ...blogCategoryPages,
    ...blogPostPages,
    ...resourcePages,
    ...legalPages,
  ];
}

/**
 * HOW TO USE THIS FILE:
 *
 * 1. Place this file at: app/sitemap.ts
 *
 * 2. Next.js will automatically:
 *    - Generate sitemap.xml at /sitemap.xml
 *    - Transform this TypeScript into valid XML
 *    - Set proper HTTP headers
 *    - Gzip compress the response
 *
 * 3. The sitemap will be accessible at:
 *    https://code-philic.com/sitemap.xml
 *
 * 4. To add dynamic blog posts, fetch from database:
 *    ```
 *    const blogPosts = await getPosts();
 *    const blogPostPages = blogPosts.map(post => ({
 *      url: `${baseUrl}/blog/${post.slug}`,
 *      lastModified: post.updatedAt,
 *      changeFrequency: 'monthly',
 *      priority: 0.73,
 *    }));
 *    ```
 *
 * 5. For large sites (1000+ URLs), create multiple sitemaps:
 *    - sitemap_blog.ts
 *    - sitemap_portfolio.ts
 *    - sitemap_services.ts
 *
 * 6. Use sitemap index at app/sitemap.ts for multiple sitemaps:
 *    ```typescript
 *    export default function sitemap(): MetadataRoute.Sitemap {
 *      return [
 *        { url: 'https://code-philic.com/sitemap_services.xml' },
 *        { url: 'https://code-philic.com/sitemap_blog.xml' },
 *        { url: 'https://code-philic.com/sitemap_portfolio.xml' },
 *      ];
 *    }
 *    ```
 */
