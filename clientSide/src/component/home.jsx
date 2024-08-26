import React from 'react'
import About from './about'
import Features from './features'
import Footer from './footer'
import Hero from './hero'

const Home = () => {
  return (
    <div>
        <h1>Welcome to ALXCards!</h1>
        <Hero/>
        <Features/>
        <About/>
        <Footer/>
    </div>
  )
}

export default Home