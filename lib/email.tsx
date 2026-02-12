const RESEND_API_KEY = process.env.RESEND_API_KEY
const NOTIFY_TO = process.env.LEADS_NOTIFY_EMAIL_TO || ""
const NOTIFY_FROM = process.env.LEADS_NOTIFY_EMAIL_FROM || "leads@piergustavoberriadv.com.br"

interface LeadData {
  name: string
  whatsapp: string
  email: string
  subject: string
  message: string
  source: string
  createdAt: string
}

const subjectLabels: Record<string, string> = {
  "auxilio-acidente": "Auxilio-acidente",
  "previdenciario": "Previdenciario",
  "civil": "Civil",
  "familia": "Familia",
  "trabalho": "Trabalho",
  "empresarial": "Empresarial",
  "sucessoes": "Sucessoes",
}

export async function sendLeadNotification(lead: LeadData) {
  if (!RESEND_API_KEY || !NOTIFY_TO) {
    console.warn("[Email] RESEND_API_KEY or LEADS_NOTIFY_EMAIL_TO not configured, skipping email")
    return
  }

  const subjectLabel = subjectLabels[lead.subject] || lead.subject

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
      <div style="background: #1a1a2e; padding: 24px; text-align: center;">
        <h1 style="color: #c9a84c; margin: 0; font-size: 20px;">Novo Lead - Pier Gustavo Berri Advocacia</h1>
      </div>
      <div style="padding: 24px; border: 1px solid #e5e5e5; border-top: none;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; font-weight: bold; width: 120px; color: #333;">Data/Hora</td>
            <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; color: #555;">${lead.createdAt}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #333;">Nome</td>
            <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; color: #555;">${lead.name}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #333;">WhatsApp</td>
            <td style="padding: 12px; border-bottom: 1px solid #f0f0f0;">
              <a href="https://wa.me/55${lead.whatsapp.replace(/\D/g, "")}" style="color: #25D366; text-decoration: none;">${lead.whatsapp}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #333;">E-mail</td>
            <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; color: #555;">${lead.email || "Nao informado"}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #333;">Assunto</td>
            <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; color: #555;">${subjectLabel}</td>
          </tr>
          <tr>
            <td style="padding: 12px; font-weight: bold; color: #333; vertical-align: top;">Mensagem</td>
            <td style="padding: 12px; color: #555;">${lead.message.replace(/\n/g, "<br>")}</td>
          </tr>
        </table>
        <div style="margin-top: 24px; padding: 16px; background: #f8f9fa; border-radius: 8px; text-align: center;">
          <p style="margin: 0 0 8px 0; font-size: 13px; color: #888;">Origem: ${lead.source}</p>
          <a href="https://wa.me/55${lead.whatsapp.replace(/\D/g, "")}" style="display: inline-block; padding: 10px 24px; background: #25D366; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">Responder via WhatsApp</a>
        </div>
      </div>
    </div>
  `

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: NOTIFY_FROM,
      to: NOTIFY_TO.split(",").map((e: string) => e.trim()),
      subject: `Novo Lead: ${lead.name} - ${subjectLabel}`,
      html,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Resend API error: ${error}`)
  }
}
