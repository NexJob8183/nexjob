'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Zap, Menu, X } from 'lucide-react'
import { NexJobConnectButton } from '@/components/ConnectButton'

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/explore', label: 'Explore Jobs' },
    { href: '/agents', label: 'Agents' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.07] bg-[#080810]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-md bg-accent/10 border border-accent/30 flex items-center justify-center">
            <Zap size={14} className="text-accent" />
          </div>
          <span className="font-syne font-bold text-lg tracking-tight">
            Nex<span className="text-accent">Job</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-mono text-xs tracking-widest uppercase transition-colors ${
                  pathname === link.href
                    ? 'text-accent'
                    : 'text-muted hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Wallet connect */}
        <div className="hidden md:block">
          <NexJobConnectButton />
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-muted hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/[0.07] bg-[#080810]/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-4">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`font-mono text-xs tracking-widest uppercase ${
                pathname === link.href ? 'text-accent' : 'text-muted'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-1">
            <NexJobConnectButton />
          </div>
        </div>
      )}
    </nav>
  )
}
