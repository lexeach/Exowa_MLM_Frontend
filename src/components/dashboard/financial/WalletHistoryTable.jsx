import { Search } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { formatUnixTimestamp, getDynamicStyles, getdynamicStylesInput } from "../GlobalApi/Global";

const WalletHistoryTable = () => {
  const ApiAllData = useSelector((state) => state.doWin.ApiAllData);
  const referralData = ApiAllData?.data?.transaction_history || [];
  const invoices = referralData?.map((item, index) => {
    const formattedDate = formatUnixTimestamp(item?.datetime);
// console.log("itemitem",item)
    return {
      id: index + 1,
      date: formattedDate,
      userid: item?.userid,
      credit: " 00.00",
      debit: "00.00",
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
        <div className="relative lg:w-1/3">
          <input
            type="text"
            placeholder="Search by  ID, or Date"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={dynamicStylesInput}
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
            <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
              Sr.no
            </th>
            <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
              Date
            </th>
            <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
              User Id
            </th>
            <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
              Credit
            </th>
            <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
              Debit
            </th>
          </tr>
        </thead>
        <tbody>
          {currentInvoices.map((invoice) => (
            <tr key={invoice.id} className="border-b border-indigo-50"  style={{ borderColor: tableborder }}>
              <td className="px-4 py-3.5 text-sm text-gray-600">
                {invoice.id}
              </td>
              <td className="px-4 py-3.5 text-sm text-gray-600"  style={{ color: Theme.textcolor }}>
                {invoice.date}
              </td>

              <td className="px-4 py-3.5 text-sm text-gray-600"  style={{ color: Theme.textcolor }}>
                {invoice.userid}
              </td>

              <td className="px-4 py-3.5 text-sm text-gray-600"  style={{ color: Theme.textcolor }}>
                {invoice.credit}
              </td>
              <td className="px-4 py-3.5 text-sm text-gray-600"  style={{ color: Theme.textcolor }}>
                {invoice.debit}
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
  );
};

export default WalletHistoryTable;
