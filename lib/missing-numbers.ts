/**
 * Interpreta a lista de figurinhas faltantes digitada pelo cliente.
 * Aceita números soltos e faixas, separados por vírgula, ponto e vírgula,
 * espaço ou quebra de linha. Exemplos: "7, 12, 30-35", "101 a 104".
 */

export interface ParseResult {
  numbers: number[]
  invalid: string[]
  outOfRange: number[]
  duplicates: number
}

const MAX_RANGE = 1000

export function parseMissingNumbers(input: string, first: number, last: number): ParseResult {
  const found = new Set<number>()
  const invalid: string[] = []
  const outOfRange = new Set<number>()
  let duplicates = 0

  const normalized = input
    .toLowerCase()
    .replace(/\s+(a|até|ate)\s+/g, "-")
    .replace(/\s*[–—-]\s*/g, "-")

  const tokens = normalized.split(/[\s,;]+/).filter(Boolean)

  function add(n: number) {
    if (n < first || n > last) {
      outOfRange.add(n)
      return
    }
    if (found.has(n)) duplicates++
    found.add(n)
  }

  for (const token of tokens) {
    const clean = token.replace(/^n[ºo°.]?/, "").replace(/^#/, "")
    const range = clean.match(/^(\d{1,4})-(\d{1,4})$/)
    if (range) {
      let a = parseInt(range[1], 10)
      let b = parseInt(range[2], 10)
      if (a > b) [a, b] = [b, a]
      if (b - a > MAX_RANGE) {
        invalid.push(token)
        continue
      }
      for (let n = a; n <= b; n++) add(n)
      continue
    }
    if (/^\d{1,4}$/.test(clean)) {
      add(parseInt(clean, 10))
      continue
    }
    invalid.push(token)
  }

  return {
    numbers: [...found].sort((a, b) => a - b),
    invalid,
    outOfRange: [...outOfRange].sort((a, b) => a - b),
    duplicates,
  }
}

/** Formata a lista em faixas compactas: [1,2,3,7] -> "1-3, 7". */
export function formatNumberList(numbers: number[]): string {
  const sorted = [...new Set(numbers)].sort((a, b) => a - b)
  const parts: string[] = []
  let i = 0
  while (i < sorted.length) {
    let j = i
    while (j + 1 < sorted.length && sorted[j + 1] === sorted[j] + 1) j++
    if (j - i >= 2) parts.push(`${sorted[i]}-${sorted[j]}`)
    else for (let k = i; k <= j; k++) parts.push(String(sorted[k]))
    i = j + 1
  }
  return parts.join(", ")
}
