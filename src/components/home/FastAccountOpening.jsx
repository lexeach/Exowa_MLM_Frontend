import React from "react";
import { useNavigate } from "react-router-dom";

const FastAccountOpening = () => {
  const naviget = useNavigate();
  const handlenaviget = () => {
    naviget("/registration");
  };
  return (
    <div>
      <div className="bg-[#0B0126] text-white py-20 px-4">
        <div className="container max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-2 tracking-wide">
            Fast Account Opening in
          </h1>
          <h1 className="text-5xl font-bold mb-4 tracking-wide">
            3 Simple Steps
          </h1>
          <p className="text-xl mb-20 text-gray-300">
            Start trading with algo-trader Bot
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20 relative">
            {/* Connector Lines */}
            <div className="hidden md:block absolute top-[2.5rem] left-[calc(33%+2rem)] right-[calc(33%+2rem)] h-[2px]">
              <div className="relative w-full">
                {/* First Arrow */}
                <div className="absolute -top-2 -left-[180px] right-[70%] h-[2px] bg-[#541AFF]" />
                <div className="absolute -top-2 right-[70%] w-3 h-3 border-t-2 border-r-2 border-[#541AFF] transform rotate-45 -translate-y-[5px] translate-x-[6px]" />

                {/* Second Arrow */}
                <div className="absolute -top-2 left-[70%] -right-[180px] h-[2px] bg-[#541AFF]" />
                <div className="absolute -top-2 -right-[180px] w-3 h-3 border-t-2 border-r-2 border-[#541AFF] transform rotate-45 -translate-y-[5px] translate-x-[6px]" />
              </div>
            </div>

            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-[#541AFF] flex items-center justify-center text-2xl mb-6 text-[#fff]">
                01
              </div>
              <h3 className="text-xl font-semibold mb-3">Register</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Choose account type
                <br />
                and complete our fast and secure
                <br />
                application form
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-[#541AFF] flex items-center justify-center text-2xl mb-6 text-[#fff]">
                02
              </div>
              <h3 className="text-xl font-semibold mb-3">Add Fund</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Fund your trading account
                <br />
                using a wide range
                <br />
                of funding methods
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-[#541AFF] flex items-center justify-center text-2xl mb-6 text-[#fff]">
                03
              </div>
              <h3 className="text-xl font-semibold mb-3">Trade</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Start trading on your live account
                <br />
                and access 10K instruments across our
                <br />
                trading platforms
              </p>
            </div>
          </div>

          <button
            className="bg-[#541AFF] hover:bg-[#2a2c8f] text-white font-medium py-3 px-8 rounded-lg text-lg transition-colors"
            onClick={handlenaviget}
          >
            Open an Account Now!
          </button>
        </div>
      </div>
    </div>
  );
};

export default FastAccountOpening;
