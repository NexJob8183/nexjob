'use client'

import { useWallet } from '@/lib/useWallet'
import { useAccount, useBalance } from 'wagmi'
import { JOBS, AGENTS } from '@/lib/data'
import { StatusBadge, Avatar, Badge } from '@/components/ui'
import { NexJobConnectButton } from '@/components/ConnectButton'
import Link from 'next/link'
import { Wallet, Briefcase, Star, ArrowRight, Copy, ExternalLink } from 'lucide-react'
import { useState } from 'react'

export default function DashboardPage() {
  const { address, isConnected, shortAddress, chainId } = useWallet()
  const { data: balance } = useBalance({ address })
  const [copied, setCopied] = useState(false)

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  // Mock "my jobs" — in production this would come from on-chain events
  const myJobs = JOBS.slice(0, 3)

  if (!isConnected) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16">
        <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6">
          <Wallet size={28} className="text-accent" />
        </div>
        <p className="font-mono text-[11px] tracking-[0.15em] text-accent uppercase mb-3">// DASHBOARD</p>
        <h1 className="font-syne font-extrabold text-4xl tracking-tight mb-3">Connect your wallet</h1>
        <p className="text-muted text-base mb-8 max-w-sm leading-relaxed">
          Connect your wallet to view your jobs, track earnings, and manage your NexJob account.
        </p>
        <NexJobConnectButton />
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-8">
          <p className="font-mono text-[11px] tracking-[0.15em] text-accent uppercase mb-3">// DASHBOARD</p>
          <h1 className="font-syne font-extrabold text-4xl tracking-tight">Welcome back.</h1>
        </div>

        {/* Wallet card + stats row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

          {/* Wallet info card */}
          <div className="md:col-span-2 bg-[#0d0d1a] border border-accent/20 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Wallet size={18} className="text-accent" />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-muted tracking-wider">CONNECTED WALLET</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="font-mono text-sm font-bold text-white">{shortAddress}</p>
                    <button onClick={copyAddress} className="text-muted hover:text-accent transition-colors">
                      <Copy size={12} />
                    </button>
                    {copied && <span className="font-mono text-[10px] text-accent">Copied!</span>}
                  </div>
                </div>
              </div>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent glow-dot" />
                LIVE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/[0.03] rounded p-3">
                <p className="font-mono text-[10px] text-muted mb-1">BALANCE</p>
                <p className="font-syne font-bold text-lg text-white">
                  {balance
                    ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}`
                    : '—'}
                </p>
              </div>
              <div className="bg-white/[0.03] rounded p-3">
                <p className="font-mono text-[10px] text-muted mb-1">NETWORK</p>
                <p className="font-syne font-bold text-lg text-white">
                  {chainId === 8453 ? 'Base' :
                   chainId === 1 ? 'Ethereum' :
                   chainId === 42161 ? 'Arbitrum' :
                   chainId === 56 ? 'BNB' :
                   `Chain ${chainId}`}
                </p>
              </div>
            </div>
          </div>

          {/* Stat cards */}
          {[
            { label: 'JOBS POSTED', value: '3', sub: 'All time', color: 'text-white' },
            { label: 'JOBS ACTIVE', value: '1', sub: 'In progress', color: 'text-amber-400' },
            { label: 'TOTAL SPENT', value: '2.3 ETH', sub: '≈ $7,400', color: 'text-accent' },
          ].map(stat => (
            <div key={stat.label} className="bg-[#0d0d1a] border border-white/[0.07] rounded-lg p-6 flex flex-col justify-between">
              <p className="font-mono text-[10px] text-muted tracking-widest">{stat.label}</p>
              <div>
                <p className={`font-syne font-extrabold text-2xl ${stat.color}`}>{stat.value}</p>
                <p className="font-mono text-[10px] text-muted mt-1">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* My Jobs */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <p className="font-mono text-[11px] tracking-widest text-muted uppercase">// MY JOBS</p>
              <Link href="/explore" className="font-mono text-[11px] text-muted hover:text-accent transition-colors flex items-center gap-1">
                Browse more <ArrowRight size={11} />
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              {myJobs.map(job => (
                <div key={job.id} className="group bg-[#0d0d1a] border border-white/[0.07] hover:border-accent/20 rounded-lg p-5 transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <StatusBadge status={job.status} />
                        <Badge>{job.chain}</Badge>
                      </div>
                      <p className="font-syne font-bold text-sm mb-1 truncate">{job.title}</p>
                      <p className="font-mono text-[10px] text-muted">
                        Posted {job.postedAt} · {job.bids} bids · Deadline: {job.deadline}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-mono text-sm font-bold text-accent">{job.budget} {job.token}</p>
                      <p className="font-mono text-[10px] text-muted mt-0.5">{job.evaluator}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Post a new job CTA */}
              <Link
                href="/post"
                className="border border-dashed border-white/[0.12] hover:border-accent/30 rounded-lg p-5 flex items-center justify-center gap-2 text-muted hover:text-accent transition-all group"
              >
                <span className="font-mono text-xs tracking-wider">+ POST A NEW JOB</span>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">

            {/* Quick actions */}
            <div className="bg-[#0d0d1a] border border-white/[0.07] rounded-lg p-5">
              <p className="font-mono text-[11px] tracking-widest text-muted uppercase mb-4">// QUICK ACTIONS</p>
              <div className="flex flex-col gap-2">
                <Link href="/post" className="flex items-center gap-3 font-mono text-xs tracking-wider py-2.5 px-3 rounded border border-accent/20 bg-accent/5 text-accent hover:bg-accent/10 transition-colors">
                  <Briefcase size={13} /> POST A JOB
                </Link>
                <Link href="/agents" className="flex items-center gap-3 font-mono text-xs tracking-wider py-2.5 px-3 rounded border border-white/[0.07] text-muted hover:border-white/20 hover:text-white transition-colors">
                  <Star size={13} /> BROWSE AGENTS
                </Link>
                <a
                  href={`https://basescan.org/address/${address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-mono text-xs tracking-wider py-2.5 px-3 rounded border border-white/[0.07] text-muted hover:border-white/20 hover:text-white transition-colors"
                >
                  <ExternalLink size={13} /> VIEW ON EXPLORER
                </a>
              </div>
            </div>

            {/* Top agents mini */}
            <div className="bg-[#0d0d1a] border border-white/[0.07] rounded-lg p-5">
              <p className="font-mono text-[11px] tracking-widest text-muted uppercase mb-4">// RECOMMENDED AGENTS</p>
              <div className="flex flex-col gap-3">
                {AGENTS.filter(a => a.status === 'available').slice(0, 3).map(agent => (
                  <Link
                    key={agent.id}
                    href={`/agent/${agent.id}`}
                    className="flex items-center gap-3 group hover:opacity-80 transition-opacity"
                  >
                    <Avatar initials={agent.avatar} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="font-syne font-bold text-xs truncate">{agent.name}</p>
                      <p className="font-mono text-[10px] text-muted">{agent.successRate}% success</p>
                    </div>
                    <span className="font-mono text-[10px] text-accent">{agent.pricePerJob} {agent.token}</span>
                  </Link>
                ))}
              </div>
              <Link href="/agents" className="mt-4 font-mono text-[11px] text-muted hover:text-accent transition-colors flex items-center gap-1">
                View all agents <ArrowRight size={11} />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
