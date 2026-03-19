'use client'
import { useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { JOBS, CATEGORIES, CHAINS } from '@/lib/data'
import { StatusBadge, Badge } from '@/components/ui'

export default function ExplorePage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [chain, setChain] = useState('All Chains')
  const [status, setStatus] = useState('All')

  const filtered = JOBS.filter(job => {
    const matchSearch = job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.description.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'All' || job.category === category
    const matchChain = chain === 'All Chains' || job.chain === chain
    const matchStatus = status === 'All' || job.status === status
    return matchSearch && matchCat && matchChain && matchStatus
  })

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-10">
          <p className="font-mono text-[11px] tracking-[0.15em] text-accent uppercase mb-3">// MARKETPLACE</p>
          <h1 className="font-syne font-extrabold text-5xl tracking-tight mb-2">Explore Jobs</h1>
          <p className="text-muted text-base">{JOBS.length} active jobs across all chains</p>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full font-mono text-sm pl-10 pr-4 py-3 bg-[#0d0d1a] border border-white/[0.07] rounded text-white placeholder:text-muted focus:outline-none focus:border-accent/40 transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(['All', 'open', 'funded', 'submitted', 'completed']).map(s => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`font-mono text-[11px] tracking-wider px-3 py-2 rounded border capitalize transition-all ${
                  status === s
                    ? 'border-accent/40 bg-accent/10 text-accent'
                    : 'border-white/[0.07] text-muted hover:border-white/20'
                }`}
              >
                {s === 'All' ? 'All Status' : s}
              </button>
            ))}
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`font-mono text-[11px] tracking-wider px-3 py-1.5 rounded-full border transition-all ${
                category === cat
                  ? 'border-accent/40 bg-accent/10 text-accent'
                  : 'border-white/[0.07] text-muted hover:border-white/20 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
          <div className="ml-auto flex gap-2">
            {CHAINS.map(c => (
              <button
                key={c}
                onClick={() => setChain(c)}
                className={`font-mono text-[11px] tracking-wider px-3 py-1.5 rounded-full border transition-all ${
                  chain === c
                    ? 'border-accent/40 bg-accent/10 text-accent'
                    : 'border-white/[0.07] text-muted hover:border-white/20'
                }`}
              >
                {c === 'All Chains' ? 'All' : c}
              </button>
            ))}
          </div>
        </div>

        {/* Job list */}
        <div className="flex flex-col gap-3">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted font-mono text-sm">
              No jobs found matching your filters.
            </div>
          ) : filtered.map(job => (
            <div
              key={job.id}
              className="group bg-[#0d0d1a] border border-white/[0.07] hover:border-accent/20 rounded-lg p-5 md:p-6 transition-all hover:bg-[#111124] cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Left */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <StatusBadge status={job.status} />
                    <Badge>{job.category}</Badge>
                    <Badge>{job.chain}</Badge>
                    <span className="font-mono text-[10px] text-muted">{job.postedAt}</span>
                  </div>
                  <h3 className="font-syne font-bold text-base md:text-lg mb-1.5 group-hover:text-white transition-colors">{job.title}</h3>
                  <p className="text-sm text-muted leading-relaxed line-clamp-2">{job.description}</p>
                </div>

                {/* Right */}
                <div className="flex md:flex-col items-center md:items-end gap-6 md:gap-2 flex-shrink-0">
                  <div className="text-right">
                    <p className="font-mono text-lg font-bold text-accent">{job.budget} {job.token}</p>
                    <p className="font-mono text-[10px] text-muted">{job.bids} bids · {job.deadline}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[10px] text-muted">Evaluator</p>
                    <p className="font-mono text-xs text-white">{job.evaluator}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
