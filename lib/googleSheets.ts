import { google } from "googleapis"

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]

function getAuth() {
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n")
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL

  if (!privateKey || !clientEmail) {
    throw new Error("Google Sheets credentials not configured")
  }

  return new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: SCOPES,
  })
}

export async function appendLeadToSheet(lead: {
  name: string
  whatsapp: string
  email: string
  subject: string
  message: string
  source: string
  createdAt: string
}) {
  const auth = getAuth()
  const sheets = google.sheets({ version: "v4", auth })

  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID
  const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME || "Leads - Pier Gustavo Berri"

  if (!spreadsheetId) {
    throw new Error("GOOGLE_SHEETS_SPREADSHEET_ID not configured")
  }

  // Check if header row exists, if not create it
  const headerCheck = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'${sheetName}'!A1:H1`,
  })

  if (!headerCheck.data.values || headerCheck.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `'${sheetName}'!A1:H1`,
      valueInputOption: "RAW",
      requestBody: {
        values: [["Data/Hora", "Nome", "WhatsApp", "E-mail", "Assunto", "Mensagem", "Origem", "Status"]],
      },
    })
  }

  // Append the lead data
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `'${sheetName}'!A:H`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[
        lead.createdAt,
        lead.name,
        lead.whatsapp,
        lead.email,
        lead.subject,
        lead.message,
        lead.source,
        "Novo",
      ]],
    },
  })
}
