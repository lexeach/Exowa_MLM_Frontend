import { ChevronRight, Verified } from "lucide-react";
import { RiExchangeFundsLine } from "react-icons/ri";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import DepositFund from "./DepositFund";
import CompanyBank from "./CompanyBank";
import { getDynamicStyles } from "../GlobalApi/Global";
import { useSelector } from "react-redux";

const DepositINRPackage = () => {
  const Theme = useSelector((state) => state.doWin.Theme);
  const dynamicStyles = useMemo(() => {
    return getDynamicStyles(Theme);
  }, [Theme]);
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
                  class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#4d33f8]  "
                >
                  <Verified className="w-4 h-4 mr-2" />
                  Deposit
                </Link>
              </li>
              {/* <li>
                <div class="flex items-center">
                  <ChevronRight className='w-4 h-4' />
                  <Link to="/" class="ms-1 text-sm font-medium text-gray-700 hover:text-[#4d33f8] md:ms-2  ">Set Transaction Password</Link>
                </div>
              </li> */}
              <li aria-current="page">
                <div class="flex items-center">
                  <ChevronRight className="w-4 h-4" />
                  <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                    Deposit INR (Package)
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div className="mt-5">
          <div
            className="bg-gradient-to-r from-[#090124] via-[#6b56f1] to-[#4d33f8] rounded-2xl px-2 py-4 shadow-md shadow-indigo-50"
            style={{
              boxShadow: `0px 4px 10px ${Theme.shadowcolor}`,
            }}
          >
            <div className="lg:flex items-center gap-4">
              <div className="">
                <div className=" bg-[#f9fafb]/5 w-20 h-20 flex items-center justify-center rounded-3xl">
                  <RiExchangeFundsLine className="text-[#fff] w-10 h-10 " />
                </div>
              </div>
              <div className="pb-5">
                <h6 className="text-white text-xl mb-2">Deposit Fund</h6>
                <h6 className="text-white">
                  Here, you can request for fund by paying amount in bank and it
                  will automatically credit into your pacakge wallet after
                  payment confimation.
                </h6>
              </div>
            </div>
          </div>
          {/* ------------- */}
          <div
            className="rounded-2xl px-2 mt-5 py-4 shadow-md bg-white shadow-indigo-50"
            style={dynamicStyles}
          >
            <CompanyBank />
          </div>
          {/* -------------- */}
          <div
            className="bg-white rounded-2xl lg:p-10 p-3 shadow-md shadow-indigo-50 mt-10 mb-12"
            style={dynamicStyles}
          >
            <DepositFund />
          </div>
        </div>
        <div className=" py-16">
          <h6 className="text-sm text-center text-gray-600">
            Copyright © Designed & Developed by Autasis 2025
          </h6>
        </div>
      </div>
    </div>
  );
};

export default DepositINRPackage;
