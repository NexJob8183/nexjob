'use client'

import { useAccount, useBalance, useChainId, useSwitchChain } from 'wagmi'
import { useConnectModal, useAccountModal } from '@rainbow-me/rainbowkit'
import { base } from 'wagmi/chains'

export function useWallet() {
  const { address, isConnected, isConnecting } = useAccount()
  const chainId = useChainId()
  const { data: balance } = useBalance({ address })
  const { switchChain } = useSwitchChain()
  const { openConnectModal } = useConnectModal()
  const { openAccountModal } = useAccountModal()

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : null

  const switchToBase = () => switchChain?.({ chainId: base.id })

  const isOnBase = chainId === base.id

  return {
    address,
    shortAddress,
    isConnected,
    isConnecting,
    chainId,
    balance,
    isOnBase,
    switchToBase,
    openConnectModal,
    openAccountModal,
  }
}
