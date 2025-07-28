import { forwardRef, type PropsWithChildren } from "react"
import { Container, FederatedWheelEvent } from "pixi.js"
import { type IClampOptions, 
  type IClampZoomOptions, 
  type IDecelerateOptions, 
  type IDragOptions, 
  type IPinchOptions, 
  type IViewportOptions, 
  type IWheelOptions, 
  Viewport as PixiViewport 
} from "pixi-viewport"
import { extend, useApplication, type PixiElements, type PixiReactElementProps } from "@pixi/react"
import type { MovedEvent, DragEvent, ZoomedEvent } from "pixi-viewport/dist/types"

type CustomViewportOptions = IViewportOptions & {
  decelerate?: true | IDecelerateOptions
  drag?: true | IDragOptions
  pinch?: true | IPinchOptions
  wheel?: true | IWheelOptions
  clamp?: true | IClampOptions
  clampZoom?: IClampZoomOptions

  onBounceXend?: (vp: PixiViewport) => void
  onBounceXstart?: (vp: PixiViewport) => void
  onBounceYend?: (vp: PixiViewport) => void
  onBounceYstart?: (vp: PixiViewport) => void
  onClicked?: (e: DragEvent) => void
  onDragEnd?: (e: DragEvent) => void
  onDragStart?: (e: DragEvent) => void
  onFrameEnd?: (vp: PixiViewport) => void
  onMouseEdgeEnd?: (vp: PixiViewport) => void
  onMouseEdgeStart?: (vp: PixiViewport) => void
  onMoved?: (e: MovedEvent) => void
  onMovedEnd?: (vp: PixiViewport) => void
  onPinchEnd?: (vp: PixiViewport) => void
  onPinchStart?: (vp: PixiViewport) => void
  onSnapEnd?: (vp: PixiViewport) => void
  onSnapStart?: (vp: PixiViewport) => void
  onSnapZoomEnd?: (vp: PixiViewport) => void
  onSnapZoomStart?: (vp: PixiViewport) => void
  onWheel?: (fe: FederatedWheelEvent) => void
  onWheelScroll?: (vp: PixiViewport) => void
  onZoomed?: (e: ZoomedEvent) => void
  onZoomedEnd?: (vp: PixiViewport) => void
}

class CustomViewport extends PixiViewport {
  constructor(options: CustomViewportOptions) {
    const { 
      decelerate, 
      drag, 
      pinch, 
      wheel, 
      clamp, 
      clampZoom,
      onBounceXend,
      onBounceXstart,
      onBounceYend,
      onBounceYstart,
      onClicked,
      onDragEnd,
      onDragStart,
      onFrameEnd,
      onMouseEdgeEnd,
      onMouseEdgeStart,
      onMoved,
      onMovedEnd,
      onPinchEnd,
      onPinchStart,
      onSnapEnd,
      onSnapStart,
      onSnapZoomEnd,
      onSnapZoomStart,
      onWheel,
      onWheelScroll,
      onZoomed,
      onZoomedEnd,
      ...rest
    } = options ?? {}

    super(rest)

    // Can either pass `true` for these or specific props to control behaviour
    if (decelerate) {
      if (typeof decelerate === 'boolean') {
        this.decelerate()
      } else {
        this.decelerate(decelerate)
      }
    }
    if (drag) {
      if (typeof drag === 'boolean') {
        this.drag()
      } else {
        this.drag(drag)
      }
    }
    if (pinch) {
      if (typeof pinch === 'boolean') {
        this.pinch()
      } else {
        this.pinch(pinch)
      }
    }
    if (wheel) {
      if (typeof wheel === 'boolean') {
        this.wheel()
      } else {
        this.wheel(wheel)
      }
    }
    if (clamp) {
      if (typeof clamp === 'boolean') {
        this.clamp()
      } else {
        this.clamp(clamp)
      }
    }
    if (clampZoom) {
      this.clampZoom(clampZoom)
    }

    if (onBounceXend) {
      this.on('bounce-x-end', onBounceXend)
    }
    
    if (onBounceXstart) {
      this.on('bounce-x-start', onBounceXstart)
    }

    if (onBounceYend) {
      this.on('bounce-y-end', onBounceYend)
    }
    
    if (onBounceYstart) {
      this.on('bounce-y-start', onBounceYstart)
    }

    if (onClicked) {
      this.on('clicked', onClicked)
    }

    if (onDragEnd) {
      this.on('drag-end', onDragEnd)
    }

    if (onDragStart) {
      this.on('drag-start', onDragStart)
    }

    if (onFrameEnd) {
      this.on('frame-end', onFrameEnd)
    }

    if (onMouseEdgeEnd) {
      this.on('mouse-edge-end', onMouseEdgeEnd)
    }

    if (onMouseEdgeStart) {
      this.on('mouse-edge-start', onMouseEdgeStart)
    }

    if (onMoved) {
      this.on('moved', onMoved)
    }

    if (onMovedEnd) {
      this.on('moved-end', onMovedEnd)
    }

    if (onPinchEnd) {
      this.on('pinch-end', onPinchEnd)
    }    

    if (onPinchStart) {
      this.on('pinch-start', onPinchStart)
    }

    if (onSnapEnd) {
      this.on('snap-end', onSnapEnd)
    }
    
    if (onSnapStart) {
      this.on('snap-start', onSnapStart)
    }
    
    if (onSnapZoomEnd) {
      this.on('snap-zoom-end', onSnapZoomEnd)
    }
    
    if (onSnapZoomStart) {
      this.on('snap-zoom-start', onSnapZoomStart)
    }
    
    if (onWheel) {
      this.on('wheel', onWheel)
    }
    
    if (onWheelScroll) {
      this.on('wheel-scroll', onWheelScroll)
    }
    
    if (onZoomed) {
      this.on('zoomed', onZoomed)
    }

    if (onZoomedEnd) {
      this.on('zoomed-end', onZoomedEnd)
    }
  }
}

declare module "@pixi/react" {
  interface PixiElements {
    pixiCustomViewport: PixiReactElementProps<typeof CustomViewport>
  }
}

extend({ Container, CustomViewport })

type Props = PropsWithChildren<Omit<CustomViewportOptions & PixiElements['pixiContainer'], 'events'>>

const Viewport = forwardRef<PixiViewport, Props>(({ children, ...restProps }, ref) => {
  const { app } = useApplication()

  if (!app.renderer?.events) {
    return null
  }

  return (
    <pixiCustomViewport {...restProps} events={app.renderer?.events} ref={ref}>
      {children}
    </pixiCustomViewport>
  )
})

export default Viewport