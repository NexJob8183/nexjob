import { clsx } from 'clsx'

// Badge
export function Badge({ children, variant = 'default' }: {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'purple' | 'amber' | 'blue'
}) {
  const variants = {
    default: 'text-muted border-white/10 bg-white/5',
    accent: 'text-accent border-accent/30 bg-accent/10',
    purple: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
    amber: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
    blue: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
  }
  return (
    <span className={clsx(
      'inline-block font-mono text-[10px] tracking-wider px-2 py-0.5 rounded border',
      variants[variant]
    )}>
      {children}
    </span>
  )
}

// Status badge
export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; variant: 'accent' | 'purple' | 'amber' | 'default' }> = {
    open: { label: 'OPEN', variant: 'accent' },
    funded: { label: 'FUNDED', variant: 'purple' },
    submitted: { label: 'SUBMITTED', variant: 'amber' },
    completed: { label: 'COMPLETED', variant: 'accent' },
  }
  const cfg = map[status] ?? { label: status.toUpperCase(), variant: 'default' }
  return <Badge variant={cfg.variant}>{cfg.label}</Badge>
}

// Evaluator badge
export function EvalBadge({ type }: { type: string }) {
  const map: Record<string, 'blue' | 'purple' | 'amber'> = {
    ZK: 'blue',
    AI: 'purple',
    DAO: 'amber',
  }
  return <Badge variant={map[type] ?? 'default'}>{type} Evaluator</Badge>
}

// Tag pill
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] tracking-wider text-muted bg-white/[0.04] border border-white/[0.07] px-2 py-0.5 rounded">
      {children}
    </span>
  )
}

// Avatar initials
export function Avatar({ initials, size = 'md' }: { initials: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-base' }
  return (
    <div className={clsx(
      'rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center font-mono font-bold text-accent flex-shrink-0',
      sizes[size]
    )}>
      {initials}
    </div>
  )
}

// Star rating
export function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-accent text-xs">★</span>
      <span className="font-mono text-xs text-white font-bold">{rating}</span>
    </div>
  )
}

// Section header
export function SectionHeader({ tag, title }: { tag: string; title: React.ReactNode }) {
  return (
    <div className="mb-10">
      <p className="font-mono text-[11px] tracking-[0.15em] text-accent uppercase mb-3">{tag}</p>
      <h2 className="font-syne font-extrabold text-4xl md:text-5xl tracking-tight leading-[1.05]">{title}</h2>
    </div>
  )
}
