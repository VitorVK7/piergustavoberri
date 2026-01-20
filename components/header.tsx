'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, Phone } from 'lucide-react'
import Image from 'next/image'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { label: 'Início', href: '#inicio' },
    { label: 'Quem é Pier', href: '#quem-e-pier' },
    { label: 'Áreas', href: '#areas' },
    { label: 'Contato', href: '#contato' },
  ]

  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/98 backdrop-blur-md shadow-md' : 'bg-background/95 backdrop-blur-sm'} border-b border-border`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
          <a href="#inicio" className="flex items-center flex-shrink-0">
            <Image
              src="/images/logo-20png-horizontal.png"
              alt="Pier Gustavo Berri Advocacia"
              width={180}
              height={45}
              className="h-8 sm:h-9 lg:h-10 w-auto"
              priority
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+554733795482" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors">
              <Phone className="h-4 w-4" />
              <span className="hidden xl:inline">Massaranduba/SC</span>
            </a>
            <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a href="#contato">
                Falar com a equipe
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground p-2 -mr-2 touch-manipulation"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="py-4 border-t border-border flex flex-col gap-1">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors py-3 px-2 rounded-lg"
                onClick={handleNavClick}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 mt-2 border-t border-border">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 w-full h-12 text-base">
                <a href="#contato" onClick={handleNavClick}>
                  Falar com a equipe
                </a>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
