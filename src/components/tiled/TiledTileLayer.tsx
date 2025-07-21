import { useEffect, useRef } from "react"
import { TiledLayerType, type TiledMapData } from "../../types/tiledMapData"
import { CompositeTilemap as PixiCompositeTilemap } from '@pixi/tilemap'
import CompositeTilemap from "../pixi/CompositeTilemap"
import { findTileset } from "./utils/tiles"
import type { Texture } from "pixi.js"

type Props = {
  mapData: TiledMapData
  tilesetTextures: { [name: string]: Texture } 
  layerIndex: number
}

const TiledTileLayer = ({ layerIndex, tilesetTextures, mapData }: Props) => {
  const ref = useRef<PixiCompositeTilemap>(null)

  useEffect(() => {
    const currentRef = ref.current
    if (!currentRef) {
      return
    }
    const layerData = mapData.layers[layerIndex]
    if (layerData.type !== TiledLayerType.tilelayer) {
      // This should never happen, but let's satisfy typescript
      return
    }

    layerData.data.map((gid, i) => {
      const actualGid = gid & 0x1FFFFFFF
      const tileset = findTileset(actualGid, mapData.tilesets)
      if (!tileset || gid === 0) return null

      const columns = mapData.width
      const x = (i % columns) * mapData.tilewidth
      const y = Math.floor(i / columns) * mapData.tileheight

      if (tilesetTextures[`${tileset.name}-${gid}`]) {
        currentRef.tile(tilesetTextures[`${tileset.name}-${gid}`], x, y, {
          alpha: layerData.opacity
        })
      } else {
        console.warn('Could not find ' + `${tileset.name}-${gid}`, tilesetTextures )
      }
    })
  }, [layerIndex, mapData, tilesetTextures])
  
  return (
    <CompositeTilemap ref={ref} />
  )
}

export default TiledTileLayer
