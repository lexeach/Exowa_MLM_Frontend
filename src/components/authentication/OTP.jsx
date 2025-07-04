import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import doWin from "../../assets/logo/logo-white.png";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import {
  setApiAllData,
  setuserIsLogin,
  setuserLoginData,
  setuserrefferalCode,
} from "../../Redux/DoWinSlice";
import LoaderTwo from "../loader/LoaderTwo";
import { FaCheckCircle } from "react-icons/fa";
import logo  from '../../assets/logo/dowin.png'
const OTP = () => {
  const userId = useSelector((state) => state.doWin.loginuserID);
  // console.log("userId",userId)
  const [userID, setuserID] = useState(null);
  const [userToken, setuserToken] = useState(null);
  const navigation = useNavigate();
  const BaseURI = process.env.REACT_APP_API_BASE_URI;
  const [OTP, setOTP] = useState(null);
  const otpLength = OTP ? OTP.length : 0;
  const dispatch = useDispatch();
  const [isLoader, setisLoader] = useState(false);
  const handleOnchange = (e) => {
    setOTP(e.target.value);
  };
  //-------------
  const CallFun = async (e) => {
    setisLoader(true);
    const apiData = {
      userid: userId.userID,
      otp: OTP,
    };
    try {
      const response = await axios.post(`${BaseURI}/user/verify`, apiData);
      if (response.status === 200) {
        dispatch(setuserLoginData(response.data.result));
        setisLoader(false);
        setuserID(response.data.result.user.userid);
        setuserToken(response.data.result.token);
        dispatch(setuserrefferalCode(response.data.result.user.userid));
        setTimeout(() => {
          authenticateApi(response.data.result.token);
        }, 1000);
      }
    } catch (error) {
      console.error("Error during API call:", error.response?.data);
      toast.error(`${error.response?.data.error || error.message}`);
      setisLoader(false);
    }
  };
  //---------Resend OTP-------
  const resendOTPFun = async (e) => {
    setisLoader(true);
    const apiData = {
      userid: userId.userID,
      user_password: userId.userPassword,
    };
    try {
      const response = await axios.post(`${BaseURI}/user/login`, apiData);
      if (response.status === 200) {
        setisLoader(false);
        toast.success("Resend OTP successfully");
      }
    } catch (error) {
      console.error("Error during API call:", error.response?.data);
      toast.error(
        `${
          error.response?.data.error ||
          error.response?.data.message ||
          error.message
        }`
      );
      setisLoader(false);
    }
  };
  //-------------
  const handleSubmit = () => {
    if (OTP !== null) {
      CallFun();
    } else {
      toast.error("Required OTP*");
    }
  };
  //---------------
  const authenticateApi = async (usertoken) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": usertoken,
          Authorization: `Bearer ${usertoken}`,
        },
      };
      const response = await axios.post(
        `${BaseURI}/user/authanticate`,
        {},
        config
      );
      if (response.status === 200) {
        dispatch(setApiAllData(response?.data));
        dispatch(setuserIsLogin(true));
        navigation("/");
        setisLoader(false);
      }
    } catch (error) {
      dispatch(setuserIsLogin(false));
      setisLoader(false);
      console.error("Error during API call:", error);
      toast.error(
        `${
          error?.response?.data?.message || error.message || "An error occurred"
        }`
      );
    }
  };
  //----------------------------
  const [timeLeft, setTimeLeft] = useState(600);
  const [canResend, setCanResend] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(true);
  useEffect(() => {
    let timer;
    if (isTimerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setCanResend(true);
      setIsTimerActive(false);
    }
    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft]);
  //---------------------
  const resendOTP = () => {
    if (canResend) {
      resendOTPFun();
      setTimeLeft(600);
      setCanResend(false);
      setIsTimerActive(true);
    }
  };
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };
  return (
    <div className="bg-[#F3F3F3] py-20 ">
      <div className="container max-w-6xl m-auto ">
        {/* Right Panel */}
        <div className="lg:m-0 m-4">
          <div className="lg:w-[40%] p-4 bg-white  rounded-3xl m-auto">
            <div className="mx-auto flex w-full flex-col  justify-center space-y-6 sm:w-[90%] mt-5">
              <div className="">
              <img
                  src={logo}
                  className="m-auto w-32"
                  alt=""
                />
              </div>
              <div className="space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                  Please enter the One Time Password to verify your account
                </h1>
                <p className="text-sm text-gray-600">
                  A one time password has been send to{" "}
                  <span className="text-[#4d33f8]">{userId?.userEmail}</span>
                </p>
              </div>

              <div className="space-y-4">
                <div className="mb-4 relative">
                  <div className="mb-3 text-gray-600 text-sm">
                    One Time Password (OTP)
                  </div>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    className="w-full rounded-lg border h-[45px] border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
                    onChange={handleOnchange}
                  />
                  <div className="absolute top-9 right-2">
                    {otpLength > 3 && (
                      <p className=" mt-2 w-full flex justify-end pr-1">
                        <FaCheckCircle className="transform  text-green-500" />
                      </p>
                    )}
                  </div>

                  <div className=" flex justify-end text-[#4d33f8] pt-2 text-[14px] pr-2">
                    {canResend ? (
                      <button onClick={resendOTP}>Resend OTP</button>
                    ) : (
                      <p>Time left: {formatTime(timeLeft)}</p>
                    )}
                  </div>
                </div>
                <div className="py-3">
                  {isLoader ? (
                    <button className="w-full rounded-lg h-[45px] bg-[#4d33f8] py-2 text-sm font-semibold text-white hover:bg-[#4d33f8]/90 focus:outline-none focus:ring-2 focus:ring-[#4d33f8] focus:ring-offset-2 flex justify-center items-center">
                      <LoaderTwo />
                    </button>
                  ) : (
                    <button
                      className="w-full rounded-lg h-[45px] bg-[#4d33f8] py-2 text-sm font-semibold text-white hover:bg-[#4d33f8]/90 focus:outline-none focus:ring-2 focus:ring-[#4d33f8] focus:ring-offset-2"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>

              <div className="pb-7">
                <div className="text-center text-sm text-gray-500">
                  By clicking continue, you agree to our{" "}
                  <Link
                    href="/terms"
                    className="font-medium text-gray-900 underline hover:text-black"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
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

export default OTP;
