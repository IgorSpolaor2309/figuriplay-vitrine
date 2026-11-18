import type { ReactNode } from "react"
import { Toaster } from "@/components/ui/sonner"
import { SkipLink } from "@/components/layout/skip-link"
import { DemoBanner } from "@/components/layout/demo-banner"
import { SiteHeader } from "@/components/layout/site-header"
import { MobileNav } from "@/components/layout/mobile-nav"
import { SiteFooter } from "@/components/layout/site-footer"
import { BackToTop } from "@/components/layout/back-to-top"
import { CartProvider } from "@/context/cart-context"

/** Estrutura comum da loja: aviso de prévia, cabeçalho, conteúdo e rodapé. */
export function AppFrame({ children }: { children: ReactNode }) {
  return (
    <>
      <SkipLink />
      <CartProvider>
        <div className="pb-mobile-nav flex min-h-screen flex-col bg-background">
          <DemoBanner />
          <SiteHeader />
          <main id="conteudo" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
        <MobileNav />
        <BackToTop />
      </CartProvider>
      <Toaster />
    </>
  )
}
