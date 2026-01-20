import { Card } from "@/components/ui/card"
import Image from "next/image"

export function About() {
  const timeline = [
    { year: "2003", event: "Início da atuação jurídica" },
    { year: "2009", event: "Fundação do escritório" },
  ]

  return (
    <section id="quem-e-pier" className="py-12 sm:py-16 md:py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Quem é Pier</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center mb-10 sm:mb-12 md:mb-16">
            <div className="relative aspect-square max-w-sm mx-auto md:max-w-none rounded-2xl overflow-hidden border border-border shadow-lg">
              <Image 
                src="/images/1184-2871.jpeg" 
                alt="Dr. Pier Gustavo Berri - Advogado" 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-6 sm:mb-8 text-center md:text-left">
                Formado pela FURB, Pier atua no Direito desde 2003. Passou pelo TJSC (Guaramirim), foi conciliador,
                assessor especial na Procuradoria de SC e exerceu três mandatos como vereador em Massaranduba/SC. Em
                2009, fundou o escritório que hoje orienta pessoas e empresas com foco em clareza, prazos organizados e
                acompanhamento.
              </p>
              <div className="space-y-3 sm:space-y-4">
                {timeline.map((item, index) => (
                  <Card
                    key={index}
                    className="bg-card border-border p-4 sm:p-5 md:p-6 hover:border-primary hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className="text-xl sm:text-2xl font-serif font-bold text-primary">{item.year}</span>
                      <span className="text-sm sm:text-base text-muted-foreground">{item.event}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          <div className="relative aspect-video sm:aspect-[21/9] rounded-2xl overflow-hidden border border-border shadow-lg">
            <Image
              src="/images/1280-2871-20-281-29.jpeg"
              alt="Equipe Pier Gustavo Berri Advocacia"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
