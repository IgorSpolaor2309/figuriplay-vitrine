/**
 * Entrada do build de página única (prévia publicada como um arquivo HTML).
 * Usa os mesmos componentes do site, trocando as rotas pelo #hash.
 */
import { createRoot } from "react-dom/client"
import { AppFrame } from "@/components/layout/app-frame"
import { HashShell } from "@/components/hash-shell"

const root = document.getElementById("figuriplay")!
createRoot(root).render(
  <AppFrame>
    <HashShell />
  </AppFrame>
)
