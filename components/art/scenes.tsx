import type { ProductKind } from "@/types"
import { Album, C, Pack, SlotGrid, Sticker, STICKER_THEMES } from "./pieces"

/**
 * Cenas ilustradas usadas como "fotos" dos produtos na prévia.
 * Cada produto tem duas vistas para a galeria.
 */

interface SceneProps {
  title: string
  className?: string
  /** Prefixo para ids internos do SVG, único por instância na página. */
  uid?: string
}

function Frame({ title, className, bg, children }: SceneProps & { bg: string; children: React.ReactNode }) {
  const a11y = title ? { role: "img", "aria-label": title } : { "aria-hidden": true }
  return (
    <svg viewBox="0 0 800 800" {...a11y} className={className} preserveAspectRatio="xMidYMid slice">
      <rect width="800" height="800" fill={bg} />
      {children}
    </svg>
  )
}

function Dots({ color, opacity = 0.35 }: { color: string; opacity?: number }) {
  return (
    <g opacity={opacity}>
      {Array.from({ length: 9 }, (_, r) =>
        Array.from({ length: 9 }, (_, c) => <circle key={`${r}-${c}`} cx={60 + c * 85} cy={60 + r * 85} r={4} fill={color} />)
      )}
    </g>
  )
}

export function AvulsaScene({ title, className, uid = "s" }: SceneProps) {
  return (
    <Frame title={title} className={className} bg={C.blush}>
      <Dots color={C.tangerine} opacity={0.25} />
      <circle cx="400" cy="420" r="270" fill={C.paper} opacity={0.55} />
      <Sticker id={`${uid}-av-a`} x={150} y={250} w={210} rotate={-14} num={7} theme={STICKER_THEMES[1]} />
      <Sticker id={`${uid}-av-c`} x={440} y={250} w={210} rotate={13} num={230} theme={STICKER_THEMES[3]} />
      <Sticker id={`${uid}-av-b`} x={280} y={190} w={240} rotate={-2} num={127} theme={STICKER_THEMES[0]} />
    </Frame>
  )
}

export function AvulsaDetailScene({ title, className, uid = "s" }: SceneProps) {
  return (
    <Frame title={title} className={className} bg={C.sky}>
      <rect x="110" y="120" width="580" height="580" rx="36" fill={C.paper} />
      <text x="150" y="190" className="font-heading" fontWeight={800} fontSize="34" fill={C.ink}>
        Página 12
      </text>
      <text x="650" y="190" textAnchor="end" className="font-sans" fontWeight={600} fontSize="22" fill={C.tangerineDeep}>
        faltam 4
      </text>
      <SlotGrid x={150} y={225} cols={5} rows={3} size={88} start={31} missing={[33, 37, 38, 44]} idPrefix={`${uid}-det`} />
    </Frame>
  )
}

export function PacoteScene({ title, className, uid = "s" }: SceneProps) {
  return (
    <Frame title={title} className={className} bg={C.cream}>
      <Dots color={C.sun} opacity={0.6} />
      <circle cx="400" cy="420" r="280" fill={C.sun} opacity={0.35} />
      <Pack id={`${uid}-pk-b`} x={150} y={200} w={250} rotate={-16} tone="mint" />
      <Pack id={`${uid}-pk-c`} x={410} y={210} w={250} rotate={15} tone="ink" />
      <Pack id={`${uid}-pk-a`} x={265} y={150} w={280} rotate={-2} tone="tangerine" />
    </Frame>
  )
}

export function PacoteOpenScene({ title, className, uid = "s" }: SceneProps) {
  return (
    <Frame title={title} className={className} bg={C.mint}>
      <Dots color={C.paper} opacity={0.35} />
      <Sticker id={`${uid}-po-1`} x={140} y={150} w={170} rotate={-22} num={58} theme={STICKER_THEMES[2]} />
      <Sticker id={`${uid}-po-2`} x={300} y={95} w={180} rotate={-4} num={112} theme={STICKER_THEMES[3]} />
      <Sticker id={`${uid}-po-3`} x={480} y={150} w={170} rotate={20} num={204} theme={STICKER_THEMES[0]} />
      <Pack id={`${uid}-po-pack`} x={270} y={330} w={260} rotate={0} tone="tangerine" />
    </Frame>
  )
}

