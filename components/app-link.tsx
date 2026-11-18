import Link from "next/link"
import type { ComponentProps } from "react"
import { href, SINGLE_FILE, type Route } from "@/lib/routes"

type AppLinkProps = Omit<ComponentProps<"a">, "href"> & { to: Route }

/** Link interno que funciona tanto no site com rotas quanto na página única. */
export function AppLink({ to, ...props }: AppLinkProps) {
  if (SINGLE_FILE) return <a href={href(to)} {...props} />
  return <Link href={href(to)} {...props} />
}
