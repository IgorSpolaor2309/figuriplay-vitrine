import type { Product } from "@/types"

/**
 * Catálogo DEMONSTRATIVO.
 * Produtos, preços e características são fictícios e servem apenas para a
 * apresentação da prévia. Não representam estoque, coleção ou marca reais.
 */

/** Coleção de exemplo usada na demonstração de figurinhas faltantes. */
export const DEMO_COLLECTION = {
  name: "Coleção de exemplo",
  first: 1,
  last: 300,
}

export const products: Product[] = [
  {
    id: "p-avulsa",
    slug: "figurinha-avulsa",
    kind: "avulsa",
    kindLabel: "Avulsa",
    name: "Figurinha avulsa",
    tagline: "Escolha pelo número só as que faltam no seu álbum.",
    description:
      "Informe os números que faltam e monte o pedido só com elas. Nesta prévia, a lista de números entra no pedido como exemplo de como a loja receberia tudo organizado.",
    highlights: [
      "Pedido pelo número da figurinha",
      "Lista com faixas, como 30-35",
      "Números repetidos são unidos automaticamente",
    ],
    price: 1.5,
    priceUnit: "por figurinha",
    specs: {
      Tipo: "Figurinha avulsa",
      "Como pedir": "Pelo número na coleção",
      "Coleção nesta prévia": `Exemplo, de ${1} a ${300}`,
      Preço: "Ilustrativo",
    },
  },
  {
    id: "p-pacote",
    slug: "pacote-de-figurinhas",
    kind: "pacote",
    kindLabel: "Pacote",
    name: "Pacote com 5 figurinhas",
    tagline: "Para abrir, trocar e começar a coleção.",
    description:
      "Pacote lacrado com figurinhas sortidas. Escolha quantos pacotes quer e acompanhe o total do pedido antes de enviar para a loja.",
    highlights: [
      "5 figurinhas sortidas por pacote",
      "Quantidade livre no pedido",
      "Combina com a lista de faltantes",
    ],
    price: 6,
    priceUnit: "por pacote",
    specs: {
      Tipo: "Pacote lacrado",
      Conteúdo: "5 figurinhas sortidas",
      Preço: "Ilustrativo",
    },
  },
  {
    id: "p-album",
    slug: "album-de-figurinhas",
    kind: "album",
    kindLabel: "Álbum",
    name: "Álbum de figurinhas",
    tagline: "O ponto de partida de toda coleção.",
    description:
      "Álbum para colar e organizar as figurinhas da coleção. Escolha o tipo de capa para ver como as variações de um produto aparecem na loja.",
    highlights: [
      "Variação de capa com preço próprio",
      "Espaços numerados para cada figurinha",
      "Ideal para começar junto com pacotes",
    ],
    price: 14.9,
    priceUnit: "por álbum",
    options: {
      label: "Capa",
      values: [
        { id: "brochura", label: "Brochura", priceAdjustment: 0 },
        { id: "dura", label: "Capa dura", priceAdjustment: 25 },
      ],
    },
    specs: {
      Tipo: "Álbum",
      Capas: "Brochura ou capa dura",
      Preço: "Ilustrativo",
    },
  },
]

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug)
}
