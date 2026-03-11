import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { TrustBar } from "@/components/trust-bar"
import { PracticeAreas } from "@/components/practice-areas"
import { SeguroNegado } from "@/components/seguro-negado"
import { About } from "@/components/about"
import { FAQ } from "@/components/faq"
import { SocialFollow } from "@/components/social-follow"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <TrustBar />
      <PracticeAreas />
      <SeguroNegado />
      <About />
      <FAQ />
      <SocialFollow />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
