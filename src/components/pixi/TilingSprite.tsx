import { extend, type PixiElements } from '@pixi/react'
import { Assets, TilingSprite, Texture } from 'pixi.js'
import { useEffect, useState } from 'react'

extend({
  TilingSprite,
})

type Props = PixiElements['pixiTilingSprite'] & {
  src: string
}

const CustomTilingSprite = (props: Props) => {
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

  return <pixiTilingSprite {...props} texture={texture} />
}

export default CustomTilingSprite