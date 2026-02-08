import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface LeadEmailData {
  leadId: string
  nome: string
  email: string
  whatsapp: string
  assunto: string
  mensagem: string
  timestamp: string
  page_url: string
  referrer: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
  utm_term: string
}

export async function sendLeadNotification(data: LeadEmailData) {
  const to = process.env.LEADS_NOTIFY_EMAIL_TO
  const from = process.env.LEADS_NOTIFY_EMAIL_FROM || "Leads <onboarding@resend.dev>"
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID

  if (!to) {
    throw new Error("Missing LEADS_NOTIFY_EMAIL_TO")
  }

  const sheetUrl = spreadsheetId
    ? `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`
    : "Planilha nao configurada"

  const utmInfo =
    data.utm_source || data.utm_medium || data.utm_campaign
      ? `
      <tr><td style="padding:6px 12px;color:#666;font-size:13px;">UTM Source</td><td style="padding:6px 12px;font-size:13px;">${data.utm_source || "-"}</td></tr>
      <tr><td style="padding:6px 12px;color:#666;font-size:13px;">UTM Medium</td><td style="padding:6px 12px;font-size:13px;">${data.utm_medium || "-"}</td></tr>
      <tr><td style="padding:6px 12px;color:#666;font-size:13px;">UTM Campaign</td><td style="padding:6px 12px;font-size:13px;">${data.utm_campaign || "-"}</td></tr>
      <tr><td style="padding:6px 12px;color:#666;font-size:13px;">UTM Content</td><td style="padding:6px 12px;font-size:13px;">${data.utm_content || "-"}</td></tr>
      <tr><td style="padding:6px 12px;color:#666;font-size:13px;">UTM Term</td><td style="padding:6px 12px;font-size:13px;">${data.utm_term || "-"}</td></tr>`
      : ""

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#B8985F;padding:20px;border-radius:8px 8px 0 0;">
        <h1 style="color:#fff;margin:0;font-size:20px;">Novo Lead - ${data.nome}</h1>
      </div>
      <div style="border:1px solid #e5e5e5;border-top:none;border-radius:0 0 8px 8px;padding:20px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr style="background:#f9f9f9;"><td style="padding:8px 12px;font-weight:bold;color:#333;">Nome</td><td style="padding:8px 12px;">${data.nome}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;color:#333;">E-mail</td><td style="padding:8px 12px;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:8px 12px;font-weight:bold;color:#333;">WhatsApp</td><td style="padding:8px 12px;"><a href="https://wa.me/${data.whatsapp.replace(/\D/g, "")}">${data.whatsapp}</a></td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;color:#333;">Assunto</td><td style="padding:8px 12px;">${data.assunto}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:8px 12px;font-weight:bold;color:#333;">Mensagem</td><td style="padding:8px 12px;">${data.mensagem || "-"}</td></tr>
        </table>
        
        <hr style="margin:16px 0;border:none;border-top:1px solid #eee;" />
        
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:6px 12px;color:#666;font-size:13px;">Lead ID</td><td style="padding:6px 12px;font-size:13px;">${data.leadId}</td></tr>
          <tr><td style="padding:6px 12px;color:#666;font-size:13px;">Data/Hora</td><td style="padding:6px 12px;font-size:13px;">${new Date(data.timestamp).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}</td></tr>
          <tr><td style="padding:6px 12px;color:#666;font-size:13px;">Pagina</td><td style="padding:6px 12px;font-size:13px;">${data.page_url || "-"}</td></tr>
          <tr><td style="padding:6px 12px;color:#666;font-size:13px;">Referrer</td><td style="padding:6px 12px;font-size:13px;">${data.referrer || "-"}</td></tr>
          ${utmInfo}
        </table>

        <div style="margin-top:20px;text-align:center;">
          <a href="${sheetUrl}" style="display:inline-block;background:#B8985F;color:#fff;padding:10px 24px;border-radius:6px;text-decoration:none;font-weight:bold;">Ver na Planilha</a>
        </div>
      </div>
    </div>
  `

  await resend.emails.send({
    from,
    to: [to],
    subject: `Novo lead - ${data.nome}`,
    html,
  })
}
