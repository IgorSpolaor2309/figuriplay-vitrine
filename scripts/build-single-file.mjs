/**
 * Gera dist-single/figuriplay.html: a vitrine inteira em um único arquivo
 * (JS e CSS embutidos, fontes do Google Fonts), para publicar como prévia.
 *
 * Uso: npm run build:single
 */
import { build } from "esbuild"
import postcss from "postcss"
import tailwind from "@tailwindcss/postcss"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import path from "node:path"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const outDir = path.join(root, "dist-single")
await mkdir(outDir, { recursive: true })

const js = await build({
  entryPoints: [path.join(root, "scripts/single-entry.tsx")],
  bundle: true,
  minify: true,
  write: false,
  format: "iife",
  target: "es2020",
  jsx: "automatic",
  tsconfig: path.join(root, "tsconfig.json"),
  alias: {
    "next/navigation": path.join(root, "scripts/stubs/next-navigation.ts"),
    "next/link": path.join(root, "scripts/stubs/next-link.tsx"),
  },
  define: {
    "process.env.NEXT_PUBLIC_SINGLE_FILE": '"1"',
    "process.env.NODE_ENV": '"production"',
  },
  logLevel: "warning",
  logOverride: { "unsupported-directive": "silent" },
})
const script = js.outputFiles[0].text.replace(/<\/script/gi, "<\\/script")

const cssSource = await readFile(path.join(root, "app/globals.css"), "utf8")
const css = await postcss([tailwind({ base: root, optimize: { minify: true } })]).process(cssSource, {
  from: path.join(root, "app/globals.css"),
})

const fonts =
  "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Figtree:wght@400..800&family=JetBrains+Mono:wght@400;700&display=swap"

const html = `<title>FiguriPlay</title>
<meta name="description" content="Prévia demonstrativa da loja FiguriPlay: figurinhas avulsas, pacotes e álbuns.">
<meta name="robots" content="noindex">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${fonts}">
<style>
:root{--font-bricolage:"Bricolage Grotesque";--font-figtree:"Figtree";--font-jetbrains:"JetBrains Mono"}
${css.css}
body{background:var(--background);color:var(--foreground)}
</style>
<div id="figuriplay" class="font-sans antialiased"></div>
<noscript>Esta prévia precisa de JavaScript ativado.</noscript>
<script>${script}</script>
`
const file = path.join(outDir, "figuriplay.html")
await writeFile(file, html)
console.log(`${path.relative(root, file)}: ${(html.length / 1024).toFixed(0)} KB`)
