import { type Dispatch, type SetStateAction, createContext } from "react"

type LevelContext = {
  cameraX: number
  setCameraX: Dispatch<SetStateAction<number>>
}

export const LevelContext = createContext<LevelContext>({
  cameraX: 0,
  setCameraX: () => null
})