import React from "react";

const BonusLevel = () => {
 
    return (
        <div>
            <div className="relative mx-auto max-w-[1400px]">
                {/* Center text */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90">
                    <h2 className="whitespace-nowrap text-[#E6E6E6] text-6xl font-bold tracking-wide">ACROSS 10 LEVELS</h2>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6 lg:translate-y-36">
                        <div className="bg-white rounded-3xl shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-[#E6E6E6] text-5xl font-bold">01</span>
                                    <img src={require('../../assets/images/down-arrow.png')} className="animate-bounce" alt="" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-[#0B0126]">First Level</h3>
                                <p className="text-gray-600 mb-4">
                                    Refer <span className="font-bold">10 people</span> to unlock this level.
                                </p>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-900 px-8">Reward</span>
                                <div className="bg-[#541AFF] px-7 py-3.5 rounded-tl-3xl"> 
                                    <span className=" text-white text-2xl font-medium">$10</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer">
                            <div className=" p-6"> 
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-[#E6E6E6] text-5xl font-bold">02</span>
                                    <img src={require('../../assets/images/down-arrow.png')} className="animate-bounce" alt="" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-[#0B0126]">Second Level</h3>
                                <p className="text-gray-600 mb-4">
                                    Refer <span className="font-bold">25 people</span> to unlock this level.
                                </p>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-900 px-8">Reward</span>
                                <div className="bg-[#541AFF] px-7 py-3.5 rounded-tl-3xl"> 
                                    <span className=" text-white text-2xl font-medium">$25</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Center Left Column */}
                    <div className="space-y-6 ">
                        <div className="bg-white rounded-3xl shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer">
                            <div className=" p-6"> 
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-[#E6E6E6] text-5xl font-bold">03</span>
                                    <img src={require('../../assets/images/down-arrow.png')} className="animate-bounce" alt="" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-[#0B0126]">Third Level</h3>
                                <p className="text-gray-600 mb-4">
                                    Refer <span className="font-bold">50 people</span> to unlock this level.
                                </p>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-900 px-8">Reward</span>
                                <div className="bg-[#541AFF] px-7 py-3.5 rounded-tl-3xl"> 
                                    <span className=" text-white text-2xl font-medium">$50</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-[#E6E6E6] text-5xl font-bold">04</span>
                                    <img src={require('../../assets/images/down-arrow.png')} className="animate-bounce" alt="" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-[#0B0126]">Fourth Level</h3>
                                <p className="text-gray-600 mb-4">
                                    Refer <span className="font-bold">75 people</span> to unlock this level.
                                </p>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-900 px-8">Reward</span>
                                <div className="bg-[#541AFF] px-7 py-3.5 rounded-tl-3xl"> 
                                    <span className=" text-white text-2xl font-medium">$75</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer">
                            <div className="p-6"> 
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-[#E6E6E6] text-5xl font-bold">05</span>
                                    <img src={require('../../assets/images/down-arrow.png')} className="animate-bounce" alt="" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-[#0B0126]">Fourth Level</h3>
                                <p className="text-gray-600 mb-4">
                                    Refer <span className="font-bold">75 people</span> to unlock this level.
                                </p>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-900 px-8">Reward</span>
                                <div className="bg-[#541AFF] px-7 py-3.5 rounded-tl-3xl"> 
                                    <span className=" text-white text-2xl font-medium">$100</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Center Column */}
                    <div className="hidden lg:block">{/* This column is empty to create space for the centered text */}</div>

                    {/* Center Right Column */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-3xl shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer">
                            <div className="p-6"> 
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-[#E6E6E6] text-5xl font-bold">06</span>
                                    <img src={require('../../assets/images/down-arrow.png')} className="animate-bounce" alt="" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-[#0B0126]">Sixth Level</h3>
                                <p className="text-gray-600 mb-4">
                                    Refer <span className="font-bold">125 people</span> to unlock this level.
                                </p>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="bg-[#541AFF] px-7 py-3.5 rounded-tr-3xl"> 
                                    <span className=" text-white text-2xl font-medium">$125</span>
                                </div>
                                <span className="text-gray-900 px-8">Reward</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer">
                            <div className="p-6"> 
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-[#E6E6E6] text-5xl font-bold">07</span>
                                    <img src={require('../../assets/images/down-arrow.png')} className="animate-bounce" alt="" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-[#0B0126]">Seventh Level</h3>
                                <p className="text-gray-600 mb-4">
                                    Refer <span className="font-bold">150 people</span> to unlock this level.
                                </p>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="bg-[#541AFF] px-7 py-3.5 rounded-tr-3xl"> 
                                    <span className=" text-white text-2xl font-medium">$150</span>
                                </div>
                                <span className="text-gray-900 px-8">Reward</span>
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer">
                            <div className="p-6"> 
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-[#E6E6E6] text-5xl font-bold">08</span>
                                    <img src={require('../../assets/images/down-arrow.png')} className="animate-bounce" alt="" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-[#0B0126]">Seventh Level</h3>
                                <p className="text-gray-600 mb-4">
                                    Refer <span className="font-bold">150 people</span> to unlock this level.
                                </p>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="bg-[#541AFF] px-7 py-3.5 rounded-tr-3xl"> 
                                    <span className=" text-white text-2xl font-medium">$150</span>
                                </div>
                                <span className="text-gray-900 px-8">Reward</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6 lg:translate-y-36">
                        <div className="bg-white rounded-3xl shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer">
                            <div className="p-6"> 
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-[#E6E6E6] text-5xl font-bold">09</span>
                                    <img src={require('../../assets/images/down-arrow.png')} className="animate-bounce" alt="" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-[#0B0126]">Ninth Level</h3>
                                <p className="text-gray-600 mb-4">
                                    Refer <span className="font-bold">200 people</span> to unlock this level.
                                </p>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="bg-[#541AFF] px-7 py-3.5 rounded-tr-3xl"> 
                                    <span className=" text-white text-2xl font-medium">$200</span>
                                </div>
                                <span className="text-gray-900 px-8">Reward</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-[#E6E6E6] text-5xl font-bold">10</span>
                                    <img src={require('../../assets/images/down-arrow.png')} className="animate-bounce" alt="" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-[#0B0126]">Tenth Level</h3>
                                <p className="text-gray-600 mb-4">
                                    Refer <span className="font-bold">250 people</span> to unlock this level.
                                </p>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="bg-[#541AFF] px-7 py-3.5 rounded-tr-3xl"> 
                                    <span className=" text-white text-2xl font-medium">$250</span>
                                </div>
                                <span className="text-gray-900 px-8">Reward</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BonusLevel;
