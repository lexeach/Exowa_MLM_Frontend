import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  formatAmount,
  formatsecendDate,
  getDynamicStyles,
  getdynamicStylesInput,
} from "../GlobalApi/Global";
import { Link } from "react-router-dom";
import { ChevronRight, LucideLayoutDashboard } from "lucide-react";

const ActiveLevelTable = () => {
  const ApiAllData = useSelector((state) => state.doWin.ApiAllData);
  const isCondition = useSelector((state) => state.doWin.ActiveLevelData);

  const referralData =
    isCondition === 0
      ? ApiAllData?.data?.userActiveLevels || []
      : ApiAllData?.data?.partenerActiveLevels || [];

  const [currentPage, setCurrentPage] = useState(1);
  const [tableborder, settableborder] = useState("");
  const itemsPerPage = 10;
  const invoices = referralData.map((item, index) => {
    const formatTime = formatsecendDate(item?.upgrade_time);
    const formatAmunt = formatAmount(item?.amount, 2);
    return {
      level: item?.level,
      amount: formatAmunt,
      time: formatTime?.date || 0,
    };
  });

  // Pagination logic
  const totalPages = Math.ceil(invoices?.length / itemsPerPage);
  const activeleves = invoices?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  //---------
  const PageTheme = useSelector((state) => state.doWin.PageTheme);
  const Theme = useSelector((state) => state.doWin.Theme);
  const dynamicStylesInput = useMemo(() => {
    return getdynamicStylesInput(Theme);
  }, [Theme, PageTheme]);
  //--------
  const dynamicStyles = useMemo(() => {
    return getDynamicStyles(PageTheme || Theme);
  }, [PageTheme, Theme]);
  //--------------
  useEffect(() => {
    if (Theme.mode === "dark") {
      settableborder("#4b5563");  
    } else {
      settableborder("#eef2ff");
    }
  }, [Theme]);
  return (
    <>
      <div className="max-h-screen overflow-x-auto py-4 lg:px-10 px-3">
        <div className=" ">
          <nav
            class="flex bg-white rounded-xl p-4 border border-violet-50"
            aria-label="Breadcrumb"
            style={{
              color: Theme.textcolor,
              background: Theme.background,
              borderColor: Theme.bordercolor,
            }}
          >
            <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li class="inline-flex items-center">
                <Link
                  // to="/Level"
                  to={isCondition === 0 ? "/level" : "/partnerLevel"}
                  class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#4d33f8]  "
                >
                  <LucideLayoutDashboard className="w-4 h-4 mr-2" />
                  Level
                </Link>
              </li>
              <li aria-current="page">
                <div class="flex items-center">
                  <ChevronRight className="w-4 h-4" />
                  <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                    {isCondition === 0
                      ? " User Active level"
                      : " Partner Active level"}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div className="lg:py-10 py-5 w-full flex justify-center items-center">
          <p className="uppercase bg-[#4d33f8] px-6 py-2 text-white font-extrabold rounded-md">
            {isCondition === 0 ? " User Level info" : "Partner Level info "}
          </p>
        </div>
        <div className="overflow-x-auto px-2 py-4 md:mt-10 ">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b" style={dynamicStylesInput}>
                <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
                  Level No.
                </th>
                <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
                  Upgrade Power Price
                </th>
                <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700 capitalize">
                  Time
                </th>
                <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {activeleves?.map((data) => (
                <tr
                  key={data.level}
                  className="border-b border-indigo-50"
                  style={{ borderColor: tableborder }}
                >
                  <td
                    className="px-4 py-3.5 text-sm text-gray-600"
                    style={{ color: Theme.textcolor }}
                  >
                    {data?.level}
                  </td>
                  <td
                    className="px-4 py-3.5 text-sm text-gray-600"
                    style={{ color: Theme.textcolor }}
                  >
                    {data?.amount}
                  </td>

                  <td
                    className="px-4 py-3.5 text-sm text-gray-600"
                    style={{ color: Theme.textcolor }}
                  >
                    {data?.time}
                  </td>

                  <td
                    className="px-4 py-3.5 text-sm text-gray-600"
                    style={{ color: Theme.textcolor }}
                  >
                    <span className="px-2 py-[6px] bg-green-400 text-white font-bold rounded-md">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-end items-center gap-4 mt-4">
            <button
              className="px-4 py-2 bg-[#4d33f8] text-white rounded-md text-sm cursor-pointer"
              disabled={currentPage === 1}
              style={dynamicStyles}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            <div>
              Page {currentPage} of {totalPages}
            </div>
            <button
              className="px-4 py-2 bg-[#4d33f8] text-white rounded-md text-sm cursor-pointer"
              disabled={currentPage === totalPages}
              style={dynamicStyles}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActiveLevelTable;
