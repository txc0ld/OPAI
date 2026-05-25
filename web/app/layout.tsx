import type { Metadata } from "next";
import { JetBrains_Mono, Orbitron, Plus_Jakarta_Sans } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { ScrollReveal } from "@/components/scroll-reveal";
import { BUSINESS } from "@/lib/business";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
  weight: "900",
});

export const metadata: Metadata = {
  title: {
    default: "OperateAI | AI Agents, Automation & Training for Australian Businesses",
    template: "%s | OperateAI",
  },
  description: BUSINESS.description,
  metadataBase: new URL(BUSINESS.url),
  applicationName: BUSINESS.name,
  authors: [{ name: BUSINESS.name, url: BUSINESS.url }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  category: "AI consultancy",
  keywords: [
    "AI agents for business",
    "AI agents for small business",
    "AI automation for business",
    "AI integration services",
    "AI consultant Perth",
    "AI training for business",
    "AI agent hosting",
    "managed AI agents",
    "small business AI automation",
    "Perth AI consultant",
    "AI agents Perth",
  ],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: BUSINESS.url,
    siteName: BUSINESS.name,
    title: "OperateAI | AI Agents, Automation & Training for Australian Businesses",
    description: BUSINESS.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${BUSINESS.name}. ${BUSINESS.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OperateAI | AI Agents, Automation & Training for Australian Businesses",
    description: BUSINESS.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${jakarta.variable} ${mono.variable} ${orbitron.variable}`}>
      <body>
        <StructuredData />
        <ScrollReveal />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
