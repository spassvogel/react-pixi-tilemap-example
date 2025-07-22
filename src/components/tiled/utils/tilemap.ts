import type { TiledTilesetData } from "../../../types/tiledMapData"
import type { CompositeTilemap } from '@pixi/tilemap'

type TileOptions = Parameters<CompositeTilemap['tile']>[3] | null

/** Attempts to determine whether the provided `tileId` has an animation associated with it in the `tileset`.
 * If so, will return properties like `animX`, `animY`, `animCountX`, `animCountY` that can be passed into 
 * tilemap.tile(). If not an animation, will return `null`
 */
export const determineTilemapAnimationOptions = (
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

const FLIPPED_HORIZONTALLY_FLAG = 0x80000000
const FLIPPED_VERTICALLY_FLAG   = 0x40000000
const FLIPPED_DIAGONALLY_FLAG   = 0x20000000

// todo: check this, its not working well!
export const determineTilemapTileRotation = (gid: number) => {
  const h = (gid & FLIPPED_HORIZONTALLY_FLAG) !== 0
  const v = (gid & FLIPPED_VERTICALLY_FLAG) !== 0
  const d = (gid & FLIPPED_DIAGONALLY_FLAG) !== 0

  // See: https://github.com/pixijs/pixijs/blob/dev/packages/spritesheet/src/Spritesheet.ts#L101
  if (!d) {
    if (!h && !v) return 0
    if (h && !v) return 4 // horizontal flip
    if (!h && v) return 2 // 180°
    if (h && v) return 6 // 180° + horizontal flip
  } else {
    if (!h && !v) return 1 // 90°
    if (h && !v) return 5 // 90° + horizontal flip
    if (!h && v) return 3 // 270°
    if (h && v) return 7 // 270° + horizontal flip
  }
  return 0
}


