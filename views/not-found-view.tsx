import { buttonVariants } from "@/components/ui/button-variants"
import { AppLink } from "@/components/app-link"

export function NotFoundView() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-20 text-center">
      <p className="font-mono text-6xl font-bold text-primary-ink">404</p>
      <h1 className="text-2xl font-extrabold">Página não encontrada</h1>
      <p className="text-muted-foreground">Este endereço não existe na prévia.</p>
      <AppLink to={{ name: "home" }} className={buttonVariants({ size: "lg" })}>Voltar ao início</AppLink>
    </div>
  )
}
