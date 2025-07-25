import { Application, extend } from '@pixi/react'
import PixiDevToolsConnector from './components/pixi/PixiDevToolsConnector'
import { extensions, Graphics, TextureSource, type ExtensionFormatLoose } from 'pixi.js'
import PlatformerViewport from './components/app/PlatformerViewport'
import PlatformerTilemap from './components/app/PlatformerTilemap'
import { asespriteLoader } from './plugins/AsespriteLoader'
import InputManager from './components/app/input/InputManager'

import './App.css'

extend({
  Graphics,
})

const worldWidth = 64 * 16
const worldHeight = 11 * 16

const viewportWidth = 16 * 16
const viewportHeight = 11 * 16
const BLOWUP_FACTOR = 2

const EXTENSIONS: ExtensionFormatLoose[] = [
  // asespriteLoader
]
extensions.add(asespriteLoader)
TextureSource.defaultOptions.scaleMode = 'linear';

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


  return (
    <>
      <Application width={viewportWidth * BLOWUP_FACTOR} height={viewportHeight * BLOWUP_FACTOR} extensions={EXTENSIONS}>
        {import.meta.env.DEV && <PixiDevToolsConnector />}
        <pixiContainer scale={BLOWUP_FACTOR} y={-viewportHeight} label="container">
          <PlatformerViewport
            worldWidth={worldWidth} 
            worldHeight={worldHeight}
            screenWidth={viewportWidth * BLOWUP_FACTOR}
            screenHeight={viewportHeight * BLOWUP_FACTOR}            
          >
            <PlatformerTilemap worldWidth={worldWidth} />
          </PlatformerViewport>
        </pixiContainer>
      </Application>
      <InputManager />
    </>
  )
}

export default App
