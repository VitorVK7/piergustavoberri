"use client"

import type React from "react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Handle form submission
    setTimeout(() => setIsSubmitting(false), 1000)
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
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="name" className="text-sm sm:text-base">Nome *</Label>
                <Input id="name" required className="bg-background border-border h-11 sm:h-12 text-base" />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="whatsapp" className="text-sm sm:text-base">WhatsApp *</Label>
                <Input id="whatsapp" type="tel" required placeholder="(00) 00000-0000" className="bg-background border-border h-11 sm:h-12 text-base" />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="email" className="text-sm sm:text-base">E-mail</Label>
                <Input id="email" type="email" className="bg-background border-border h-11 sm:h-12 text-base" />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="subject" className="text-sm sm:text-base">Assunto *</Label>
                <select
                  id="subject"
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
                <Textarea id="message" required rows={4} className="bg-background border-border text-base min-h-[120px] sm:min-h-[140px]" />
              </div>
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
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}
