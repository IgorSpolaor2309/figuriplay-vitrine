import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProduct, products } from "@/data/catalog"
import { ProductView } from "@/views/product-view"

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return { title: getProduct(slug)?.name ?? "Produto" }
}

export default async function ProdutoPage({ params }: Props) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()
  return <ProductView product={product} />
}
