import React, { useEffect, useMemo, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  ConvertPrice,
  getDynamicStyles,
  getdynamicStylesInput,
  toastmsg,
} from "../GlobalApi/Global";
import LoaderTwo from "../../loader/LoaderTwo";
import axios from "axios";
import CustompageHeader from "../../custome/CustompageHeader";

const Investment = () => {
  const BaseURI = process.env.REACT_APP_API_BASE_URI;
  const [isLoader, setisLoader] = useState(false);
  const userToken = useSelector((state) => state.doWin.userLoginData);
  const setusertoken = userToken?.token;
  const authData = useSelector((state) => state.doWin.ApiAllData);

  const investmentHours = authData?.data?.investment_hours;

  const [invest, setinvest] = useState({
    AmountDoller: "",
    AmountINR: "",
  });
  //   Empty Form data after Api Calling-----
  const emptyStates = () => {
    setinvest({
      AmountDoller: "",
      AmountINR: "",
    });
  };
  // Set Profile-Update-Data------------
  const handleinvest = (e) => {
    const { name, value } = e.target;
    ConvertPrice(name, value, invest, setinvest);
    setinvest((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const APIcall = async () => {
    setisLoader(true);
    const apiData = {
      amount: invest.AmountINR,
      amount_dollar: invest.AmountDoller,
    };
    // console.log("apiData", apiData);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": setusertoken,
          Authorization: `Bearer ${setusertoken}`,
        },
      };
      const response = await axios.post(
        `${BaseURI}/user/robot_investment`,
        apiData,
        config
      );
      console.log("response", response);
      if (response.status === 200) {
        setisLoader(false);
        emptyStates();
        toastmsg("1", response?.data?.message);
      }
    } catch (error) {
      setisLoader(false);
      console.log("errr", error);
      console.error("Error during API call:", error.response.data.error);
      toastmsg("0", error.response.data.error);
    }
  };

  const validateFields = (invest) => {
    if (invest.AmountDoller === "" || invest.AmountINR === "") {
      toastmsg("0", "Please fill all required fields!");
      return false;
    }

    if (invest.AmountDoller < 0 || invest.AmountINR < 0) {
      toastmsg("0", "Negative values are not allowed!");
      return false;
    }

    return true;
  };

  const handelsubmit = () => {
    const isValid = validateFields(invest);
    if (isValid) {
      APIcall();
    }
  };
  const Theme = useSelector((state) => state.doWin.Theme);
  const PageTheme = useSelector((state) => state.doWin.PageTheme);
  const dynamicStyles = useMemo(() => {
    return getDynamicStyles(Theme);
  }, [Theme]);
  const dynamicStylesInput = useMemo(() => {
    return getdynamicStylesInput(Theme);
  }, [Theme, PageTheme]);
  const [timeLeft, setTimeLeft] = useState("");
  const [showTimer, setShowTimer] = useState(false);
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      // Treat decimal as HH.MM instead of hours + fraction
      const hoursPart = Math.floor(investmentHours);
      const minutesPart = Math.round((investmentHours % 1) * 100); // <-- key change
      const investmentTarget = new Date(startOfDay);
      investmentTarget.setHours(hoursPart, minutesPart, 0, 0);

      if (now < investmentTarget) {
        setShowTimer(true);
        const diff = investmentTarget - now;

        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeLeft(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      } else {
        setShowTimer(false);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [investmentHours]);

  return (
    <div className="overflow-hidden">
      <div className="max-h-screen overflow-x-auto py-5 lg:px-10 px-3">
        <div className="mt-5">
          <CustompageHeader
            hometab="Robot"
            innertab="Investment"
            decText="Start investing now"
            decTitle="Investment"
          />

          <div
            className="bg-white rounded-2xl lg:p-10 p-2 shadow-md shadow-indigo-50 mt-10 mb-12"
            style={dynamicStyles}
          >
            <div className="mb-5 flex flex-wrap justify-between gap-5">
              <div>
                <h3
                  className="text-xl text-gray-900"
                  style={{ color: Theme.textcolor }}
                >
                  Fill Details
                </h3>
              </div>
              <div>
                {showTimer ? (
                  <h2 className="text-xl font-bold text-[#4d33f8] flex justify-center items-center">
                    ⏳ Time left: <p className="w-[110px] pl-1">{timeLeft}</p>
                  </h2>
                ) : (
                  <h2 className="text-xl font-semibold text-red-500">
                    ⏰ Investment time is over!
                  </h2>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between gap-5 flex-wrap">
              <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full re">
                <label
                  className="text-sm text-gray-800 font-medium"
                  style={{ color: Theme.textcolor }}
                >
                  Amount($)
                </label>
                <div className="relative mt-2">
                  <input
                    type="number"
                    style={dynamicStylesInput}
                    placeholder="Amount($)"
                    className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
                    value={invest.AmountDoller}
                    name="AmountDoller"
                    onChange={handleinvest}
                  />
                  <div className="absolute  top-4 right-2">
                    {invest.AmountDoller !== "" && (
                      <p className="w-full flex justify-end pr-1 ">
                        <FaCheckCircle className="transform  text-green-500" />
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full">
                <label
                  className="text-sm text-gray-800 font-medium"
                  style={{ color: Theme.textcolor }}
                >
                  Amount(INR)
                </label>
                <div className="relative mt-2">
                  <input
                    type="number"
                    style={dynamicStylesInput}
                    placeholder="Amount(INR)"
                    className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
                    value={invest.AmountINR}
                    name="AmountINR"
                    onChange={handleinvest}
                  />
                  <div className="absolute  top-4 right-2">
                    {invest.AmountINR !== "" && (
                      <p className="w-full flex justify-end pr-1">
                        <FaCheckCircle className="transform  text-green-500" />
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <button
                className={`px-5 lg:w-1/5 w-full text-center flex items-center justify-center gap-3 rounded-lg text-white h-[48px] ease-in duration-[0.4s] hover:scale-[0.9] ${
                  showTimer ? (isLoader ? "" : "bg-[#4d33f8]") : "bg-gray-500"
                }`}
                style={{ background: PageTheme.background }}
                onClick={showTimer && !isLoader ? handelsubmit : undefined}
              >
                {showTimer ? isLoader ? <LoaderTwo /> : "Submit" : "Submit"}
              </button>
            </div>
          </div>
        </div>
        <div className=" py-16">
          <h6
            className="text-sm text-center text-gray-600"
            style={{ color: Theme.textcolor }}
          >
            Copyright © Designed & Developed by Autasis 2025
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Investment;
