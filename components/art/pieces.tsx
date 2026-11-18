/**
 * Peças ilustradas da FiguriPlay (SVG próprio, sem imagens de terceiros).
 * Tudo é desenhado em coordenadas de um viewBox 800x800 pelas cenas.
 */

export const C = {
  ink: "#1B2550",
  inkSoft: "#3A4677",
  tangerine: "#FF6B2C",
  tangerineDeep: "#E2531A",
  sun: "#FFC93C",
  mint: "#22B8A7",
  sky: "#CFE6FF",
  skyDeep: "#8FC1F2",
  blush: "#FFE3D3",
  paper: "#FFFFFF",
  cream: "#FFF8EC",
  line: "#E4E8F2",
}

type StickerTheme = { bg: string; fg: string; accent: string }

export const STICKER_THEMES: StickerTheme[] = [
  { bg: C.tangerine, fg: C.ink, accent: C.sun },
  { bg: C.mint, fg: C.ink, accent: C.paper },
  { bg: C.ink, fg: C.paper, accent: C.tangerine },
  { bg: C.sun, fg: C.ink, accent: C.tangerine },
  { bg: C.skyDeep, fg: C.ink, accent: C.paper },
]

interface StickerProps {
  id: string
  x: number
  y: number
  w?: number
  rotate?: number
  num: number
  theme?: StickerTheme
  shadow?: boolean
}

/** Figurinha retrato com moldura branca, silhueta genérica e número. */
export function Sticker({ id, x, y, w = 220, rotate = 0, num, theme = STICKER_THEMES[0], shadow = true }: StickerProps) {
  const h = w * 1.36
  const pad = w * 0.06
  const innerW = w - pad * 2
  const innerH = h - pad * 2 - w * 0.2
  const cx = w / 2
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate} ${cx} ${h / 2})`}>
      {shadow && <rect x={6} y={10} width={w} height={h} rx={w * 0.08} fill={C.ink} opacity={0.14} />}
      <rect width={w} height={h} rx={w * 0.08} fill={C.paper} stroke={C.line} strokeWidth={2} />
      <clipPath id={`clip-${id}`}>
        <rect x={pad} y={pad} width={innerW} height={innerH} rx={w * 0.05} />
      </clipPath>
      <g clipPath={`url(#clip-${id})`}>
        <rect x={pad} y={pad} width={innerW} height={innerH} fill={theme.bg} />
        {/* raios de fundo */}
        {Array.from({ length: 10 }, (_, i) => (
          <rect
            key={i}
            x={cx - w * 0.05}
            y={pad + innerH * 0.42 - w}
            width={w * 0.1}
            height={w}
            fill={theme.accent}
            opacity={0.18}
            transform={`rotate(${i * 36} ${cx} ${pad + innerH * 0.42})`}
          />
        ))}
        <circle cx={cx} cy={pad + innerH * 0.42} r={w * 0.3} fill={theme.accent} opacity={0.35} />
        {/* silhueta genérica */}
        <circle cx={cx} cy={pad + innerH * 0.4} r={w * 0.15} fill={theme.fg} />
        <path
          d={`M ${cx - w * 0.33} ${pad + innerH + 2}
              C ${cx - w * 0.32} ${pad + innerH * 0.66}, ${cx - w * 0.18} ${pad + innerH * 0.6}, ${cx} ${pad + innerH * 0.6}
              C ${cx + w * 0.18} ${pad + innerH * 0.6}, ${cx + w * 0.32} ${pad + innerH * 0.66}, ${cx + w * 0.33} ${pad + innerH + 2} Z`}
          fill={theme.fg}
        />
      </g>
      {/* faixa do número */}
      <rect x={pad} y={pad + innerH + w * 0.04} width={innerW} height={w * 0.12} rx={w * 0.03} fill={C.cream} />
      <text
        x={pad + w * 0.05}
        y={pad + innerH + w * 0.135}
        className="font-mono"
        fontSize={w * 0.085}
        fontWeight={700}
        fill={C.ink}
      >
        Nº {num}
      </text>
      <circle cx={w - pad - w * 0.08} cy={pad + innerH + w * 0.1} r={w * 0.035} fill={theme.bg} />
    </g>
  )
}

