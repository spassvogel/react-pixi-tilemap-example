import { useEffect, useState } from "react"
import type { TiledTilesetData } from "../types/tiledMapData"
import { Texture, Rectangle, Assets } from "pixi.js"

const useLoadTilesets = (tilesetData: TiledTilesetData[], textureBasePath: string) => {
  const [textures, setTextures] = useState<{ [name: string]: Texture } | null>(null)

  useEffect(() => {
    if (!tilesetData.length) {
      return
    }

    const allTextures: { [name: string]: Texture } = {}

    const processTileset = async (tileset: TiledTilesetData) => {
      const baseTexture = await Assets.load<Texture>(`${textureBasePath}/${tileset.image}`)
      const columns = tileset.columns
      const w = tileset.tilewidth
      const h = tileset.tileheight
  
      for (let i = 0; i < tileset.tilecount; i++) {
        const x = (i % columns) * w
        const y = Math.floor(i / columns) * h
  
        const frame = new Rectangle(x, y, w, h)
        const texture = new Texture({ source: baseTexture.source, frame})
        const name = `${tileset.name}-${i + 1}`

        if (!Assets.cache.has(name)){
          Assets.cache.set(name, texture)
        }
        allTextures[name] = texture
      }
    }

    Promise.all(tilesetData.map(processTileset)).then(() => {
      if (Object.keys(allTextures).length > 0) {
        setTextures(allTextures)
      }
    })

  }, [textureBasePath, tilesetData])

  return textures
}

export default useLoadTilesets