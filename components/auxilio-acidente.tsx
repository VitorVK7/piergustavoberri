import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, AlertCircle } from "lucide-react"

export function AuxilioAcidente() {
  const bullets = [
    "Sequela permanente após acidente",
    "Redução da capacidade para a atividade habitual",
    "Você pode ter voltado a trabalhar e ainda assim ter direito",
  ]

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-2 sm:gap-3 bg-primary/10 border-2 border-primary/30 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8">
            <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm sm:text-base md:text-lg font-semibold text-primary">
              Milhares de trabalhadores têm direito e não sabem. Avalie seu caso gratuitamente.
            </p>
          </div>

          <Card className="bg-card border-2 border-primary/40 shadow-xl sm:shadow-2xl p-5 sm:p-6 md:p-8 lg:p-12">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-balance">
              Auxílio-Acidente: Você Pode Ter Direito
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              Benefício indenizatório pago até a aposentadoria para quem ficou com sequelas após acidente ou doença.
            </p>

            <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6 text-primary">Quando você pode solicitar:</h3>
            <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
              {bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-2 sm:gap-3">
                  <Check className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-sm sm:text-base md:text-lg leading-relaxed font-medium">{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 sm:p-5 md:p-6 text-center">
              <p className="text-sm sm:text-base md:text-lg mb-3 sm:mb-4 font-medium">Não perca seu direito. Consulta gratuita e sem compromisso.</p>
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 w-full sm:w-auto"
              >
                <a href="#contato">Verificar meu direito agora</a>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
