import { forwardRef, type PropsWithChildren } from "react"
import { Container } from "pixi.js"
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

type CustomViewportOptions = IViewportOptions & {
  decelerate?: true | IDecelerateOptions
  drag?: true | IDragOptions
  pinch?: true | IPinchOptions
  wheel?: true | IWheelOptions
  clamp?: true | IClampOptions
  clampZoom?: IClampZoomOptions
}

class CustomViewport extends PixiViewport {
  constructor(options: CustomViewportOptions) {
    const { decelerate, drag, pinch, wheel, clamp, clampZoom, ...rest } = options ?? {}

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

  return (
    <pixiCustomViewport {...restProps} events={app.renderer?.events} ref={ref}>
      {children}
    </pixiCustomViewport>
  )
})

export default Viewport