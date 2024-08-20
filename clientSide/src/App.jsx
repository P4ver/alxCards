import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import Login from './component/Login'
import HomeUser from './component/homeUser'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomeUser />} />  
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
