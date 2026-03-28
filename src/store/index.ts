import { create } from 'zustand'
import type { DashboardState, BridgeRoute } from '../types'

interface DashboardStore extends DashboardState {
  setSelectedFromChain: (chain: string) => void
  setSelectedToChain: (chain: string) => void
  setAmount: (amount: string) => void
  setSelectedRoute: (route: BridgeRoute | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

const initialState: DashboardState = {
  selectedFromChain: null,
  selectedToChain: null,
  amount: '',
  selectedRoute: null,
  isLoading: false,
  error: null,
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  ...initialState,
  
  setSelectedFromChain: (chain) => set({ selectedFromChain: chain }),
  
  setSelectedToChain: (chain) => set({ selectedToChain: chain }),
  
  setAmount: (amount) => set({ amount }),
  
  setSelectedRoute: (route) => set({ selectedRoute: route }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
  
  reset: () => set(initialState),
}))

export default useDashboardStore
