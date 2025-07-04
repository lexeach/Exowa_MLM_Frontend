import { Activity, ChevronRight } from "lucide-react";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaHandsHoldingCircle } from "react-icons/fa6";
import { getDynamicStyles } from "../dashboard/GlobalApi/Global";
const CustompageHeader = ({ hometab, innertab, decText, decTitle }) => {
  const Theme = useSelector((state) => state.doWin.Theme);
  const dynamicStyles = useMemo(() => {
    return getDynamicStyles(Theme);
  }, [Theme]);
  return (
    <>
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
                <Activity className="w-4 h-4 mr-2" />
                {hometab}
              </Link>
            </li>

            <li aria-current="page">
              <div class="flex items-center">
                <ChevronRight className="w-4 h-4" />
                <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                  {innertab}
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
                <FaHandsHoldingCircle className="text-[#fff] w-10 h-10 " />
              </div>
            </div>
            <div className="pb-5">
              <h6 className="text-white text-xl mb-2"> {decTitle}</h6>
              <h6 className="text-white">{decText}</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustompageHeader;
