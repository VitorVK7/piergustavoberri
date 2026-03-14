import { Button } from "@/components/ui/button"
import { ArrowRight, Scale } from "lucide-react"
import Image from "next/image"

const stats = [
  { icon: Scale, value: "16", label: "anos de experiência" },
  { icon: Scale, value: "1000+", label: "casos resolvidos" },
]

export function Hero() {
  return (
    <section id="inicio" className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24 lg:pt-36 lg:pb-32 overflow-hidden">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-14 lg:gap-20 items-center">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Scale className="h-4 w-4" />
              <span>Advocacia especializada desde 2009</span>
            </div>
            
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-balance leading-[1.1] mb-6">
              Direito explicado com{" "}
              <span className="text-primary">clareza</span>.{" "}
              <span className="block mt-2">Do primeiro passo ao desfecho.</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Há mais de 22 anos, Pier orienta pessoas e empresas com prazos organizados, 
              transparência total e acompanhamento próximo em cada etapa do processo.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-[#25D366] text-white hover:bg-[#20BA5A] h-14 text-base sm:text-lg px-8 w-full sm:w-auto shadow-lg shadow-[#25D366]/25 transition-all hover:shadow-xl hover:shadow-[#25D366]/30">
                <a href="https://wa.me/554733795482?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  Falar pelo WhatsApp
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
              
              <div className="relative aspect-[3/4] sm:aspect-[4/5] max-w-sm sm:max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden border-2 border-border shadow-2xl">
                <Image 
                  src="/images/1115-2871.jpeg" 
                  alt="Dr. Pier Gustavo Berri - Advogado" 
                  fill 
                  className="object-cover object-top" 
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
              </div>
              
              {/* Floating card */}
              <div className="absolute -bottom-4 -left-4 sm:bottom-8 sm:-left-8 bg-card border border-border rounded-xl p-4 shadow-xl max-w-[200px]">
                <p className="text-xs text-muted-foreground mb-1">Atendimento</p>
                <p className="text-sm font-semibold text-foreground">Presencial e Online</p>
                <p className="text-xs text-primary mt-1">Para todo o Brasil</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
