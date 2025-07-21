import { Application, extend } from '@pixi/react'
import './App.css'
import PixiDevToolsConnector from './components/pixi/PixiDevToolsConnector'
import { Graphics } from 'pixi.js'
import TiledTilemap from './components/tiled/TiledTilemap'

extend({
  Graphics,
})


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
    <Application width={64 * 16} height={11 * 16}>
      <PixiDevToolsConnector />
      <TiledTilemap 
        basePath="./gothic/" 
        tilesetBasePath="./gothic/tilesets"
        imageBasePath="./gothic/"
        fileName='gothic-level1.json' 
      />
    </Application>
  )
}

export default App
