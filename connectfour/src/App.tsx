import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Board from'./components/Board';

function App() {
  const [count, setCount] = useState(0)
  const [gamestate, setGamestate] = useState(0)
  
  //Board

  


  return (
    <>
      <Board />
    </>
  )
}

export default App
