import type { TiledLayerType, TiledLayerData, TiledTilesetData } from "../../../types/tiledMapData"
import { Buffer } from 'buffer'
import pako from 'pako'

// finds tileset based on gid
export const findTileset = (gid: number, tilesets: TiledTilesetData[]) => {
  let tileset
  for (let i = tilesets.length - 1; i >= 0; i--) {
    tileset = tilesets[i]
    if (tileset.firstgid <= gid) {
      break
    }
  }
  return tileset
}


export const getTileData = (layerData: Extract<TiledLayerData, { type: typeof TiledLayerType.tilelayer }>): number[] => {
  if (typeof(layerData.data) !== 'string') {
    return layerData.data
  }

  // Decoding adapted from: https://stackoverflow.com/a/55876907

  // If applicable, decode Base64
  if(layerData.encoding === 'base64') {
    let decoded = Buffer.from(layerData.data, 'base64')

    // If applicable, extract gzip compressed data
    if(layerData.compression === 'gzip') {
      decoded = Buffer.from(pako.ungzip(decoded))
    }

    const array = []
    // Read buffer data every 4 bytes ==
    for(let i = 0; i < decoded.length; i += 4) {
      array.push(decoded.readUInt32LE(i))
    }
    return array
  }

  return []
}
