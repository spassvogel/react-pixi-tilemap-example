import { TiledLayerType, type TiledLayerData } from "../../../types/tiledMapData"

const getTiles = (layerData: TiledLayerData): number[] => {
  if (layerData.type !== TiledLayerType.tilelayer) {
    // This should never happen, but let's satisfy typescript
    return []
  }
  if (typeof(layerData.data) !== 'string') {
    // return new Uint8Array(layer.data);
    return layerData.data
  }

  // todo: decode!
  // ==================================
  // == If applicable, decode Base64 ==
  // ==================================
  // if(layer.encoding === 'base64') {
    // data = base64.decode(rawData);
    // data = base64.decode("dGVzdA==");
  // }

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

export default getTiles