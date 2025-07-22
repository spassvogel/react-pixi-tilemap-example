import { TiledLayerType, type TiledLayerData, type TiledTilesetData } from "../../../types/tiledMapData"
import { Buffer } from 'buffer'

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
    const decoded = Buffer.from(layerData.data, 'base64')
    const array = []
    // Read buffer data every 4 bytes ==
    for(let i = 0; i < decoded.length; i += 4) {
      array.push(decoded.readUInt32LE(i))
    }
    return array
  }

  // ============================================
  // == If applicable, extract compressed data ==
  // ============================================
  // if(layer.compression === 'gzip') {
    //    data = zlib.gunzipSync(data);
  // }

  // ====================================
  // == Read buffer data every 4 bytes ==
  // ====================================

  // Each 32-bit integer is placed in an 8-bit integer array.
  // There will never be a tile ID greater than 255, so only 1 byte is required.
  // let array = new Uint8Array(layer.width * layer.height);
  // for(let i=0, index=0; i<data.length; i += 4, index++) {
  //     array[index] = data.readUInt32LE(i);
  //     index++;
  // }
  // return array;
  return []
}
