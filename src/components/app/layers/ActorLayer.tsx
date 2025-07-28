import { extend } from "@pixi/react"
import { AnimatedSprite } from "pixi.js"

extend({ 
  AnimatedSprite
})


const ActorLayer = () => {
  // todo: This is where you can add your player, enemies etc
  return (
    <pixiContainer label="actorLayer" >
    </pixiContainer>
  )
}

export default ActorLayer