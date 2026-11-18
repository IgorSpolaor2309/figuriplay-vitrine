"use client"

import type { ReactNode } from "react"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface DemoActionProps {
  /** Conteúdo do botão que abre o aviso. */
  children: ReactNode
  title: string
  description: string
  /** O que este botão poderá fazer na versão completa. */
  future: string[]
  variant?: "default" | "outline" | "secondary"
  size?: "default" | "lg"
  className?: string
  disabled?: boolean
}

/**
 * Botão de ação real (enviar pedido, pagar, falar com a loja) que, nesta prévia,
 * apenas explica o que faria. Nada é enviado.
 */
export function DemoAction({ children, title, description, future, variant = "default", size = "lg", className, disabled }: DemoActionProps) {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant={variant} size={size} className={className} disabled={disabled} />}>
        {children}
      </DialogTrigger>
      <DialogContent className="gap-5 p-6 sm:max-w-md">
        <DialogHeader className="gap-3">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-sun px-3 py-1 text-xs font-bold text-ink">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Demonstração
          </span>
          <DialogTitle className="font-heading text-xl font-bold leading-tight">{title}</DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">{description}</DialogDescription>
        </DialogHeader>
        <div className="rounded-xl bg-muted p-4">
          <p className="mb-2 text-xs font-bold tracking-wide text-muted-foreground uppercase">Na versão completa, poderá</p>
          <ul className="flex flex-col gap-1.5 text-sm">
            {future.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <DialogFooter className="-mx-6 -mb-6 rounded-b-xl px-6">
          <DialogClose render={<Button size="lg" className="w-full sm:w-auto" />}>Entendi</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
