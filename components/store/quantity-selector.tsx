"use client"

import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface QuantitySelectorProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  label?: string
}

export function QuantitySelector({ value, onChange, min = 1, max = 99, label = "Quantidade" }: QuantitySelectorProps) {
  const set = (n: number) => onChange(Math.min(Math.max(n, min), max))
  return (
    <div className="inline-flex h-11 items-center rounded-full border border-input bg-card" role="group" aria-label={label}>
      <Button variant="ghost" size="icon" className="size-11 rounded-full" onClick={() => set(value - 1)} disabled={value <= min} aria-label="Diminuir quantidade">
        <Minus className="size-4" />
      </Button>
      <output className="w-9 text-center font-mono text-base font-bold tabular-nums" aria-live="polite">
        {value}
      </output>
      <Button variant="ghost" size="icon" className="size-11 rounded-full" onClick={() => set(value + 1)} disabled={value >= max} aria-label="Aumentar quantidade">
        <Plus className="size-4" />
      </Button>
    </div>
  )
}
