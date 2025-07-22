import { useEffect, useRef, type PropsWithChildren } from "react"
import Viewport from "../pixi/Viewport"
import { type Viewport as PixiViewport } from "pixi-viewport"
import { useApplication } from "@pixi/react"
import type { MovedEvent } from "pixi-viewport/dist/types"

type Props = PropsWithChildren<{
  worldWidth: number 
  worldHeight: number
  screenWidth: number
  screenHeight: number
}>

const PlatformerViewport = ({ 
  worldWidth, 
  worldHeight,
  screenWidth,
  screenHeight,
  children
}: Props) => {
    // const { app } = useApplication()

  const viewportRef = useRef<PixiViewport>(null)
  useEffect(() => {
    const viewportCurrent = viewportRef.current
    const onMoved = (e: MovedEvent) => {
      const moved = Math.abs(e.viewport.x)
      console.log(`(wouter left this in) moved`, moved);
      // paralallax: https://www.youtube.com/watch?v=vaGqPL8fE1U
    }
    if (viewportCurrent) {
      viewportCurrent.on('moved', onMoved)
    }
    return () => {
      viewportCurrent?.off('moved', onMoved)
    }
  }, [])
  
  return (
    <Viewport 
      worldWidth={worldWidth} 
      worldHeight={worldHeight}
      screenWidth={screenWidth}
      screenHeight={screenHeight}
      drag
      pinch
      wheel
      clamp={{ direction: 'all'}}
      clampZoom={{
        minScale: 1,
        maxScale: 5
      }}
      ref={viewportRef}
    >
      {children}
    </Viewport>
  )
}

export default PlatformerViewport

