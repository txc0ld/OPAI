import Script from "next/script";

// GA4 (gtag.js). Public measurement ID — fine to ship in client HTML.
// Override per-environment with NEXT_PUBLIC_GA_ID; defaults to the live property.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-BLDLL6TJL4";

export function GoogleAnalytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
