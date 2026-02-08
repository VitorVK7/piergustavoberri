import { NextResponse } from "next/server"
import { leadSchema } from "@/lib/validations"
import { appendLeadRow } from "@/lib/googleSheets"
import { sendLeadNotification } from "@/lib/email"

// Force Node.js runtime (not Edge)
export const runtime = "nodejs"

// Simple in-memory rate limit (per IP, 5 requests per minute)
const rateMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60_000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return true
  }

  if (entry.count >= RATE_LIMIT) {
    return false
  }

  entry.count++
  return true
}

export async function POST(request: Request) {
  try {
    // Rate limit
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown"

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: "too_many_requests" },
        { status: 429 }
      )
    }

    const body = await request.json()

    // Validate with Zod
    const parsed = leadSchema.safeParse(body)

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors
      return NextResponse.json(
        { ok: false, error: "validation_error", details: errors },
        { status: 400 }
      )
    }

    const data = parsed.data

    // Check honeypot
    if (data._hp && data._hp.length > 0) {
      // Silently accept but don't process (fool bots)
      return NextResponse.json({ ok: true, leadId: "ignored" })
    }

    // Generate lead ID and timestamp
    const leadId = crypto.randomUUID()
    const timestamp = new Date().toISOString()

    // Build row for Google Sheets
    const row = [
      leadId,
      timestamp,
      data.nome,
      data.email,
      data.whatsapp,
      data.assunto,
      data.mensagem || "",
      data.page_url || "",
      data.referrer || "",
      data.utm_source || "",
      data.utm_medium || "",
      data.utm_campaign || "",
      data.utm_content || "",
      data.utm_term || "",
    ]

    // Save to Google Sheets + send email in parallel
    const emailData = {
      leadId,
      timestamp,
      nome: data.nome,
      email: data.email,
      whatsapp: data.whatsapp,
      assunto: data.assunto,
      mensagem: data.mensagem || "",
      page_url: data.page_url || "",
      referrer: data.referrer || "",
      utm_source: data.utm_source || "",
      utm_medium: data.utm_medium || "",
      utm_campaign: data.utm_campaign || "",
      utm_content: data.utm_content || "",
      utm_term: data.utm_term || "",
    }

    const results = await Promise.allSettled([
      appendLeadRow(row),
      sendLeadNotification(emailData),
    ])

    // Log failures but still return success to user
    for (const result of results) {
      if (result.status === "rejected") {
        console.error("[leads] Background task failed:", result.reason)
      }
    }

    return NextResponse.json({ ok: true, leadId })
  } catch (error) {
    console.error("[leads] Internal error:", error)
    return NextResponse.json(
      { ok: false, error: "internal_error" },
      { status: 500 }
    )
  }
}
