import { TextureSource } from "pixi.js"
import { extend, type PixiReactElementProps } from "@pixi/react"
import { CompositeTilemap as PixiCompositeTilemap } from '@pixi/tilemap'
import { forwardRef } from "react"

type CustomCompositeTilemapOptions = {
  tileset?: Array<TextureSource>
}

class CustomCompositeTilemap extends PixiCompositeTilemap {
  constructor(options: CustomCompositeTilemapOptions) {
    super(options.tileset)
  }
}

declare module "@pixi/react" {
  interface PixiElements {
    pixiCustomCompositeTilemap: PixiReactElementProps<typeof CustomCompositeTilemap>
  }
}

extend({ CustomCompositeTilemap })

type Props = CustomCompositeTilemapOptions & {
  label?: string
}

const CompositeTilemap = forwardRef<PixiCompositeTilemap, Props>((props, ref) => {
  return (
    <pixiCustomCompositeTilemap {...props} ref={ref} />
  )
})

export default CompositeTilemap