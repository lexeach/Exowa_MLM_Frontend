import { Activity, ChevronRight, LucideLayoutDashboard } from "lucide-react";
import React, { useMemo, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  ConvertPrice,
  authenticateApi,
  getDynamicStyles,
  getdynamicStylesInput,
  toastmsg,
} from "../GlobalApi/Global";
import WithdrawalAmtTable from "./WithdrawalAmtTable";
import LoaderTwo from "../../loader/LoaderTwo";
import axios from "axios";

const WithdrawalAmount = () => {
  const BaseURI = process.env.REACT_APP_API_BASE_URI;
  const ApiAllData = useSelector((state) => state.doWin.ApiAllData);
  const userBankdetails = ApiAllData?.data?.user_account;
  const pan_no=userBankdetails[0]?.pan_no ?? ""
  console.log("userBankdetails", userBankdetails[0]?.pan_no ?? "");
  const [isLoader, setisLoader] = useState(false);
  const userToken = useSelector((state) => state.doWin.userLoginData);
  const setusertoken = userToken?.token;
  const dispatch = useDispatch();
  const [withdrawal, setwithdrawal] = useState({
    accountnumber: "",
    AmountDoller: "",
    AmountINR: "",
  });
  //   Empty Form data after Api Calling-----
  const emptyStates = () => {
    setwithdrawal({
      accountnumber: "",
      AmountDoller: "",
      AmountINR: "",
    });
  };
  // Set Profile-Update-Data------------
  const handlewithdrawal = (e) => {
    const { name, value } = e.target;
    ConvertPrice(name, value, withdrawal, setwithdrawal);
    setwithdrawal((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const APIcall = async () => {
    setisLoader(true);
    const apiData = {
      amount: withdrawal?.AmountINR,
      amount_dollar: withdrawal?.AmountDoller,
      accountno: withdrawal?.accountnumber,
      pancard:pan_no,
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
        `${BaseURI}/user/withdrawal_request`,
        apiData,
        config
      );
      //   console.log("API response---------", response.data);
      if (response.status === 200) {
        setisLoader(false);
        emptyStates();
        authenticateApi(setusertoken, dispatch);
        toastmsg("1", response.data.message);
      }
    } catch (error) {
      setisLoader(false);
      console.error("Error during API call:", error);
      toastmsg("0", error.response.data.error);
    }
  };

  const validateFields = (withdrawal) => {
    if (
      withdrawal.accountnumber === "" ||
      withdrawal.AmountDoller === "" ||
      withdrawal.AmountINR === ""
    ) {
      toastmsg("0", "Please fill all required fields!");
      return false;
    }

    if (withdrawal.AmountDoller < 0 || withdrawal.AmountINR < 0) {
      toastmsg("0", "Negative values are not allowed!");
      return false;
    }

    return true;
  };

  const handelsubmit = () => {
    const isValid = validateFields(withdrawal);
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
  return (
    <div className="overflow-hidden">
      <div className="max-h-screen overflow-x-auto py-5 lg:px-10 px-3">
        <div className="">
          <nav
            class="flex bg-white rounded-xl p-4 border border-violet-50"
            aria-label="Breadcrumb"
            style={dynamicStyles}
          >
            <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li class="inline-flex items-center">
                <Link
                  to="/"
                  class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#4d33f8] "
                >
                  <Activity className="w-4 h-4 mr-2" />
                  Financial
                </Link>
              </li>

              <li aria-current="page">
                <div class="flex items-center">
                  <ChevronRight className="w-4 h-4" />
                  <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                    Withdrawal Amount (INR)
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div className="mt-5">
          <div
            className="bg-white rounded-2xl lg:p-10 p-2 shadow-md shadow-indigo-50 mt-10 mb-12"
            style={dynamicStyles}
          >
            <div className="mb-5">
              <h3
                className="text-xl text-gray-900"
                style={{ color: Theme.textcolor }}
              >
                Fill Details
              </h3>
            </div>
            <div className="flex items-center justify-between gap-5 flex-wrap">
              <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full relative">
                <label
                  className="text-sm text-gray-800 font-medium"
                  style={{ color: Theme.textcolor }}
                >
                  Your Banks
                </label>
                <select
                  className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
                  name="accountnumber"
                  style={dynamicStylesInput}
                  value={withdrawal.accountnumber}
                  onChange={handlewithdrawal}
                >
                  <option value="" disabled selected>
                    Select your bank
                  </option>
                  {userBankdetails.map((item) => (
                    <option value={item.acc_no} className="flex gap-2">
                      <span>{item.bank_name}</span> <span>{item.acc_no}</span>
                    </option>
                  ))}
                </select>
                <div className="absolute top-12 right-2">
                  {withdrawal.accountnumber !== "" && (
                    <p className="w-full flex justify-end pr-2 ">
                      <FaCheckCircle className="transform  text-green-500" />
                    </p>
                  )}
                </div>
              </div>
              <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full"></div>
              {/* <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full re">
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
                    value={withdrawal.AmountDoller}
                    name="AmountDoller"
                    onChange={handlewithdrawal}
                  />
                  <div className="absolute  top-4 right-2">
                    {withdrawal.AmountDoller !== "" && (
                      <p className="w-full flex justify-end pr-1 ">
                        <FaCheckCircle className="transform  text-green-500" />
                      </p>
                    )}
                  </div>
                </div>
              </div> */}
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
                    value={withdrawal.AmountINR}
                    name="AmountINR"
                    onChange={handlewithdrawal}
                  />
                  <div className="absolute  top-4 right-2">
                    {withdrawal.AmountINR !== "" && (
                      <p className="w-full flex justify-end pr-1">
                        <FaCheckCircle className="transform  text-green-500" />
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              {isLoader ? (
                <button
                  className="px-5 lg:w-1/5 w-full text-center flex items-center justify-center gap-3 bg-[#4d33f8] rounded-lg text-white h-[48px] ease-in duration-[0.4s] hover:scale-[0.9]"
                  style={{ background: PageTheme.background }}
                >
                  <LoaderTwo />
                </button>
              ) : (
                <button
                  button
                  className="px-5 lg:w-1/5 w-full text-center flex items-center justify-center gap-3 bg-[#4d33f8] rounded-lg text-white h-[48px] ease-in duration-[0.4s] hover:scale-[0.9]"
                  onClick={handelsubmit}
                  style={{ background: PageTheme.background }}
                >
                  Submit
                </button>
              )}
            </div>
          </div>

          <div
            className="bg-white rounded-2xl lg:p-10 p-2 shadow-md shadow-indigo-50 mt-10 mb-12"
            style={dynamicStyles}
          >
            <div className="mb-5">
              <h3
                className="text-xl text-gray-900"
                style={{ color: Theme.textcolor }}
              >
                Your Bank List
              </h3>
            </div>
            <WithdrawalAmtTable />
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

export default WithdrawalAmount;
