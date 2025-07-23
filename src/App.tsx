import { Application, extend } from '@pixi/react'
import PixiDevToolsConnector from './components/pixi/PixiDevToolsConnector'
import { Graphics } from 'pixi.js'
import TiledTilemap from './components/tiled/TiledTilemap'
import PlatformerViewport from './components/app/PlatformerViewport'

import './App.css'
import { LevelContextProvider } from './components/providers/LevelContextProvider'

extend({
  Graphics,
})

const worldWidth = 64 * 16
const worldHeight = 11 * 16
const viewportWidth = 16 * 16
const viewportHeight = 11 * 16


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
    <Application width={viewportWidth} height={viewportHeight}>
      {import.meta.env.DEV && <PixiDevToolsConnector />}
      <LevelContextProvider>
        <PlatformerViewport
          worldWidth={worldWidth} 
          worldHeight={worldHeight}
          screenWidth={viewportWidth}
          screenHeight={viewportHeight}
        >
          <TiledTilemap
            width={worldWidth}
            basePath="./gothic/" 
            tilesetBasePath="./gothic/tilesets"
            imageBasePath="./gothic/"
            fileName='gothic-level1.json' 
          />
        </PlatformerViewport>
      </LevelContextProvider>
    </Application>
  )
}

export default App
