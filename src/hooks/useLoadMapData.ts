import { Assets } from "pixi.js"
import { useState, useEffect } from "react"
import type { TiledMapData, TiledTilesetData, TiledTilesetExternalData } from "../types/tiledMapData"

/** Loads a Tiled map by basePath and fileName.  */
const useLoadMapData = (basePath: string, fileName: string) => {
  
  const [mapData, setMapData] = useState<TiledMapData>()
  
  useEffect(() => {
    const fullPath = `${basePath}${fileName}`
    Assets.load(fullPath).then(async (md: TiledMapData) => {
      await Promise.all(md.tilesets.map(async (ts, i) => { 
        md.tilesets[i] = await loadExternalTileset(ts, basePath)
      }))

      setMapData(md)
    })
  }, [basePath, fileName])

  return mapData
}

export default useLoadMapData

const isTiledTilesetExternalData = (tilesetData: TiledTilesetData | TiledTilesetExternalData): tilesetData is TiledTilesetExternalData => {
  return 'source' in tilesetData;
}

/** Check if tileset is externally embedded, if so, load it and inject it */
const loadExternalTileset = async (tilesetData: TiledTilesetData | TiledTilesetExternalData, basePath: string ): Promise<TiledTilesetData> => {
  if (isTiledTilesetExternalData(tilesetData)) {
    if (!tilesetData.source.toLowerCase().endsWith('tsj') && !tilesetData.source.toLowerCase().endsWith('json')) {
      throw new Error(`Only .tjs or .json tileset imports are supported. ${tilesetData.source} is not that!`)
    }
    const response = await fetch(`${basePath}${tilesetData.source}`)
    const data = await response.json()
    return {
      ...tilesetData,
      ...data
    }
  }
  return tilesetData
}


