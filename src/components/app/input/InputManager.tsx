import * as React from 'react'
import { useEffect } from 'react'
import { useLevelStore } from '../../store/level'

const speed = 4
const InputManager = () => {
  const { updatePlayerPosition } = useLevelStore()

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      console.log(`(wouter left this in) e.key`, e.key);
      switch (e.key) {
        case "ArrowLeft": {
          updatePlayerPosition({ x: -speed })
          break
        }
        case "ArrowRight": {
          updatePlayerPosition({ x: speed })
          break
        }
      }
    }
    document.addEventListener('keydown', keyHandler)
    return () => {
      document.removeEventListener('keydown', keyHandler)
    }
  }, [])

  return (
    null
  )
}

export default InputManager
