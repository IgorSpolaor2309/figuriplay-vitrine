// Substitui next/link no build de página única: link comum.
import type { ComponentProps } from "react"
export default function Link(props: ComponentProps<"a">) {
  return <a {...props} />
}
