"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Check, ListChecks, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button-variants"
import { AppLink } from "@/components/app-link"
import { ProductGallery } from "@/components/store/product-gallery"
import { QuantitySelector } from "@/components/store/quantity-selector"
import { DemoPriceTag, Price } from "@/components/store/price"
import { useCart } from "@/context/cart-context"
import { formatBRL, plural } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { Product } from "@/types"

/** Galeria + caixa de compra. A opção escolhida também troca a imagem (capa). */
export function ProductPurchase({ product }: { product: Product }) {
  const { addItem, items } = useCart()
  const [optionId, setOptionId] = useState(product.options?.values[0].id)
  const [quantity, setQuantity] = useState(1)
  const [view, setView] = useState(0)
  const [added, setAdded] = useState(false)

  const option = product.options?.values.find((o) => o.id === optionId)
  const unit = product.price + (option?.priceAdjustment ?? 0)
  const avulsaLine = product.kind === "avulsa" ? items.find((i) => i.product.id === product.id) : undefined

  function chooseOption(id: string) {
    setOptionId(id)
    if (product.kind === "album") setView(id === "dura" ? 2 : 0)
  }

  function add() {
    addItem(product, quantity, option)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
    toast.success("Adicionado ao pedido de demonstração", {
      description: `${quantity} × ${product.name}${option ? ` (${option.label})` : ""}`,
    })
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <ProductGallery kind={product.kind} view={view} onViewChange={setView} />
      </div>

      <div className="flex min-w-0 flex-col gap-6">
        <div className="flex flex-col gap-3">
          <span className="w-fit rounded-full bg-sky px-3 py-1 text-xs font-bold text-ink">{product.kindLabel}</span>
          <h1 className="text-3xl font-extrabold text-balance sm:text-4xl">{product.name}</h1>
          <p className="text-base text-muted-foreground">{product.description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Price value={unit} unit={product.priceUnit} className="text-3xl" />
          <DemoPriceTag />
        </div>

        {product.options && (
          <fieldset className="flex flex-col gap-2">
            <legend className="mb-2 text-sm font-bold">{product.options.label}</legend>
            <div className="flex flex-wrap gap-2">
              {product.options.values.map((o) => (
                <label
                  key={o.id}
                  className={cn(
                    "flex cursor-pointer flex-col rounded-2xl border-2 px-4 py-2.5 transition-colors has-focus-visible:outline-3 has-focus-visible:outline-ring",
                    optionId === o.id ? "border-ink bg-card" : "border-border bg-card hover:border-foreground/30"
                  )}
                >
                  <input type="radio" name="opcao" value={o.id} checked={optionId === o.id} onChange={() => chooseOption(o.id)} className="sr-only" />
                  <span className="text-sm font-bold">{o.label}</span>
                  <span className="text-xs text-muted-foreground tabular-nums">{formatBRL(product.price + o.priceAdjustment)}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {product.kind === "avulsa" ? (
          <div className="flex flex-col gap-3 rounded-3xl border border-border bg-card p-5">
            <p className="text-sm">
              Avulsas são pedidas <strong>pelo número</strong>. Monte a lista do que falta e leve tudo para o pedido de uma vez.
            </p>
            {avulsaLine?.numbers && (
              <p className="rounded-xl bg-accent px-3 py-2 text-sm">
                No pedido: {plural(avulsaLine.numbers.length, "figurinha", "figurinhas")}
              </p>
            )}
            <AppLink to={{ name: "missing" }} className={buttonVariants({ size: "lg", className: "w-full sm:w-fit" })}>
              <ListChecks aria-hidden="true" />
              {avulsaLine ? "Editar lista de números" : "Escolher números"}
            </AppLink>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            <QuantitySelector value={quantity} onChange={setQuantity} />
            <Button size="lg" className="h-11 flex-1 rounded-full sm:flex-none sm:px-8" onClick={add}>
              {added ? <Check aria-hidden="true" /> : <ShoppingBag aria-hidden="true" />}
              {added ? "Adicionado" : "Adicionar ao pedido"}
            </Button>
            <p className="w-full text-sm text-muted-foreground tabular-nums">
              Total deste item: <strong className="text-foreground">{formatBRL(unit * quantity)}</strong>
            </p>
          </div>
        )}

        <ul className="grid gap-2 sm:grid-cols-1">
          {product.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>

        <dl className="divide-y divide-border rounded-3xl border border-border bg-card text-sm">
          {Object.entries(product.specs).map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 px-5 py-3">
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="text-right font-semibold">{v}</dd>
            </div>
          ))}
        </dl>

        <p className="rounded-2xl bg-muted px-4 py-3 text-xs text-muted-foreground">
          Nesta prévia não há estoque, frete nem pagamento. Disponibilidade e condições serão definidas com a loja.
        </p>
      </div>
    </div>
  )
}
