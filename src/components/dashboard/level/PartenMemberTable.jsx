import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {  getdynamicStylesInput } from "../GlobalApi/Global";
import { Link } from "react-router-dom";
import { ChevronRight, LucideLayoutDashboard } from "lucide-react";

const PartenMemberTable = () => {
  const Theme = useSelector((state) => state.doWin.Theme);
  const ApiAllData = useSelector((state) => state.doWin.ApiAllData);
  const referralData = ApiAllData?.data?.referral_partner_tree || [];
  const [tableborder, settableborder] = useState("");
  const invoices = referralData?.map((item) => {
    return {
      level: item?.level,
      TotalPartner: item?.Total_Partner,
      Qualifiedpartner: item?.Qualified_Partner,
      FeesPaidPartner:item?.Fees_Paid_Partner
    };
  });
  //---------
  const dynamicStylesInput = useMemo(
    () => getdynamicStylesInput(Theme),
    [Theme]
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
                <Link
                  to="/partnerLevel"
                  class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#4d33f8]  "
                >
                  <LucideLayoutDashboard className="w-4 h-4 mr-2" />
                  Partner
                </Link>
              </li>
              <li aria-current="page">
                <div class="flex items-center">
                  <ChevronRight className="w-4 h-4" />
                  <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                    My Partner Members
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div className="overflow-x-auto px-2 py-4 md:mt-5 ">
          <div className="overflow-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b" style={dynamicStylesInput}>
                  <th className={headerCellClass}>Level</th>
                  <th className={headerCellClass}> Total Partner</th>
                  <th className={headerCellClass}>Qualified partner</th>
                  <th className={headerCellClass}>Fees Paid Partner</th>
                </tr>
              </thead>
              <tbody>
                {invoices?.map((data) => {
                  return (
                    <>
                      <tr
                        key={data.level}
                        className="border-b border-indigo-50"
                        style={{ borderColor: tableborder }}
                      >
                        <td className={cellClass} style={textStyle}>
                          {data?.level}
                        </td>
                        <td className={cellClass} style={textStyle}>
                          {data?.TotalPartner}
                        </td>

                        <td className={cellClass} style={textStyle}>
                          {data?.Qualifiedpartner}
                        </td>
                        <td className={cellClass} style={textStyle}>
                          {data?.FeesPaidPartner}
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default PartenMemberTable;
