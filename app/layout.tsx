import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import {
  metadata,
  viewport,
  organizationStructuredData,
  websiteStructuredData,
  servicesStructuredData,
  projectsStructuredData,
  individualTeamStructuredData,
  faqStructuredData,
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
        {/* Structured Data - Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
          suppressHydrationWarning
        />

        {/* Structured Data - WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
          suppressHydrationWarning
        />

        {/* Structured Data - Services Schema (OfferCatalog) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(servicesStructuredData),
          }}
          suppressHydrationWarning
        />

        {/* Structured Data - Software Applications & Projects Schema */}
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

        {/* Structured Data - Team Members & Leadership (Person) */}
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

        {/* Structured Data - FAQ Page (Search & AI-Ready) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqStructuredData),
          }}
          suppressHydrationWarning
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
