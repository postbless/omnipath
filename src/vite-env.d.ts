/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ETHERSCAN_API_KEY: string
  readonly VITE_LIFI_API_KEY: string
  readonly VITE_WALLET_CONNECT_PROJECT_ID: string
  readonly VITE_COINGECKO_API_KEY: string
  readonly VITE_MORALIS_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
