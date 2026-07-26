"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

const FACEBOOK_PIXEL_IDS = ["601198065432718", "1788643449163395"];

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function FacebookPixel() {
  const pathname = usePathname();

  useEffect(() => {
    window.fbq?.("track", "PageView");
  }, [pathname]);

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
${FACEBOOK_PIXEL_IDS.map((pixelId) => `fbq('init', '${pixelId}');`).join("\n")}
          `,
        }}
      />
      {FACEBOOK_PIXEL_IDS.map((pixelId) => (
        <noscript key={pixelId}>
          <img
            alt=""
            height="1"
            src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
            style={{ display: "none" }}
            width="1"
          />
        </noscript>
      ))}
    </>
  );
}
