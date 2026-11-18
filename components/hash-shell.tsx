"use client"

import { useEffect } from "react"
import { getProduct } from "@/data/catalog"
import { useCurrentRoute } from "@/lib/use-current-route"
import { CatalogView } from "@/views/catalog-view"
import { HomeView } from "@/views/home-view"
import { MissingView } from "@/views/missing-view"
import { NotFoundView } from "@/views/not-found-view"
import { OrderView } from "@/views/order-view"
import { ProductView } from "@/views/product-view"

const TITLES: Record<string, string> = {
  home: "FiguriPlay",
  catalog: "Produtos | FiguriPlay",
  missing: "Figurinhas que faltam | FiguriPlay",
  order: "Meu pedido | FiguriPlay",
}

/** Troca de telas pelo #hash, usada só no build de página única. */
export function HashShell() {
  const route = useCurrentRoute()
  const product = route.name === "product" ? getProduct(route.slug) : undefined

  useEffect(() => {
    window.scrollTo({ top: 0 })
    document.title = product ? `${product.name} | FiguriPlay` : TITLES[route.name] ?? "FiguriPlay"
  }, [route, product])

  switch (route.name) {
    case "catalog":
      return <CatalogView />
    case "missing":
      return <MissingView />
    case "order":
      return <OrderView />
    case "product":
      return product ? <ProductView product={product} /> : <NotFoundView />
    default:
      return <HomeView />
  }
}
