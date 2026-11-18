import { cn } from "@/lib/utils"

/** Símbolo: figurinha com canto descolando e um "play" no centro. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <path d="M8 4h26l10 10v26a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Z" fill="#FF6B2C" />
      <path d="M34 4v6a4 4 0 0 0 4 4h6Z" fill="#FFC93C" />
      <path d="M34 4l10 10h-6a4 4 0 0 1-4-4Z" fill="#1B2550" opacity="0.18" />
      <path d="M19 15.5v17a1.5 1.5 0 0 0 2.3 1.27l13.4-8.5a1.5 1.5 0 0 0 0-2.54l-13.4-8.5A1.5 1.5 0 0 0 19 15.5Z" fill="#1B2550" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark className="size-8 shrink-0" />
      <span className="font-heading text-xl font-extrabold tracking-tight text-foreground">
        Figuri<span className="text-primary-ink">Play</span>
      </span>
    </span>
  )
}
