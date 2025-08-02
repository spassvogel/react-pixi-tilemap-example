import { useEffect, useRef, useState } from "react"
import { TiledLayerType, type TiledMapData } from "../../types/tiledMapData"
import { CompositeTilemap as PixiCompositeTilemap } from '@pixi/tilemap'
import CompositeTilemap from "../pixi/CompositeTilemap"
import { findTileset } from "./utils/tiles"
import type { Texture } from "pixi.js"
import { determineTilemapAnimationOptions, determineTilemapTileRotation } from "./utils/tilemap"
import normalizeGid from "./utils/normalizeGid"

type Props = {
  mapData: TiledMapData
  tilesetTextures: { [name: string]: Texture } 
  layerIndex: number
  animationInterval?: number
}

/** Corresponds to a tiled layer of type 'objectgroup' where tiles can be placed 'free form' */
const ObjectGroupLayer = ({ 
  layerIndex, 
  tilesetTextures, 
  mapData,
  animationInterval = 100  
 }: Props) => {
  const ref = useRef<PixiCompositeTilemap>(null)
  const layerData = mapData.layers[layerIndex]
  if (layerData.type !== TiledLayerType.objectgroup) {
    // This should never happen, but let's satisfy typescript
    throw new Error(`ObjectGroupLayer should only receive layer of type ${TiledLayerType.objectgroup}`)
  }

  const [hasAnimation, setHasAnimation] = useState(false)

  useEffect(() => {
    const currentRef = ref.current
    if (!currentRef) {
      return
    }

    let foundAnimation = false
    const data = layerData.objects
    data.map((object) => {
      const { gid, visible, x } = object
      if (!visible) {
        return null
      }

      const actualGid = normalizeGid(gid)
      const tileset = findTileset(actualGid, mapData.tilesets)
      if (!tileset || gid === 0) return null

      let { y } = object

      // "tile objects have bottom-left corner origin"
      // https://github.com/mapeditor/tiled/issues/1710#issuecomment-325672568
      y += -object.height

      // Get the tileid local to the tileset
      const tileId = actualGid - tileset.firstgid + 1

      if (tilesetTextures[`${tileset.name}-${tileId}`]) {
        const alpha = layerData.opacity
        const rotate = determineTilemapTileRotation(gid)
        const animOptions = determineTilemapAnimationOptions(tileId, tileset, animationInterval)
        
        if (animOptions) {
          foundAnimation = true
        }

        currentRef.tile(tilesetTextures[`${tileset.name}-${tileId}`], x, y, {
          alpha,
          rotate,
          ...animOptions
        })
      } else {
        console.warn('Could not find ' + `${tileset.name}-${tileId}`, tilesetTextures )
      }
    })

    setHasAnimation(foundAnimation)
  }, [
    animationInterval, 
    layerData, 
    mapData,
    tilesetTextures
  ])
  
  useEffect(() => {
    const currentRef = ref.current
    if (!currentRef) {
      return
    }
    let interval: NodeJS.Timeout | undefined = undefined
   
    if (!hasAnimation) {
      clearInterval(interval)
    }

    let frame = 0
    const update = () => {
      // animate X and Y frames
      currentRef.tileAnim = [frame, frame]
      frame++
    }

    interval = setInterval(update, animationInterval)
    return () => {
      clearInterval(interval)
    }
  }, [animationInterval, hasAnimation])
  
  return (
    <CompositeTilemap ref={ref} label={layerData.name} />
  )
}

export default ObjectGroupLayer
