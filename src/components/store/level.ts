import { create } from 'zustand'

type LevelStore = {
  cameraX: number
  setCameraX: (x: number) => void
}

export const useLevelStore = create<LevelStore>((set) => ({
  cameraX: 0,

  setCameraX: (x) => set((state) => ({ ...state, cameraX: x }))
}))

