"use client"

import { useState } from "react"
import { ProductScene, SCENE_VIEWS } from "@/components/art/scenes"
import { cn } from "@/lib/utils"
import type { ProductKind } from "@/types"

/** Galeria adaptada do starter: imagem principal e miniaturas (ilustrações próprias). */
export function ProductGallery({ kind, view, onViewChange }: { kind: ProductKind; view?: number; onViewChange?: (v: number) => void }) {
  const [internal, setInternal] = useState(0)
  const selected = view ?? internal
  const select = (v: number) => (onViewChange ? onViewChange(v) : setInternal(v))
  const views = SCENE_VIEWS[kind]

  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-square overflow-hidden rounded-3xl border border-border bg-card">
        <ProductScene kind={kind} view={selected} title={views[selected]} uid="gal" className="h-full w-full" />
      </div>
      <div className="flex gap-3" role="group" aria-label="Imagens do produto">
        {views.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => select(i)}
            aria-label={`Ver imagem: ${label}`}
            aria-pressed={selected === i}
            className={cn(
              "size-20 overflow-hidden rounded-2xl border-2 transition-all focus-visible:outline-3 focus-visible:outline-ring sm:size-24",
              selected === i ? "border-ink" : "border-transparent opacity-70 hover:opacity-100"
            )}
          >
            <ProductScene kind={kind} view={i} title="" uid={`thumb${i}`} className="h-full w-full" />
          </button>
        ))}
      </div>
    </div>
  )
}
