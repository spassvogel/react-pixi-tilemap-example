import { useCallback, useEffect, useRef, type JSX } from 'react'
import { useTick } from '@pixi/react'
import TiledTilemap from '../tiled/TiledTilemap'
import ActorLayer from './layers/ActorLayer'
import { getRapier } from '../../physics/rapier'
import { type RigidBody, type World } from '@dimforge/rapier2d'
import { Color, type Graphics } from 'pixi.js'
import { selectors, useLevelStore } from '../store/level'


const PlatformerTilemap = () => {
  const worldWidth = useLevelStore(selectors.worldWidth) ?? 0

  // Inject the ActorLayer 
  const renderLayers = useCallback((layers: (JSX.Element | null)[] | null) => {
    if (!layers) {
      return null
    }

    return layers.reduce<JSX.Element[]>((acc, value) => {
      if (!value) {
        return acc
      }
      acc.push(value)
      if (value.key === 'floor') {
        acc.push(
          <ActorLayer key='actors'/>
        )
      }
      return acc
    }, [])
  }, [])

  const world = useRef<World>(null)
  const debugRef = useRef<Graphics>(null)

  useTick(() => {
    if (!world.current || !debugRef.current || !rb.current) {
      return
    }

    const graphics = debugRef.current
    const translation = rb.current?.translation()
    
    // // rb.current
    // graphics.clear()
    graphics.setFillStyle({ color: 'red' })
    graphics.rect(translation?.x ?? 0, translation?.y ?? 0, 100, 100)
    graphics.fill()

    world.current.step()
    const { vertices, colors } = world.current.debugRender()

    debugRef.current.clear()
    
    for (let i = 0; i < vertices.length / 4; i += 1) {
      const color = Color.shared.setValue([colors[i * 8], colors[i * 8 + 1], colors[i * 8 + 2]]).toHex()

      debugRef.current.stroke({ width: 1.0, color: color, alpha: colors[i * 8 + 3] });
      debugRef.current.moveTo(vertices[i * 4], -vertices[i * 4 + 1]);
      debugRef.current.lineTo(vertices[i * 4 + 2], -vertices[i * 4 + 3]);
    }
   
  })

  const rb = useRef<RigidBody>(null)

  useEffect(() => {
    getRapier().then((rapier) => {
      const gravity = { x: 0.0,  y: -9.81 }
      world.current = new rapier.World(gravity)


       // Create ground collider.
      const groundColliderDesc = rapier.ColliderDesc.cuboid(worldWidth / 2, 2)
      groundColliderDesc.setTranslation(worldWidth / 2, -155.0)
      world.current.createCollider(groundColliderDesc)
    
      // Create a dynamic rigidBody.
      const rigidBodyDesc = rapier.RigidBodyDesc.dynamic()
      rigidBodyDesc.setTranslation(16.0, -16.0)
      rb.current = world.current.createRigidBody(rigidBodyDesc)
      // rb.current.lockTranslations(false, true)
      rb.current.setRotation(45, true)
      // rb.current.addForce(new Vector2(30, -40), false)
      
      // Create and attach collider to rigidBody.
      const colliderDesc = rapier.ColliderDesc.cuboid(8, 8)
      world.current.createCollider(colliderDesc, rb.current)    
    })

  }, [worldWidth])

  const drawCallback = useCallback((graphics: Graphics) => {
    // graphics.clear()
    // graphics.setFillStyle({ color: 'red' })
    // graphics.rect(0, 0, 100, 100)
    // graphics.fill()
  }, [])

  if (!worldWidth) {
    return null
  }

  return (
    <>
    <TiledTilemap renderLayers={renderLayers} width={worldWidth}/>
    <pixiGraphics width={worldWidth} height={worldWidth} ref={debugRef} draw={drawCallback}/>
</>
  )
}

export default PlatformerTilemap
