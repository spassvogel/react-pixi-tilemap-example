import type { PointData } from 'pixi.js'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { TiledMapData } from '../../types/tiledMapData'

type LevelStore = {
  cameraX: number
  playerPosition: PointData
  mapData: TiledMapData

  setCameraX: (x: number) => void
  /** sets `playerPosition` to `p` */
  setPlayerPosition: (p: Partial<PointData>) => void
  /** updates `playerPosition` with `p` */
  updatePlayerPosition: (p: Partial<PointData>) => void
  setMapData: (md: TiledMapData) => void
}

const HALF_SCREEN = 256 / 2

export const useLevelStore = create<LevelStore>()(
  devtools(
    (set, get) => ({
      cameraX: 0,

      setCameraX: (cameraX) => set((state) => ({ ...state, cameraX })),
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
      })),
      setMapData: (mapData) => set((state) => ({
        ...state,
        mapData
      }))
    })
  )
)

export const selectors = {
  worldWidth: (state: LevelStore) => {
    if (!state || !state.mapData) {
      return null
    }

    return state.mapData.width * state.mapData.tilewidth
  },
  worldHeight: (state: LevelStore) => {
    if (!state || !state.mapData) {
      return null
    }

    return state.mapData.height * state.mapData.tileheight
  }
}