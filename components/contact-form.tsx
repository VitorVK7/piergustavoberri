"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useMetaTracking } from "@/hooks/use-meta-tracking"
import { CheckCircle2, AlertCircle, Shield, Loader2 } from "lucide-react"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [formStarted, setFormStarted] = useState(false)
  const [consentimento, setConsentimento] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const { trackFormSubmit, trackFormFocus } = useMetaTracking()

  // Capture UTM params
  const searchParams = useSearchParams()
  const [utms, setUtms] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_term: "",
  })

  useEffect(() => {
    setUtms({
      utm_source: searchParams.get("utm_source") || "",
      utm_medium: searchParams.get("utm_medium") || "",
      utm_campaign: searchParams.get("utm_campaign") || "",
      utm_content: searchParams.get("utm_content") || "",
      utm_term: searchParams.get("utm_term") || "",
    })
  }, [searchParams])

  const handleFormFocus = () => {
    if (!formStarted) {
      setFormStarted(true)
      trackFormFocus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")

    const formData = new FormData(formRef.current!)

    const payload = {
      nome: formData.get("nome") as string,
      email: formData.get("email") as string,
      whatsapp: formData.get("whatsapp") as string,
      assunto: formData.get("assunto") as string,
      mensagem: (formData.get("mensagem") as string) || "",
      consentimento,
      page_url: window.location.href,
      referrer: document.referrer || "",
      ...utms,
      _hp: (formData.get("_hp") as string) || "",
    }

    // Track the lead event via Meta Pixel
    await trackFormSubmit({
      name: payload.nome,
      email: payload.email,
      phone: payload.whatsapp,
      subject: payload.assunto,
    })

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const json = await res.json()

      if (!res.ok || !json.ok) {
        if (json.details) {
          const firstError = Object.values(json.details).flat()[0]
          setErrorMessage(typeof firstError === "string" ? firstError : "Verifique os campos e tente novamente.")
        } else {
          setErrorMessage("Erro ao enviar. Tente novamente em alguns instantes.")
        }
        setIsSubmitting(false)
        return
      }

      setIsSubmitting(false)
      setIsSubmitted(true)
    } catch {
      setErrorMessage("Erro de conexao. Verifique sua internet e tente novamente.")
      setIsSubmitting(false)
    }
  }

  const handleNewMessage = () => {
    setIsSubmitted(false)
    setFormStarted(false)
    setConsentimento(false)
    setErrorMessage("")
    formRef.current?.reset()
  }

  return (
    <section id="contato" className="py-12 sm:py-16 md:py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl sm:max-w-2xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Entre em contato</h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Preencha o formulario e retornaremos o quanto antes
            </p>
          </div>

          <Card className="bg-card border-border shadow-lg p-5 sm:p-6 md:p-8 lg:p-10">
            {isSubmitted ? (
              <div className="text-center py-8 sm:py-12">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold mb-3 text-foreground">
                  Mensagem enviada com sucesso!
                </h3>
                <p className="text-muted-foreground text-base sm:text-lg mb-6 max-w-md mx-auto">
                  Obrigado pelo seu contato. Nossa equipe retornara o mais breve possivel pelo WhatsApp ou e-mail informado.
                </p>
                <Button
                  onClick={handleNewMessage}
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-2"
                >
                  Enviar nova mensagem
                </Button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} onFocus={handleFormFocus} className="space-y-4 sm:space-y-5 md:space-y-6">
                {/* Honeypot - invisible to users */}
                <div className="absolute opacity-0 pointer-events-none" aria-hidden="true" tabIndex={-1}>
                  <input type="text" name="_hp" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="nome" className="text-sm sm:text-base">Nome *</Label>
                  <Input id="nome" name="nome" required className="bg-background border-border h-11 sm:h-12 text-base" placeholder="Seu nome completo" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="email" className="text-sm sm:text-base">E-mail *</Label>
                    <Input id="email" name="email" type="email" required className="bg-background border-border h-11 sm:h-12 text-base" placeholder="seu@email.com" />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="whatsapp" className="text-sm sm:text-base">WhatsApp *</Label>
                    <Input id="whatsapp" name="whatsapp" type="tel" required placeholder="(00) 00000-0000" className="bg-background border-border h-11 sm:h-12 text-base" />
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="assunto" className="text-sm sm:text-base">Assunto *</Label>
                  <select
                    id="assunto"
                    name="assunto"
                    required
                    className="w-full h-11 sm:h-12 px-3 rounded-lg bg-background border border-border text-foreground text-base touch-manipulation"
                  >
                    <option value="">Selecione...</option>
                    <option value="auxilio-acidente">Auxilio-acidente</option>
                    <option value="previdenciario">Previdenciario</option>
                    <option value="civil">Civil</option>
                    <option value="familia">Familia</option>
                    <option value="trabalho">Trabalho</option>
                    <option value="empresarial">Empresarial</option>
                    <option value="sucessoes">Sucessoes</option>
                    <option value="outro">Outro assunto</option>
                  </select>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="mensagem" className="text-sm sm:text-base">Mensagem (opcional)</Label>
                  <Textarea id="mensagem" name="mensagem" rows={4} className="bg-background border-border text-base min-h-[120px] sm:min-h-[140px]" placeholder="Descreva brevemente sua situacao..." />
                </div>

                {/* LGPD Consent */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consentimento"
                    checked={consentimento}
                    onChange={(e) => setConsentimento(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    required
                  />
                  <label htmlFor="consentimento" className="text-xs sm:text-sm text-muted-foreground leading-relaxed cursor-pointer">
                    Concordo com o tratamento dos meus dados pessoais conforme a{" "}
                    <a href="#" className="text-primary underline hover:text-primary/80">Politica de Privacidade</a>{" "}
                    e a LGPD (Lei 13.709/2018) para fins de atendimento juridico.
                  </label>
                </div>

                {/* Error message */}
                {errorMessage && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="space-y-3">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting || !consentimento}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 sm:h-14 text-base sm:text-lg disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Enviando...
                      </span>
                    ) : (
                      "Enviar e falar com a equipe"
                    )}
                  </Button>
                  <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <Shield className="h-3.5 w-3.5" />
                    <span>Seus dados estao protegidos e nao serao compartilhados.</span>
                  </div>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}
