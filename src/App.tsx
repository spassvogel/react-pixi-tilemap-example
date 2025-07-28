import { Application, extend } from '@pixi/react'
import PixiDevToolsConnector from './components/pixi/PixiDevToolsConnector'
import { Graphics, TextureSource } from 'pixi.js'
import PlatformerViewport from './components/app/PlatformerViewport'
import PlatformerTilemap from './components/app/PlatformerTilemap'

import { useLevelStore } from './components/store/level'
import useLoadMapData from './hooks/useLoadMapData'
import { useEffect } from 'react'

import './App.css'

extend({
  Graphics,
})


const viewportWidth = 16 * 16
const viewportHeight = 11 * 16

TextureSource.defaultOptions.scaleMode = 'linear'

const BASE_PATH = "/environment/gothic/"
export const TILESET_BASE_PATH = "/environment/gothic/tilesets"
export const IMAGE_BASE_PATH = "/environment/gothic/"

function App() {

  // Load map. Available maps: 
  // - `gothic-level1.json`
  // - `gothic-level2.json`
  const mapData = useLoadMapData(BASE_PATH, 'gothic-level2.json' )
  const { setMapData } = useLevelStore()

  useEffect(() => {
    if (mapData) {
      // Make map data available in global store
      setMapData(mapData)
    }
  }, [mapData, setMapData])

  if (!mapData) {
    return null // todo: loading spinner?
  }
  return (
    <>
      <Application width={viewportWidth} height={viewportHeight}>
        {import.meta.env.DEV && <PixiDevToolsConnector />}
        <pixiContainer label="Application">
          <PlatformerViewport
            screenWidth={viewportHeight}
            screenHeight={viewportHeight}            
          >
            <PlatformerTilemap />
          </PlatformerViewport>
        </pixiContainer>
      </Application>
    </>
  )
}

export default App
