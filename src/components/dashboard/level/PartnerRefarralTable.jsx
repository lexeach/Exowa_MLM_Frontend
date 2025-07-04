import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authenticateApi,
  formatAmount,
  formatUnixTimestamp,
  getDynamicStyles,
  getdynamicStylesInput,
  toastmsg,
} from "../GlobalApi/Global";
import { ChevronRight, LucideLayoutDashboard, Search } from "lucide-react";
import axios from "axios";
import { IoMdDoneAll } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";
import { LuLoader } from "react-icons/lu";

const PartnerRefarralTable = () => {
  const PageTheme = useSelector((state) => state.doWin.PageTheme);
  const Theme = useSelector((state) => state.doWin.Theme);
  const ApiAllData = useSelector((state) => state.doWin.ApiAllData);
  const [searchPartners, setsearchPartners] = useState([]);
  const [searchPartnersId, setsearchPartnersId] = useState("");
  const referralData = searchPartnersId
    ? searchPartners
    : ApiAllData?.data?.partner_user || [];
  const logindata = useSelector((state) => state.doWin.userLoginData);
  const BaseURI = process.env.REACT_APP_API_BASE_URI;
  const dispatch = useDispatch();
  const usertoken = logindata?.token;
  const [currentPage, setCurrentPage] = useState(1);
  const [tableborder, settableborder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const itemsPerPage = 10;
  const invoices = referralData.map((item) => {
    const formatTime = formatUnixTimestamp(item?.registration_date || 0);
    const income = formatAmount(item?.income, 2);
    const actions = item?.is_qualified;
    return {
      name: item?.user_name,
      userId: item?.userid,
      income: income,
      Coreferred: item?.coreferred_users,
      Referred: item?.referred_users,
      time: formatTime || 0,
      action: actions,
      is_partner: item?.is_partner,
      is_qualified: item?.is_qualified,
      is_top_approved: item?.is_top_approved,
      mobile: item?.mobile_no,
    };
  });

  const filteredInvoices = invoices.filter((invoice) => {
    const searchMatch =
      invoice.userId?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      invoice.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      // invoice.time?.includes(searchTerm);
      invoice.time?.toLowerCase().includes(searchTerm);

    const statusMatch = statusFilter ? invoice.status === statusFilter : true;

    return searchMatch && statusMatch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredInvoices?.length / itemsPerPage);
  const activeleves = filteredInvoices?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  //---------

  const FindeUserWithId = async (PartnerId) => {
    try {
      const config = {
        headers: {
          "x-access-token": usertoken,
        },
      };
      const response = await axios.post(
        `${BaseURI}/user/find_partner_user  `,
        { find_userid: PartnerId },
        config
      );
      if (response.status === 200) {
        setsearchPartners(response?.data?.data);
      }
    } catch (error) {
      console.error("Error during API call:", error);
      toastmsg(
        "0",
        error?.response?.message ||
          error?.response?.data?.message ||
          error?.response?.data?.error,
        2000
      );
    }
  };

  const handleIdSearch = (userid) => {
    setsearchPartnersId(userid);
    FindeUserWithId(userid);
  };

  const allowuser = async (userid, action) => {
    try {
      const config = {
        headers: {
          "x-access-token": usertoken,
        },
      };
      const response = await axios.post(
        `${BaseURI}/user/approved_user  `,
        { approval_userid: userid, status: action },
        config
      );
      if (response.status === 200) {
        authenticateApi(usertoken, dispatch);
        toastmsg("1", response?.data?.message || "Unknow");
      }
    } catch (error) {
      console.error("Error during API call:", error);
      toastmsg(
        "0",
        error?.response?.message ||
          error?.response?.data?.message ||
          error?.response?.data?.error
      );
    }
  };

  const handleAllow = (target, e) => {
    const userid = e?.userId ?? 0;
    if (target === 1) {
      allowuser(userid, target);
    } else if (target === 2) {
      allowuser(userid, target);
    }
  };

  const dynamicStylesInput = useMemo(
    () => getdynamicStylesInput(Theme),
    [Theme]
  );

  const dynamicStyles = useMemo(
    () => getDynamicStyles(PageTheme || Theme),
    [PageTheme, Theme]
  );
  //--------------
  // change table border according to theme
  useEffect(() => {
    settableborder(Theme.mode === "dark" ? "#4b5563" : "#eef2ff");
  }, [Theme]);

  const headerCellClass =
    "px-4 py-3.5 text-left text-sm font-medium text-gray-700";
  const cellClass = `px-4 py-3.5 text-sm`;
  const textStyle = { color: Theme.textcolor };
  return (
    <>
      <div className="max-h-screen py-4 lg:px-10 px-3">
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
                <div
                  onClick={() => setsearchPartnersId("")}
                  class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#4d33f8]  cursor-pointer"
                >
                  <LucideLayoutDashboard className="w-4 h-4 mr-2" />
                  Partner
                </div>
              </li>
              <li aria-current="page">
                <div class="flex items-center">
                  <ChevronRight className="w-4 h-4" />
                  <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                    {/* Referral Partners */}
                    {searchPartnersId ? searchPartnersId : " My Partners"}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div className="overflow-x-auto px-2 py-4 md:mt-5 ">
          <div className="mb-4 flex items-center justify-end gap-4">
            <div className="relative xl:w-1/3 lg:w-1/2 w-full">
              <input
                type="text"
                placeholder="Search by UserId,income or Date"
                value={searchTerm}
                style={dynamicStylesInput}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black w-full"
              />
              <button className="absolute top-[5px] right-2 bottom-0">
                <Search className="text-gray-600 hover:text-[#4d33f8]" />
              </button>
            </div>
          </div>
          <div className="overflow-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b" style={dynamicStylesInput}>
                  <th className={headerCellClass}>Sr No.</th>
                  <th className={headerCellClass}>Name</th>
                  <th className={headerCellClass}>ID</th>
                  <th className={headerCellClass}>Mobile No.</th>

                  <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700 capitalize">
                    Income
                  </th>

                  <th className={headerCellClass}>Partner</th>
                  <th className={headerCellClass}>Sponsor</th>
                  <th className={headerCellClass}>Date</th>
                  <th className={headerCellClass}>Partner</th>
                  <th className={headerCellClass}>Partner fees</th>
                </tr>
              </thead>
              <tbody>
                {activeleves?.map((data, index) => {
                  let status = null;

                  if (data?.is_partner === 1) {
                    status = "approved";
                  } else if (
                    data?.is_partner === 0 &&
                    data?.is_qualified === 2
                  ) {
                    status = "rejected";
                  } else if (
                    data?.is_partner === 0 &&
                    data?.is_qualified === 0 &&
                    data?.is_top_approved === 1
                  ) {
                    status = "canAllow";
                  } else if (
                    (data?.is_partner === 0 &&
                      data?.is_qualified === 1 &&
                      data?.is_top_approved === 1) ||
                    data?.is_top_approved === 2
                  ) {
                    status = "pending";
                  } else if (
                    data?.is_partner === 0 &&
                    data?.is_qualified === 0 &&
                    data?.is_top_approved === 0
                  ) {
                    status = "notAllowed";
                  }

                  return (
                    <>
                      <tr
                        key={data.level}
                        className="border-b border-indigo-50"
                        style={{ borderColor: tableborder }}
                      >
                        <td className={cellClass} style={textStyle}>
                          {index + 1}
                        </td>
                        <td className={cellClass} style={textStyle}>
                          {data?.name}
                        </td>
                        <td
                          className={`${cellClass} hover:text-blue-700 cursor-pointer`}
                          style={textStyle}
                          onClick={() => handleIdSearch(data?.userId)}
                        >
                          {data?.userId}
                        </td>
                        <td className={cellClass} style={textStyle}>
                          {data?.mobile}
                        </td>
                        <td className={cellClass} style={textStyle}>
                          {data?.income}
                        </td>

                        <td className={cellClass} style={textStyle}>
                          {data?.Coreferred}
                        </td>
                        <td className={cellClass} style={textStyle}>
                          {data?.Referred}
                        </td>
                        <td className={cellClass} style={textStyle}>
                          {data?.time}
                        </td>
                        <td
                          className="px-4 py-3.5 text-sm text-gray-600 min-w-[120px] max-w-[180px] flex gap-2"
                          style={{ color: Theme.textcolor }}
                        >
                          {status === "canAllow" && (
                            <>
                              <button
                                className="px-1 py-[4px] bg-green-500 text-white font-bold rounded-md cursor-pointer"
                                onClick={() => handleAllow(1, data)}
                              >
                                <IoMdDoneAll className="text-white text-[1.5rem]" />
                              </button>
                              <button
                                className="px-1 py-[3px] bg-red-500 text-white font-bold rounded-md cursor-pointer"
                                onClick={() => handleAllow(2, data)}
                              >
                                <AiOutlineClose className="text-white text-[1.5rem]" />
                              </button>
                            </>
                          )}
                          {status === "approved" && (
                            <IoMdDoneAll className="text-green-500 text-[1.5rem]" />
                          )}
                          {status === "rejected" && (
                            <AiOutlineClose className="text-red-500 text-[1.5rem]" />
                          )}
                          {status === "notAllowed" && (
                            <MdErrorOutline className="text-red-500 text-[1.5rem]" />
                          )}
                          {status === "pending" && (
                            <LuLoader className="text-red-500 text-[1.5rem]" />
                          )}
                        </td>
                        <td className={cellClass} style={textStyle}>
                          {status === "approved" && (
                            <IoMdDoneAll className="text-green-500 text-[1.5rem]" />
                          )}
                          {status === "rejected" && (
                            <AiOutlineClose className="text-red-500 text-[1.5rem]" />
                          )}
                          {status === "notAllowed" && (
                            <MdErrorOutline className="text-red-500 text-[1.5rem]" />
                          )}
                          {status === "pending" && (
                            <LuLoader className="text-red-500 text-[1.5rem]" />
                          )}
                          {status === "canAllow" && (
                            <MdErrorOutline className="text-red-500 text-[1.5rem]" />
                          )}
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
            {searchPartners.length === 0 && searchPartnersId !== "" && (
              <p className="text-[1.5rem]  text-center my-5">Not data found</p>
            )}
          </div>

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

export default PartnerRefarralTable;
