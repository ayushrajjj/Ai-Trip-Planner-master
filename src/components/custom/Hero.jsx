// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
function Hero() {
  return (
    <div className='flex flex-col items-center px-4 md:px-16 lg:px-56 gap-6 md:gap-9'>
      <h1 className='font-extrabold text-2xl md:text-4xl lg:text-[50px] mt-8 md:mt-12 lg:mt-16 text-center'>
        <span className='text-[#f56551]'>Discover your Next Adventure With AI:</span>
        Personalized Itineraries At Your Fingertips
      </h1>
      <p className='text-base md:text-lg lg:text-xl text-gray-500 text-center'>
        Your Personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>
      <Link to={'/create-trip'}>
        <Button>Get Started, It&apos;s free</Button>
      </Link>
    </div>
  )
}

export default Hero
