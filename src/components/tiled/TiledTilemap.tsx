import { Container } from "pixi.js"
import { useMemo, type JSX, type PropsWithChildren, type ReactNode } from "react"
import useLoadTilesets from "../../hooks/useLoadTilesets"
import { extend } from "@pixi/react"
import TiledTileLayer from "./TiledTileLayer"
import useLoadMapData from "../../hooks/useLoadMapData"
import ObjectGroupLayer from "./ObjectGroupLayer"
import BackgroundImageLayer from "../app/layers/BackgroundImageLayer"

type Props = PropsWithChildren<{
  fileName: string
  basePath?: string
  tilesetBasePath?: string
  imageBasePath?: string
  width?: number

  /** A render function for the different layers of this tilemap. This can be used to inject a 'layer' in a specific place 
   * For this to work it's useful to realise that the layers' `key` property will be set to the `name` in Tiled
  */
  renderLayers?: (layers: (JSX.Element | null)[] | null) => ReactNode
}>

extend({
  Container, Text
})

const TiledTilemap = ({ 
  fileName,
  basePath = "./",
  tilesetBasePath = "./",
  imageBasePath = "./",
  renderLayers = (layers) => (layers),
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
          // todo: only backgroundimagelayer when image repeats!
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
      {renderLayers(layers)}
      {children}
    </pixiContainer>
  )
}

export default TiledTilemap