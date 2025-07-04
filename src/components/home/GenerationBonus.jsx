import React from 'react'
import BonusLevel from './BonusLevel'

const GenerationBonus = () => {
  return (
    <>
      <div className="bg-GenerationBonusss py-20 flex justify-center bg-[#F3F3F3]"> 
          <div className="container max-w-7xl m-auto px-4 sm:px-0"> 
              <div className="text-center">
                  <h1 className="text-5xl font-bold mb-2 tracking-wide text-[#0B0126]">Generation Bonus</h1>
                  <p className="text-lg pb-8 text-gray-600">Unlock Rewards with Every Referral!</p>
                  <h1 className="text-xl font-bold mb-2 tracking-wide text-[#0B0126]">How It Works</h1>
                  <p className="text-lg py-3 text-gray-600">Earn bonuses by referring others to the platform and unlocking rewards across 10 levels. As you progress, <br /> the number of referrals needed increases, unlocking greater rewards at each stage.</p>
              </div>

              <div className="lg:py-20">
                <BonusLevel />
              </div>
              <div className="">
                <p className='text-center py-3 text-gray-600'>The more people you refer, the bigger the rewards. Begin your journey now <br /> and unlock all 10 levels of bonuses!</p>
              </div>
          </div>
      </div>
      <div className=" bg-[#F3F3F3]">
        <img src={require('../../assets/images/Across-10-Levels.png')} className='w-full' alt="" />
      </div>
    </>
  )
}

export default GenerationBonus