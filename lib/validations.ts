import { z } from "zod"

export const leadSchema = z.object({
  nome: z.string().min(2, "Nome deve ter ao menos 2 caracteres").max(100),
  email: z.string().email("E-mail inválido"),
  whatsapp: z
    .string()
    .min(10, "WhatsApp deve ter ao menos 10 dígitos")
    .max(20)
    .regex(/^[\d\s()+-]+$/, "WhatsApp inválido"),
  assunto: z.string().min(1, "Selecione um assunto"),
  mensagem: z.string().max(2000).optional().default(""),
  consentimento: z.literal(true, {
    errorMap: () => ({ message: "Você deve concordar com a política de privacidade" }),
  }),

  // Hidden / metadata
  page_url: z.string().url().optional().default(""),
  referrer: z.string().optional().default(""),
  utm_source: z.string().optional().default(""),
  utm_medium: z.string().optional().default(""),
  utm_campaign: z.string().optional().default(""),
  utm_content: z.string().optional().default(""),
  utm_term: z.string().optional().default(""),

  // Honeypot - must be empty
  _hp: z.string().max(0, "spam").optional().default(""),
})

export type LeadInput = z.infer<typeof leadSchema>