export function AlbumScene({ title, className, hard = false, uid = "s" }: SceneProps & { hard?: boolean }) {
  return (
    <Frame title={title} className={className} bg={C.sky}>
      <Dots color={C.paper} opacity={0.7} />
      <circle cx="400" cy="410" r="290" fill={C.paper} opacity={0.5} />
      <Album id={`${uid}-${hard ? "al-h" : "al-b"}`} x={225} y={150} w={350} rotate={-4} hard={hard} />
      <Sticker id={`${uid}-al-st`} x={520} y={470} w={150} rotate={14} num={1} theme={STICKER_THEMES[0]} />
    </Frame>
  )
}

export function AlbumOpenScene({ title, className, uid = "s" }: SceneProps) {
  return (
    <Frame title={title} className={className} bg={C.blush}>
      <g transform="translate(70 170)">
        <rect x="10" y="16" width="660" height="470" rx="26" fill={C.ink} opacity={0.15} />
        <rect width="660" height="470" rx="26" fill={C.ink} />
        <rect x="18" y="18" width="303" height="434" rx="16" fill={C.paper} />
        <rect x="339" y="18" width="303" height="434" rx="16" fill={C.paper} />
        <rect x="321" y="18" width="18" height="434" fill={C.inkSoft} />
        <SlotGrid x={44} y={60} cols={3} rows={3} size={74} start={1} missing={[2, 6]} idPrefix={`${uid}-ao-l`} />
        <SlotGrid x={365} y={60} cols={3} rows={3} size={74} start={10} missing={[13, 14, 18]} idPrefix={`${uid}-ao-r`} />
      </g>
    </Frame>
  )
}

/** Composição da capa da home. */
export function HeroScene({ className, uid = "hero" }: { className?: string; uid?: string }) {
  return (
    <svg viewBox="0 0 800 700" role="img" aria-label="Ilustração de álbum, pacote e figurinhas" className={className}>
      <circle cx="430" cy="360" r="300" fill={C.sun} opacity={0.35} />
      <circle cx="430" cy="360" r="300" fill="none" stroke={C.ink} strokeOpacity={0.12} strokeWidth="2" strokeDasharray="6 10" />
      <Album id={`${uid}-hero-al`} x={300} y={90} w={330} rotate={8} />
      <Pack id={`${uid}-hero-pk`} x={120} y={190} w={250} rotate={-12} tone="tangerine" />
      <Sticker id={`${uid}-hero-s1`} x={470} y={400} w={150} rotate={16} num={88} theme={STICKER_THEMES[1]} />
      <Sticker id={`${uid}-hero-s2`} x={330} y={430} w={160} rotate={-6} num={127} theme={STICKER_THEMES[2]} />
    </svg>
  )
}

export function ProductScene({ kind, view = 0, title, className, uid = "s" }: { kind: ProductKind; view?: number } & SceneProps) {
  const p = { title, className, uid: `${uid}-${kind}-${view}` }
  if (kind === "avulsa") return view === 0 ? <AvulsaScene {...p} /> : <AvulsaDetailScene {...p} />
  if (kind === "pacote") return view === 0 ? <PacoteScene {...p} /> : <PacoteOpenScene {...p} />
  if (view === 1) return <AlbumOpenScene {...p} />
  return <AlbumScene {...p} hard={view === 2} />
}

export const SCENE_VIEWS: Record<ProductKind, string[]> = {
  avulsa: ["Figurinhas avulsas numeradas", "Página do álbum com os números que faltam"],
  pacote: ["Pacotes de figurinhas", "Pacote aberto com figurinhas"],
  album: ["Álbum de figurinhas, capa brochura", "Álbum aberto com espaços numerados", "Álbum de figurinhas, capa dura"],
}
