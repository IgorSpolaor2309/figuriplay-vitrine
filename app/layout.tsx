import type { Metadata, Viewport } from "next"
import { Bricolage_Grotesque, Figtree, JetBrains_Mono } from "next/font/google"
import { AppFrame } from "@/components/layout/app-frame"
import "./globals.css"

const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] })
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"] })
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] })

export const metadata: Metadata = {
  title: { default: "FiguriPlay", template: "%s | FiguriPlay" },
  description: "Prévia demonstrativa da loja FiguriPlay: figurinhas avulsas, pacotes e álbuns.",
  robots: { index: false, follow: false },
}

export const viewport: Viewport = {
  themeColor: "#f6f7fb",
  viewportFit: "cover",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${bricolage.variable} ${figtree.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <AppFrame>{children}</AppFrame>
      </body>
    </html>
  )
}
