import { extend, useApplication } from "@pixi/react"
import { AnimatedSprite } from "pixi.js"
import PlayerSprite from "../PlayerSprite"
import { useLevelStore } from "../../store/level"

extend({ 
  AnimatedSprite
})


const ActorLayer = () => {
  const { app } = useApplication()
  const { cameraX } = useLevelStore()

  // todo: make the camera follow the player instead of the other way around!
  // todo: use physics and the map to figure out the y...
  return (
    <pixiContainer label="actorLayer" >
      <PlayerSprite y={128} x={cameraX} />
    </pixiContainer>
  )
}

export default ActorLayer