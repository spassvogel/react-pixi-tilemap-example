import { Application, extend } from '@pixi/react'
import PixiDevToolsConnector from './components/pixi/PixiDevToolsConnector'
import { extensions, Graphics, TextureSource, type ExtensionFormatLoose } from 'pixi.js'
import PlatformerViewport from './components/app/PlatformerViewport'
import PlatformerTilemap from './components/app/PlatformerTilemap'
import { asespriteLoader } from './plugins/AsespriteLoader'
import InputManager from './components/app/input/InputManager'

import './App.css'
import { useLevelStore } from './components/store/level'
import useLoadMapData from './hooks/useLoadMapData'
import { useEffect } from 'react'

extend({
  Graphics,
})


const viewportWidth = 16 * 16
const viewportHeight = 11 * 16
const BLOWUP_FACTOR = 2 

const EXTENSIONS: ExtensionFormatLoose[] = [
  // asespriteLoader
]
extensions.add(asespriteLoader)
TextureSource.defaultOptions.scaleMode = 'linear'


const BASE_PATH = "/environment/gothic/"
export const TILESET_BASE_PATH = "/environment/gothic/tilesets"
export const IMAGE_BASE_PATH = "/environment/gothic/"
const MAP = 'gothic-level1.json' 


function App() {

  // return (
  //   <Application width={64 * 32} height={16 * 32}>
  //     <PixiDevToolsConnector />
  //     <TiledTilemap 
  //       basePath="./village/" 
  //       textureBasePath="./village/tilesets" 
  //       fileName='level1.json' 
  //     />
  //   </Application>
  // )

  const {  setMapData } = useLevelStore()
  const mapData = useLoadMapData(BASE_PATH, MAP)

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
      <Application width={viewportWidth * BLOWUP_FACTOR} height={viewportHeight * BLOWUP_FACTOR} extensions={EXTENSIONS}>
        {import.meta.env.DEV && <PixiDevToolsConnector />}
        <pixiContainer scale={BLOWUP_FACTOR} y={viewportHeight + -BLOWUP_FACTOR * viewportHeight} label="Application">
          <PlatformerViewport
            screenWidth={viewportWidth * BLOWUP_FACTOR}
            screenHeight={viewportHeight * BLOWUP_FACTOR}            
          >
            <PlatformerTilemap />
          </PlatformerViewport>
        </pixiContainer>
      </Application>
      <InputManager />
    </>
  )
}

export default App
