import React from 'react'

import heroSection from '../assets/hero-section.png'

const HeroSection = () => {
  return (
    <div >
      <img
        src={heroSection}
        alt="Hero Section"
        className="w-full h-auto object-contain md:object-cover"
      />
    </div>
  )
}

export default HeroSection