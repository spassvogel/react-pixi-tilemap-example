import { useContext } from "react"
import { LevelContext } from "../components/context/LevelContext"

// Custom hook for using the context
const useLevelContext = () => {
  const context = useContext(LevelContext)
  if (!context) {
    throw new Error('useLevelContext must be used within a LevelProvider')
  }
  return context;
}

export default useLevelContext