import React, { useState } from "react";
import { toastmsg } from "../../dashboard/GlobalApi/Global";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import LoaderTwo from "../../loader/LoaderTwo";

const ContactPromptly = () => {
  const BaseURI = process.env.REACT_APP_API_BASE_URI;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    loader: false,
    emailvali: null,
    phonevali: null,
  });
  const CallFun = async (e) => {
    setFormData((prevData) => ({
      ...prevData,
      loader: true,
    }));
    const apiData = {
      name: formData.name,
      email: formData.email,
      phoneno: formData.phone,
      description: formData.message,
    };
    try {
      const response = await axios.post(
        `${BaseURI}/website/contact_us`,
        apiData
      );
      if (response.status === 200) {
        toastmsg("1", response.data.message);
        setFormData((prevData) => ({
          ...prevData,
          loader: false,
        }));
      }
    } catch (error) {
      console.error("Error during API call:", error.response?.data);
      toastmsg("0", error.response?.data.error);
      setFormData((prevData) => ({
        ...prevData,
        loader: false,
      }));
    }
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{7,}$/;
    // Email validation
    if (name === "email") {
      if (value && !emailRegex.test(value)) {
        setFormData((prevData) => ({
          ...prevData,
          emailvali: "Invalid email format!",
        }));
      } else if (value === "") {
        setFormData((prevData) => ({
          ...prevData,
          emailvali: null,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          emailvali: true,
        }));
      }
    }
    if (name === "phone") {
      if (value && !phoneRegex.test(value)) {
        setFormData((prevData) => ({
          ...prevData,
          phonevali: "Invalid phone number!",
        }));
      } else if (value === "") {
        setFormData((prevData) => ({
          ...prevData,
          phonevali: null,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          phonevali: true,
        }));
      }
    }
  };

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      toastmsg("0", "Please fill all fields!");
      return;
    }
    CallFun();
  };

  return (
    <div className="py-28 bg-[#F3F3F3]">
      <div className="relative container max-w-6xl m-auto px-4 sm:px-0">
        <div className="relative z-[1]">
          <div className="">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Column - Text Content */}
              <div className="max-w-xl">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  Write to us and we'll get back to you promptly.
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                  We're ready to help, whether you have a question about our
                  security solutions or are interested in the company. Contact
                  us using the information below and a team member will get back
                  to you shortly!
                </p>
                {/* Decorative Element */}
                <div className="hidden lg:block mt-12 opacity-10">
                  <div className="relative w-72 h-72 bg-gray-200 rounded-full" />
                  <div className="absolute -top-8 right-12 w-48 h-48 bg-gray-300 rounded-full" />
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="bg-white rounded-3xl shadow-sm p-8 lg:p-10 lg:mx-7">
                <div className="space-y-6">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      onChange={handleOnchange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <div className="absolute top-7 right-2">
                      {formData.name !== "" && (
                        <p className="mt-2 w-full flex justify-end pr-1">
                          <FaCheckCircle className="transform  text-green-500" />
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      onChange={handleOnchange}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <div className="absolute top-7 right-2">
                      {formData.emailvali === true && (
                        <p className="mt-2 w-full flex justify-end pr-1">
                          <FaCheckCircle className="transform  text-green-500" />
                        </p>
                      )}
                    </div>
                    {formData.emailvali && (
                      <p className="text-red-500 text-[14px] mt-1 right-0 absolute">
                        {formData.emailvali}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      onChange={handleOnchange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <div className="absolute top-7 right-2">
                      {formData.phonevali === true && (
                        <p className="mt-2 w-full flex justify-end pr-1">
                          <FaCheckCircle className="transform  text-green-500" />
                        </p>
                      )}
                    </div>
                    {formData.phonevali && (
                      <p className="text-red-500 text-[14px] mt-1 right-0 absolute">
                        {formData.phonevali}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      onChange={handleOnchange}
                      rows={4}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <div className="absolute top-7 right-2">
                      {formData.message !== "" && (
                        <p className="mt-2 w-full flex justify-end pr-1 bg-white">
                          <FaCheckCircle className="transform  text-green-500" />
                        </p>
                      )}
                    </div>
                  </div>
                  {formData.loader ? (
                    <button
                      type="submit"
                      className="bg-[#541AFF] w-full px-10 py-3.5 rounded-xl flex justify-center items-center text-white hover:bg-[#382fb4]"
                    >
                      <LoaderTwo />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-[#541AFF] w-full px-10 py-3.5 rounded-xl text-white hover:bg-[#382fb4]"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-28 left-0">
          <img
            src={require("../../../assets/images/Union-ContactPromptly.png")}
            className="lg:w-[80%]"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default ContactPromptly;
