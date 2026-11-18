"use client"

import { Home, LayoutGrid, ListChecks, ShoppingBag } from "lucide-react"
import { AppLink } from "@/components/app-link"
import { CartBadge } from "@/components/layout/site-header"
import { useCurrentRoute } from "@/lib/use-current-route"
import { cn } from "@/lib/utils"
import type { Route } from "@/lib/routes"

const ITEMS: { label: string; to: Route; match: Route["name"][]; icon: typeof Home }[] = [
  { label: "Início", to: { name: "home" }, match: ["home"], icon: Home },
  { label: "Produtos", to: { name: "catalog" }, match: ["catalog", "product"], icon: LayoutGrid },
  { label: "Faltantes", to: { name: "missing" }, match: ["missing"], icon: ListChecks },
  { label: "Pedido", to: { name: "order" }, match: ["order"], icon: ShoppingBag },
]

/** Navegação de polegar para celular. */
export function MobileNav() {
  const route = useCurrentRoute()
  return (
    <nav
      aria-label="Navegação rápida"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom,0px)] backdrop-blur md:hidden"
    >
      <ul className="mx-auto grid max-w-md grid-cols-4">
        {ITEMS.map(({ label, to, match, icon: Icon }) => {
          const active = match.includes(route.name)
          return (
            <li key={label}>
              <AppLink
                to={to}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-16 flex-col items-center justify-center gap-1 text-[0.72rem] font-semibold transition-colors",
                  active ? "text-foreground" : "text-muted-foreground"
                )}
              >
                <span className={cn("relative flex h-7 w-12 items-center justify-center rounded-full", active && "bg-primary/20")}>
                  <Icon className="size-5" aria-hidden="true" />
                  {to.name === "order" && <CartBadge className="-right-1" />}
                </span>
                {label}
              </AppLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
