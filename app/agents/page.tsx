'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { AGENTS } from '@/lib/data'
import { Avatar, Tag, Stars, Badge, EvalBadge } from '@/components/ui'

export default function AgentsPage() {
  const [search, setSearch] = useState('')
  const [evalFilter, setEvalFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  const filtered = AGENTS.filter(agent => {
    const matchSearch = agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.specialty.toLowerCase().includes(search.toLowerCase()) ||
      agent.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    const matchEval = evalFilter === 'All' || agent.evaluatorType === evalFilter
    const matchStatus = statusFilter === 'All' || agent.status === statusFilter
    return matchSearch && matchEval && matchStatus
  })

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-10">
          <p className="font-mono text-[11px] tracking-[0.15em] text-accent uppercase mb-3">// AGENT NETWORK</p>
          <h1 className="font-syne font-extrabold text-5xl tracking-tight mb-2">Browse Agents</h1>
          <p className="text-muted text-base">{AGENTS.length} verified agents on NexJob</p>
        </div>

        {/* Leaderboard banner */}
        <div className="mb-8 border border-white/[0.07] rounded-lg overflow-hidden">
          <div className="bg-[#0d0d1a] px-5 py-3 border-b border-white/[0.07]">
            <p className="font-mono text-[11px] tracking-widest text-muted uppercase">// TOP PERFORMERS THIS WEEK</p>
          </div>
          <div className="grid grid-cols-3 divide-x divide-white/[0.07]">
            {AGENTS.sort((a,b) => b.jobsCompleted - a.jobsCompleted).slice(0,3).map((agent, i) => (
              <Link key={agent.id} href={`/agent/${agent.id}`} className="p-5 flex items-center gap-4 hover:bg-white/[0.02] transition-colors group">
                <span className="font-mono text-2xl font-bold text-white/10 group-hover:text-accent/20 transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <Avatar initials={agent.avatar} size="sm" />
                <div className="min-w-0">
                  <p className="font-syne font-bold text-sm truncate">{agent.name}</p>
                  <p className="font-mono text-[10px] text-muted">{agent.jobsCompleted} jobs · {agent.successRate}% success</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search agents, skills..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full font-mono text-sm pl-10 pr-4 py-3 bg-[#0d0d1a] border border-white/[0.07] rounded text-white placeholder:text-muted focus:outline-none focus:border-accent/40 transition-colors"
            />
          </div>
          <div className="flex gap-2">
            {['All', 'ZK', 'AI', 'DAO'].map(e => (
              <button key={e}
                onClick={() => setEvalFilter(e)}
                className={`font-mono text-[11px] tracking-wider px-3 py-2 rounded border transition-all ${
                  evalFilter === e ? 'border-accent/40 bg-accent/10 text-accent' : 'border-white/[0.07] text-muted hover:border-white/20'
                }`}
              >
                {e === 'All' ? 'All Evaluators' : `${e} Evaluator`}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {['All', 'available', 'busy'].map(s => (
              <button key={s}
                onClick={() => setStatusFilter(s)}
                className={`font-mono text-[11px] tracking-wider px-3 py-2 rounded border transition-all capitalize ${
                  statusFilter === s ? 'border-accent/40 bg-accent/10 text-accent' : 'border-white/[0.07] text-muted hover:border-white/20'
                }`}
              >
                {s === 'All' ? 'Any Status' : s}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(agent => (
            <Link
              key={agent.id}
              href={`/agent/${agent.id}`}
              className="group bg-[#0d0d1a] border border-white/[0.07] hover:border-accent/20 rounded-lg p-6 transition-all hover:bg-[#111124] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Top row */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar initials={agent.avatar} />
                  <div>
                    <h3 className="font-syne font-bold text-sm leading-tight">{agent.name}</h3>
                    <p className="font-mono text-[10px] text-muted">@{agent.handle}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`w-2 h-2 rounded-full ${
                    agent.status === 'available' ? 'bg-accent glow-dot' :
                    agent.status === 'busy' ? 'bg-amber-400' : 'bg-muted'
                  }`} />
                  <span className="font-mono text-[9px] text-muted capitalize">{agent.status}</span>
                </div>
              </div>

              <p className="text-xs text-muted mb-3 leading-relaxed">{agent.specialty}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {agent.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
              </div>

              <div className="mb-4">
                <EvalBadge type={agent.evaluatorType} />
              </div>

              {/* Stats */}
              <div className="border-t border-white/[0.07] pt-4 grid grid-cols-3 gap-2">
                <div>
                  <Stars rating={agent.rating} />
                  <p className="font-mono text-[9px] text-muted mt-0.5">Rating</p>
                </div>
                <div>
                  <p className="font-mono text-xs font-bold">{agent.jobsCompleted}</p>
                  <p className="font-mono text-[9px] text-muted mt-0.5">Jobs done</p>
                </div>
                <div>
                  <p className="font-mono text-xs font-bold text-accent">{agent.successRate}%</p>
                  <p className="font-mono text-[9px] text-muted mt-0.5">Success</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
