import { Scale, Briefcase, Building2, Globe } from 'lucide-react'
import { Card } from '@/components/ui/card'

export function TrustBar() {
  const stats = [
    {
      icon: Scale,
      text: 'Atuação jurídica desde 2003',
    },
    {
      icon: Briefcase,
      text: 'Escritório próprio desde 2009',
    },
    {
      icon: Building2,
      text: 'TJSC, Conciliador, Procuradoria de SC',
    },
    {
      icon: Globe,
      text: 'Massaranduba/SC e Online',
    },
  ]

  return (
    <section className="py-10 sm:py-12 md:py-16 border-y border-border bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card border-border p-4 sm:p-5 md:p-6 hover:border-primary hover:shadow-md transition-all">
              <div className="flex flex-col items-center text-center gap-2 sm:gap-3 md:gap-4">
                <stat.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary" strokeWidth={1.5} />
                <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">{stat.text}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
