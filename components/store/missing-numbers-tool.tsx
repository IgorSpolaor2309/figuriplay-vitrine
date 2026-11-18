"use client"

import { useMemo, useState } from "react"
import { toast } from "sonner"
import { Check, ClipboardCopy, Eraser, ShoppingBag, TriangleAlert, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AppLink } from "@/components/app-link"
import { DemoPriceTag } from "@/components/store/price"
import { useCart } from "@/context/cart-context"
import { DEMO_COLLECTION, getProduct } from "@/data/catalog"
import { formatBRL, plural } from "@/lib/format"
import { formatNumberList, parseMissingNumbers } from "@/lib/missing-numbers"
import { cn } from "@/lib/utils"

const EXAMPLE = "7, 12, 30-35, 101, 230"
const PAGE_SIZE = 50

/**
 * Demonstração da lista de faltantes: o cliente digita ou toca nos números
 * e vê a lista organizada, com total ilustrativo, antes de levar ao pedido.
 */
export function MissingNumbersTool() {
  const { first, last } = DEMO_COLLECTION
  const avulsa = getProduct("figurinha-avulsa")!
  const { setNumbers, items } = useCart()

  const [text, setText] = useState(EXAMPLE)
  const [isExample, setIsExample] = useState(true)
  const parsed = useMemo(() => parseMissingNumbers(text, first, last), [text, first, last])
  const selected = useMemo(() => new Set(parsed.numbers), [parsed.numbers])
  const [page, setPage] = useState(0)

  const pages = Math.ceil((last - first + 1) / PAGE_SIZE)
  const pageStart = first + page * PAGE_SIZE
  const pageEnd = Math.min(pageStart + PAGE_SIZE - 1, last)
  const total = parsed.numbers.length * avulsa.price
  const inOrder = items.find((i) => i.product.id === avulsa.id)?.numbers

  function updateText(value: string) {
    setText(value)
    setIsExample(false)
  }

  function toggle(n: number) {
    const next = new Set(selected)
    if (next.has(n)) next.delete(n)
    else next.add(n)
    updateText(formatNumberList([...next]))
  }

  function countInPage(p: number) {
    const a = first + p * PAGE_SIZE
    const b = a + PAGE_SIZE - 1
    return parsed.numbers.filter((n) => n >= a && n <= b).length
  }

  async function copyList() {
    const content = `Figurinhas que faltam (${parsed.numbers.length}): ${formatNumberList(parsed.numbers)}`
    try {
      await navigator.clipboard.writeText(content)
      toast.success("Lista copiada", { description: "Cole onde quiser. Nada foi enviado." })
    } catch {
      toast.info("Não foi possível copiar automaticamente", { description: content })
    }
  }

  function addToOrder() {
    setNumbers(avulsa, parsed.numbers)
    toast.success(`${plural(parsed.numbers.length, "figurinha", "figurinhas")} no pedido de demonstração`, {
      description: "O pedido fica só neste navegador.",
    })
  }

  const hasIssues = parsed.invalid.length > 0 || parsed.outOfRange.length > 0

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
      <div className="flex min-w-0 flex-col gap-6">
        {/* Digitar */}
        <section className="rounded-3xl border border-border bg-card p-5 sm:p-6" aria-labelledby="digitar">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 id="digitar" className="text-lg font-bold">1. Digite ou cole os números</h2>
            {isExample && (
              <span className="rounded-full bg-sun px-2.5 py-0.5 text-xs font-bold text-ink">Exemplo preenchido</span>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Separe por vírgula ou espaço. Para uma sequência, use hífen: <span className="font-mono">30-35</span>.
          </p>
          <Label htmlFor="faltantes-texto" className="sr-only">
            Números das figurinhas que faltam
          </Label>
          <Textarea
            id="faltantes-texto"
            value={text}
            onChange={(e) => updateText(e.target.value)}
            rows={3}
            inputMode="text"
            spellCheck={false}
            placeholder="Ex.: 7, 12, 30-35, 101"
            className="mt-4 min-h-24 rounded-2xl bg-background px-4 py-3 font-mono text-base"
            aria-describedby="faltantes-status"
          />
          <div id="faltantes-status" className="mt-3 flex flex-col gap-2 text-sm" aria-live="polite">
            <p className="flex items-center gap-2 font-semibold text-success">
              <Check className="size-4" aria-hidden="true" />
              {parsed.numbers.length === 0 ? "Nenhum número reconhecido ainda" : `${plural(parsed.numbers.length, "número reconhecido", "números reconhecidos")}`}
              {parsed.duplicates > 0 && <span className="font-normal text-muted-foreground">({plural(parsed.duplicates, "repetido unido", "repetidos unidos")})</span>}
            </p>
            {hasIssues && (
              <p className="flex items-start gap-2 text-primary-ink">
                <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>
                  {parsed.invalid.length > 0 && <>Não entendemos: <span className="font-mono">{parsed.invalid.join(" ")}</span>. </>}
                  {parsed.outOfRange.length > 0 && (
                    <>
                      Fora da coleção ({first} a {last}): <span className="font-mono">{parsed.outOfRange.slice(0, 8).join(", ")}{parsed.outOfRange.length > 8 ? "…" : ""}</span>.
                    </>
                  )}
                </span>
              </p>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => updateText("")} disabled={text.length === 0}>
              <Eraser aria-hidden="true" />
              Limpar
            </Button>
            {!isExample && (
              <Button variant="ghost" onClick={() => { setText(EXAMPLE); setIsExample(true) }}>
                Usar exemplo
              </Button>
            )}
          </div>
        </section>

        {/* Grade */}
        <section className="rounded-3xl border border-border bg-card p-5 sm:p-6" aria-labelledby="grade">
          <h2 id="grade" className="text-lg font-bold">2. Ou toque nos números que faltam</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {DEMO_COLLECTION.name}, de {first} a {last}. Toque de novo para desmarcar.
          </p>
          <div className="mt-4 -mx-1 flex gap-2 overflow-x-auto px-1 pb-2" role="group" aria-label="Faixas de números">
            {Array.from({ length: pages }, (_, p) => {
              const a = first + p * PAGE_SIZE
              const b = Math.min(a + PAGE_SIZE - 1, last)
              const n = countInPage(p)
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  aria-pressed={page === p}
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 font-mono text-sm font-semibold transition-colors focus-visible:outline-3 focus-visible:outline-ring",
                    page === p ? "border-ink bg-ink text-white" : "border-border bg-background hover:border-foreground/30"
                  )}
                >
                  {a}–{b}
                  {n > 0 && (
                    <span className={cn("rounded-full px-1.5 text-[0.7rem]", page === p ? "bg-primary text-ink" : "bg-primary/20 text-primary-ink")}>{n}</span>
                  )}
                </button>
              )
            })}
          </div>
          <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-10">
            {Array.from({ length: pageEnd - pageStart + 1 }, (_, i) => {
              const n = pageStart + i
              const on = selected.has(n)
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => toggle(n)}
                  aria-pressed={on}
                  aria-label={`Figurinha ${n}${on ? ", marcada como faltante" : ""}`}
                  className={cn(
                    "flex aspect-[4/5] items-center justify-center rounded-xl border-2 font-mono text-sm font-bold tabular-nums transition-all focus-visible:outline-3 focus-visible:outline-ring sm:text-base",
                    on
                      ? "border-primary-ink bg-primary text-ink shadow-[0_6px_0_-2px_var(--primary-ink)]"
                      : "border-dashed border-input bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                  )}
                >
                  {n}
                </button>
              )
            })}
          </div>
        </section>
      </div>

      {/* Resumo */}
      <aside className="flex flex-col gap-4 rounded-3xl bg-ink p-5 text-white sm:p-6 lg:sticky lg:top-24" aria-labelledby="resumo">
        <h2 id="resumo" className="text-lg font-bold text-white">3. Sua lista</h2>
        <div className="flex items-end justify-between gap-3">
          <p>
            <span className="block font-heading text-5xl font-extrabold tabular-nums text-sun">{parsed.numbers.length}</span>
            <span className="text-sm text-white/75">{parsed.numbers.length === 1 ? "figurinha" : "figurinhas"} faltando</span>
          </p>
          <p className="text-right">
            <span className="block font-heading text-2xl font-bold tabular-nums">{formatBRL(total)}</span>
            <span className="text-xs text-white/75">{formatBRL(avulsa.price)} cada</span>
          </p>
        </div>
        <DemoPriceTag className="w-fit border-white/40 text-white/80" />
        {parsed.numbers.length > 0 ? (
          <ul className="flex max-h-48 flex-wrap gap-1.5 overflow-y-auto" aria-label="Números na lista">
            {parsed.numbers.map((n) => (
              <li key={n}>
                <button
                  type="button"
                  onClick={() => toggle(n)}
                  className="group inline-flex items-center gap-1 rounded-lg bg-white/10 px-2 py-1 font-mono text-sm font-semibold tabular-nums hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-sun"
                  aria-label={`Remover ${n}`}
                >
                  {n}
                  <X className="size-3 opacity-60 group-hover:opacity-100" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-xl bg-white/10 p-3 text-sm text-white/80">Digite números ou toque na grade para montar a lista.</p>
        )}
        <div className="flex flex-col gap-2 pt-1">
          <Button size="lg" className="w-full" onClick={addToOrder} disabled={parsed.numbers.length === 0}>
            <ShoppingBag aria-hidden="true" />
            {inOrder ? "Atualizar no pedido" : "Levar para o pedido"}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            onClick={copyList}
            disabled={parsed.numbers.length === 0}
          >
            <ClipboardCopy aria-hidden="true" />
            Copiar lista
          </Button>
          {inOrder && (
            <AppLink to={{ name: "order" }} className="pt-1 text-center text-sm font-semibold text-sun underline-offset-4 hover:underline">
              Ver pedido ({plural(inOrder.length, "figurinha avulsa", "figurinhas avulsas")})
            </AppLink>
          )}
        </div>
      </aside>
    </div>
  )
}

/** Versão compacta para a home: só digitar e ver o resultado. */
export function MissingNumbersTeaser() {
  const { first, last } = DEMO_COLLECTION
  const [text, setText] = useState("3, 18-22, 40")
  const parsed = useMemo(() => parseMissingNumbers(text, first, last), [text, first, last])
  return (
    <div className="rounded-3xl bg-card p-5 text-foreground shadow-[0_24px_60px_-30px_rgb(27_37_80/0.6)] sm:p-6">
      <Label htmlFor="teaser-faltantes" className="text-sm font-bold">
        Quais números faltam?
      </Label>
      <input
        id="teaser-faltantes"
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        className="mt-2 h-12 w-full rounded-2xl border border-input bg-background px-4 font-mono text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
        placeholder="Ex.: 3, 18-22, 40"
      />
      <div className="mt-4 flex min-h-10 flex-wrap gap-1.5" aria-live="polite">
        {parsed.numbers.slice(0, 18).map((n) => (
          <span key={n} className="inline-flex h-8 min-w-9 items-center justify-center rounded-lg bg-primary px-2 font-mono text-sm leading-none font-bold text-ink tabular-nums">
            {n}
          </span>
        ))}
        {parsed.numbers.length > 18 && <span className="px-1 py-1 text-sm text-muted-foreground">+{parsed.numbers.length - 18}</span>}
        {parsed.numbers.length === 0 && <span className="py-1 text-sm text-muted-foreground">Digite alguns números para ver a lista.</span>}
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        {plural(parsed.numbers.length, "figurinha", "figurinhas")} na lista
        {parsed.invalid.length + parsed.outOfRange.length > 0 && " · alguns itens não foram reconhecidos"}
      </p>
    </div>
  )
}
