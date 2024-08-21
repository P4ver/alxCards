import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import Login from './component/Login'
import Register from './component/Register'
import Cards from './component/cards'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/cards" element={<Cards />} />   */}
          <Route path="/home" element={<Cards />} />  
          <Route path="/reg" element={<Register />} />  
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
