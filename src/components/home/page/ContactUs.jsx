import React from 'react'
import WereHereHelp from './WereHereHelp'
import ContactPromptly from './ContactPromptly'

const ContactUs = () => {
  return (
    <div>
        <div className="bg-Aboutus bg-[#100630] lg:py-32 py-12">
            <div className="container max-w-7xl m-auto px-4 sm:px-0">
                <div className="">
                    <div className="text-center">
                        <h5 className='text-[#541AFF] text-xl'>Contact</h5>
                        <h1 className='text-white lg:text-7xl font-bold py-4 mb-5'>Don't be a Stranger <br /> just say Hello.</h1>
                        <p className='text-white text-lg'>Thank you for your interest in our services.<br /> Please fill the form below</p>
                    </div>
                </div>
            </div>
        </div>
        <WereHereHelp />
        <ContactPromptly/>
    </div>
  )
}

export default ContactUs