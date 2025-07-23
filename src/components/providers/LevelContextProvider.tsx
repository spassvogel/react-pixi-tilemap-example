import { useState, type ReactNode } from 'react'
import { LevelContext } from '../context/LevelContext'

type Props = {
  children: ReactNode
}

export const LevelContextProvider = ({ children }: Props) => {
  const [cameraX, setCameraX] = useState(0)

  const value = {
    cameraX,
    setCameraX,
  }

  return (
    <LevelContext.Provider value={value}>
      {children}
    </LevelContext.Provider>
  );
};