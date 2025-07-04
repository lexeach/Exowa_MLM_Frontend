import {
  ChevronRight,
  Eye,
  EyeOffIcon,
  LucideLayoutDashboard,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CreateTicket from "./CreateTicket";
import { useSelector } from "react-redux";
import { getDynamicStyles, getdynamicStylesInput } from "../GlobalApi/Global";

const Support = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const Theme = useSelector((state) => state.doWin.Theme);
  const PageTheme = useSelector((state) => state.doWin.PageTheme);
  const dynamicStyles = useMemo(() => {
    return getDynamicStyles(Theme);
  }, [Theme, PageTheme]);

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
                  to="/support"
                  class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#4d33f8] "
                >
                  <LucideLayoutDashboard className="w-4 h-4 mr-2" />
                  Support
                </Link>
              </li>
              {/* <li>
                <div class="flex items-center">
                  <ChevronRight className='w-4 h-4' />
                  <Link to="/" class="ms-1 text-sm font-medium text-gray-700 hover:text-[#4d33f8] md:ms-2 ">Set Transaction Password</Link>
                </div>
              </li> */}
              <li aria-current="page">
                <div class="flex items-center">
                  <ChevronRight className="w-4 h-4" />
                  <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                    Create Ticket
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
              <h3 className="text-xl text-gray-900">Fill Details</h3>
            </div>
            <div className="flex items-center justify-between gap-5 flex-wrap">
              <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full">
                <label
                  className="text-sm text-gray-800 font-medium"
                  style={{ color: Theme.textcolor }}
                >
                  Category
                </label>
                <select
                  className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
                  style={dynamicStylesInput}
                >
                  <option selected="selected" value="0">
                    SELECT CATEGORY--
                  </option>
                  <option value="MONTHLY CLOSING">MONTHLY CLOSING</option>
                  <option value="MT5 ACCOUNT">MT5 ACCOUNT</option>
                  <option value="WITHDRAWAL">WITHDRAWAL</option>
                  <option value="COMPOUNDING">COMPOUNDING</option>
                  <option value="PROFILE">PROFILE</option>
                  <option value="TLC">TLC</option>
                  <option value="DEPOSIT">DEPOSIT</option>
                  <option value="OTHERS">OTHERS</option>
                </select>
              </div>
              <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full">
                <label
                  className="text-sm text-gray-800 font-medium"
                  style={{ color: Theme.textcolor }}
                >
                  Priority
                </label>
                <select
                  className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
                  style={dynamicStylesInput}
                >
                  <option value="Normal/Minor impact">
                    Normal/Minor impact
                  </option>
                  <option value="Urgent">Urgent</option>
                  <option value="High">High</option>
                  <option value="Low/Informational">Low/Informational</option>
                </select>
              </div>

              <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full">
                <label
                  className="text-sm text-gray-800 font-medium"
                  style={{ color: Theme.textcolor }}
                >
                  Transaction Password{" "}
                </label>
                <div className="relative mt-2">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="New Password"
                    style={dynamicStylesInput}
                    className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-0 bottom-0 focus:outline-none"
                    onClick={togglePasswordVisibility}
                  >
                    {isPasswordVisible ? <Eye /> : <EyeOffIcon />}
                  </button>
                </div>
              </div>

              <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full">
                <label
                  className="text-sm text-gray-800 font-medium"
                  style={{ color: Theme.textcolor }}
                >
                  One Time Password
                </label>
                <div className="relative mt-2">
                  <input
                    type="email"
                    style={dynamicStylesInput}
                    placeholder="Enter One Time Password"
                    className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
                  />
                  <button
                    className="absolute right-0 top-0 bottom-0 rounded-lg bg-[#4d33f8] px-3 m-1 text-white text-sm"
                    style={{ background: PageTheme.background }}
                  >
                    Send OTP
                  </button>
                </div>
              </div>
              <div className="lg:w-[100%] md:w-[100%] sm:w-full w-full">
                <label
                  className="text-sm text-gray-800 font-medium"
                  style={{ color: Theme.textcolor }}
                >
                  Message
                </label>
                <textarea
                  type="email"
                  placeholder="Type Message"
                  rows={4}
                  role="3"
                  style={dynamicStylesInput}
                  className="w-full rounded-lg border  border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
                />
              </div>
            </div>
            <div className="mt-8">
              <button
                className="px-5 lg:w-1/5 w-full text-center flex items-center justify-center gap-3 bg-[#4d33f8] rounded-lg text-white h-[48px] ease-in duration-[0.4s] hover:scale-[0.9]"
                style={{ background: PageTheme.background }}
              >
                Submit
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

export default Support;
