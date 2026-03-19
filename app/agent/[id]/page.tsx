import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Star, CheckCircle, Clock, Zap } from 'lucide-react'
import { AGENTS, JOBS } from '@/lib/data'
import { Avatar, Tag, Stars, Badge, EvalBadge, StatusBadge } from '@/components/ui'

export function generateStaticParams() {
  return AGENTS.map(agent => ({ id: agent.id }))
}

export default function AgentProfilePage({ params }: { params: { id: string } }) {
  const agent = AGENTS.find(a => a.id === params.id)
  if (!agent) notFound()

  // Show 2 sample jobs for this agent
  const agentJobs = JOBS.slice(0, 2)

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">

        {/* Back */}
        <Link href="/agents" className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-accent transition-colors mb-8">
          <ArrowLeft size={14} /> BACK TO AGENTS
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left — profile card */}
          <div className="lg:col-span-1">
            <div className="bg-[#0d0d1a] border border-white/[0.07] rounded-lg p-6 sticky top-24">

              <div className="flex flex-col items-center text-center mb-6">
                <Avatar initials={agent.avatar} size="lg" />
                <h1 className="font-syne font-extrabold text-xl mt-4 mb-0.5">{agent.name}</h1>
                <p className="font-mono text-[11px] text-muted tracking-wider">@{agent.handle}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    agent.status === 'available' ? 'bg-accent glow-dot' :
                    agent.status === 'busy' ? 'bg-amber-400' : 'bg-muted'
                  }`} />
                  <span className="font-mono text-[10px] text-muted capitalize">{agent.status}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: 'Rating', value: agent.rating, color: 'text-accent' },
                  { label: 'Jobs', value: agent.jobsCompleted, color: 'text-white' },
                  { label: 'Success', value: `${agent.successRate}%`, color: 'text-accent' },
                ].map(s => (
                  <div key={s.label} className="bg-white/[0.03] rounded p-3 text-center">
                    <p className={`font-mono text-sm font-bold ${s.color}`}>{s.value}</p>
                    <p className="font-mono text-[9px] text-muted mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="border border-accent/20 bg-accent/5 rounded-lg p-4 mb-5 text-center">
                <p className="font-mono text-[10px] text-muted mb-1">STARTING FROM</p>
                <p className="font-syne font-extrabold text-2xl text-accent">{agent.pricePerJob} {agent.token}</p>
                <p className="font-mono text-[10px] text-muted mt-0.5">per job · {agent.chain}</p>
              </div>

              <button className="w-full font-mono text-xs font-bold tracking-wider py-3 bg-accent text-bg rounded hover:opacity-85 transition-opacity mb-3">
                HIRE THIS AGENT
              </button>
              <button className="w-full font-mono text-xs tracking-wider py-3 border border-white/[0.07] text-muted rounded hover:border-white/20 hover:text-white transition-all">
                SEND MESSAGE
              </button>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-5">
                {agent.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
              </div>
            </div>
          </div>

          {/* Right — details */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* About */}
            <div className="bg-[#0d0d1a] border border-white/[0.07] rounded-lg p-6">
              <p className="font-mono text-[11px] tracking-widest text-muted uppercase mb-4">// ABOUT</p>
              <h2 className="font-syne font-bold text-lg mb-2">{agent.specialty}</h2>
              <p className="text-sm text-muted leading-relaxed">{agent.bio}</p>
            </div>

            {/* Evaluator */}
            <div className="bg-[#0d0d1a] border border-white/[0.07] rounded-lg p-6">
              <p className="font-mono text-[11px] tracking-widest text-muted uppercase mb-4">// EVALUATOR TYPE</p>
              <div className="flex items-start gap-4">
                <EvalBadge type={agent.evaluatorType} />
                <div>
                  <p className="text-sm font-bold mb-1">{agent.evaluatorType} Evaluator</p>
                  <p className="text-xs text-muted leading-relaxed">
                    {agent.evaluatorType === 'ZK' && 'Zero-knowledge proof circuit verifies task completion deterministically. No subjective judgment — math is the evaluator.'}
                    {agent.evaluatorType === 'AI' && 'A specialized AI agent evaluates quality and completeness. Fast, scalable, and available 24/7 for any task volume.'}
                    {agent.evaluatorType === 'DAO' && 'Multisig DAO vote decides on task quality. Best for subjective deliverables where community consensus matters.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Recent jobs */}
            <div className="bg-[#0d0d1a] border border-white/[0.07] rounded-lg p-6">
              <p className="font-mono text-[11px] tracking-widest text-muted uppercase mb-4">// RECENT JOBS</p>
              <div className="flex flex-col gap-3">
                {agentJobs.map(job => (
                  <div key={job.id} className="border border-white/[0.07] rounded p-4 hover:border-accent/20 transition-colors">
                    <div className="flex items-center gap-2 mb-1.5">
                      <StatusBadge status={job.status} />
                      <Badge>{job.category}</Badge>
                    </div>
                    <p className="font-syne font-bold text-sm mb-1">{job.title}</p>
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-[10px] text-muted">{job.postedAt}</p>
                      <p className="font-mono text-xs font-bold text-accent">{job.budget} {job.token}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chains */}
            <div className="bg-[#0d0d1a] border border-white/[0.07] rounded-lg p-6">
              <p className="font-mono text-[11px] tracking-widest text-muted uppercase mb-4">// SUPPORTED CHAINS</p>
              <div className="flex flex-wrap gap-2">
                {['Ethereum', 'Base', 'Arbitrum', 'BNB'].map(c => (
                  <span key={c} className="font-mono text-[11px] tracking-wider px-3 py-1.5 border border-white/[0.07] text-muted rounded">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
