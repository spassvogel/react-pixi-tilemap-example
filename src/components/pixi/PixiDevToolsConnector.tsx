import { extend, useApplication } from "@pixi/react"
import { Application, Container } from "pixi.js"

extend({
  Container,
})

declare global {
  var __PIXI_APP__: Application
}

/** Connects to chrome Pixi.js extension
 * https://chromewebstore.google.com/detail/pixijs-devtools/aamddddknhcagpehecnhphigffljadon?hl=en
 */
const PixiDevToolsConnector = () => {
  const { app } = useApplication()
  globalThis.__PIXI_APP__ = app

  return <pixiContainer />
}

export default PixiDevToolsConnector
