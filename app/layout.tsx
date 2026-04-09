import type { Metadata } from "next";
import { Metadata as MetadataType } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import {
  metadata,
  viewport,
  organizationStructuredData,
  servicesStructuredData,
  projectsStructuredData,
  breadcrumbStructuredData,
  teamStructuredData,
  individualTeamStructuredData,
  faqStructuredData,
  webApplicationStructuredData,
  teamMembers,
} from "./metaData";

export { viewport };
export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Bing Search Engine Verification */}
        <meta name="msvalidate.01" content="A121669086E98BFFA9212E3622A5DC5D" />

        {/* Browser & Device Specific Meta Tags */}
        <meta name="theme-color" content="#3B82F6" />

        {/* Structured Data - Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
          suppressHydrationWarning
        />

        {/* Structured Data - Services Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(servicesStructuredData),
          }}
          suppressHydrationWarning
        />

        {/* Structured Data - Projects Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": projectsStructuredData,
            }),
          }}
          suppressHydrationWarning
        />

        {/* Structured Data - Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbStructuredData),
          }}
          suppressHydrationWarning
        />

        {/* Structured Data - Professional Service Organization (Optimized for AI/Gemini) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
          suppressHydrationWarning
        />

        {/* Structured Data - Individual Team Members */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": individualTeamStructuredData,
            }),
          }}
          suppressHydrationWarning
        />

        {/* Structured Data - FAQ Page (AI-Ready) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqStructuredData),
          }}
          suppressHydrationWarning
        />

        {/* Structured Data - Web Application */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webApplicationStructuredData),
          }}
          suppressHydrationWarning
        />

        {/* Additional SEO Meta Tags */}
        <meta
          name="google-site-verification"
          content="your-verification-code"
        />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="CodePhilic" />
        <meta
          name="copyright"
          content="© 2024 CodePhilic. All rights reserved."
        />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
