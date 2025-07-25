import { extend, useApplication } from "@pixi/react"
import { AnimatedSprite } from "pixi.js"
import PlayerSprite from "../PlayerSprite"
import { useLevelStore } from "../../store/level"
import { useEffect } from "react"

extend({ 
  AnimatedSprite
})


const ActorLayer = () => {
  const { app } = useApplication()
  const { cameraX, setPlayerPosition } = useLevelStore()

  // todo: make the camera follow the player instead of the other way around!
  // todo: use physics and the map to figure out the y...

  useEffect(() => {
    setPlayerPosition({ x: 0, y: 128 })
  }, [setPlayerPosition])

  return (
    <pixiContainer label="actorLayer" >
      <PlayerSprite />
    </pixiContainer>
  )
}

export default ActorLayer