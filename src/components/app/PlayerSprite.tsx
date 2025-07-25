import { useTick, type PixiElements } from '@pixi/react'
import { AnimatedSprite, Assets } from 'pixi.js'
import * as React from 'react'
import { useEffect, useMemo } from 'react'
import type { AsepriteAsset } from '../../plugins/AsespriteLoader'

type PlayerAnimations = 'stand' | 'idle' | 'run' | 'shoot' | 'crouch' | 'crouch-shoot' | 'jump' | 'fall' | 'hurt'

type Props = Omit<PixiElements['pixiAnimatedSprite'], 'textures'>

const PlayerSprite = (props: Props) => {
  // const { cameraX } = useLevelContext()

  const [spritesheet, setSpritesheet] = React.useState<AsepriteAsset<PlayerAnimations>>()
  const ref = React.useRef<AnimatedSprite>(null)
  const [currentAnim, setCurrentAnim] = React.useState<PlayerAnimations>('shoot')

  useEffect(() => {
    Assets.load<AsepriteAsset<PlayerAnimations>>({
      src: `/characters/player/player.aseprite.json`,
    }).then((v) => {
      setSpritesheet(v)
    })
  }, [])

  
  useTick((t) => {
    ref.current?.update(t)
  })

  const frames = useMemo(() => {
    if (!spritesheet) {
      return null
    }
    requestAnimationFrame(() => { ref.current?.play() })
    return spritesheet.getAnimationTextures(currentAnim)
  }, [currentAnim, spritesheet])


  const handleClick = () => {
    const cycle: PlayerAnimations[] = ['stand', 'idle', 'run', 'shoot', 'crouch', 'crouch-shoot', 'jump', 'fall', 'hurt']
    // const cycle: PlayerAnimations[] = ['idle', 'run']
    setCurrentAnim((a) => (cycle[(cycle.indexOf(a) + 1) % cycle.length]))
  }

  if (!spritesheet || !frames) {
    return null
  }

  return (
    <pixiAnimatedSprite
      {...props}
      label={'player'}
      textures={frames}
      interactive
      onClick={handleClick} 
      ref={ref} 
      // todo: make animationspeed a function of velocity, once physics is in place
      animationSpeed={frames.length / 40}      
      autoUpdate 
      autoPlay 
      pivot={{ x: 0, y: 54 } }
    />
  )
}

export default PlayerSprite
