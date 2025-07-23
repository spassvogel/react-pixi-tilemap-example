import { Container } from "pixi.js"
import { useMemo, type PropsWithChildren } from "react"
import useLoadTilesets from "../../hooks/useLoadTilesets"
import { extend, useApplication } from "@pixi/react"
import TiledTileLayer from "./TiledTileLayer"
import useLoadMapData from "../../hooks/useLoadMapData"
import ObjectGroupLayer from "./ObjectGroupLayer"
import BackgroundImageLayer from "../app/BackgroundImageLayer"

type Props = PropsWithChildren<{
  fileName: string
  basePath?: string
  tilesetBasePath?: string
  imageBasePath?: string
  width?: number
}>

extend({
  Container, Text
})


const TiledTilemap = ({ 
  fileName,
  basePath = "./",
  tilesetBasePath = "./",
  imageBasePath = "./",
  width,
  children
}: Props) => {
  const mapData = useLoadMapData(basePath, fileName)
  const tilesetTextures = useLoadTilesets(mapData?.tilesets ?? [], tilesetBasePath)

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
            <BackgroundImageLayer
              imageBasePath={imageBasePath}
              width={width}
              key={l.name}
              layerData={l}
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
    
  }, [imageBasePath, mapData, tilesetTextures, width])

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