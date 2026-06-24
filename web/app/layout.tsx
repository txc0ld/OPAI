import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Analytics } from "@vercel/analytics/next";
import { BUSINESS } from "@/lib/business";
import "./globals.css";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
  // Eyebrow/label text only — never the LCP element. Skip preloading so it
  // doesn't compete for bandwidth with the Hanken file that paints the hero h1.
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "OperateAI | Get your local business found and recommended by AI",
    template: "%s | OperateAI",
  },
  description: BUSINESS.description,
  metadataBase: new URL(BUSINESS.url),
  applicationName: BUSINESS.name,
  authors: [{ name: BUSINESS.name, url: BUSINESS.url }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  category: "Local marketing for service businesses",
  keywords: [
    "get found by AI",
    "AI recommendations for local business",
    "Google Business Profile optimisation",
    "local business marketing Perth",
    "get recommended by ChatGPT",
    "AI search for local business",
    "answer engine optimisation Perth",
    "Perth small business marketing",
  ],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: BUSINESS.url,
    siteName: BUSINESS.name,
    title: "OperateAI | Get your local business found and recommended by AI",
    description: BUSINESS.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${BUSINESS.name}. ${BUSINESS.tagline}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OperateAI | Get your local business found and recommended by AI",
    description: BUSINESS.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0e0e",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${hanken.variable} ${mono.variable}`}>
      <body>
        <StructuredData />
        <ScrollReveal />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
