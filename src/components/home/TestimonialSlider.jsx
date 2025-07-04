import { useState, useEffect } from "react";
import { QuoteIcon } from "lucide-react";

const testimonials = [
    {
        text: "Best service by algo-trader, fast withdraw.",
        author: "Mohan Sharma",
        role: "Business Owner",
    },
    {
        text: "Exceptional customer support and reliable platform.",
        author: "Sarah Wilson",
        role: "Marketing Director",
    },
    {
        text: "Innovative solutions that transformed our workflow.",
        author: "David Chen",
        role: "Project Manager",
    },
    {
        text: "Outstanding results and professional team.",
        author: "Emma Davis",
        role: "CEO",
    },
];

const TestimonialSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-advance slides
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);
    return (
        <div className="py-10 flex justify-center overflow-hidden"> 
            <div className="container max-w-4xl m-auto px-4 sm:px-0">
                <h2 className="text-3xl md:text-4xl font-bold text-center my-12 text-[#0B0126]">What Our Client&apos;s Say</h2>
                <div className="relative">
                    <div className="relative min-h-[300px]">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className={`absolute w-full transform transition-all duration-500 ease-in-out ${index === currentSlide ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}`}>
                                <div className="relative bg-white rounded-2xl p-8 lg:p-12 border border-[#541AFF]">
                                    <QuoteIcon className="absolute z-[1] -top-4 left-0 right-0 flex items-center justify-center m-auto h-8 w-8 bg-white text-[#541AFF] transform -scale-x-100" />

                                    <div className="text-center max-w-2xl mx-auto">
                                        <p className="text-xl md:text-2xl text-gray-800 mb-6">{testimonial.text}</p>

                                        <div className="space-y-2">
                                            <h3 className="text-lg font-medium text-[#541AFF]">{testimonial.author}</h3>
                                            <p className="text-gray-600">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Navigation Dots */}
                        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center justify-center space-x-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-[#541AFF] w-4" : "bg-gray-300"}`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div> 
                    <div className="absolute lg:-right-[130px] -right-[41px] -bottom-[40px]">
                        <img src={require('../../assets/images/robot-ai.png')} className="lg:w-[230px] w-[170px]" alt="" />
                    </div>
                </div>
                    

                {/* Navigation Buttons */}
                {/* <div className="hidden md:flex justify-between  top-1/2 left-4 right-4 -mt-4">
                    <button
                        onClick={() => setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                        className="p-2 rounded-full bg-black shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#541AFF]"
                        aria-label="Previous slide"
                    >
                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => setCurrentSlide((prev) => (prev + 1) % testimonials.length)}
                        className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#541AFF]"
                        aria-label="Next slide"
                    >
                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default TestimonialSlider;
