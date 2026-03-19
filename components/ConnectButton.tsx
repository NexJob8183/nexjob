'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ChevronDown, Wallet } from 'lucide-react'

export function NexJobConnectButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated')

        if (!ready) {
          return (
            <div className="font-mono text-xs tracking-wider px-4 py-2 rounded border border-white/10 text-muted opacity-50 select-none">
              Loading...
            </div>
          )
        }

        if (!connected) {
          return (
            <button
              onClick={openConnectModal}
              className="flex items-center gap-2 font-mono text-xs tracking-wider px-4 py-2 rounded border border-white/10 text-muted hover:border-accent/40 hover:text-accent transition-all duration-200 group"
            >
              <Wallet size={13} className="group-hover:text-accent transition-colors" />
              CONNECT WALLET
            </button>
          )
        }

        if (chain.unsupported) {
          return (
            <button
              onClick={openChainModal}
              className="flex items-center gap-2 font-mono text-xs tracking-wider px-4 py-2 rounded border border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
            >
              ⚠ WRONG NETWORK
            </button>
          )
        }

        return (
          <div className="flex items-center gap-2">
            {/* Chain selector */}
            <button
              onClick={openChainModal}
              className="hidden md:flex items-center gap-1.5 font-mono text-[11px] tracking-wider px-3 py-2 rounded border border-white/[0.07] text-muted hover:border-white/20 hover:text-white transition-all"
            >
              {chain.hasIcon && chain.iconUrl && (
                <img
                  src={chain.iconUrl}
                  alt={chain.name ?? 'chain icon'}
                  className="w-3.5 h-3.5 rounded-full"
                />
              )}
              {chain.name}
              <ChevronDown size={11} />
            </button>

            {/* Account button */}
            <button
              onClick={openAccountModal}
              className="flex items-center gap-2 font-mono text-[11px] tracking-wider px-3 py-2 rounded border border-accent/30 bg-accent/10 text-accent hover:bg-accent/15 transition-all"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent glow-dot" />
              {account.displayName}
              {account.displayBalance && (
                <span className="hidden md:inline text-accent/60">
                  · {account.displayBalance}
                </span>
              )}
              <ChevronDown size={11} />
            </button>
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
