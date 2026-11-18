import type { Metadata } from "next"
import { MissingView } from "@/views/missing-view"

export const metadata: Metadata = { title: "Figurinhas que faltam" }

export default function FaltantesPage() {
  return <MissingView />
}
