import React from 'react'

const VisionMission = () => {
  return (
    <>
        <div className='bg-[#F3F3F3] py-12'>
            <div className="container max-w-7xl m-auto px-4 sm:px-0">
                <div className="lg:flex items-center justify-center flex-wrap ga-3">
                    <div className="lg:w-1/2">
                        <div className="p-6">
                            <div className="">
                                <img src={require('../../../assets/images/vision-mission.png')} className='w-[100%]' alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2">
                        <div className="px-6 grid justify-between items-center lg:gap-16">
                            <div className="mb-5 lg:p-5">
                                <div className="pb-3">
                                    <img src={require('../../../assets/images/v6-icon-vision.png')} className='w-[96px]' alt="" />
                                </div>
                                <div className="">
                                    <p className='text-xl text-[#0B0126]'>Exowa has created an AI-powered assessment platform designed for schools and families: a community where students can learn, parents can track, and teachers can guide.</p>
                                </div>
                            </div>
                            <div className="mb-5 lg:p-5">
                                <div className="pb-5">
                                    <img src={require('../../../assets/images/v6-icon-mission.png')} className='w-[90px]' alt="" />
                                </div>
                                <div className="">
                                    <p className='text-xl text-[#0B0126]'>Opening the global markets so that everyone can trade and invest in a simple and transparent way.</p>
                                </div>
                            </div>
                            <div className="mb-5 lg:p-5">
                                <div className="pb-5">
                                    <img src={require('../../../assets/images/v6-icon-value.png')} className='w-[90px]' alt="" />
                                </div>
                                <div className="">
                                    <p className='text-xl text-[#0B0126]'>Reimagining academic practice so that students, parents, and teachers grow together through real-time insights.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-[#F3F3F3]">
            <img src={require('../../../assets/images/Our-Story.png')} className='w-full' alt="" />
        </div>
        <div className="py-28 bg-[#F3F3F3]">
            <div className="container max-w-7xl m-auto px-4 sm:px-0">
                <div className="lg:flex items-center justify-center flex-wrap ga-3">
                    <div className="lg:w-1/2">
                        <div className="mb-5">
                            <h2 className='text-[#0B0126] text-5xl font-medium'>Too much time wasting, <br /> not enough time <br /> utilising</h2>
                        </div>
                    </div>
                    <div className="lg:w-1/2">
                        <div className="">
                            <p className='mb-4 text-gray-700 text-xl'>We (the Exowa founding team) came from years of experience in education and technology, working alongside schools, teachers, and software innovators to understand the real challenges in academic delivery and student assessments.</p>
                            <p className='mb-4 text-gray-700 text-xl'>It was not easy to create question papers, checking tests, and managing progress reports manually—a process that was inefficient and outdated.</p>
                            <p className='mb-4 text-gray-700 text-xl'>That’s why we built Exowa—to simplify assessments, save teachers’ time, and give students and parents the clarity they deserve.

</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default VisionMission