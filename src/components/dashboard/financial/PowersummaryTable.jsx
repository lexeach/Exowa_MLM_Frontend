import { Search } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  formatAmount,
  formatUnixTimestamp,
  getDynamicStyles,
  getdynamicStylesInput,
} from "../GlobalApi/Global";

const PowersummaryTable = () => {
  const ApiAllData = useSelector((state) => state.doWin.ApiAllData);
  const referralData = ApiAllData?.data?.transaction_history || [];
  const PageTheme = useSelector((state) => state.doWin.PageTheme);
  const Theme = useSelector((state) => state.doWin.Theme);
  // State for search, filter, and pagination
  const [tableborder, settableborder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const allowedTypes = [
    "power_transfer_partener",
    "power_receive_partener",
    "power_receive",
    "power_transfer",
    "shift_partner_power",
    "shift_power",
  ];
  const invoices = referralData
    .filter((item) => allowedTypes.includes(item?.transaction_type))
    ?.map((item) => {
      return {
        userId: item?.userid ?? "-",
        senderid: item?.sender_id ?? "-",
        power: isNaN(item?.power) ? "-" : formatAmount(item?.power),
        level: item?.level ?? "-",
        upgradeLevel: item?.upgrade_level ?? "-",
        transactiontype: item?.transaction_type ?? "-",
        transactionId: item?.transaction_id ?? "-",
        oldPower: isNaN(item?.old_power) ? "-" : formatAmount(item.old_power),
        currentPower: isNaN(item?.current_power)
          ? "-"
          : formatAmount(item.current_power),
        date: formatUnixTimestamp(item?.datetime),
      };
    });

  // Filter and search invoices
  // const filteredInvoices = invoices
  //   .filter(
  //     (invoice) =>
  //     invoice?.senderid?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     invoice?.transactionId?.toString().toLowerCase().includes(searchTerm) ||
  //     invoice?.date?.toLowerCase().includes(searchTerm)
  //   )
  //   .filter((invoice) =>
  //     statusFilter ? invoice.status === statusFilter : true
  //   );
  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const matchSearch =
        invoice?.senderid?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice?.transactionId
          ?.toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        invoice?.date?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchTransactionType = roleFilter
        ? invoice?.transactiontype?.toLowerCase() === roleFilter.toLowerCase()
        : true;

      return matchSearch && matchTransactionType;
    });
  }, [invoices, searchTerm, roleFilter]);
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

  const handleChange = (e) => {
    const selected = e.target.value;
    setRoleFilter(selected === "Default" ? "" : selected);
  };
  const dynamicStylesInput = useMemo(
    () => getdynamicStylesInput(Theme),
    [Theme]
  );

  const dynamicStyles = useMemo(
    () => getDynamicStyles(PageTheme || Theme),
    [PageTheme, Theme]
  );

  // change table border according to theme
  useEffect(() => {
    settableborder(Theme.mode === "dark" ? "#4b5563" : "#eef2ff");
  }, [Theme]);

  const headerCellClass =
    "px-4 py-3.5 text-left text-sm font-medium text-gray-700";
  const cellClass = `px-4 py-3.5 text-sm`;
  const textStyle = { color: Theme.textcolor };

  return (
    <div className="overflow-x-auto">
      {/* Search Input */}
      <div className="mb-4 flex flex-wrap items-center justify-end gap-4">
        {/* <select
          defaultValue="Default"
          onChange={handleChange}
          className="border p-2 rounded outline-none"
          style={dynamicStylesInput}
        >
          <option value="Default">All Types</option>
          {currentInvoices?.map((invoice) => {
            return (
              <>
                <option value={invoice?.transactiontype || "-"}>
                  {invoice?.transactiontype || "-"}
                </option>
              </>
            );
          })}
        </select> */}
        <div className="relative lg:w-1/3">
          <input
            type="text"
            placeholder="Search by  SenderId, or Date"
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
              <th className={headerCellClass}>Sr.no</th>
              <th className={`${headerCellClass} min-w-[100px]`}>
                Receiver Id
              </th>
              <th className={`${headerCellClass} min-w-[100px]`}>Sender Id</th>
              <th className={headerCellClass}>Power(₹)</th>
              <th className={headerCellClass}>Level</th>
              <th className={`${headerCellClass} min-w-[150px]`}>
                Upgrade Level
              </th>
              <th className={`${headerCellClass} min-w-[150px]`}>
                Transaction Type
              </th>
              <th className={`${headerCellClass} min-w-[160px]`}>
              Transaction Id
              </th>
              <th className={`${headerCellClass} min-w-[150px]`}>
                Old Power(₹)
              </th>
              <th className={`${headerCellClass} min-w-[150px]`}>
                Current Power(₹)
              </th>
              <th className={`${headerCellClass} min-w-[150px]`}>Date</th>
            </tr>
          </thead>
          <tbody>
            {currentInvoices?.map((invoice, index) => (
              <tr
                key={index}
                className="border-b border-indigo-50"
                style={{ borderColor: tableborder }}
              >
                <td className={cellClass} style={textStyle}>
                  {index + 1}
                </td>
                <td className={cellClass} style={textStyle}>
                  {invoice?.userId || "-"}
                </td>
                <td className={cellClass} style={textStyle}>
                  {invoice?.senderid || "-"}
                </td>
                <td className={cellClass} style={textStyle}>
                  {invoice?.power || "-"}
                </td>
                <td className={cellClass} style={textStyle}>
                  {invoice?.level || "-"}
                </td>
                <td className={cellClass} style={textStyle}>
                  {invoice?.upgradeLevel || "-"}
                </td>
                <td className={cellClass} style={textStyle}>
                  {invoice?.transactiontype || "-"}
                </td>
                <td className={cellClass} style={textStyle}>
                  {invoice?.transactionId || "-"}
                </td>
                <td className={cellClass} style={textStyle}>
                  {invoice?.oldPower || "-"}
                </td>
                <td className={cellClass} style={textStyle}>
                  {invoice?.currentPower || "-"}
                </td>
                <td className={cellClass} style={textStyle}>
                  {invoice?.date || "-"}
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

export default PowersummaryTable;
