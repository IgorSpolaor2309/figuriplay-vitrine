"use client"

import { useState } from "react"
import { AppLink } from "@/components/app-link"
import { ProductCard } from "@/components/store/product-card"
import { products } from "@/data/catalog"
import { cn } from "@/lib/utils"
import type { ProductKind } from "@/types"

const FILTERS: { id: "todos" | ProductKind; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "avulsa", label: "Avulsas" },
  { id: "pacote", label: "Pacotes" },
  { id: "album", label: "Álbuns" },
]

export function CatalogView() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("todos")
  const shown = filter === "todos" ? products : products.filter((p) => p.kind === filter)

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <nav aria-label="Você está em" className="mb-4 text-sm text-muted-foreground">
        <AppLink to={{ name: "home" }} className="hover:text-foreground">Início</AppLink> / <span className="text-foreground">Produtos</span>
      </nav>
      <h1 className="text-3xl font-extrabold sm:text-4xl">Produtos</h1>
      <p className="mt-1 text-muted-foreground">Catálogo de demonstração com três produtos ilustrativos.</p>

      <div className="mt-6 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Filtrar por tipo">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            aria-pressed={filter === f.id}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-3 focus-visible:outline-ring",
              filter === f.id ? "border-ink bg-ink text-white" : "border-border bg-card hover:border-foreground/30"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
        {shown.length} {shown.length === 1 ? "produto" : "produtos"}
      </p>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
