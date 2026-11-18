import { AppLink } from "@/components/app-link"
import { ProductCard } from "@/components/store/product-card"
import { ProductPurchase } from "@/components/store/product-purchase"
import { products } from "@/data/catalog"
import type { Product } from "@/types"

export function ProductView({ product }: { product: Product }) {
  const others = products.filter((p) => p.id !== product.id)
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <nav aria-label="Você está em" className="mb-6 text-sm text-muted-foreground">
        <AppLink to={{ name: "home" }} className="hover:text-foreground">Início</AppLink> /{" "}
        <AppLink to={{ name: "catalog" }} className="hover:text-foreground">Produtos</AppLink> /{" "}
        <span className="text-foreground">{product.name}</span>
      </nav>

      <ProductPurchase key={product.id} product={product} />

      <section className="mt-16" aria-labelledby="outros">
        <h2 id="outros" className="mb-5 text-2xl font-extrabold">Combine com</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {others.map((p) => (
            <ProductCard key={p.id} product={p} compact />
          ))}
        </div>
      </section>
    </div>
  )
}
