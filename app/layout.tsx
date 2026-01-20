import React from "react"
import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfairDisplay = Playfair_Display({ 
  subsets: ["latin"],
  weight: ['600', '700'],
  variable: '--font-serif'
});

const inter = Inter({ 
  subsets: ["latin"],
  weight: ['400', '500', '600'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'Pier Gustavo Berri Advocacia — Orientação Jurídica com Clareza | SC e Online',
  description: 'Há mais de 22 anos orientando pessoas e empresas. Especialista em Auxílio-Acidente, Previdenciário, Civil, Família, Trabalho, Empresarial e Sucessões. Atendimento presencial em Massaranduba/SC e online para todo o Brasil.',
  keywords: ['advogado', 'advocacia', 'auxílio-acidente', 'previdenciário', 'direito civil', 'direito família', 'Massaranduba', 'Santa Catarina'],
  authors: [{ name: 'Pier Gustavo Berri' }],
  generator: 'v0.app',
  openGraph: {
    title: 'Pier Gustavo Berri Advocacia',
    description: 'Orientação jurídica com clareza há mais de 22 anos. Especialista em Auxílio-Acidente e Direito Previdenciário.',
    type: 'website',
    locale: 'pt_BR',
  },
  icons: {
    icon: [
      {
        url: '/favicon.png',
        type: 'image/png',
      },
      {
        url: '/icon-light-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/icon-dark-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: '/apple-icon.png',
    shortcut: '/favicon.png',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#B8985F',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${playfairDisplay.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
