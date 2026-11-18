import { ArrowRight } from "lucide-react"
import { AppLink } from "@/components/app-link"
import { ProductScene, SCENE_VIEWS } from "@/components/art/scenes"
import { DemoPriceTag, Price } from "@/components/store/price"
import type { Product } from "@/types"

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  return (
    <AppLink
      to={{ name: "product", slug: product.slug }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgb(27_37_80/0.35)] focus-visible:outline-3 focus-visible:outline-ring"
    >
      <div className="relative aspect-square overflow-hidden">
        <ProductScene kind={product.kind} title={SCENE_VIEWS[product.kind][0]} uid={`card-${product.slug}`} className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]" />
        <span className="absolute top-3 left-3 rounded-full bg-card px-3 py-1 text-xs font-bold text-foreground shadow-sm">
          {product.kindLabel}
        </span>
      </div>
      <div className={compact ? "flex flex-1 flex-col gap-1 p-3 sm:gap-2 sm:p-5" : "flex flex-1 flex-col gap-2 p-5"}>
        <h3 className={compact ? "text-base leading-snug font-bold sm:text-lg" : "text-lg font-bold"}>{product.name}</h3>
        <p className={compact ? "hidden text-sm text-muted-foreground sm:block" : "text-sm text-muted-foreground"}>{product.tagline}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <div className="flex flex-col gap-1">
            <Price value={product.price} unit={product.priceUnit} className={compact ? "text-lg sm:text-xl" : "text-xl"} />
            <DemoPriceTag className="w-fit" />
          </div>
          <span className={compact ? "hidden size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:translate-x-1 sm:flex" : "flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:translate-x-1"} aria-hidden="true">
            <ArrowRight className="size-5" />
          </span>
        </div>
      </div>
    </AppLink>
  )
}
