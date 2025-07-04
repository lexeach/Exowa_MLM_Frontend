import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { getDynamicStyles } from "../GlobalApi/Global";
import { Link } from "react-router-dom";
import { ChevronRight, LucideLayoutDashboard } from "lucide-react";

const Turbo = () => {
  const authData = useSelector((state) => state.doWin.ApiAllData);
  const Theme = useSelector((state) => state.doWin.Theme);
  const isTurbo = authData?.data?.is_turbo || 0;
  const dynamicStyles = useMemo(() => {
    return getDynamicStyles(Theme);
  }, [Theme]);
  return (
    <>
      <div>
        <div className="px-4 py-4">
          <nav
            class="flex bg-white rounded-xl p-4 border border-violet-50"
            aria-label="Breadcrumb"
            style={dynamicStyles}
          >
            <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li class="inline-flex items-center">
                <Link
                  to="/"
                  class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#4d33f8]"
                >
                  <LucideLayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
              </li>

              <li aria-current="page">
                <div class="flex items-center">
                  <ChevronRight className="w-4 h-4" />
                  <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                    Turbo
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div className="w-full flex justify-center items-center lg:mt-[10rem] md:mt-[8rem] mt-[8rem]">
          <>
            {isTurbo ? (
              <>
                <div className="flex flex-col items-center justify-center ">
                  <img
                    src={require("../../../assets/images/goodicon.png")}
                    alt=""
                    className="md:w-[50%] w-[40%]"
                  />
                  <h1 className="font-extrabold mt-2">
                    🚀 Your Turbo feature is active.
                  </h1>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center ">
                <img
                  src={require("../../../assets/images/badicon.png")}
                  alt=""
                  className="md:w-[60%] w-[50%]"
                />
                <h1 className="font-extrabold">
                  🚀 Your Turbo feature is not active.
                </h1>
              </div>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default Turbo;
