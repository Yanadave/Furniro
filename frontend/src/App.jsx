import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Shop from './Pages/Shop'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/'  element = {<Shop/>} />
      </Routes>
    </div>
  )
}

export default App