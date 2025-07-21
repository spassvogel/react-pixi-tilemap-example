import { useEffect, useRef } from "react"
import { TiledLayerType, type TiledMapData } from "../../types/tiledMapData"
import { CompositeTilemap as PixiCompositeTilemap } from '@pixi/tilemap'
import CompositeTilemap from "../pixi/CompositeTilemap"
import { findTileset } from "./utils/tiles"
import type { Texture } from "pixi.js"
import normalizeGid from "./utils/normalizeGid"
import tiledFlagsToPixiRotate from "./utils/tiledFlagsToPixiRotate"

type Props = {
  mapData: TiledMapData
  tilesetTextures: { [name: string]: Texture } 
  layerIndex: number
}



const TiledTileLayer = ({ layerIndex, tilesetTextures, mapData }: Props) => {
  const ref = useRef<PixiCompositeTilemap>(null)
  const layerData = mapData.layers[layerIndex]
  if (layerData.type !== TiledLayerType.tilelayer) {
    // This should never happen, but let's satisfy typescript
    throw new Error(`ObjectGroupLayer should only receive layer of type ${TiledLayerType.tilelayer}`)
  }

  useEffect(() => {
    const currentRef = ref.current
    if (!currentRef) {
      return
    }

    layerData.data.map((gid, i) => {
      const actualGid = normalizeGid(gid)
      const tileset = findTileset(actualGid, mapData.tilesets)
      if (!tileset || gid === 0) return null

      const columns = mapData.width
      let x = (i % columns) * mapData.tilewidth
      let y = Math.floor(i / columns) * mapData.tileheight
      
      // If the tileset has a different size than the actual map, offset the location
      x += mapData.tilewidth - tileset.tilewidth
      y += mapData.tileheight - tileset.tileheight
      
      // Get the tileid local to the tileset
      const tileId = actualGid - tileset.firstgid + 1

      if (tilesetTextures[`${tileset.name}-${tileId}`]) {
        const alpha = layerData.opacity
        const rotate = tiledFlagsToPixiRotate(gid)
        currentRef.tile(tilesetTextures[`${tileset.name}-${tileId}`], x, y, {
          alpha,
          rotate,
        })
      } else {
        console.warn('Could not find ' + `${tileset.name}-${tileId}`, tilesetTextures )
      }
    })
  }, [layerData.data, layerData.opacity, mapData.tileheight, mapData.tilesets, mapData.tilewidth, mapData.width, tilesetTextures])
  
  return (
    <CompositeTilemap ref={ref} label={layerData.name}/>
  )
}

export default TiledTileLayer
