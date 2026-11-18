"use client"

import { CreditCard, Send, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button-variants"
import { AppLink } from "@/components/app-link"
import { ProductScene, SCENE_VIEWS } from "@/components/art/scenes"
import { DemoAction } from "@/components/store/demo-action"
import { QuantitySelector } from "@/components/store/quantity-selector"
import { DemoPriceTag } from "@/components/store/price"
import { unitPrice, useCart } from "@/context/cart-context"
import { formatBRL, plural } from "@/lib/format"
import { formatNumberList } from "@/lib/missing-numbers"

export function OrderView() {
  const { items, subtotal, count, ready, updateQuantity, removeItem, clear } = useCart()

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <nav aria-label="Você está em" className="mb-4 text-sm text-muted-foreground">
        <AppLink to={{ name: "home" }} className="hover:text-foreground">Início</AppLink> / <span className="text-foreground">Meu pedido</span>
      </nav>
      <h1 className="text-3xl font-extrabold sm:text-4xl">Meu pedido</h1>
      <p className="mt-1 mb-8 text-muted-foreground">Pedido de demonstração, salvo só neste navegador.</p>

      {ready && items.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-input bg-card px-6 py-14 text-center">
          <span className="flex size-16 items-center justify-center rounded-2xl bg-sun">
            <ShoppingBag className="size-7 text-ink" aria-hidden="true" />
          </span>
          <h2 className="text-xl font-bold">Seu pedido está vazio</h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            Adicione um pacote ou um álbum, ou monte a lista de figurinhas que faltam.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <AppLink to={{ name: "catalog" }} className={buttonVariants({ size: "lg" })}>Ver produtos</AppLink>
            <AppLink to={{ name: "missing" }} className={buttonVariants({ variant: "outline", size: "lg" })}>Informar faltantes</AppLink>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          <ul className="flex min-w-0 flex-col gap-3" aria-label="Itens do pedido">
            {items.map((item) => (
              <li key={item.id} className="flex gap-4 rounded-3xl border border-border bg-card p-4">
                <div className="size-20 shrink-0 overflow-hidden rounded-2xl sm:size-24">
                  <ProductScene
                    kind={item.product.kind}
                    view={item.option?.id === "dura" ? 2 : 0}
                    title={SCENE_VIEWS[item.product.kind][0]}
                    uid={`order-${item.id.replace(/[^a-z0-9]/gi, "")}`}
                    className="h-full w-full"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <AppLink to={{ name: "product", slug: item.product.slug }} className="font-bold hover:underline">
                        {item.product.name}
                      </AppLink>
                      {item.option && <p className="text-sm text-muted-foreground">{item.option.label}</p>}
                      <p className="text-sm text-muted-foreground tabular-nums">{formatBRL(unitPrice(item))} {item.product.priceUnit}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} aria-label={`Remover ${item.product.name}`}>
                      <Trash2 />
                    </Button>
                  </div>

                  {item.numbers ? (
                    <div className="flex flex-col gap-2">
                      <p className="rounded-xl bg-muted px-3 py-2 font-mono text-sm break-words">{formatNumberList(item.numbers)}</p>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <AppLink to={{ name: "missing" }} className="text-sm font-semibold text-primary-ink hover:underline">
                          Editar números
                        </AppLink>
                        <span className="font-bold tabular-nums">{plural(item.quantity, "figurinha", "figurinhas")} · {formatBRL(unitPrice(item) * item.quantity)}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <QuantitySelector value={item.quantity} onChange={(q) => updateQuantity(item.id, q)} label={`Quantidade de ${item.product.name}`} />
                      <span className="font-bold tabular-nums">{formatBRL(unitPrice(item) * item.quantity)}</span>
                    </div>
                  )}
                </div>
              </li>
            ))}
            {items.length > 0 && (
              <li>
                <Button variant="ghost" onClick={clear} className="text-muted-foreground">
                  Esvaziar pedido
                </Button>
              </li>
            )}
          </ul>

          <aside className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-5 sm:p-6 lg:sticky lg:top-24" aria-labelledby="resumo-pedido">
            <h2 id="resumo-pedido" className="text-lg font-bold">Resumo</h2>
            <dl className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Itens</dt>
                <dd className="font-semibold tabular-nums">{count}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Entrega e pagamento</dt>
                <dd className="text-right font-semibold">a definir com a loja</dd>
              </div>
              <div className="mt-2 flex items-baseline justify-between border-t border-border pt-3">
                <dt className="font-bold">Total</dt>
                <dd className="font-heading text-2xl font-extrabold tabular-nums">{formatBRL(subtotal)}</dd>
              </div>
            </dl>
            <DemoPriceTag className="w-fit" />
            <DemoAction
              className="h-12 w-full rounded-full text-base"
              disabled={items.length === 0}
              title="Pedido não enviado"
              description="Esta é uma prévia. Nenhum pedido foi registrado e nenhuma mensagem foi enviada à loja."
              future={[
                "Registrar o pedido com número e data",
                "Avisar a loja com a lista de itens e números",
                "Acompanhar o status: aguardando, pago, separado",
              ]}
            >
              <Send aria-hidden="true" />
              Enviar pedido para a loja
            </DemoAction>
            <DemoAction
              variant="outline"
              className="h-12 w-full rounded-full text-base"
              disabled={items.length === 0}
              title="Pagamento não disponível na prévia"
              description="Nenhum valor foi cobrado e nenhum dado de pagamento foi pedido."
              future={[
                "Gerar a cobrança depois que a loja confirmar o pedido",
                "Marcar o pedido como pago automaticamente",
                "Guardar o histórico de pagamentos de cada cliente",
              ]}
            >
              <CreditCard aria-hidden="true" />
              Pagar
            </DemoAction>
          </aside>
        </div>
      )}
    </div>
  )
}
