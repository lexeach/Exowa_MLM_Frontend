import { Search } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getDynamicStyles, getdynamicStylesInput } from "../GlobalApi/Global";


const RewardTable = () => {
  const ApiAllData = useSelector((state) => state.doWin.ApiAllData);
  const userReward = parseFloat(ApiAllData.data.reward).toFixed(0);
  const referralData = ApiAllData.data.ranks || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tableborder, settableborder] = useState("");
  const itemsPerPage = 10;
  const invoices = referralData.map((item, index) => {
    let rewards = 0;
    if (!isNaN(item.reward)) {
      rewards = parseFloat(item.reward).toFixed(2);
    }
    // console.log("item", item);
    return {
      id: item?.id,
      name: item?.name,
      reward: item?.reward,
      bot: item?.bot,
      // userReward: item?.reward,
    };
  });
  // Filter and search invoices
  const filteredInvoices = invoices
    .filter(
      (invoice) =>
        invoice?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        invoice?.id?.toString()?.includes(searchTerm)
      // invoice?.bot?.includes(searchTerm)
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
    <div className="overflow-x-auto">
      <div className="mb-4 flex items-center justify-end gap-4">
        <div className="relative lg:w-1/3">
          <input
            type="text"
            placeholder="Search by Name or Id"
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
            <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
              ID
            </th>
            <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
              Rank
            </th>
            <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700 capitalize">
              Direct Joining and Team busniess
            </th>
            <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
              Reward
            </th>
            {/* <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
              <SiFirewalla />
            </th> */}
          </tr>
        </thead>
        <tbody>
          {currentInvoices.map((invoice, index) => (
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
                {invoice.name}
              </td>

              <td
                className="px-4 py-3.5 text-sm text-gray-600"
                style={{ color: Theme.textcolor }}
              >
                {invoice.bot}
              </td>

              <td
                className="px-4 py-3.5 text-sm text-gray-600"
                style={{ color: Theme.textcolor }}
              >
                {invoice.reward}
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

export default RewardTable;
