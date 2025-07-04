import React from 'react'

const FrameForex = () => {
  return (
    
    <div className="Frame2Forex lg:h-screen  py-10 flex justify-center"> 
        <div className="container max-w-7xl m-auto px-4 sm:px-0">
            <div className="lg:flex items-center justify-center flex-wrap ga-3"> 
                <div className="lg:w-1/2">
                    <div className="lg:pr-8 lg:mb-0 mb-10">
                        <h2 className='text-6xl font-bold pb-8'>Are You Ready to Hand Your Trading Over to a Forex Robot?</h2>
                        <p className='text-gray-600 text-xl'>We are passionate about our work. Our designers stay ahead of the curve to provide engaging and user-friendly website designs to make your business stand out. Our developers are committed to maintaining the highest web standards so that your site will withstand the test of time. We care about your business, which is why we work with you.</p> 
                    </div>
                </div>
                <div className="lg:w-1/2">
                    <div className="flex flex-wrap items-center justify-between lg:px-5"> 
                        <div className="lg:w-[48%]">
                            <div className="bg-white p-8 rounded-[24px] lg:mb-0 mb-5 shadow-md lg:-top-8 lg:relative transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer">
                                <div className="py-4">
                                    <img src={require('../../assets/images/Trading-Solution.png')} className='w-[50px]' alt="" />
                                </div>
                                <div className="pb-4">
                                    <h4 className='text-3xl font-medium text-[#0B0126] py-5'>Trading <br /> Solution</h4>
                                    <p className='text-[20px] text-gray-600'>Trading Solutions for Active Traders and Newcomers.</p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-[48%]">
                            <div className="bg-white p-8 rounded-[24px] lg:mb-0 mb-5 border border-gray-300 lg:top-5 lg:relative transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer">
                                <div className="py-4">
                                    <img src={require('../../assets/images/COMPETITIVE-PRICING.png')} className='w-[50px]' alt="" />
                                </div>
                                <div className="pb-4">
                                    <h4 className='text-3xl font-medium text-[#0B0126] py-5'>COMPETITIVE <br /> PRICING</h4>
                                    <p className='text-[20px] text-gray-600'>Our aim is to help you build confidence in online forex trading.</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="flex flex-wrap items-center justify-between lg:px-5"> <div className="lg:w-[48%]">
                            <div className="bg-white p-8 rounded-[24px] lg:mb-0 mb-5 border border-gray-300 transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer">
                                <div className="py-4">
                                    <img src={require('../../assets/images/Fast-Order.png')} className='w-[50px]' alt="" />
                                </div>
                                <div className="pb-4">
                                    <h4 className='text-3xl font-medium text-[#0B0126] py-5'>Fast Order <br /> Execution</h4>
                                    <p className='text-[20px] text-gray-600'>Trading Solutions for Active Traders and Newcomers.</p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-[48%]">
                            <div className="bg-white p-8 rounded-[24px] lg:mb-0 mb-5 shadow-md lg:top-10 lg:relative transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer">
                                <div className="py-4">
                                    <img src={require('../../assets/images/Access-Global.png')} className='w-[50px]' alt="" />
                                </div>
                                <div className="pb-4">
                                    <h4 className='text-3xl font-medium text-[#0B0126] py-5'>Access Global <br /> Markets</h4>
                                    <p className='text-[20px] text-gray-600'>Our aim is to help you build confidence in online forex trading.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    </div>
  )
}

export default FrameForex