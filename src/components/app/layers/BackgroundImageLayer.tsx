import type { ComponentProps } from "react"
import TilingSprite from "../../pixi/TilingSprite"
import { TiledLayerType, type TiledLayerData } from "../../../types/tiledMapData"
import { useApplication } from "@pixi/react"
import useLevelContext from "../../../hooks/useLevelContext"


type Props = Omit<ComponentProps<typeof TilingSprite>, 'src'> & {
  imageBasePath: string
  layerData: Extract<TiledLayerData, { 
    type: typeof TiledLayerType.imagelayer 
  }>
}

/** Uses camera X to handle parallax */
const BackgroundImageLayer = ({ imageBasePath, layerData, width = 0 }: Props) => {
  const { app } = useApplication()
  const { cameraX } = useLevelContext()

  if (!width) {
    console.warn(`Warning, no 'width' set on layer ${layerData.name}`)
  }

  const tilePosX = -cameraX * (layerData.parallaxx ?? 1)
  return (
    <TilingSprite
      height={app.renderer.height}
      width={width}
      src={`${imageBasePath}${layerData.image}`}
      label={layerData.name}
      alpha={layerData.opacity}
      tilePosition={{ x: tilePosX, y: 0 }}
    />
  )
}

export default BackgroundImageLayer