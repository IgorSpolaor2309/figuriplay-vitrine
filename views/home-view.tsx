import { ArrowRight, ListChecks } from "lucide-react"
import { buttonVariants } from "@/components/ui/button-variants"
import { AppLink } from "@/components/app-link"
import { HeroScene } from "@/components/art/scenes"
import { ProductCard } from "@/components/store/product-card"
import { MissingNumbersTeaser } from "@/components/store/missing-numbers-tool"
import { products } from "@/data/catalog"

const STEPS = [
  { title: "Cliente escolhe", text: "Pacotes, álbuns e avulsas pelo número, tudo no mesmo pedido." },
  { title: "Pedido chega organizado", text: "A loja recebe a lista pronta, sem procurar números em conversas." },
  { title: "Loja confirma", text: "Disponibilidade e valor final conferidos antes de cobrar." },
  { title: "Pagamento registrado", text: "Cada pedido com seu status: aguardando, pago, separado." },
]

export function HomeView() {
  return (
    <div className="flex flex-col">
      {/* Capa */}
      <section className="bg-album-dots overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-6 px-4 pt-8 pb-10 sm:px-6 md:grid-cols-[1.05fr_1fr] md:pt-14 md:pb-16">
          <div className="flex flex-col gap-5">
            <p className="w-fit rounded-full border border-ink/15 bg-card px-3 py-1 text-xs font-bold tracking-wide text-ink uppercase">
              Loja de figurinhas
            </p>
            <h1 className="text-[2.6rem] leading-[1.02] font-extrabold tracking-tight text-balance sm:text-6xl">
              Complete o álbum <span className="relative text-primary-ink sm:whitespace-nowrap">sem perder a conta.</span>
            </h1>
            <p className="max-w-md text-lg text-muted-foreground">
              Avulsas pelo número, pacotes e álbuns. Monte o pedido aqui e a loja recebe tudo organizado.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <AppLink to={{ name: "catalog" }} className={buttonVariants({ size: "lg", className: "h-12 rounded-full px-6 text-base" })}>
                Ver produtos
                <ArrowRight aria-hidden="true" />
              </AppLink>
              <AppLink to={{ name: "missing" }} className={buttonVariants({ variant: "outline", size: "lg", className: "h-12 rounded-full bg-card px-6 text-base" })}>
                <ListChecks aria-hidden="true" />
                Informar faltantes
              </AppLink>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md md:max-w-none">
            <HeroScene className="h-auto w-full drop-shadow-sm" />
          </div>
        </div>
      </section>

      {/* Produtos */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 md:py-16" aria-labelledby="produtos-home">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 id="produtos-home" className="text-2xl font-extrabold sm:text-3xl">Avulsa, pacote ou álbum</h2>
            <p className="mt-1 text-muted-foreground">Três produtos de exemplo para mostrar como o catálogo funciona.</p>
          </div>
          <AppLink to={{ name: "catalog" }} className="hidden shrink-0 items-center gap-1 text-sm font-bold hover:underline sm:flex">
            Ver todos <ArrowRight className="size-4" aria-hidden="true" />
          </AppLink>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Faltantes */}
      <section className="px-4 sm:px-6" aria-labelledby="faltantes-home">
        <div className="mx-auto grid max-w-6xl items-center gap-8 rounded-[2rem] bg-primary p-6 sm:p-10 md:grid-cols-2">
          <div className="flex flex-col gap-4 text-ink">
            <p className="w-fit rounded-full bg-ink px-3 py-1 text-xs font-bold tracking-wide text-white uppercase">Lista de faltantes</p>
            <h2 id="faltantes-home" className="text-3xl font-extrabold text-balance sm:text-4xl">Digite os números. A lista sai pronta.</h2>
            <p className="max-w-md text-base">
              O colecionador escreve do jeito que já manda no WhatsApp, como <span className="font-mono font-bold">18-22</span>, e a loja recebe os números em ordem, sem repetição.
            </p>
            <AppLink to={{ name: "missing" }} className={buttonVariants({ size: "lg", className: "h-12 w-fit rounded-full bg-ink px-6 text-base text-white hover:bg-ink/90" })}>
              Montar minha lista
              <ArrowRight aria-hidden="true" />
            </AppLink>
          </div>
          <MissingNumbersTeaser />
        </div>
      </section>

      {/* Como funciona */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 md:py-16" aria-labelledby="como-funciona">
        <h2 id="como-funciona" className="text-2xl font-extrabold sm:text-3xl">Como o pedido pode funcionar</h2>
        <p className="mt-1 max-w-2xl text-muted-foreground">
          Proposta para a versão completa da loja. Nesta prévia, os botões de envio e pagamento só mostram um aviso.
        </p>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex flex-col gap-3 rounded-3xl border border-border bg-card p-5">
              <span className="flex size-10 items-center justify-center rounded-xl bg-sun font-mono text-lg font-bold text-ink">{i + 1}</span>
              <h3 className="text-lg font-bold">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
