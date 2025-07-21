import { Application, extend } from '@pixi/react'
import './App.css'
import PixiDevToolsConnector from './components/pixi/PixiDevToolsConnector'
import { Assets, Graphics, TextureSource, type SpritesheetData, type SpritesheetFrameData, Rectangle, Texture } from 'pixi.js'
import CompositeTilemap from './components/pixi/CompositeTilemap'
import { useEffect, useRef, useState } from 'react'
import { CompositeTilemap as PixiCompositeTilemap } from '@pixi/tilemap'
import type { TiledMapData } from './types/tiledMapData'
import useLoadTilesets from './hooks/useLoadTilesets'

extend({
  Graphics,
})

const TILE_SIZE = 32
const tilesets = [{
  "firstgid": 1,
  "columns": 16,
  "image": "ground.png",
  "imageheight": 512,
  "imagewidth": 512,
  "margin": 0,
  "name": "ground",
  "spacing": 0,
  "tilecount": 1024,
  "tileheight": 32,
  "tilewidth": 32,
}]

function App() {

  const ref = useRef<PixiCompositeTilemap>(null)

  const tilesetTextures = useLoadTilesets(tilesets, './village/tilesets/')

  useEffect(() => {
    Assets.load(`./village/level1.json`).then((mapData: TiledMapData) => {
      console.log(mapData)
    })
  }, [])

  useEffect(() => {
    const tilemap = ref.current
    if (tilemap && tilesetTextures) {

      tilemap.tile(tilesetTextures['ground-1'], 30, 40)
      tilemap.tile(tilesetTextures['ground-2'], 300, 400)
      tilemap.tile(tilesetTextures['ground-3'], 100, 800)
      // ref.current.
      // console.log(textures[0])

      // Assets.load<Texture>('./village/tilesets/ground.png').then((baseTexture) => {
        // const base = BaseTexture.from(baseTexture);
    
        // PIXI.Assets.add({ alias: 'atlas', src: 'assets/atlas.json' });
        // PIXI.Assets.add({ alias: 'button', src: 'assets/button.png' });
        // await PIXI.Assets.load(['atlas', 'button']);
        // Assets.add('atlas', 'atlas.json');
        // Assets.load(['atlas']).then(() =>
        // {
        //     const tilemap = new CompositeTilemap();

        //     // Render your first tile at (0, 0)!
        //     tilemap.tile('grass.png', 0, 0);
        // });






        // tilemap.tile(textures['brick.png'], 2 * size, 2 * size);
        // tilemap.tile(textures['brick_wall.png'], 2 * size, 3 * size, { alpha: 0.6 });

        // const baseTexture = PIXI.BaseTexture.from(image);

        // // Manually create a texture atlas
        // const atlas = new PIXI.TextureAtlas(baseTexture);

        // // Add frames manually
        // atlas.add('hero_idle_0', new PIXI.Rectangle(0, 0, 32, 32));
        // atlas.add('hero_idle_1', new PIXI.Rectangle(32, 0, 32, 32));
        // for (let y = 0; y < 4; y++) {
        //   for (let x = 0; x < 4; x++) {
        //     const frame = new Rectangle(x * spriteSize, y * spriteSize, spriteSize, spriteSize);
        //     const texture = new Texture(baseTexture);
        //     textures.push(texture);
        //   }
        // }
    
      // const spritesheetData = parseSpritesheetData(data)
      // const tileset = getTileset(data)
  
      // const texture = PIXI.Texture.from(`${basePath}/${tileset.image}`)
      // const baseTexture = PIXI.BaseTexture.from(`${basePath}/${tileset.image}`)
      // const spritesheet = new PIXI.Spritesheet(baseTexture, spritesheetData)

      // if (!textures[0]?.resource) return
      // ref.current.tile(
      //   // textures[0]?.resource, // index tileset
      //   // 0,
      //   textures[0],
      //   200, // x
      //   300, // y
      //   { 
      //     tileWidth: 320,
      //     tileHeight: 320
      //   }
      // })
    }
  }, [tilesetTextures])

  return (
    <Application width={64 * TILE_SIZE} height={16 * TILE_SIZE}>
      <PixiDevToolsConnector />
      <CompositeTilemap ref={ref} />
    </Application>
  )
}

export default App
