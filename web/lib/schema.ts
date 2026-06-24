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
    ...(BUSINESS.telephone ? { telephone: BUSINESS.telephone } : {}),
    taxID: BUSINESS.abn,
    description: BUSINESS.description,
    foundingDate: BUSINESS.founded,
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS.address.addressLocality,
      addressRegion: BUSINESS.address.addressRegion,
      addressCountry: BUSINESS.address.addressCountry,
    },
    ...(BUSINESS.sameAs.length > 0 ? { sameAs: BUSINESS.sameAs } : {}),
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
    ...(BUSINESS.telephone ? { telephone: BUSINESS.telephone } : {}),
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
      "Google Business Profile optimisation",
      "AI search visibility for local business",
      "Local SEO for Perth business",
      "Online reviews setup",
    ],
  };
}

export type ServiceOffer = {
  name: string;
  price: number; // AUD
  recurring?: boolean; // true = per-month subscription
};

export type ServiceSchemaOptions = {
  name: string;
  url: string;
  description: string;
  offers?: ServiceOffer[];
  areaServedName?: string; // single AdministrativeArea (e.g. a suburb); falls back to BUSINESS.areaServed
};

export function buildService({ name, url, description, offers, areaServedName }: ServiceSchemaOptions): SchemaNode {
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    url,
    description,
    provider: { "@id": `${BUSINESS.url}/#organization` },
    areaServed: areaServedName
      ? [{ "@type": "AdministrativeArea", name: areaServedName }]
      : BUSINESS.areaServed.map((a) => ({ "@type": "AdministrativeArea", name: a })),
    ...(offers && offers.length
      ? {
          offers: offers.map((o) => ({
            "@type": "Offer",
            name: o.name,
            price: String(o.price),
            priceCurrency: "AUD",
            availability: "https://schema.org/InStock",
            url,
            ...(o.recurring
              ? {
                  priceSpecification: {
                    "@type": "UnitPriceSpecification",
                    price: String(o.price),
                    priceCurrency: "AUD",
                    unitText: "MONTH",
                  },
                }
              : {}),
          })),
        }
      : {}),
  };
}

export type HowToStep = { name: string; text: string };

export function buildHowTo({
  name,
  description,
  url,
  steps,
}: {
  name: string;
  description: string;
  url: string;
  steps: HowToStep[];
}): SchemaNode {
  return {
    "@type": "HowTo",
    "@id": `${url}#howto`,
    name,
    description,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
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

export type ArticleSchemaOptions = {
  url: string;
  title: string;
  description: string;
  date: string;
  author: string;
};

export function buildArticle({ url, title, description, date, author }: ArticleSchemaOptions): SchemaNode {
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: title,
    description,
    datePublished: date,
    author: { "@type": "Person", name: author },
    publisher: { "@id": `${BUSINESS.url}/#organization` },
    mainEntityOfPage: url,
    inLanguage: "en-AU",
  };
}

export type BreadcrumbItem = { name: string; url: string };

export function buildBreadcrumb(items: BreadcrumbItem[]): SchemaNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildItemList(items: { name: string; url: string }[]): SchemaNode {
  return {
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: it.url,
    })),
  };
}

export function wrapGraph(nodes: SchemaNode[]): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
