import { Container } from "pixi.js"
import { useMemo, type PropsWithChildren } from "react"
import useLoadTilesets from "../../hooks/useLoadTilesets"
import { extend, useApplication } from "@pixi/react"
import TiledTileLayer from "./TiledTileLayer"
import useLoadMapData from "../../hooks/useLoadMapData"
import TilingSprite from "../pixi/TilingSprite"
import ObjectGroupLayer from "./ObjectGroupLayer"

type Props = PropsWithChildren<{
  fileName: string
  basePath?: string
  tilesetBasePath?: string
  imageBasePath?: string
}>

extend({
  Container,
})


const TiledTilemap = ({ 
  fileName,
  basePath = "./",
  tilesetBasePath = "./",
  imageBasePath = "./",
  children 
}: Props) => {
  const mapData = useLoadMapData(basePath, fileName)
  const tilesetTextures = useLoadTilesets(mapData?.tilesets ?? [], tilesetBasePath)
  const { app } = useApplication()

  const layers = useMemo(() => {
    if (!mapData || !tilesetTextures) {
      return null
    }
    return mapData.layers.map((l, i) => {
      if (!l.visible) {
        return null
      }
      switch (l.type) {
        case 'tilelayer': {
          return (
            <TiledTileLayer 
              layerIndex={i}
              mapData={mapData}
              key={l.name}
              tilesetTextures={tilesetTextures} 
            />
          )
        }
        case 'imagelayer': {
          return (
            // Todo: wrap in TiledImageLayer component
            // that supports opacity, parallax etc
            <TilingSprite
              width={app.renderer.width}
              height={app.renderer.height}
              src={`${imageBasePath}${l.image}`}
              key={l.name}
              label={l.name}
            />
          )
        }
        case 'objectgroup': {
          return (
            <ObjectGroupLayer 
              layerIndex={i}
              mapData={mapData}
              key={l.name}
              tilesetTextures={tilesetTextures} 
            />
          )
        }
        default:
          console.warn(`Unknown layer type ${JSON.stringify(l)}`)
          return null
      }
    })
    
  }, [app.renderer.height, app.renderer.width, imageBasePath, mapData, tilesetTextures])

  if (!tilesetTextures) {
    return null
  }

  return (
    <pixiContainer label="TiledTilemap">
      {/* <Sprite src="village/backgrounds/mist-forest/mist-forest-background-previewx2.png" /> */}
      {layers}
      {children}
    </pixiContainer>
  )
}

export default TiledTilemap