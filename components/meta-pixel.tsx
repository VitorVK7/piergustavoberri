"use client"

import Script from "next/script"
import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export const META_PIXEL_ID = "1156587335967063"

// Extend window to include fbq
declare global {
  interface Window {
    fbq: (...args: unknown[]) => void
    _fbq: (...args: unknown[]) => void
  }
}

// Track page views
export function MetaPixelPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView")
    }
  }, [pathname, searchParams])

  return null
}

// Meta Pixel base script
export function MetaPixel() {
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
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}

// Helper functions to track events
export const trackEvent = (eventName: string, options?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, options)
  }
}

// Track Lead event (form submission)
export const trackLead = (data?: {
  content_name?: string
  content_category?: string
  value?: number
  currency?: string
}) => {
  trackEvent("Lead", {
    content_name: data?.content_name || "Formulário de Contato",
    content_category: data?.content_category || "Contato",
    value: data?.value || 0,
    currency: data?.currency || "BRL",
  })
}

// Track Contact event (WhatsApp click)
export const trackContact = (method?: string) => {
  trackEvent("Contact", {
    content_name: method || "WhatsApp",
  })
}

// Track ViewContent event (section views)
export const trackViewContent = (contentName: string, contentCategory?: string) => {
  trackEvent("ViewContent", {
    content_name: contentName,
    content_category: contentCategory || "Página",
  })
}

// Track InitiateCheckout (when user starts filling form)
export const trackInitiateContact = () => {
  trackEvent("InitiateCheckout", {
    content_name: "Início de Contato",
    content_category: "Formulário",
  })
}

// Track button clicks
export const trackButtonClick = (buttonName: string, location?: string) => {
  trackEvent("CustomEvent", {
    content_name: buttonName,
    content_category: location || "Botão",
  })
}
