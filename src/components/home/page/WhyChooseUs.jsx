import React, { useState } from "react";

const WhyChooseUs = () => {
    const [activeTab, setActiveTab] = useState("Simplicity");

    // Handle tab change
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    return (
        <div>
            <div className="bg-[#fff] lg:py-32">
                <div className="container max-w-7xl m-auto px-4 sm:px-0">
                    <div className="py-12">
                        <div className="text-center">
                            <h2 className="text-[#0B0126] text-4xl font-bold">Why Choose Us?</h2>
                        </div>
                    </div>
                    <div className="lg:flex justify-center flex-wrap gap-3">
                        <div className="lg:w-1/4">
                            <div className="p-6"> 
                                <button
                                    className={`h-[55px] px-8 my-2 w-full text-xl text-left font-bold rounded-xl ${activeTab === "Simplicity" ? "bg-[#541AFF] text-white" : "bg-[#F3F3F3] text-[#0B0126]"}`}
                                    onClick={() => handleTabClick("Simplicity")}
                                >
                                    Simplicity
                                </button>
 
                                <button
                                    className={`h-[55px] px-8 my-2 w-full text-xl text-left font-bold rounded-xl ${activeTab === "Innovation" ? "bg-[#541AFF] text-white" : "bg-[#F3F3F3] text-[#0B0126]"}`}
                                    onClick={() => handleTabClick("Innovation")}
                                >
                                    Innovation
                                </button>
 
                                <button
                                    className={`h-[55px] px-8 my-2 w-full text-xl text-left font-bold rounded-xl ${activeTab === "Quality" ? "bg-[#541AFF] text-white" : "bg-[#F3F3F3] text-[#0B0126]"}`}
                                    onClick={() => handleTabClick("Quality")}
                                >
                                    Quality
                                </button>
 
                                <button
                                    className={`h-[55px] px-8 my-2 w-full text-xl text-left font-bold rounded-xl ${activeTab === "Vision" ? "bg-[#541AFF] text-white" : "bg-[#F3F3F3] text-[#0B0126]"}`}
                                    onClick={() => handleTabClick("Vision")}
                                >
                                    Vision
                                </button>
                            </div>
                        </div>

                        <div className="lg:w-1/2">
                            <div className="p-6">
                                {/* Dynamically changing content based on active tab */}
                                {activeTab === "Simplicity" && (
                                    <div>
                                        <div className="">
                                            <p className="text-xl text-gray-700">
                                                We are passionate about transforming education. Our team of educators and developers work at the intersection of academics and technology to build intuitive, student-friendly assessment tools that truly make a difference. We stay ahead of the curve to ensure Exowa remains relevant, reliable, and easy to use for students, teachers, and parents alike. We care deeply about student success and school growth—that’s why we don’t just offer a product, we partner with you on your journey.


                                            </p>
                                        </div>
                                    </div>
                                )}
                                {activeTab === "Innovation" && (
                                    <div>
                                        <div className="">
                                            <p className="text-xl text-gray-700">
                                                We are passionate about transforming education. Our team of educators and developers work at the intersection of academics and technology to build intuitive, student-friendly assessment tools that truly make a difference. We stay ahead of the curve to ensure Exowa remains relevant, reliable, and easy to use for students, teachers, and parents alike. We care deeply about student success and school growth—that’s why we don’t just offer a product, we partner with you on your journey.


                                            </p>
                                        </div>
                                    </div>
                                )}
                                {activeTab === "Quality" && (
                                    <div>
                                        <div className="">
                                            <p className="text-xl text-gray-700">
                                                We are passionate about our work. Our designers stay ahead of the curve to provide engaging and user-friendly website designs to make your business stand out. Our developers are committed to
                                                maintaining the highest web standards so that your site will withstand the test of time. We care about your business, which is why we work with you.
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {activeTab === "Vision" && (
                                    <div>
                                        <div className="">
                                            <p className="text-xl text-gray-700">
                                                We are passionate about our work. Our designers stay ahead of the curve to provide engaging and user-friendly website designs to make your business stand out. Our developers are committed to
                                                maintaining the highest web standards so that your site will withstand the test of time. We care about your business, which is why we work with you.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
