import React from 'react'
import Navbar from '../component/Navbar'
import Hero from '../component/Hero'
import Brand from '../component/Brand'
import FAQ from '../component/FAQ'
import Footer from '../component/Footer'
import JoinRoom from '../component/JoinRoom'
import Pricing from '../component/Pricing'

const Home = () => {
  return (
    <div className='overflow-x-hidden'>
        <Navbar />
        <Hero />
        <Brand />
        <JoinRoom />
        <Pricing /> 
        <FAQ />
        <Footer />
    </div>
  )
}

export default Home