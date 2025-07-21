import type { TiledTilesetData } from "../../../types/tiledMapData"
import type { CompositeTilemap } from '@pixi/tilemap'

type TileOptions = Parameters<CompositeTilemap['tile']>[3] | null

/** Attempts to determine whether the provided `tileId` has an animation associated with it in the `tileset`.
 * If so, will return properties like `animX`, `animY`, `animCountX`, `animCountY` that can be passed into 
 * tilemap.tile(). If not an animation, will return `null`
 */
const determineTilemapAnimationOptions = (
  tileId: number, 
  tileset: TiledTilesetData, 
  animationInterval: number
): TileOptions => {
  if (!tileset.tiles) {
    return null
  }

  // Animation id is `0` based. regular tiles are 1 based, so subtract 1
  const animation = tileset.tiles.find((t) => t.id === tileId - 1)?.animation
  if (!animation || animation.length < 2) {
    // an animation of 1 frame does not make much sense...
    return null
  }

  // Determine timing, we cant support different frame duration, so we take the average and compare it to the 
  // global `animationInterval` which is the tick of the entire layer
  const averageFrameDuration = animation.reduce((sum, frame) => sum + frame.duration, 0) / animation.length
  const animDivisor = averageFrameDuration / animationInterval
  
  // Determine which direction the animation is laid out in
  const diffBetweenFirstTwoFrames = animation[1].tileid - animation[0].tileid
  if (diffBetweenFirstTwoFrames === 1) {
    // difference is 1, meaning the animation is laid out horizontally
    return {
      animX: tileset.tilewidth,
      animCountX: animation.length,
      animDivisor
    }
  }
  if (diffBetweenFirstTwoFrames === tileset.columns) {
    // difference is `columns`, meaning the animation is laid out vertically
    return {
      animY: tileset.tileheight,
      animCountY: animation.length,
      animDivisor
    }
  }
  console.warn(`Cannot render an animation where the tiles are laid out sparsely, \n
    use frames that follow each other either horizontally or vertically. \n
    Tileset: ${tileset.name}`)

  return null
}

export default determineTilemapAnimationOptions