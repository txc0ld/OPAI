import { BUSINESS } from "@/lib/business";

type SchemaNode = Record<string, unknown>;

export function buildOrganization(): SchemaNode {
  return {
    "@type": "Organization",
    "@id": `${BUSINESS.url}/#organization`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: BUSINESS.url,
    email: BUSINESS.email,
    telephone: BUSINESS.telephone,
    taxID: BUSINESS.abn,
    description: BUSINESS.description,
    foundingDate: BUSINESS.founded,
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS.address.addressLocality,
      addressRegion: BUSINESS.address.addressRegion,
      addressCountry: BUSINESS.address.addressCountry,
    },
    sameAs: BUSINESS.sameAs,
  };
}

export function buildWebsite(): SchemaNode {
  return {
    "@type": "WebSite",
    "@id": `${BUSINESS.url}/#website`,
    name: BUSINESS.name,
    url: BUSINESS.url,
    inLanguage: "en-AU",
    publisher: { "@id": `${BUSINESS.url}/#organization` },
  };
}

export function buildLocalBusiness(): SchemaNode {
  // ProfessionalService is the correct LocalBusiness subtype for a consultancy.
  // No streetAddress: service-area business only.
  return {
    "@type": "ProfessionalService",
    "@id": `${BUSINESS.url}/#localbusiness`,
    name: BUSINESS.name,
    url: BUSINESS.url,
    email: BUSINESS.email,
    telephone: BUSINESS.telephone,
    description: BUSINESS.description,
    parentOrganization: { "@id": `${BUSINESS.url}/#organization` },
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS.address.addressLocality,
      addressRegion: BUSINESS.address.addressRegion,
      addressCountry: BUSINESS.address.addressCountry,
    },
    areaServed: BUSINESS.areaServed.map((a) => ({ "@type": "AdministrativeArea", name: a })),
    serviceType: [
      "AI integration services",
      "AI agent design and build",
      "Managed AI agent hosting",
      "AI training for business",
      "AI business audit",
    ],
  };
}

export type ServiceSchemaOptions = {
  name: string;
  url: string;
  description: string;
};

export function buildService({ name, url, description }: ServiceSchemaOptions): SchemaNode {
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    url,
    description,
    provider: { "@id": `${BUSINESS.url}/#organization` },
    areaServed: BUSINESS.areaServed.map((a) => ({ "@type": "AdministrativeArea", name: a })),
  };
}

export type FaqItem = { question: string; answer: string };

export function buildFaqPage(items: FaqItem[]): SchemaNode {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export type WebPageOptions = {
  url: string;
  title: string;
  description: string;
};

export function buildWebPage({ url, title, description }: WebPageOptions): SchemaNode {
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { "@id": `${BUSINESS.url}/#website` },
    inLanguage: "en-AU",
  };
}

export function wrapGraph(nodes: SchemaNode[]): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
