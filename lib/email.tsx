import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface LeadData {
  name: string
  whatsapp: string
  email: string
  subject: string
  message: string
  source: string
  createdAt: string
}

export async function sendLeadNotification(lead: LeadData) {
  const emailTo = process.env.LEADS_NOTIFY_EMAIL_TO
  const emailFrom = process.env.LEADS_NOTIFY_EMAIL_FROM || "onboarding@resend.dev"

  if (!emailTo) {
    console.log("[Email] LEADS_NOTIFY_EMAIL_TO not configured, skipping notification")
    return
  }

  if (!process.env.RESEND_API_KEY) {
    console.log("[Email] RESEND_API_KEY not configured, skipping notification")
    return
  }

  const subjectMap: Record<string, string> = {
    "auxilio-acidente": "Auxilio-acidente",
    "previdenciario": "Previdenciario",
    "civil": "Civil",
    "familia": "Familia",
    "trabalho": "Trabalho",
    "empresarial": "Empresarial",
    "sucessoes": "Sucessoes",
  }

  const subjectLabel = subjectMap[lead.subject] || lead.subject

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1a365d; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #1a365d; }
        .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
        .footer { padding: 15px; text-align: center; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Novo Lead - Pier Gustavo Berri Advocacia</h1>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Data/Hora:</div>
            <div class="value">${lead.createdAt}</div>
          </div>
          <div class="field">
            <div class="label">Nome:</div>
            <div class="value">${lead.name}</div>
          </div>
          <div class="field">
            <div class="label">WhatsApp:</div>
            <div class="value">${lead.whatsapp}</div>
          </div>
          <div class="field">
            <div class="label">E-mail:</div>
            <div class="value">${lead.email || "Nao informado"}</div>
          </div>
          <div class="field">
            <div class="label">Assunto:</div>
            <div class="value">${subjectLabel}</div>
          </div>
          <div class="field">
            <div class="label">Mensagem:</div>
            <div class="value">${lead.message.replace(/\n/g, "<br>")}</div>
          </div>
          <div class="field">
            <div class="label">Origem:</div>
            <div class="value">${lead.source}</div>
          </div>
        </div>
        <div class="footer">
          Este e-mail foi enviado automaticamente pelo sistema de leads do site.
        </div>
      </div>
    </body>
    </html>
  `

  await resend.emails.send({
    from: emailFrom,
    to: emailTo,
    subject: `Novo Lead: ${lead.name} - ${subjectLabel}`,
    html,
  })
}
