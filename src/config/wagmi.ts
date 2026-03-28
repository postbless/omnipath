import { http, createConfig } from 'wagmi'
import { mainnet, arbitrum, optimism, base, polygon } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

// Получаем Project ID из переменных окружения
const walletConnectProjectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || 'demo'

// Конфигурация Wagmi для подключения к сетям
export const config = createConfig({
  chains: [mainnet, arbitrum, optimism, base, polygon],
  connectors: [
    injected(),
    walletConnect({
      projectId: walletConnectProjectId,
      showQrModal: true,
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
    [polygon.id]: http(),
  },
})

// Типизированные данные для сетей
export const supportedChains = [
  {
    id: mainnet.id,
    name: 'Ethereum',
    symbol: 'ETH',
    icon: 'ethereum',
    color: '#627EEA',
  },
  {
    id: arbitrum.id,
    name: 'Arbitrum',
    symbol: 'ETH',
    icon: 'arbitrum',
    color: '#28A0F0',
  },
  {
    id: optimism.id,
    name: 'Optimism',
    symbol: 'ETH',
    icon: 'optimism',
    color: '#FF0420',
  },
  {
    id: base.id,
    name: 'Base',
    symbol: 'ETH',
    icon: 'base',
    color: '#0052FF',
  },
  {
    id: polygon.id,
    name: 'Polygon',
    symbol: 'MATIC',
    icon: 'polygon',
    color: '#8247E5',
  },
] as const

// Тип для поддерживаемых сетей
export type SupportedChain = typeof supportedChains[number]

// Функция для получения данных о сети по ID
export function getChainById(chainId: number): SupportedChain | undefined {
  return supportedChains.find(chain => chain.id === chainId)
}

export default config
