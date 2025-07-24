import TilingSprite from "../../pixi/TilingSprite"
import { extend, useApplication } from "@pixi/react"
import useLevelContext from "../../../hooks/useLevelContext"
import { AnimatedSprite, Assets, Spritesheet } from "pixi.js"
import { useEffect, useMemo, useRef, useState } from "react"
import { AsepriteAsset } from "../../../plugins/AsespriteLoader"

extend({ 
  AnimatedSprite
})

type Props = {
}

/** Uses camera X to handle parallax */
const ActorLayer = ({ }: Props) => {
  const { app } = useApplication()
  const { cameraX } = useLevelContext()

  const [spritesheet, setSpritesheet] = useState<AsepriteAsset>()
  const ref = useRef<AnimatedSprite>(null)
  useEffect(() => {
    
    Assets.load<AsepriteAsset>({
      src: `/characters/player/player.aseprite.json`,
    }).then((v) => {
      console.log(v)
      setSpritesheet(v)

      console.log(v.animations)
    })
  }, [])

  const [currentAnim, setCurrentAnim] = useState<'stand' | 'idle' | 'run' | 'shoot' | 'crouch' | 'crouch-shoot' | 'jump' | 'fall' | 'hurt'>('run')
  
 
  
  const frames = useMemo(() => {
    if (!spritesheet) {
      return null
    }
    return spritesheet.animations[currentAnim].frames
  }, [currentAnim, spritesheet])

  useEffect(() => {
    if (ref.current && frames) {
      setTimeout(() => {

        ref.current?.gotoAndPlay(0)
      }, 100)
      ref.current?.gotoAndPlay(0)
    }    
  }, [frames])

  const handleLoop = () => {
    console.log('loop')
    ref.current?.play()
    // ref.current?.update({
    //   autoStart: true,
    //   deltaTime: 300,

    // })
  }

  if (!spritesheet || !frames) {
    return null
  }
  // const tilePosX = -cameraX * (layerData.parallaxx ?? 1)
  return (
    <pixiAnimatedSprite textures={frames} ref={ref} animationSpeed={3} onFrameChange={handleLoop} autoUpdate autoPlay />
    // <TilingSprite
    //   height={app.renderer.height}
    //   width={width}
    //   src={`${imageBasePath}${layerData.image}`}
    //   label={layerData.name}
    //   alpha={layerData.opacity}
    //   tilePosition={{ x: tilePosX, y: 0 }}
    // />
    // null
  )
}

export default ActorLayer