export type ProductKind = "avulsa" | "pacote" | "album"

export interface ProductOption {
  id: string
  label: string
  /** Valor somado ao preço base (demonstrativo). */
  priceAdjustment: number
}

export interface Product {
  id: string
  slug: string
  kind: ProductKind
  name: string
  /** Rótulo curto do tipo, usado em selos e filtros. */
  kindLabel: string
  tagline: string
  description: string
  highlights: string[]
  price: number
  /** Ex.: "por figurinha", "por pacote". */
  priceUnit: string
  options?: { label: string; values: ProductOption[] }
  specs: Record<string, string>
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
  option?: ProductOption
  /** Números escolhidos (somente para figurinhas avulsas). */
  numbers?: number[]
}
