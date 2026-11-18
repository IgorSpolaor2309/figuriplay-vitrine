import type { NextConfig } from "next"

/**
 * Site estático (output: "export"): pode ser hospedado em qualquer serviço de
 * arquivos estáticos. Sem servidor, banco de dados ou integrações.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  distDir: process.env.NEXT_PUBLIC_SINGLE_FILE === "1" ? ".next-single" : ".next",
}

export default nextConfig
