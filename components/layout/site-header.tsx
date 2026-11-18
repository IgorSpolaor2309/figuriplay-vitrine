"use client"

import { ShoppingBag } from "lucide-react"
import { AppLink } from "@/components/app-link"
import { Logo } from "@/components/brand/logo"
import { useCart } from "@/context/cart-context"
import { useCurrentRoute } from "@/lib/use-current-route"
import { cn } from "@/lib/utils"
import type { Route } from "@/lib/routes"

export const NAV: { label: string; to: Route; match: Route["name"][] }[] = [
  { label: "Início", to: { name: "home" }, match: ["home"] },
  { label: "Produtos", to: { name: "catalog" }, match: ["catalog", "product"] },
  { label: "Faltantes", to: { name: "missing" }, match: ["missing"] },
]

export function CartBadge({ className }: { className?: string }) {
  const { count, ready } = useCart()
  if (!ready || count === 0) return null
  return (
    <span
      className={cn(
        "absolute -top-1.5 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[0.7rem] font-bold text-primary-foreground tabular-nums",
        className
      )}
    >
      {count > 99 ? "99+" : count}
    </span>
  )
}

export function SiteHeader() {
  const route = useCurrentRoute()
  const { count, ready } = useCart()

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <AppLink to={{ name: "home" }} aria-label="FiguriPlay, página inicial" className="rounded-lg focus-visible:outline-2 focus-visible:outline-ring">
          <Logo />
        </AppLink>

        <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = item.match.includes(route.name)
            return (
              <AppLink
                key={item.label}
                to={item.to}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted",
                  active ? "bg-muted text-foreground" : "text-muted-foreground"
                )}
              >
                {item.label}
              </AppLink>
            )
          })}
        </nav>

        <AppLink
          to={{ name: "order" }}
          aria-label={ready && count > 0 ? `Pedido, ${count} itens` : "Pedido"}
          className={cn(
            "relative inline-flex h-10 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-semibold transition-colors hover:border-foreground/30",
            route.name === "order" && "border-foreground/40"
          )}
        >
          <ShoppingBag className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline">Meu pedido</span>
          <CartBadge />
        </AppLink>
      </div>
    </header>
  )
}
