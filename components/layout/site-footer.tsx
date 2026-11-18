import { AppLink } from "@/components/app-link"
import { Logo } from "@/components/brand/logo"

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="max-w-md text-sm text-muted-foreground">
            Prévia de loja virtual preparada para apresentação. Produtos, preços, imagens e botões são demonstrativos.
            Esta prévia não tem vínculo com editoras, fabricantes ou marcas de figurinhas.
          </p>
        </div>
        <nav aria-label="Rodapé" className="flex flex-col gap-2 text-sm md:items-end">
          <AppLink to={{ name: "catalog" }} className="font-semibold hover:underline">Produtos</AppLink>
          <AppLink to={{ name: "missing" }} className="font-semibold hover:underline">Lista de faltantes</AppLink>
          <AppLink to={{ name: "order" }} className="font-semibold hover:underline">Meu pedido</AppLink>
        </nav>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted-foreground sm:px-6">
          Ilustrações próprias da prévia. Construída sobre o Next.js Ecommerce Starter da thefrontkit (licença MIT).
        </p>
      </div>
    </footer>
  )
}
