import type { Metadata } from "next"
import { CatalogView } from "@/views/catalog-view"

export const metadata: Metadata = { title: "Produtos" }

export default function ProdutosPage() {
  return <CatalogView />
}
