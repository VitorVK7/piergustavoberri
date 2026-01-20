import { Button } from '@/components/ui/button'
import { Instagram } from 'lucide-react'

export function SocialFollow() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-balance px-2">
            Siga o perfil e acompanhe conteúdos que ajudam você a organizar documentos e prazos com tranquilidade.
          </h2>
          <Button asChild size="lg" variant="outline" className="border-border hover:bg-card bg-transparent h-12 sm:h-14 text-base sm:text-lg px-6 sm:px-8">
            <a href="https://instagram.com/piergustavoberri.adv" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Instagram className="h-5 w-5" />
              @piergustavoberri.adv
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
