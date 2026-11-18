import { Info } from "lucide-react"

export function DemoBanner() {
  return (
    <div className="bg-ink text-white">
      <p className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-2 text-center text-xs leading-snug sm:text-[0.8rem]">
        <Info className="size-3.5 shrink-0 text-sun" aria-hidden="true" />
        <span>
          <strong className="font-semibold">Prévia demonstrativa.</strong> Produtos, preços e imagens são ilustrativos. Nenhum pedido ou pagamento é enviado.
        </span>
      </p>
    </div>
  )
}
