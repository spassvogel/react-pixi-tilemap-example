import { useRef, type ComponentProps, type PropsWithChildren } from "react"
import Viewport from "../pixi/Viewport"
import { type Viewport as PixiViewport } from "pixi-viewport"
import type { MovedEvent } from "pixi-viewport/dist/types"
import { selectors, useLevelStore } from "../store/level"

type Props = PropsWithChildren<{
  screenWidth: number
  screenHeight: number
}> & ComponentProps<typeof Viewport>

const PlatformerViewport = (props: Props) => {
  const viewportRef = useRef<PixiViewport>(null)
  const { setCameraX } = useLevelStore()

  const onMoved = (e: MovedEvent) => {
    const moved = Math.abs(e.viewport.x)
    setCameraX(moved)
  }
  const worldWidth = useLevelStore(selectors.worldWidth)
  const worldHeight = useLevelStore(selectors.worldHeight)

  if (!worldWidth || !worldHeight) {
    return null
  }

  return (
    <Viewport
      {...props}
      worldWidth={worldWidth}
      worldHeight={worldHeight}
      drag
      pinch
      wheel
      onMoved={onMoved}
      clamp={{ direction: 'all'}}
      clampZoom={{
        minScale: 1,
        maxScale: 5
      }}
      ref={viewportRef}
    />
  )
}

export default PlatformerViewport

