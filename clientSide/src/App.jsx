import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import Login from './component/Login'
import Register from './component/Register'
import Cards from './component/cards'
import Layout from './component/layout'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/register" element={<Register />} />  
          <Route element={<Layout />}>
            {/* <Route path="/cards" element={<Cards />} /> */}
            <Route path="/home" element={<Cards />} />  
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
