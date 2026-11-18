"use client"

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"
import type { CartItem, Product, ProductOption } from "@/types"

/**
 * Pedido de demonstração. Fica só no navegador de quem está vendo a prévia
 * (localStorage) e nunca é enviado a lugar nenhum.
 */

interface CartContextValue {
  items: CartItem[]
  count: number
  subtotal: number
  ready: boolean
  addItem: (product: Product, quantity?: number, option?: ProductOption) => void
  setNumbers: (product: Product, numbers: number[]) => void
  updateQuantity: (itemId: string, quantity: number) => void
  removeItem: (itemId: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = "figuriplay-demo-pedido"

export function unitPrice(item: CartItem) {
  return item.product.price + (item.option?.priceAdjustment ?? 0)
}

function itemId(product: Product, option?: ProductOption) {
  return option ? `${product.id}:${option.id}` : product.id
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      // Leitura do armazenamento só no navegador, depois da hidratação da página estática.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setItems(JSON.parse(saved) as CartItem[])
    } catch {
      // Sem armazenamento disponível: o pedido vale só nesta visita.
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Ignorado de propósito.
    }
  }, [items, ready])

  const count = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + unitPrice(item) * item.quantity, 0)

  const addItem = useCallback((product: Product, quantity = 1, option?: ProductOption) => {
    const id = itemId(product, option)
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id)
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + quantity } : i))
      }
      return [...prev, { id, product, quantity, option }]
    })
  }, [])

  const setNumbers = useCallback((product: Product, numbers: number[]) => {
    const id = itemId(product)
    setItems((prev) => {
      const rest = prev.filter((i) => i.id !== id)
      if (numbers.length === 0) return rest
      const line: CartItem = { id, product, quantity: numbers.length, numbers }
      const index = prev.findIndex((i) => i.id === id)
      if (index === -1) return [...rest, line]
      const next = [...prev]
      next[index] = line
      return next
    })
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    )
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  return (
    <CartContext.Provider
      value={{ items, count, subtotal, ready, addItem, setNumbers, updateQuantity, removeItem, clear }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart precisa estar dentro de CartProvider")
  return ctx
}
