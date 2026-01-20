import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export function FAQ() {
  const faqs = [
    {
      question: 'Preciso de advogado para pedir benefício?',
      answer: 'A lei permite o pedido direto, mas erros de regra, CNIS e prazos podem reduzir valor ou gerar retrabalho. Aqui nós revisamos e orientamos cada etapa.',
    },
    {
      question: 'Atendem só em SC?',
      answer: 'Presencial na sede e online para todo o Brasil.',
    },
    {
      question: 'Quanto tempo leva?',
      answer: 'Depende do caso e dos órgãos envolvidos. Explicamos prazos estimados e atualizamos você.',
    },
    {
      question: 'Como começar?',
      answer: 'Separe documentos básicos e envie o formulário; retornamos com os próximos passos.',
    },
  ]

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Perguntas frequentes
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Respostas diretas para as dúvidas mais comuns
            </p>
          </div>
          <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-card border-border rounded-xl px-4 sm:px-5 md:px-6 shadow-sm">
                <AccordionTrigger className="text-left hover:text-primary text-sm sm:text-base py-4 sm:py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-sm sm:text-base pb-4 sm:pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
