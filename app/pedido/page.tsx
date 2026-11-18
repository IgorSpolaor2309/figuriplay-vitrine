import type { Metadata } from "next"
import { OrderView } from "@/views/order-view"

export const metadata: Metadata = { title: "Meu pedido" }

export default function PedidoPage() {
  return <OrderView />
}
