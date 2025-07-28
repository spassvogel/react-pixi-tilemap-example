import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { TiledMapData } from '../../types/tiledMapData'

type LevelStore = {
  cameraX: number
  mapData: TiledMapData

  setCameraX: (x: number) => void
  setMapData: (md: TiledMapData) => void
}

export const useLevelStore = create<LevelStore>()(
  devtools(
    (set) => ({
      cameraX: 0,

      setCameraX: (cameraX) => set((state) => ({ 
        ...state, 
        cameraX 
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