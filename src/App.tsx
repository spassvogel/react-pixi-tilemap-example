import { Application, extend } from '@pixi/react'
import PixiDevToolsConnector from './components/pixi/PixiDevToolsConnector'
import { extensions, Graphics, TextureSource, type ExtensionFormatLoose } from 'pixi.js'
import PlatformerViewport from './components/app/PlatformerViewport'
import { LevelContextProvider } from './components/providers/LevelContextProvider'
import PlatformerTilemap from './components/app/PlatformerTilemap'

import './App.css'
import { asepriteLoader } from './plugins/AsespriteLoader'

extend({
  Graphics,
})

const worldWidth = 64 * 16
const worldHeight = 11 * 16
const viewportWidth = 16 * 16
const viewportHeight = 11 * 16
const BLOWUP_FACTOR = 2

const EXTENSIONS: ExtensionFormatLoose[] = [
  // asepriteLoader
]
extensions.add(asepriteLoader)
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
    <Application width={viewportWidth * BLOWUP_FACTOR} height={viewportHeight * BLOWUP_FACTOR} extensions={EXTENSIONS}>
      {import.meta.env.DEV && <PixiDevToolsConnector />}
      <LevelContextProvider>
        <PlatformerViewport
          worldWidth={worldWidth} 
          worldHeight={worldHeight}
          screenWidth={viewportWidth * BLOWUP_FACTOR}
          screenHeight={viewportHeight * BLOWUP_FACTOR}
          scale={BLOWUP_FACTOR}
        >
          <PlatformerTilemap worldWidth={worldWidth} />
        </PlatformerViewport>
      </LevelContextProvider>
    </Application>
  )
}

export default App
