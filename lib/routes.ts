/**
 * Rotas da vitrine.
 *
 * No build normal cada tela é uma rota do Next.js (/produtos, /faltantes...).
 * No build de arquivo único (NEXT_PUBLIC_SINGLE_FILE=1), usado para publicar a
 * prévia como uma página só, as telas são trocadas pelo #hash do endereço.
 */

export const SINGLE_FILE = process.env.NEXT_PUBLIC_SINGLE_FILE === "1"

export type Route =
  | { name: "home" }
  | { name: "catalog" }
  | { name: "product"; slug: string }
  | { name: "missing" }
  | { name: "order" }

export function routeToPath(route: Route): string {
  switch (route.name) {
    case "home":
      return "/"
    case "catalog":
      return "/produtos/"
    case "product":
      return `/produtos/${route.slug}/`
    case "missing":
      return "/faltantes/"
    case "order":
      return "/pedido/"
  }
}

export function routeToHash(route: Route): string {
  switch (route.name) {
    case "home":
      return "#inicio"
    case "catalog":
      return "#produtos"
    case "product":
      return `#produto-${route.slug}`
    case "missing":
      return "#faltantes"
    case "order":
      return "#pedido"
  }
}

export function hashToRoute(hash: string): Route {
  const h = hash.replace(/^#/, "")
  if (h === "produtos") return { name: "catalog" }
  if (h === "faltantes") return { name: "missing" }
  if (h === "pedido") return { name: "order" }
  if (h.startsWith("produto-")) return { name: "product", slug: h.slice("produto-".length) }
  return { name: "home" }
}

export function href(route: Route): string {
  return SINGLE_FILE ? routeToHash(route) : routeToPath(route)
}
