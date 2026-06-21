export const PRIMARY_NAV = [
  { href: "/how-it-works/", label: "How it works" },
  { href: "/articles/", label: "Articles" },
  { href: "/about/", label: "About" },
] as const;

// The primary CTA, rendered separately from PRIMARY_NAV in the header/footer.
export const CHECK_CTA = { href: "/check/", label: "Free AI Check" } as const;

export const FOOTER_LEGAL = [
  { href: "/legal/privacy/", label: "Privacy" },
  { href: "/legal/terms/", label: "Terms" },
] as const;
