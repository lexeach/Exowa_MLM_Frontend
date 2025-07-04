import React from 'react'
import VisionMission from './VisionMission'
import CountriesUser from '../CountriesUser'
import WhyChooseUs from './WhyChooseUs'

const AboutUs = () => {
  return (
    <div>
        <div className="bg-Aboutus bg-[#100630] lg:py-32 py-12">
            <div className="container max-w-7xl m-auto px-4 sm:px-0">
                <div className="">
                    <div className="text-center">
                        <h5 className='text-[#541AFF] text-xl'>About</h5>
                        <h1 className='text-white lg:text-7xl font-bold py-4'>Empowering a <br /> Smarter Future Through Practice</h1>
                        <p className='text-white text-lg'>Whether you're looking for personalized question paper generation, automated student assessments, or real-time performance tracking, Exowa has you covered.

                                  <br /> Children practice, and achieve better results with Exowa.</p>
                    </div>
                </div>
            </div>
        </div>
        <VisionMission/>
        <WhyChooseUs/>
        <CountriesUser/>
    </div>
  )
}

export default AboutUs