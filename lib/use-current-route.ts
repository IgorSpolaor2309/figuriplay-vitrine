"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { hashToRoute, SINGLE_FILE, type Route } from "@/lib/routes"

function pathToRoute(path: string): Route {
  const p = path.replace(/\/+$/, "")
  if (p === "/produtos") return { name: "catalog" }
  if (p.startsWith("/produtos/")) return { name: "product", slug: p.split("/")[2] }
  if (p === "/faltantes") return { name: "missing" }
  if (p === "/pedido") return { name: "order" }
  return { name: "home" }
}

/** Tela atual, seja pelo caminho (site com rotas) ou pelo #hash (página única). */
export function useCurrentRoute(): Route {
  const pathname = usePathname()
  const [hashRoute, setHashRoute] = useState<Route>({ name: "home" })

  useEffect(() => {
    if (!SINGLE_FILE) return
    const sync = () => setHashRoute(hashToRoute(window.location.hash))
    sync()
    window.addEventListener("hashchange", sync)
    return () => window.removeEventListener("hashchange", sync)
  }, [])

  return SINGLE_FILE ? hashRoute : pathToRoute(pathname ?? "/")
}
