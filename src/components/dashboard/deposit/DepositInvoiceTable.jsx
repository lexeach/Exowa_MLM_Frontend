import { Search } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getDynamicStyles, getdynamicStylesInput } from "../GlobalApi/Global";

const DepositInvoiceTable = () => {
  const ApiAllData = useSelector((state) => state.doWin.ApiAllData);
  const invoiceData = ApiAllData.data.deposit_request || [];
  //   console.log("invoiceData----------", invoiceData);
  const invoices = invoiceData.map((item, index) => {
    let userstatus = "Unknown";
    if (item.status === "0") {
      userstatus = "Pending";
    } else if (item.status === "1") {
      userstatus = "Success";
    } else if (item.status === "2") {
      userstatus = "Cancel";
    }
    let amountINR = 0;
    if (!isNaN(item.amount)) {
      amountINR = parseFloat(item.amount).toFixed(2);
    }
    const formattedDate = new Date(item?.date_time).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }
    );
    return {
      id: index + 1,
      date: formattedDate,
      client: item.depositor_name,
      amount: item.amount_dollar || 0,
      amountINR: amountINR,
      status: userstatus,
      transactionid: item.transaction_id,
      transactionreference: item.transaction_reference,
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
        invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.id.toString().includes(searchTerm) ||
        invoice.date.includes(searchTerm)
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
    <div className="overflow-x-auto">
      {/* Search Input */}
      <div className="mb-4 flex items-center justify-end gap-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full lg:w-1/6 rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
          style={dynamicStylesInput}
        >
          <option value="">Filter by Status</option>
          <option value="Success">Success</option>
          <option value="Pending">Pending</option>
          <option value="Cancel">Cancel</option>
        </select>
        <div className="relative lg:w-1/3">
          <input
            type="text"
            placeholder="Search by Name, or Date"
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

      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b" style={dynamicStylesInput}>
            {/* <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
              Sr.No
            </th> */}
            <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
              Sr.no
            </th>
            <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
              Name
            </th>

            <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
              Amount$
            </th>
            <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
              Amount(INR)₹
            </th>
            <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
              TransactionId
            </th>
            <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
              Reference
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
          {currentInvoices?.map((invoice) => (
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
                {invoice.client}
              </td>

              <td
                className="px-4 py-3.5 text-sm text-gray-600"
                style={{ color: Theme.textcolor }}
              >
                ${invoice.amount}
              </td>
              <td
                className="px-4 py-3.5 text-sm text-gray-600"
                style={{ color: Theme.textcolor }}
              >
                ₹{invoice.amountINR}
              </td>
              <td
                className="px-4 py-3.5 text-sm text-gray-600"
                style={{ color: Theme.textcolor }}
              >
                {invoice.transactionid}
              </td>
              <td
                className="px-4 py-3.5 text-sm text-gray-600"
                style={{ color: Theme.textcolor }}
              >
                {invoice.transactionreference}
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

export default DepositInvoiceTable;
