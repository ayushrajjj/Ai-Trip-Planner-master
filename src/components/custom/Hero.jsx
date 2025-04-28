// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
function Hero() {
  return (
    <div className='flex flex-col items-center mx-56  gap-9'>
      <h1 className='font-extrabold text-[50px] mt-16 text-center'>
        <span className='text-[#f56551]'>Discover your Next Adventure With AI:</span>
        Personalized Itineraries At Your Fingertips </h1>
        <p className='text-xl text-gray-500 text-center'>Your Personal trip planner and travel curator , creating custom itenaries tailored to your interests and budget.  </p>
        
        <Link to={'/create-trip'}>
        <Button>Get Started, Its free</Button>
        </Link>
    </div>
  )
}

export default Hero
