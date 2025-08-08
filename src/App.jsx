import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DeptDash from './pages/Department/DeptDash'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DeptDash />
    </>
  )
}

export default App
