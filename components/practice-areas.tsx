import { Scale, FileText, Heart, Briefcase, Building, Landmark } from 'lucide-react'
import { Card } from '@/components/ui/card'

export function PracticeAreas() {
  const areas = [
    {
      icon: Scale,
      title: 'Previdenciário',
      description: 'Auxílio-Acidente, Auxílio-Doença, Aposentadorias, Tempo Rural',
    },
    {
      icon: FileText,
      title: 'Direito Civil',
      description: 'Contratos, Cobrança, Danos Materiais',
    },
    {
      icon: Heart,
      title: 'Família',
      description: 'Divórcio, Guarda/Visitas, Pensão',
    },
    {
      icon: Briefcase,
      title: 'Trabalho',
      description: 'Rescisão, CAT/Acidente, Assédio Moral',
    },
    {
      icon: Building,
      title: 'Empresarial',
      description: 'Contratos e consultivo',
    },
    {
      icon: Landmark,
      title: 'Sucessões',
      description: 'Inventário judicial/cartório',
    },
  ]

  return (
    <section id="areas" className="py-12 sm:py-16 md:py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Áreas de atuação
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Orientação jurídica em múltiplas especialidades
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {areas.map((area, index) => (
            <Card 
              key={index} 
              className="bg-card border-border p-4 sm:p-5 md:p-6 hover:border-primary hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-primary/10 border border-primary group-hover:bg-primary transition-colors">
                  <area.icon className="h-5 w-5 sm:h-5.5 sm:w-5.5 md:h-6 md:w-6 text-primary group-hover:text-primary-foreground transition-colors" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2">{area.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{area.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
