import { Search } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  TimestampStringFormat,
  getDynamicStyles,
  getdynamicStylesInput,
} from "../GlobalApi/Global";

const WithdrawalReportTable = () => {
  const ApiAllData = useSelector((state) => state.doWin.ApiAllData);
  const referralData = ApiAllData.data.withdrawal_request || [];
  const invoices = referralData.map((item, index) => {
    let userstatus = "Unknown";
    if (item.status === "0") {
      userstatus = "Pending";
    } else if (item.status === "1") {
      userstatus = "Success";
    } else if (item.status === "2") {
      userstatus = "Cancel";
    }
    const formattedDate = TimestampStringFormat(item?.date_time);

    let formateAmount = 0;
    if (!isNaN(item.amount)) {
      formateAmount = parseFloat(item?.amount).toFixed(2);
    }
    let formateamountdollar = 0;
    if (!isNaN(item.amount_dollar)) {
      formateamountdollar = parseFloat(item.amount_dollar).toFixed(2);
    }
    return {
      id: index + 1,
      userid: item.userid,
      TransactionId: item.transaction_id,
      Amount: formateamountdollar,
      AmountINR: formateAmount,
      date: formattedDate,
      status: userstatus,
    };
  });
  // State for search, filter, and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  // Filter and search invoices
  const filteredInvoices = invoices
    .filter(
      (invoice) =>
        invoice.userid.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // invoice.date.includes(searchTerm)
        invoice.date?.toLowerCase().includes(searchTerm)
    )
    .filter((invoice) =>
      statusFilter ? invoice.status === statusFilter : true
    );
  // Pagination logic
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const currentInvoices = filteredInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  //---------------
  const handlePageChange = (page) => {
    setCurrentPage(page);
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
  return (
    <div>
      {/* Search Input */}
      <div className="mb-4 flex items-center justify-end gap-4">
        <div className="relative lg:w-1/3">
          <input
            type="text"
            placeholder="Search by  UserId, or Date"
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
              <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
                Sr.no
              </th>

              <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
                User Id
              </th>
              <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
                Transaction Id
              </th>
              <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
                Amount($)
              </th>
              <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
                Amount(INR)
              </th>

              <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
                Date
              </th>
              <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {currentInvoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-b border-indigo-50"
                style={{ borderColor: tableborder }}
              >
                <td
                  className="px-4 py-3.5 text-sm text-gray-600"
                  style={{ color: Theme.textcolor }}
                >
                  {invoice.id}
                </td>

                <td
                  className="px-4 py-3.5 text-sm text-gray-600"
                  style={{ color: Theme.textcolor }}
                >
                  {invoice.userid}
                </td>

                <td
                  className="px-4 py-3.5 text-sm text-gray-600"
                  style={{ color: Theme.textcolor }}
                >
                  {invoice.TransactionId}
                </td>
                <td
                  className="px-4 py-3.5 text-sm text-gray-600"
                  style={{ color: Theme.textcolor }}
                >
                  {invoice.Amount}
                </td>
                <td
                  className="px-4 py-3.5 text-sm text-gray-600"
                  style={{ color: Theme.textcolor }}
                >
                  {invoice.AmountINR}
                </td>
                <td
                  className="px-4 py-3.5 text-sm text-gray-600"
                  style={{ color: Theme.textcolor }}
                >
                  {invoice.date}
                </td>
                <td
                  className="px-4 py-3.5 text-sm text-gray-600"
                  style={{ color: Theme.textcolor }}
                >
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-md ${
                      invoice.status === "Success"
                        ? "bg-green-100 text-green-600"
                        : invoice.status === "Pending"
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

      {/* Pagination */}
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
    </div>
  );
};

export default WithdrawalReportTable;
