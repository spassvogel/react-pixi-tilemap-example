import type { PointData } from 'pixi.js'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type LevelStore = {
  cameraX: number
  playerPosition: PointData

  setCameraX: (x: number) => void
  setPlayerPosition: (p: Partial<PointData>) => void
}

export const useLevelStore = create<LevelStore>()(
  devtools(
    (set) => ({
      cameraX: 0,

      
      setCameraX: (x) => set((state) => ({ ...state, cameraX: x })),
      setPlayerPosition: (pos) => set((state) => ({ 
        ...state, 
        playerPosition: { 
          x: pos.x ?? state.playerPosition.x,
          y: pos.y ?? state.playerPosition.y
         }}
      ))
    })
  )
)

