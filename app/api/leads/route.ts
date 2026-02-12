import { NextResponse } from "next/server"
import { appendLeadToSheet } from "@/lib/googleSheets"
import { sendLeadNotification } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const { name, whatsapp, email, subject, message } = body

    // Validate required fields
    if (!name || !whatsapp || !subject || !message) {
      return NextResponse.json(
        { error: "Campos obrigatorios nao preenchidos" },
        { status: 400 }
      )
    }

    // Honeypot check
    if (body.website) {
      return NextResponse.json({ success: true })
    }

    // Format timestamp
    const now = new Date()
    const createdAt = now.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })

    const leadData = {
      name: name.trim(),
      whatsapp: whatsapp.trim(),
      email: (email || "").trim(),
      subject,
      message: message.trim(),
      source: body.source || "site",
      createdAt,
    }

    // Save to Google Sheets and send email in parallel
    const results = await Promise.allSettled([
      appendLeadToSheet(leadData),
      sendLeadNotification(leadData),
    ])

    // Log any errors but still return success to user
    for (const result of results) {
      if (result.status === "rejected") {
        console.error("[Leads] Automation error:", result.reason)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Leads] API error:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
