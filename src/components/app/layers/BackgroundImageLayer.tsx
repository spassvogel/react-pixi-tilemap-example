import type { ComponentProps } from "react"
import TilingSprite from "../../pixi/TilingSprite"
import { TiledLayerType, type TiledLayerData } from "../../../types/tiledMapData"
import { selectors, useLevelStore } from "../../store/level"


type Props = Omit<ComponentProps<typeof TilingSprite>, 'src'> & {
  imageBasePath: string
  layerData: Extract<TiledLayerData, { 
    type: typeof TiledLayerType.imagelayer 
  }>
}

/** Uses camera X to handle parallax */
const BackgroundImageLayer = ({ imageBasePath, layerData, width, height }: Props) => {
  const { cameraX } = useLevelStore()
  const worldWidth = useLevelStore(selectors.worldWidth) ?? 0
  const worldHeight = useLevelStore(selectors.worldHeight) ?? 0

  const tilePosX = -cameraX * (layerData.parallaxx ?? 1)
  return (
    <TilingSprite
      width={width ?? worldWidth}
      height={height ?? worldHeight}
      src={`${imageBasePath}${layerData.image}`}
      label={layerData.name}
      alpha={layerData.opacity}
      tilePosition={{ x: tilePosX, y: 0 }}
    />
  )
}

export default BackgroundImageLayer