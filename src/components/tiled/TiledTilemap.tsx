import { Container } from "pixi.js"
import { useMemo, type JSX, type PropsWithChildren, type ReactNode } from "react"
import useLoadTilesets from "../../hooks/useLoadTilesets"
import { extend } from "@pixi/react"
import TiledTileLayer from "./TiledTileLayer"
import ObjectGroupLayer from "./ObjectGroupLayer"
import BackgroundImageLayer from "../app/layers/BackgroundImageLayer"
import { useLevelStore } from "../store/level"
import { IMAGE_BASE_PATH, TILESET_BASE_PATH } from "../../App"

type Props = PropsWithChildren<{
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
  renderLayers = (layers) => (layers),
  width,
  children
}: Props) => {
  const { mapData } = useLevelStore()
  const tilesetTextures = useLoadTilesets(mapData?.tilesets ?? [], TILESET_BASE_PATH)

  
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
              imageBasePath={IMAGE_BASE_PATH}
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
    
  }, [mapData, tilesetTextures, width])

  if (!tilesetTextures) {
    return null
  }

  return (
    <pixiContainer label="TiledTilemap">
      {renderLayers(layers)}
      {children}
    </pixiContainer>
  )
}

export default TiledTilemap