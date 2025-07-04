import React from 'react'
import { Link } from 'react-router-dom'

const MaximizeYourProfits = () => {
  return (
    
    <div className='bg-[#0B0126] lg:py-36 py-20'>
        <div className="container max-w-5xl m-auto px-4 sm:px-0">
            <div className="bg-white rounded-3xl lg:p-12 p-5 relative">
                <div className="flex flex-wrap items-center justify-between">
                    <div className="lg:w-1/2">
                        <div className="">
                            <h3 className='text-[#0B0126] text-4xl font-bold'>Maximize Your Profits</h3>
                            <h5 className='text-[#414141] py-3 text-xl'>Let the Top Trading Robot work for you...</h5>
                            <div className="w-[100px] h-[3px] bg-[#541AFF] my-3"/>
                            <div className="mb-5">
                                <p className='text-black text-lg pb-3'>Get started with automated trading for just</p>
                                <h2 className='text-[#541AFF] text-4xl font-bold'>$100.00</h2>
                            </div>
                            <Link to='/registration' className='bg-[#541AFF] px-10 py-3.5 rounded-xl text-white hover:bg-[#382fb4]'>Create Your Account Now</Link>
                        </div>
                    </div>
                    <div className="lg:w-1/2">
                        <div className="relative">
                            <div className="scale-100 lg:absolute -top-[17.5rem]">
                                <img src={require('../../assets/images/Group-204974083.png')} className='w-full' alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MaximizeYourProfits