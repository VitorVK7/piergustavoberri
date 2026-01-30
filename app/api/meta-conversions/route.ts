import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const PIXEL_ID = "1156587335967063"
const ACCESS_TOKEN = process.env.META_CONVERSIONS_API_TOKEN || ""

// Hash function for user data (required by Meta)
function hashData(data: string): string {
  return crypto.createHash("sha256").update(data.toLowerCase().trim()).digest("hex")
}

interface EventData {
  event_name: string
  event_time: number
  action_source: string
  event_source_url: string
  user_data: {
    client_ip_address?: string
    client_user_agent?: string
    em?: string
    ph?: string
    fn?: string
    external_id?: string
    fbp?: string
    fbc?: string
  }
  custom_data?: {
    content_name?: string
    content_category?: string
    value?: number
    currency?: string
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      eventName,
      email,
      phone,
      name,
      contentName,
      contentCategory,
      value,
      sourceUrl,
      fbp,
      fbc,
    } = body

    // Get user data from request
    const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || ""
    const userAgent = request.headers.get("user-agent") || ""

    // Build event data
    const eventData: EventData = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      action_source: "website",
      event_source_url: sourceUrl || "",
      user_data: {
        client_ip_address: clientIp,
        client_user_agent: userAgent,
      },
    }

    // Add hashed user data if available
    if (email) {
      eventData.user_data.em = hashData(email)
    }
    if (phone) {
      // Remove non-numeric characters and hash
      const cleanPhone = phone.replace(/\D/g, "")
      eventData.user_data.ph = hashData(cleanPhone)
    }
    if (name) {
      eventData.user_data.fn = hashData(name)
    }
    if (fbp) {
      eventData.user_data.fbp = fbp
    }
    if (fbc) {
      eventData.user_data.fbc = fbc
    }

    // Add custom data
    if (contentName || contentCategory || value) {
      eventData.custom_data = {
        content_name: contentName,
        content_category: contentCategory,
        value: value || 0,
        currency: "BRL",
      }
    }

    // Send to Meta Conversions API
    if (ACCESS_TOKEN) {
      const response = await fetch(
        `https://graph.facebook.com/v18.0/${PIXEL_ID}/events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: [eventData],
            access_token: ACCESS_TOKEN,
          }),
        }
      )

      const result = await response.json()

      if (!response.ok) {
        console.error("[Meta Conversions API] Error:", result)
        return NextResponse.json(
          { success: false, error: result },
          { status: response.status }
        )
      }

      return NextResponse.json({ success: true, result })
    }

    // If no token, just return success (pixel tracking will still work client-side)
    return NextResponse.json({
      success: true,
      message: "Token not configured, using client-side tracking only",
    })
  } catch (error) {
    console.error("[Meta Conversions API] Error:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}
