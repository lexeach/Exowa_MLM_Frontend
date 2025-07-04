import React from 'react'
import About from './About'
import FrameForex from './FrameForex'
import FirstTradingRobot from './FirstTradingRobot'
import CountriesUser from './CountriesUser'
import MaximizeYourProfits from './MaximizeYourProfits'
import SolutionsOurClients from './SolutionsOurClients'
import FastAccountOpening from './FastAccountOpening'
import GenerationBonus from './GenerationBonus'
import TestimonialSlider from './TestimonialSlider'

const LandingPage = () => {
  return (
    <div>
      <div className="bgMainHero bg-[#0A0125] pb-10 overflow-hidden"> 
        <div className="container max-w-7xl m-auto px-4 sm:px-0">
          <div className="relative">
            <div className="">
              <img src={require('../../assets/images/bg-heri-main1.png')} className='w-full h-full object-cover' alt="" />
            </div>
            <div className="flex items-center justify-center lg:absolute lg:top-16 top-0 left-0 right-0 lg:py-14 py-8">
              <div className="text-center">
              <img src={require('../../assets/images/Union.png')} className='lg:w-[158px] w-[80px] text-center m-auto' alt="" />
                <div className="text-center">
                  <h3 className='text-white lg:text-7xl font-bold'>AI Strategies</h3>
                  <h5 className='text-white text-2xl font-medium'>Precision Trading <span className='text-[#14CEF5]'>BOT</span> in Crypto & Forex</h5>
                </div>
              </div>
            </div>
            <div className="lg:block hidden">
              <img src={require('../../assets/images/star-line-right.png')} className='absolute bottom-[179px] right-[69px] w-[155px] animate-ping' alt="" />
              <img src={require('../../assets/images/star-line-left.png')} className='absolute top-[229px] left-[1px] w-[170px] animate-ping' alt="" />
            </div>
          </div> 
          <div className="Ellipse-bg pb-32">
            <div className="pb-32">
                <div className="text-white lg:text-5xl font-bold text-center pb-5">More than a <br />
                Forex Trading Platform</div>
                <p className='text-center text-white'>We support you at every stage of your FX trading journey, whether you are an <br /> ambitious beginner investing in forex or an advanced trader.</p>
            </div>
            <div className="">
              <div className="flex items-center justify-between flex-wrap lg:gap-0 gap-5">
                <div className="lg:w-1/3">
                  <div className="text-center">
                    <div className="pb-10">
                      <img src={require('../../assets/images/forex.png')} className='w-20 m-auto' alt="" />
                    </div>
                    <div className="">
                      <h5 className='text-white text-2xl pb-3'>80+ Forex Pairs</h5>
                      <p className='text-white'>Gain the ability to trade on over 80 FX pairs and take advantage of spreads from 0.8 pips, always commission-free.</p>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/3">
                  <div className="text-center">
                    <div className="pb-10">
                      <img src={require('../../assets/images/edge-trading.png')} className='w-20 m-auto' alt="" />
                    </div>
                    <div className="">
                      <h5 className='text-white text-2xl pb-3'>Cutting Edge Trading</h5>
                      <p className='text-white'>Empowering traders with innovative tools, real-time insights, and seamless technology to stay ahead in the dynamic world of financial markets.</p>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/3">
                  <div className="text-center">
                    <div className="pb-10">
                      <img src={require('../../assets/images/trading-support.png')} className='w-20 m-auto' alt="" />
                    </div>
                    <div className="">
                      <h5 className='text-white text-2xl pb-3'>Comprehensive FX Trading Support</h5>
                      <p className='text-white'>Available 24/5 from 3am Saturday to 5pm Friday EST. Access phone, email or live chat with designated support team members.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <About />
      <FrameForex />
      <FirstTradingRobot/>
      <CountriesUser/>
      <MaximizeYourProfits/>
      <SolutionsOurClients/>
      <FastAccountOpening/>
      <GenerationBonus/>
      <TestimonialSlider/>
    </div>
  )
}

export default LandingPage