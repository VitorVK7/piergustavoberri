import Image from 'next/image'
import { MapPin, Phone, Mail } from 'lucide-react'

export function Footer() {
  const menuItems = [
    { label: 'Início', href: '#inicio' },
    { label: 'Quem é Pier', href: '#quem-e-pier' },
    { label: 'Áreas', href: '#areas' },
    { label: 'Contato', href: '#contato' },
  ]

  return (
    <footer className="bg-muted/50 border-t border-border py-10 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-12">
          <div className="col-span-2 sm:col-span-1">
            <Image
              src="/images/logo-20png.png"
              alt="Pier Gustavo Berri Advocacia"
              width={150}
              height={80}
              className="h-12 sm:h-14 md:h-16 w-auto mb-4 sm:mb-6"
            />
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Orientação jurídica com clareza desde 2003.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Menu</h3>
            <nav className="flex flex-col gap-2 sm:gap-3">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contato</h3>
            <div className="space-y-2 sm:space-y-3">
              <a href="tel:+554733707000" className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
                <span>(47) 3370-7000</span>
              </a>
              <a href="https://wa.me/554733795482" className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
                <span>+55 47 3379-5482</span>
              </a>
              <a href="mailto:contato@pierberri.adv.br" className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors break-all">
                <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
                <span>contato@pierberri.adv.br</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Endereço</h3>
            <div className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
              <span>Rua 11 de Novembro<br />Massaranduba/SC</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} Pier Gustavo Berri Advocacia — OAB/SC 29055
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
          <p className="text-xs text-center text-muted-foreground mt-4 sm:mt-6">
            © 2025 VK7 Growth. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
