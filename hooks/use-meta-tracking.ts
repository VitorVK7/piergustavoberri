"use client"

import { useCallback } from "react"
import { trackLead, trackContact, trackInitiateContact } from "@/components/meta-pixel"

// Get Facebook cookies
function getFbCookies() {
  if (typeof document === "undefined") return { fbp: "", fbc: "" }
  
  const cookies = document.cookie.split(";").reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split("=")
    acc[key] = value
    return acc
  }, {} as Record<string, string>)

  return {
    fbp: cookies["_fbp"] || "",
    fbc: cookies["_fbc"] || "",
  }
}

// Send event to server-side API
async function sendServerEvent(data: {
  eventName: string
  email?: string
  phone?: string
  name?: string
  contentName?: string
  contentCategory?: string
  value?: number
}) {
  try {
    const { fbp, fbc } = getFbCookies()
    
    await fetch("/api/meta-conversions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        sourceUrl: window.location.href,
        fbp,
        fbc,
      }),
    })
  } catch (error) {
    console.error("[Meta Tracking] Server event error:", error)
  }
}

export function useMetaTracking() {
  // Track form submission (Lead)
  const trackFormSubmit = useCallback(async (formData: {
    name?: string
    email?: string
    phone?: string
    subject?: string
  }) => {
    // Client-side tracking
    trackLead({
      content_name: formData.subject || "Formulário de Contato",
      content_category: "Lead",
    })

    // Server-side tracking (API de Conversões)
    await sendServerEvent({
      eventName: "Lead",
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      contentName: formData.subject || "Formulário de Contato",
      contentCategory: "Lead",
    })
  }, [])

  // Track WhatsApp click
  const trackWhatsAppClick = useCallback(async () => {
    // Client-side tracking
    trackContact("WhatsApp")

    // Server-side tracking
    await sendServerEvent({
      eventName: "Contact",
      contentName: "WhatsApp",
      contentCategory: "Contato",
    })
  }, [])

  // Track form focus (user starts filling)
  const trackFormFocus = useCallback(() => {
    trackInitiateContact()
  }, [])

  // Track CTA button clicks
  const trackCtaClick = useCallback(async (buttonName: string) => {
    await sendServerEvent({
      eventName: "CustomEvent",
      contentName: buttonName,
      contentCategory: "CTA",
    })
  }, [])

  return {
    trackFormSubmit,
    trackWhatsAppClick,
    trackFormFocus,
    trackCtaClick,
  }
}