/** Serrilhado entre xFrom e xTo; pontas para fora (dir = -1 para cima, 1 para baixo). */
function zigzag(xFrom: number, xTo: number, y: number, tooth: number, depth: number, dir: 1 | -1) {
  const step = xTo > xFrom ? tooth : -tooth
  const count = Math.round(Math.abs(xTo - xFrom) / tooth)
  let d = ""
  for (let i = 0; i < count; i++) {
    const x = xFrom + i * step
    d += ` L ${x + step / 2} ${y + depth * dir} L ${x + step} ${y}`
  }
  return d
}

interface PackProps {
  id: string
  x: number
  y: number
  w?: number
  rotate?: number
  tone?: "tangerine" | "mint" | "ink"
}

/** Envelope de figurinhas com bordas serrilhadas. */
export function Pack({ id, x, y, w = 300, rotate = 0, tone = "tangerine" }: PackProps) {
  const h = w * 1.38
  const tooth = w / 12
  const depth = w * 0.035
  const top = w * 0.07
  const bottom = h - w * 0.07
  const colors =
    tone === "mint"
      ? [C.mint, "#1A9C8E"]
      : tone === "ink"
        ? [C.inkSoft, C.ink]
        : [C.tangerine, C.tangerineDeep]
  const outline = `M 0 ${top}${zigzag(0, w, top, tooth, depth, -1)} L ${w} ${bottom}${zigzag(w, 0, bottom, tooth, depth, 1)} Z`
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate} ${w / 2} ${h / 2})`}>
      <defs>
        <linearGradient id={`pack-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={colors[0]} />
          <stop offset="1" stopColor={colors[1]} />
        </linearGradient>
        <clipPath id={`packclip-${id}`}>
          <path d={outline} />
        </clipPath>
      </defs>
      <path d={outline} transform="translate(8 12)" fill={C.ink} opacity={0.16} />
      <path d={outline} fill={`url(#pack-${id})`} />
      <g clipPath={`url(#packclip-${id})`}>
        {/* faixas de selagem */}
        <rect x={0} y={0} width={w} height={top + w * 0.06} fill={C.paper} opacity={0.18} />
        <rect x={0} y={bottom - w * 0.06} width={w} height={w * 0.2} fill={C.paper} opacity={0.18} />
        {/* brilho diagonal */}
        <rect x={-w * 0.2} y={-h * 0.2} width={w * 0.16} height={h * 1.6} fill={C.paper} opacity={0.22} transform={`rotate(28 ${w / 2} ${h / 2})`} />
        <rect x={w * 0.08} y={-h * 0.2} width={w * 0.05} height={h * 1.6} fill={C.paper} opacity={0.2} transform={`rotate(28 ${w / 2} ${h / 2})`} />
        {/* estrela ao fundo */}
        <circle cx={w * 0.5} cy={h * 0.47} r={w * 0.34} fill={C.sun} opacity={tone === "ink" ? 0.9 : 0.95} />
        <circle cx={w * 0.5} cy={h * 0.47} r={w * 0.34} fill="none" stroke={C.paper} strokeWidth={w * 0.015} strokeDasharray={`${w * 0.03} ${w * 0.03}`} opacity={0.8} />
      </g>
      {/* marca */}
      <g transform={`translate(${w * 0.5} ${h * 0.45})`}>
        <rect x={-w * 0.17} y={-w * 0.17} width={w * 0.34} height={w * 0.34} rx={w * 0.06} fill={C.paper} transform="rotate(-8)" />
        <path d={`M ${-w * 0.05} ${-w * 0.08} L ${w * 0.09} 0 L ${-w * 0.05} ${w * 0.08} Z`} fill={C.tangerine} transform="rotate(-8)" />
      </g>
      <text x={w / 2} y={h * 0.73} textAnchor="middle" className="font-heading" fontWeight={800} fontSize={w * 0.12} fill={C.paper}>
        FiguriPlay
      </text>
      <g transform={`translate(${w / 2} ${h * 0.8})`}>
        <rect x={-w * 0.22} y={-w * 0.045} width={w * 0.44} height={w * 0.09} rx={w * 0.045} fill={C.ink} />
        <text y={w * 0.022} textAnchor="middle" className="font-sans" fontWeight={700} fontSize={w * 0.055} fill={C.paper}>
          5 figurinhas
        </text>
      </g>
    </g>
  )
}

interface AlbumProps {
  id: string
  x: number
  y: number
  w?: number
  rotate?: number
  hard?: boolean
}

