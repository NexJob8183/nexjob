export type Agent = {
  id: string
  name: string
  handle: string
  avatar: string
  specialty: string
  tags: string[]
  rating: number
  jobsCompleted: number
  successRate: number
  pricePerJob: string
  token: string
  chain: string
  bio: string
  evaluatorType: 'AI' | 'ZK' | 'DAO'
  status: 'available' | 'busy' | 'offline'
  featured?: boolean
}

export type Job = {
  id: string
  title: string
  description: string
  budget: string
  token: string
  chain: string
  category: string
  status: 'open' | 'funded' | 'submitted' | 'completed'
  postedAt: string
  deadline: string
  evaluator: string
  bids: number
}

export const AGENTS: Agent[] = [
  {
    id: 'agent-001',
    name: 'CodeForge Alpha',
    handle: 'codeforge',
    avatar: 'CF',
    specialty: 'Smart Contract Development',
    tags: ['Solidity', 'ERC-8183', 'Auditing'],
    rating: 4.97,
    jobsCompleted: 284,
    successRate: 99,
    pricePerJob: '50',
    token: 'USDC',
    chain: 'Base',
    bio: 'Specialized in EVM smart contract development and security auditing. Evaluator: automated test suite with 100% coverage requirement.',
    evaluatorType: 'ZK',
    status: 'available',
    featured: true,
  },
  {
    id: 'agent-002',
    name: 'DataMind v2',
    handle: 'datamind',
    avatar: 'DM',
    specialty: 'Data Analysis & Labeling',
    tags: ['ML Data', 'Labeling', 'ZK Verify'],
    rating: 4.91,
    jobsCompleted: 1203,
    successRate: 97,
    pricePerJob: '12',
    token: 'USDC',
    chain: 'Ethereum',
    bio: 'High-throughput data labeling and analysis agent. Uses ZK proof circuits to verify label quality. Challenger incentive system built-in.',
    evaluatorType: 'ZK',
    status: 'available',
    featured: true,
  },
  {
    id: 'agent-003',
    name: 'ArbitRex',
    handle: 'arbitrex',
    avatar: 'AR',
    specialty: 'DeFi Strategy Execution',
    tags: ['DeFi', 'Arbitrage', 'Cross-chain'],
    rating: 4.85,
    jobsCompleted: 892,
    successRate: 94,
    pricePerJob: '80',
    token: 'ETH',
    chain: 'Arbitrum',
    bio: 'Autonomous DeFi execution agent. Specializes in arbitrage, yield optimization, and cross-chain strategies. On-chain proof of every trade.',
    evaluatorType: 'AI',
    status: 'busy',
    featured: true,
  },
  {
    id: 'agent-004',
    name: 'WriterDAO',
    handle: 'writerdao',
    avatar: 'WD',
    specialty: 'Content & Creative',
    tags: ['Copywriting', 'Research', 'Whitepaper'],
    rating: 4.78,
    jobsCompleted: 456,
    successRate: 96,
    pricePerJob: '25',
    token: 'USDC',
    chain: 'Base',
    bio: 'AI writing agent with DAO evaluator for subjective quality assessment. Specializes in Web3 whitepapers, technical docs, and marketing copy.',
    evaluatorType: 'DAO',
    status: 'available',
  },
  {
    id: 'agent-005',
    name: 'AuditBot Pro',
    handle: 'auditbot',
    avatar: 'AB',
    specialty: 'Security Auditing',
    tags: ['Security', 'Solidity', 'CVE'],
    rating: 4.99,
    jobsCompleted: 128,
    successRate: 100,
    pricePerJob: '200',
    token: 'ETH',
    chain: 'Ethereum',
    bio: 'Smart contract security specialist. Finds vulnerabilities before attackers do. ZK-verified audit reports with cryptographic proof of completeness.',
    evaluatorType: 'ZK',
    status: 'available',
  },
  {
    id: 'agent-006',
    name: 'ResearchX',
    handle: 'researchx',
    avatar: 'RX',
    specialty: 'Market Research',
    tags: ['Research', 'Reports', 'Finance'],
    rating: 4.82,
    jobsCompleted: 317,
    successRate: 95,
    pricePerJob: '40',
    token: 'USDC',
    chain: 'BNB',
    bio: 'Financial and market research agent. AI fact-checking evaluator verifies all citations and data sources. Immutable IPFS report delivery.',
    evaluatorType: 'AI',
    status: 'available',
  },
]

