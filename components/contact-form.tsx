"use client"

import type React from "react"
import { useState, useRef } from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useMetaTracking } from "@/hooks/use-meta-tracking"
import { CheckCircle2 } from "lucide-react"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formStarted, setFormStarted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const { trackFormSubmit, trackFormFocus } = useMetaTracking()

  const handleFormFocus = () => {
    if (!formStarted) {
      setFormStarted(true)
      trackFormFocus()
    }
  }

  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg("")
    
    const formData = new FormData(formRef.current!)
    const data = {
      name: formData.get("name") as string,
      whatsapp: formData.get("whatsapp") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
      website: formData.get("website") as string,
      source: "site",
    }
    
    // Track the lead event via Meta Pixel
    await trackFormSubmit({
      name: data.name,
      email: data.email,
      phone: data.whatsapp,
      subject: data.subject,
    })

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        throw new Error("Erro ao enviar")
      }

      setIsSubmitting(false)
      setIsSubmitted(true)
    } catch {
      setIsSubmitting(false)
      setErrorMsg("Erro ao enviar. Tente novamente ou entre em contato pelo WhatsApp.")
    }
  }

  const handleNewMessage = () => {
    setIsSubmitted(false)
    setFormStarted(false)
    formRef.current?.reset()
  }

  return (
    <section id="contato" className="py-12 sm:py-16 md:py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl sm:max-w-2xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Entre em contato</h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Preencha o formulário e retornaremos o quanto antes
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
                  Obrigado pelo seu contato. Nossa equipe retornará o mais breve possível pelo WhatsApp ou e-mail informado.
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
                {/* Honeypot anti-spam */}
                <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="name" className="text-sm sm:text-base">Nome *</Label>
                  <Input id="name" name="name" required className="bg-background border-border h-11 sm:h-12 text-base" />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="whatsapp" className="text-sm sm:text-base">WhatsApp *</Label>
                  <Input id="whatsapp" name="whatsapp" type="tel" required placeholder="(00) 00000-0000" className="bg-background border-border h-11 sm:h-12 text-base" />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="email" className="text-sm sm:text-base">E-mail</Label>
                  <Input id="email" name="email" type="email" className="bg-background border-border h-11 sm:h-12 text-base" />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="subject" className="text-sm sm:text-base">Assunto *</Label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full h-11 sm:h-12 px-3 rounded-lg bg-background border border-border text-foreground text-base touch-manipulation"
                  >
                    <option value="">Selecione...</option>
                    <option value="auxilio-acidente">Auxílio-acidente</option>
                    <option value="previdenciario">Previdenciário</option>
                    <option value="civil">Civil</option>
                    <option value="familia">Família</option>
                    <option value="trabalho">Trabalho</option>
                    <option value="empresarial">Empresarial</option>
                    <option value="sucessoes">Sucessões</option>
                  </select>
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="message" className="text-sm sm:text-base">Mensagem *</Label>
                  <Textarea id="message" name="message" required rows={4} className="bg-background border-border text-base min-h-[120px] sm:min-h-[140px]" />
                </div>
                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                    {errorMsg}
                  </div>
                )}
                <div className="space-y-1.5 sm:space-y-2">
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 sm:h-14 text-base sm:text-lg"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar e falar com a equipe'}
                  </Button>
                  <p className="text-xs sm:text-sm text-center text-muted-foreground">
                    Horário comercial. Respondemos o quanto antes.
                  </p>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}
