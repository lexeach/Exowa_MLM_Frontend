import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return ( 
    <div className="bgaboutus lg:h-screen  py-10 flex justify-center"> 
        <div className="container max-w-7xl m-auto px-4 sm:px-0">
            <div className="lg:flex items-center justify-center flex-wrap ga-3">
                <div className="lg:w-1/2">
                    <div className="">
                        <img src={require('../../assets/images/trading-dowins.png')} className='w-full' alt="" />
                    </div>
                </div> 
                <div className="lg:w-1/2">
                    <div className="">
                        <h2 className='text-6xl font-bold pb-8'>Let the  <span className='text-[#541AFF]'>algo-trader</span> <br /> help You make <br /> Money!</h2>
                        <p className='text-gray-600 text-xl'>At algo-trader, we're on a mission to seamlessly integrate the world of cryptocurrency with the daily shopping experience. With a keen focus on providing a secure, rewarding, and easy-to-use platform for e-commerce transactions, Docoin is pioneering the path toward universal crypto usability.
                        </p>
                        <div className="mt-8">
                            <Link to='/about-us' className='bg-[#541AFF] px-10 py-3 rounded-xl text-white hover:bg-[#382fb4]'>About Us</Link>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    </div>
  )
}

export default About