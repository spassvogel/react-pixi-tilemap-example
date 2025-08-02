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


const VIEWPORT_WIDTH = 16 * 16
const VIEWPORT_HEIGHT = 11 * 16
const BLOWUP_FACTOR = 2

TextureSource.defaultOptions.scaleMode = 'linear'

const BASE_PATH = `${import.meta.env.BASE_URL}environment/gothic/`
export const TILESET_BASE_PATH = `${import.meta.env.BASE_URL}environment/gothic/tilesets`
export const IMAGE_BASE_PATH = "/environment/gothic/"

function App() {

  // Load map. Available maps: 
  // - `gothic-level1.json`
  // - `gothic-level2.json`
  const mapData = useLoadMapData(BASE_PATH, 'gothic-level1.json')
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
      <Application width={VIEWPORT_WIDTH * BLOWUP_FACTOR} height={VIEWPORT_HEIGHT * BLOWUP_FACTOR} >
        {import.meta.env.DEV && <PixiDevToolsConnector />}
        <pixiContainer label="Application" scale={BLOWUP_FACTOR}> 
          <PlatformerViewport
            screenWidth={VIEWPORT_HEIGHT}
            screenHeight={VIEWPORT_HEIGHT}            
          >
            <PlatformerTilemap />
          </PlatformerViewport>
        </pixiContainer>
      </Application>
    </>
  )
}

export default App
