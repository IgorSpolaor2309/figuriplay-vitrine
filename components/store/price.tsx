import { formatBRL } from "@/lib/format"
import { cn } from "@/lib/utils"

export function DemoPriceTag({ className }: { className?: string }) {
  return (
    <span className={cn("rounded-full border border-dashed border-muted-foreground/50 px-2 py-0.5 text-[0.68rem] font-semibold text-muted-foreground", className)}>
      preço ilustrativo
    </span>
  )
}

export function Price({ value, unit, className }: { value: number; unit?: string; className?: string }) {
  return (
    <span className={cn("inline-flex flex-wrap items-baseline gap-x-1.5", className)}>
      <span className="font-heading font-extrabold tabular-nums">{formatBRL(value)}</span>
      {unit && <span className="text-sm font-medium text-muted-foreground">{unit}</span>}
    </span>
  )
}
