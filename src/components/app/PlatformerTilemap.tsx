import { useCallback, type JSX } from 'react'
import TiledTilemap from '../tiled/TiledTilemap'
import ActorLayer from './layers/ActorLayer'
import { selectors, useLevelStore } from '../store/level'

const PlatformerTilemap = () => {
  const worldWidth = useLevelStore(selectors.worldWidth) ?? 0

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

 
  if (!worldWidth) {
    return null
  }

  return (
    <TiledTilemap renderLayers={renderLayers} width={worldWidth}/>
  )
}

export default PlatformerTilemap
