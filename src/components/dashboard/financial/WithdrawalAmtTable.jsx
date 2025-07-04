import { Search } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  formatUnixTimestamp,
  getDynamicStyles,
  getdynamicStylesInput,
  toastmsg,
} from "../GlobalApi/Global";
import { FaRegCopy } from "react-icons/fa";

const WithdrawalAmtTable = () => {
  const ApiAllData = useSelector((state) => state.doWin.ApiAllData);
  const BankData = ApiAllData?.data?.user_account || [];
  const invoices = BankData.map((item, index) => {
    let userstatus = "Unknown";
    if (item.status === 0) {
      userstatus = "pending";
    } else if (item.status === 1) {
      userstatus = "approved";
    } else if (item.status === 2) {
      userstatus = "block";
    }

    const formattedDate = formatUnixTimestamp(item?.created_at);
    return {
      srno: index + 1,
      BankName: item?.bank_name,
      IFSC: item?.ifsc,
      Accountno: item?.acc_no,
      branch: item?.bank_branch,
      date: formattedDate,
      status: userstatus,
    };
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  // Filter and search invoices
  const totalPages = Math.ceil(invoices.length / itemsPerPage);
  const currentInvoices = invoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleCopy = (e) => {
    navigator.clipboard.writeText(e).then(() => {
      toastmsg("1", "Copied");
    });
  };
  const PageTheme = useSelector((state) => state.doWin.PageTheme);
  const Theme = useSelector((state) => state.doWin.Theme);
  const dynamicStylesInput = useMemo(() => {
    return getdynamicStylesInput(Theme);
  }, [Theme, PageTheme]);
  const dynamicStyles = useMemo(() => {
    return getDynamicStyles(PageTheme || Theme);
  }, [PageTheme, Theme]);
  const [tableborder, settableborder] = useState("");
  useEffect(() => {
    if (Theme.mode === "dark") {
      settableborder("#4b5563");
    } else {
      settableborder("#eef2ff");
    }
  }, [Theme]);

  const headerCellClass =
    "px-4 py-3.5 text-left text-sm font-medium text-gray-700";
  const cellClass = `px-4 py-3.5 text-sm`;
  const textStyle = { color: Theme.textcolor };
  return (
    <>
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b" style={dynamicStylesInput}>
            <th  className={headerCellClass}>
              Sr.no
            </th>
            <th  className={headerCellClass}>
              Bank Name
            </th>
            <th  className={headerCellClass}>
              Account no.
            </th>
            <th  className={headerCellClass}>
              IFSC
            </th>
            <th  className={headerCellClass}>
              Date
            </th>
            <th  className={headerCellClass}>
              Branch
            </th>
            <th  className={headerCellClass}>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {currentInvoices?.map((invoice) => (
            <tr
              key={invoice.id}
              className="border-b border-indigo-50"
              style={{ borderColor: tableborder }}
            >
              <td
              className={cellClass} style={textStyle}
              >
                {invoice.srno}
              </td>
              <td
                className="px-4 py-3.5 text-sm text-gray-600 uppercase min-w-[200px] "
                style={{ color: Theme.textcolor }}
              >
                {invoice.BankName}
              </td>
              <td
              className={cellClass} style={textStyle}
              >
                <span className="flex gap-1 items-center">
                  {invoice.Accountno}
                  <FaRegCopy
                    className="text-[.9rem] text-[#4d33f8] hover:text-[#281c77] cursor-pointer"
                    style={{ color: dynamicStyles.background }}
                    onClick={() => handleCopy(invoice.Accountno)}
                  />
                </span>
              </td>
              <td
              className={cellClass} style={textStyle}
              >
                <span className="flex gap-1 items-center">
                  {invoice.IFSC}
                  <FaRegCopy
                    className="text-[.9rem] text-[#4d33f8] hover:text-[#281c77] cursor-pointer"
                    style={{ color: dynamicStyles.background }}
                    onClick={() => handleCopy(invoice.IFSC)}
                  />
                </span>
              </td>
              <td
                className="px-4 py-3.5 text-sm text-gray-600 capitalize min-w-[140px]"
                style={{ color: Theme.textcolor }}
              >
                {invoice.date}
              </td>
              <td
                className="px-4 py-3.5 text-sm text-gray-600 capitalize min-w-[200px]"
                style={{ color: Theme.textcolor }}
              >
                {invoice.branch}
              </td>
              <td
              className={cellClass} style={textStyle}
              >
                <span
                  className={`inline-block px-2 py-1 text-xs font-semibold rounded-md ${
                    invoice.status === "approved"
                      ? "bg-green-100 text-green-600"
                      : invoice.status === "pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {invoice.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div className="flex justify-end items-center gap-4 mt-4">
        <button
          className="px-4 py-2 bg-[#4d33f8] text-white rounded-md text-sm cursor-pointer"
          style={dynamicStyles}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <button
          className="px-4 py-2 bg-[#4d33f8] text-white rounded-md text-sm cursor-pointer"
          style={dynamicStyles}
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
      </>
  );
};

export default WithdrawalAmtTable;
