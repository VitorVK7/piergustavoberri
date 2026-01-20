import { Card } from "@/components/ui/card"
import Image from "next/image"
import { GraduationCap, Briefcase, Scale } from "lucide-react"

export function About() {
  const timeline = [
    { year: "2003", event: "Início da atuação jurídica", icon: GraduationCap },
    { year: "2009", event: "Fundação do escritório", icon: Briefcase },
  ]

  const credentials = [
    "Formado pela FURB",
    "Ex-assessor na Procuradoria de SC",
    "Conciliador no TJSC",
    "Vereador em Massaranduba/SC",
  ]

  return (
    <section id="quem-e-pier" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Scale className="h-4 w-4" />
              <span>Conheça nossa história</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Quem é Pier</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Mais de duas décadas de dedicação ao Direito e à defesa dos interesses de seus clientes
            </p>
          </div>

          {/* Main content with image */}
          <div className="grid lg:grid-cols-2 gap-10 md:gap-14 items-center mb-12 sm:mb-16">
            {/* Left side - Image */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-primary/5 rounded-full blur-3xl" />
              <div className="relative aspect-[4/5] max-w-md mx-auto rounded-2xl overflow-hidden border-2 border-border shadow-xl">
                <Image 
                  src="/images/1184-2871.jpeg" 
                  alt="Dr. Pier Gustavo Berri - Advogado" 
                  fill 
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
              </div>
            </div>

            {/* Right side - Content */}
            <div className="lg:pl-4">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-6 text-center lg:text-left">
                Experiência que faz a diferença
              </h3>
              
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-8 text-center lg:text-left">
                Formado pela FURB, Pier atua no Direito desde 2003. Passou pelo TJSC (Guaramirim), foi conciliador,
                assessor especial na Procuradoria de SC e exerceu três mandatos como vereador em Massaranduba/SC. Em
                2009, fundou o escritório que hoje orienta pessoas e empresas com foco em clareza, prazos organizados e
                acompanhamento próximo em cada etapa.
              </p>

              {/* Credentials */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {credentials.map((credential, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    <span>{credential}</span>
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <Card
                    key={index}
                    className="bg-card border-border p-5 hover:border-primary hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <span className="text-xl sm:text-2xl font-serif font-bold text-primary">{item.year}</span>
                        <p className="text-sm sm:text-base text-muted-foreground">{item.event}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Team photo */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
            <div className="relative aspect-video sm:aspect-[21/9] rounded-2xl overflow-hidden border-2 border-border shadow-xl">
              <Image
                src="/images/1280-2871-20-281-29.jpeg"
                alt="Equipe Pier Gustavo Berri Advocacia"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-medium text-lg drop-shadow-lg">Nossa equipe está pronta para ajudar você</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
