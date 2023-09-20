import { create } from 'zustand'

type PreloaderState = { isUiLoaded: boolean; setLoaded: (value: boolean) => void }

export const usePreloaderState = create<PreloaderState>((set) => ({
  isUiLoaded: false,
  setLoaded: (loaded) => set(() => ({ isUiLoaded: loaded }))
}))

export function useIsUiLoaded() {
  return usePreloaderState((state) => state.isUiLoaded)
}
