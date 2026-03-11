import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, AlertCircle, Car, ShieldX } from "lucide-react"

export function SeguroNegado() {
  const bullets = [
    "Seguradora negou seu sinistro sem justificativa clara",
    "Alegaram perda total indevida ou valor abaixo do mercado",
    "Negaram cobertura por cláusulas abusivas no contrato",
    "Demoraram além do prazo legal para dar uma resposta",
  ]

  const situations = [
    "Colisão, capotamento ou engavetamento",
    "Roubo ou furto do veículo",
    "Danos por alagamentos ou desastres naturais",
    "Acidentes com terceiros",
  ]

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-2 sm:gap-3 bg-red-500/10 border-2 border-red-500/30 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8">
            <ShieldX className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm sm:text-base md:text-lg font-semibold text-red-600">
              Sua seguradora negou o pagamento? Você pode ter direito a receber o valor integral.
            </p>
          </div>

          <Card className="bg-card border-2 border-primary/40 shadow-xl sm:shadow-2xl p-5 sm:p-6 md:p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-4">
              <Car className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
                Seguro Negado em Acidente de Trânsito?
              </h2>
            </div>
            
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              Sofreu um acidente e a seguradora se recusou a pagar? Pier Gustavo Berri é especialista em reverter 
              negativas de seguradoras e garantir que você receba o que é seu por direito.
            </p>

            <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6 text-primary">
              Situações em que podemos ajudar:
            </h3>
            <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
              {bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-2 sm:gap-3">
                  <Check className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-sm sm:text-base md:text-lg leading-relaxed font-medium">{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="bg-muted/50 rounded-lg p-4 sm:p-5 md:p-6 mb-8">
              <h4 className="font-semibold text-base sm:text-lg mb-3">Tipos de acidentes que atuamos:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {situations.map((situation, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>{situation}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 sm:p-5 md:p-6 text-center">
              <p className="text-sm sm:text-base md:text-lg mb-3 sm:mb-4 font-medium">
                Não aceite a negativa. Consulta gratuita e sem compromisso.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-[#25D366] text-white hover:bg-[#20BA5A] text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 w-full sm:w-auto"
              >
                <a href="https://wa.me/554733795482" target="_blank" rel="noopener noreferrer">
                  Falar com advogado agora
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
