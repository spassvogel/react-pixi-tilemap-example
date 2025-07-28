import { extend, type PixiElements } from '@pixi/react'
import { Assets, Sprite, Texture } from 'pixi.js'
import { useEffect, useState } from 'react'

extend({
  Sprite,
})

type Props = PixiElements['pixiSprite'] & {
  src: string
}

/** A pixi sprite that has a `src` prop for the texture path */
const CustomSprite = (props: Props) => {
  const [texture, setTexture] = useState(Texture.EMPTY)

  // Preload the sprite if it hasn't been loaded yet
  useEffect(() => {
    if (texture === Texture.EMPTY) {
      Assets
        .load(props.src)
        .then((result) => {
          setTexture(result)
        })
    }
  }, [props.src, texture])

  return <pixiSprite {...props} texture={texture} />
}

export default CustomSprite