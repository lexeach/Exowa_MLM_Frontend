import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/dowin.png";
import axios from "axios";
import LoaderTwo from "../loader/LoaderTwo";
import { toastmsg } from "../dashboard/GlobalApi/Global";

const ForgotPassword = () => {
  const [userId, setuserId] = useState(null);
  const BaseURI = process.env.REACT_APP_API_BASE_URI;
  const [isLoader, setisLoader] = useState(false);
  const navigation = useNavigate();
  const handleOnchange = (e) => {
    setuserId(e.target.value);
  };
  //-----------sent OTP Api Calling------------
  const OTPApicall = async () => {
    setisLoader(true);
    const apiData = {
      useremail: userId,
    };
    try {
      const response = await axios.post(
        `${BaseURI}/user/forgetAppPassword`,
        apiData
      );
      if (response.status === 200) {
        // toast.success(response.data.message);
        toastmsg("1", response?.data?.message);
        setisLoader(false);
        setTimeout(() => {
          navigation("/update-forgot-password", {
            state: { userData: response?.data },
          });
          // navigation("/update-forgot-password");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      // toast.error(`${error.response?.data.error}`);
      toastmsg(
        "0",
        error?.response?.data?.error || error?.response?.data?.message
      );
      setisLoader(false);
    }
  };
  //-------------------
  const sendOtp = () => {
    if (userId !== null) {
      OTPApicall();
    } else {
      toastmsg("0", "Required UserId*");
    }
  };
  return (
    <div className="bg-[#F3F3F3] py-20 ">
      <div className="container max-w-6xl m-auto ">
        <div className="lg:m-0 m-4">
          {/* Right Panel */}
          <div className="lg:w-[40%] p-4 bg-white  rounded-3xl m-auto">
            <div className="mx-auto flex w-full flex-col  justify-center space-y-6 sm:w-[90%] mt-5">
              <div className="">
                <img src={logo} className="m-auto w-32" alt="" />
              </div>
              <div className="space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                  Forgot Password
                </h1>
                <p className="text-sm text-gray-500">Enter your user Email</p>
              </div>

              <div className="space-y-4">
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Enter user Email"
                    className="w-full rounded-lg border h-[45px] border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
                    onChange={handleOnchange}
                  />
                </div>
                <div className="py-3">
                  {/* <button className="w-full rounded-lg h-[45px] bg-[#4d33f8] py-2 text-sm font-semibold text-white hover:bg-[#4d33f8]/90 focus:outline-none focus:ring-2 focus:ring-[#4d33f8] focus:ring-offset-2" onClick={sendOtp}>
                    Send OTP
                  </button> */}
                  {isLoader ? (
                    <button className="w-full rounded-lg h-[45px] bg-[#4d33f8] py-2 text-sm font-semibold text-white hover:bg-[#4d33f8]/90 focus:outline-none focus:ring-2 focus:ring-[#4d33f8] focus:ring-offset-2 flex justify-center items-center">
                      <LoaderTwo />
                    </button>
                  ) : (
                    <button
                      className="w-full rounded-lg h-[45px] bg-[#4d33f8] py-2 text-sm font-semibold text-white hover:bg-[#4d33f8]/90 focus:outline-none focus:ring-2 focus:ring-[#4d33f8] focus:ring-offset-2"
                      onClick={sendOtp}
                    >
                      Send OTP
                    </button>
                  )}
                </div>
              </div>

              <div className="pb-7">
                <div className="text-center text-sm text-gray-500">
                  By clicking continue, you agree to our{" "}
                  <Link
                    to="/terms-and-conditions"
                    className="font-medium text-gray-900 underline hover:text-black"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy-policy"
                    className="font-medium text-gray-900 underline hover:text-black"
                  >
                    Privacy Policy
                  </Link>
                  .
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
