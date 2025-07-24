import TiledTilemap from '../tiled/TiledTilemap'
import { useCallback, type JSX, type PropsWithChildren } from 'react'
import ActorLayer from './layers/ActorLayer'

type Props = PropsWithChildren<{
  worldWidth: number 
}>

const PlatformerTilemap = ({ worldWidth }: Props) => {

  // Inject the ActorLayer 
  const renderLayers = useCallback((layers: (JSX.Element | null)[] | null) => {
    if (!layers) {
      return null
    }

    return layers.reduce<JSX.Element[]>((acc, value) => {
      if (!value) {
        return acc
      }
      acc.push(value)
      if (value.key === 'floor') {
        acc.push(
          <ActorLayer key='actors'/>
        )
      }
      return acc
    }, [])
  }, [])

  return (
    <TiledTilemap
      width={worldWidth}
      fileName='gothic-level1.json' 
      basePath="/environment/gothic/" 
      tilesetBasePath="/environment/gothic/tilesets"
      imageBasePath="/environment/gothic/"
      renderLayers={renderLayers}
    />

  )
}

export default PlatformerTilemap
