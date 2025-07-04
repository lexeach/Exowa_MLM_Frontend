import React from 'react'

const WereHereHelp = () => {
  return (
    <div>
        <div className='bg-[#F3F3F3] py-12'>
            <div className="container max-w-6xl m-auto px-4 sm:px-0">
                <div className="py-12">
                    <div className="text-center">
                        <h2 className="text-[#0B0126] text-4xl font-bold">We're Here to Help</h2>
                    </div>
                </div>
                <div className="lg:flex items-center justify-center flex-wrap ga-3">
                    <div className="lg:w-1/3">
                        <div className="p-8 m-3 bg-white shadow-md rounded-2xl">
                            <div className="mb-4"> 
                                <img src={require('../../../assets/images/Live-Chat.png')} className='w-[50px]' alt="" />
                            </div>
                            <div className="py-5">
                                <h3 className='text-[#0B0126] text-xl font-medium mb-3'>Live Chat</h3>
                                <p className='text-lg text-gray-600'>
                                Get quick answers and support instantly. We're online and ready to assist!
                                </p>
                            </div>
                            <div className="">
                                <button className='bg-[#541AFF] px-10 py-3.5 rounded-xl text-white hover:bg-[#382fb4]'>Connect Now</button>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/3">
                        <div className="p-8 m-3 bg-white shadow-md rounded-2xl">
                            <div className="mb-4"> 
                                <img src={require('../../../assets/images/Email-Us.png')} className='w-[50px]' alt="" />
                            </div>
                            <div className="py-5">
                                <h3 className='text-[#0B0126] text-xl font-medium mb-3'>Email Us</h3>
                                <p className='text-lg text-gray-600'>
                                For inquiries or detailed assistance, send us an email and we’ll respond promptly.
                                </p>
                            </div>
                            <div className="">
                                <button className='bg-[#541AFF] px-10 py-3.5 rounded-xl text-white hover:bg-[#382fb4]'>Send Us an Email</button>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/3">
                        <div className="p-8 m-3 bg-white shadow-md rounded-2xl">
                            <div className="mb-4"> 
                                <img src={require('../../../assets/images/WhatsApp.png')} className='w-[50px]' alt="" />
                            </div>
                            <div className="py-5">
                                <h3 className='text-[#0B0126] text-xl font-medium mb-3'>WhatsApp</h3>
                                <p className='text-lg text-gray-600'>
                                Have questions? Message us on WhatsApp for quick responses and assistance.
                                </p>
                            </div>
                            <div className="">
                                <button className='bg-[#541AFF] px-10 py-3.5 rounded-xl text-white hover:bg-[#382fb4]'>Message Us </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-[#F3F3F3]">
            <img src={require('../../../assets/images/Connect.png')} className='w-full' alt="" />
        </div>
    </div>
  )
}

export default WereHereHelp