"use client";

import Script from "next/script";
import { useEffect } from "react";
import { track } from "@/lib/analytics";
import { captureAttribution } from "@/lib/attribution";

// Same container and property as the main site (one GTM and one GA4 load per page, as there).
const GA4 = process.env.NEXT_PUBLIC_GA4_ID ?? "G-MNM7Y974JB";
const GTM = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-MDFSNH4H";
const ID_RE = /^[A-Za-z0-9-]+$/;

/** Loads GTM and GA4 (IDs default to the main site's). The Meta Pixel base code is in the root layout <head>. */
export function Analytics() {
  useEffect(() => {
    captureAttribution();
    track("PageView");
  }, []);

  return (
    <>
      {GTM && ID_RE.test(GTM) && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM}');`}
        </Script>
      )}
      {GA4 && ID_RE.test(GA4) && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA4}');`}
          </Script>
        </>
      )}
    </>
  );
}
