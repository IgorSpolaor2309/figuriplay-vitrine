import { AppLink } from "@/components/app-link"
import { MissingNumbersTool } from "@/components/store/missing-numbers-tool"

export function MissingView() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <nav aria-label="Você está em" className="mb-4 text-sm text-muted-foreground">
        <AppLink to={{ name: "home" }} className="hover:text-foreground">Início</AppLink> / <span className="text-foreground">Faltantes</span>
      </nav>
      <h1 className="text-3xl font-extrabold text-balance sm:text-4xl">Figurinhas que faltam</h1>
      <p className="mt-1 mb-8 max-w-2xl text-muted-foreground">
        Informe os números do jeito que for mais fácil. A lista é organizada na hora e pode ir direto para o pedido.
        Nesta prévia, usamos uma coleção de exemplo com números de 1 a 300.
      </p>
      <MissingNumbersTool />
    </div>
  )
}
