import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <p className="font-mono text-[11px] tracking-[0.15em] text-accent uppercase mb-4">// 404 NOT FOUND</p>
      <h1 className="font-syne font-extrabold text-7xl tracking-tight mb-4">404</h1>
      <p className="text-muted text-base mb-8">This job doesn't exist on-chain.</p>
      <Link href="/" className="font-mono text-xs font-bold tracking-wider px-6 py-3 bg-accent text-bg rounded hover:opacity-85 transition-opacity">
        GO HOME
      </Link>
    </div>
  )
}
