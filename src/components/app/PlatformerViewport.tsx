import { useEffect, useRef, type ComponentProps, type PropsWithChildren } from "react"
import Viewport from "../pixi/Viewport"
import { type Viewport as PixiViewport } from "pixi-viewport"
import type { MovedEvent } from "pixi-viewport/dist/types"
import useLevelContext from "../../hooks/useLevelContext"

type Props = PropsWithChildren<{
  worldWidth: number 
  worldHeight: number
  screenWidth: number
  screenHeight: number
}> & ComponentProps<typeof Viewport>

const PlatformerViewport = (props: Props) => {

  const viewportRef = useRef<PixiViewport>(null)
  const { setCameraX } = useLevelContext()

  useEffect(() => {
    const viewportCurrent = viewportRef.current
    const onMoved = (e: MovedEvent) => {
      const moved = Math.abs(e.viewport.x)
      setCameraX(moved)
    }
    if (viewportCurrent) {
      viewportCurrent.on('moved', onMoved)
    }
    return () => {
      viewportCurrent?.off('moved', onMoved)
    }
  }, [setCameraX])
  
  return (
    <Viewport
      {...props}
      drag
      pinch
      wheel
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