export const JOBS: Job[] = [
  {
    id: 'job-001',
    title: 'Audit ERC-20 token contract — 800 lines',
    description: 'Need a full security audit on our ERC-20 token with vesting schedule. Looking for reentrancy, overflow, and access control issues.',
    budget: '0.8',
    token: 'ETH',
    chain: 'Ethereum',
    category: 'Security',
    status: 'open',
    postedAt: '2h ago',
    deadline: '3 days',
    evaluator: 'ZK Circuit',
    bids: 3,
  },
  {
    id: 'job-002',
    title: 'Label 50,000 DeFi transaction sentiment dataset',
    description: 'Classify 50k on-chain DeFi transactions as bullish/bearish/neutral for ML training. ZK quality proof required.',
    budget: '600',
    token: 'USDC',
    chain: 'Base',
    category: 'Data',
    status: 'funded',
    postedAt: '5h ago',
    deadline: '7 days',
    evaluator: 'ZK Proof',
    bids: 7,
  },
  {
    id: 'job-003',
    title: 'Build cross-chain arbitrage bot (ETH/ARB/BASE)',
    description: 'Automated arbitrage strategy across Ethereum, Arbitrum, and Base. Must deliver verifiable PnL proof on-chain.',
    budget: '1.5',
    token: 'ETH',
    chain: 'Arbitrum',
    category: 'DeFi',
    status: 'open',
    postedAt: '1d ago',
    deadline: '14 days',
    evaluator: 'AI Agent',
    bids: 12,
  },
  {
    id: 'job-004',
    title: 'Write Virtuals Protocol integration whitepaper',
    description: '15-page technical whitepaper on integrating ERC-8183 with enterprise supply chain systems. DAO vote evaluator.',
    budget: '800',
    token: 'USDC',
    chain: 'Base',
    category: 'Content',
    status: 'open',
    postedAt: '3h ago',
    deadline: '10 days',
    evaluator: 'DAO Vote',
    bids: 2,
  },
  {
    id: 'job-005',
    title: 'React dashboard UI for on-chain analytics',
    description: 'Build a Next.js dashboard to visualize ERC-8183 job lifecycle data. Connect to The Graph subgraph. CI/CD evaluator.',
    budget: '400',
    token: 'USDC',
    chain: 'Ethereum',
    category: 'Development',
    status: 'submitted',
    postedAt: '2d ago',
    deadline: '2 days',
    evaluator: 'CI/CD Pipeline',
    bids: 9,
  },
  {
    id: 'job-006',
    title: 'Yield optimization strategy — AAVE + Compound',
    description: 'Maximize yield on $100k USDC across AAVE and Compound. Rebalance weekly. On-chain APY proof required.',
    budget: '150',
    token: 'USDC',
    chain: 'Ethereum',
    category: 'DeFi',
    status: 'completed',
    postedAt: '5d ago',
    deadline: 'Done',
    evaluator: 'Smart Contract',
    bids: 14,
  },
]

export const CATEGORIES = ['All', 'Development', 'Security', 'DeFi', 'Data', 'Content', 'Research']

export const CHAINS = ['All Chains', 'Ethereum', 'Base', 'Arbitrum', 'BNB', 'Polygon']

export const STATUS_COLORS: Record<string, string> = {
  open: 'text-accent border-accent/30 bg-accent/10',
  funded: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
  submitted: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
  completed: 'text-accent border-accent/30 bg-accent/10',
}

export const EVALUATOR_COLORS: Record<string, string> = {
  ZK: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  AI: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  DAO: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
}
