import React from 'react'

const FirstTradingRobot = () => {
  return (
    <div className="bg-[#F3F3F3] lg:h-screen  py-10 flex justify-center"> 
        <div className="container max-w-7xl m-auto px-4 sm:px-0">
            <div className="lg:flex items-center justify-center flex-wrap ga-3"> 
                <div className="lg:w-1/2">
                    <div className="lg:px-10 lg:m-0 mb-10"> 
                        <img src={require('../../assets/images/Frame-Trading-Robot.png')} className='w-full' alt="" />
                    </div>
                </div>
                <div className="lg:w-1/2">
                    <div className="lg:px-10">
                        <h2 className='text-5xl text-[#0B0126] leading-tight font-bold pb-8'>First Trading Robot with the Best Features and Advantages</h2>
                        <p className='text-gray-600 text-xl'>The main advantage of using a forex robot is that it can execute trades for you without any human intervention. This means no more waiting on the phone or in line at your broker’s office! You’ll have access to all sorts of different investing opportunities, including short selling stocks and bonds as well stock options – meaning there are basically zero risks involved with these types investments.</p> 
                    </div>
                </div>
            </div>
        </div>
    </div> 
  )
}

export default FirstTradingRobot