/** Álbum fechado, visto de frente com lombada. */
export function Album({ id, x, y, w = 360, rotate = 0, hard = false }: AlbumProps) {
  const h = w * 1.32
  const spine = w * 0.07
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate} ${w / 2} ${h / 2})`}>
      <rect x={10} y={14} width={w} height={h} rx={w * 0.03} fill={C.ink} opacity={0.18} />
      {hard && <rect x={-4} y={-4} width={w + 8} height={h + 8} rx={w * 0.04} fill={C.ink} />}
      <rect width={w} height={h} rx={w * 0.03} fill={C.ink} />
      <clipPath id={`cover-${id}`}>
        <rect x={spine} y={0} width={w - spine} height={h} rx={w * 0.02} />
      </clipPath>
      <g clipPath={`url(#cover-${id})`}>
        <rect x={spine} y={0} width={w - spine} height={h} fill={C.ink} />
        {/* grade de espaços de figurinha */}
        {Array.from({ length: 5 }, (_, r) =>
          Array.from({ length: 4 }, (_, c) => {
            const sw = (w - spine) / 4.6
            const sx = spine + w * 0.06 + c * sw * 1.08
            const sy = h * 0.42 + r * sw * 1.2
            const filled = (r * 4 + c) % 3 !== 1
            const t = STICKER_THEMES[(r + c) % STICKER_THEMES.length]
            return (
              <rect
                key={`${r}-${c}`}
                x={sx}
                y={sy}
                width={sw}
                height={sw * 1.1}
                rx={sw * 0.12}
                fill={filled ? t.bg : "none"}
                stroke={filled ? "none" : C.skyDeep}
                strokeWidth={2}
                strokeDasharray={filled ? undefined : "6 6"}
                opacity={filled ? 0.95 : 0.7}
              />
            )
          })
        )}
        <circle cx={w * 0.92} cy={h * 0.08} r={w * 0.28} fill={C.tangerine} opacity={0.9} />
        <circle cx={w * 0.92} cy={h * 0.08} r={w * 0.2} fill={C.sun} />
      </g>
      {/* lombada */}
      <rect x={0} y={0} width={spine} height={h} rx={w * 0.02} fill={C.inkSoft} />
      <rect x={spine - 3} y={0} width={3} height={h} fill={C.ink} opacity={0.6} />
      {/* título */}
      <text x={spine + w * 0.07} y={h * 0.16} className="font-sans" fontWeight={700} fontSize={w * 0.045} fill={C.sky} letterSpacing={w * 0.006}>
        ÁLBUM DE
      </text>
      <text x={spine + w * 0.07} y={h * 0.27} className="font-heading" fontWeight={800} fontSize={w * 0.12} fill={C.paper}>
        Figurinhas
      </text>
      <text x={spine + w * 0.07} y={h * 0.34} className="font-sans" fontWeight={600} fontSize={w * 0.04} fill={C.sun}>
        {hard ? "capa dura" : "brochura"}
      </text>
    </g>
  )
}

interface SlotGridProps {
  x: number
  y: number
  cols: number
  rows: number
  size: number
  start: number
  missing: number[]
  idPrefix: string
}

/** Página de álbum com espaços numerados: preenchidos ou faltando. */
export function SlotGrid({ x, y, cols, rows, size, start, missing, idPrefix }: SlotGridProps) {
  const gap = size * 0.16
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => {
          const n = start + r * cols + c
          const isMissing = missing.includes(n)
          const t = STICKER_THEMES[n % STICKER_THEMES.length]
          const sx = c * (size + gap)
          const sy = r * (size * 1.25 + gap)
          return (
            <g key={`${idPrefix}-${n}`} transform={`translate(${sx} ${sy})`}>
              {isMissing ? (
                <>
                  <rect width={size} height={size * 1.25} rx={size * 0.12} fill={C.paper} stroke={C.tangerine} strokeWidth={3} strokeDasharray="8 6" />
                  <text x={size / 2} y={size * 0.72} textAnchor="middle" className="font-mono" fontWeight={700} fontSize={size * 0.3} fill={C.tangerineDeep}>
                    {n}
                  </text>
                </>
              ) : (
                <>
                  <rect width={size} height={size * 1.25} rx={size * 0.12} fill={t.bg} />
                  <circle cx={size / 2} cy={size * 0.5} r={size * 0.17} fill={t.fg} opacity={0.9} />
                  <path
                    d={`M ${size * 0.2} ${size * 1.25} C ${size * 0.22} ${size * 0.85}, ${size * 0.78} ${size * 0.85}, ${size * 0.8} ${size * 1.25} Z`}
                    fill={t.fg}
                    opacity={0.9}
                  />
                </>
              )}
            </g>
          )
        })
      )}
    </g>
  )
}
