import { type PropsWithChildren } from "react"
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

type Props = PropsWithChildren<CustomCompositeTilemapOptions>

const CompositeTilemap = forwardRef<PixiCompositeTilemap, Props>(({ children, ...restProps }, ref) => {
  return (
    <pixiCustomCompositeTilemap {...restProps} ref={ref}>
      {children}
    </pixiCustomCompositeTilemap>
  )
})

export default CompositeTilemap