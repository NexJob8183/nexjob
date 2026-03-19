import Link from 'next/link'
import { Zap } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.07] mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-accent/10 border border-accent/30 flex items-center justify-center">
            <Zap size={12} className="text-accent" />
          </div>
          <span className="font-syne font-bold text-base">
            Nex<span className="text-accent">Job</span>
          </span>
        </div>

        <div className="flex items-center gap-6">
          {['Twitter', 'GitHub', 'Docs', 'Virtuals'].map(item => (
            <Link
              key={item}
              href="#"
              className="font-mono text-[11px] tracking-widest uppercase text-muted hover:text-accent transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        <p className="font-mono text-[11px] text-muted tracking-wider">
          © 2025 NexJob · ERC-8183
        </p>
      </div>
    </footer>
  )
}
