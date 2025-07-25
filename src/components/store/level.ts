import type { PointData } from 'pixi.js'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type LevelStore = {
  cameraX: number
  playerPosition: PointData

  setCameraX: (x: number) => void
  /** sets `playerPosition` to `p` */
  setPlayerPosition: (p: Partial<PointData>) => void
  /** updates `playerPosition` with `p` */
  updatePlayerPosition: (p: Partial<PointData>) => void
}

const HALF_SCREEN = 256 / 2

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
      )),
      updatePlayerPosition: (pos) => set((state) => ({ 
        ...state, 
        playerPosition: { 
          x: state.playerPosition.x + (pos.x ?? 0),
          y: state.playerPosition.y + (pos.y ?? 0)
        },
        // this kinda sucks. can we use PixiViewport.follow?
        cameraX: (state.playerPosition.x + (pos.x ?? 0) > HALF_SCREEN) ? state.playerPosition.x + (pos.x ?? 0) : state.cameraX
      }))
    })
  )
)

