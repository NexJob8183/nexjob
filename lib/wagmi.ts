import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, base, arbitrum, bsc, polygon } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'NexJob',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? 'YOUR_PROJECT_ID',
  chains: [base, mainnet, arbitrum, bsc, polygon],
  ssr: true,
})

export const SUPPORTED_CHAINS = [
  { id: base.id,     name: 'Base',     color: '#0052FF' },
  { id: mainnet.id,  name: 'Ethereum', color: '#627EEA' },
  { id: arbitrum.id, name: 'Arbitrum', color: '#28A0F0' },
  { id: bsc.id,      name: 'BNB Chain',color: '#F0B90B' },
  { id: polygon.id,  name: 'Polygon',  color: '#8247E5' },
]
