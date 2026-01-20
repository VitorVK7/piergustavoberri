import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function Hero() {
  return (
    <section id="inicio" className="pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20 lg:pt-36 lg:pb-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-balance leading-tight mb-4 sm:mb-6">
              Direito explicado com clareza. Do primeiro passo ao desfecho.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
              Há mais de 22 anos orientando pessoas e empresas com prazos organizados e acompanhamento próximo.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 sm:h-14 text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto">
                <a href="#contato" className="flex items-center justify-center gap-2">
                  Agendar retorno
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Atendimento presencial na sede e online para todo o Brasil.
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[3/4] sm:aspect-[4/5] max-w-sm sm:max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden border border-border shadow-xl">
              <Image 
                src="/images/1115-2871.jpeg" 
                alt="Dr. Pier Gustavo Berri - Advogado" 
                fill 
                className="object-cover object-top" 
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
