import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type LevelStore = {
  cameraX: number
  setCameraX: (x: number) => void
}

export const useLevelStore = create<LevelStore>()(
  devtools(
    (set) => ({
      cameraX: 0,
      setCameraX: (x) => set((state) => ({ ...state, cameraX: x }))
    })
  )
)

