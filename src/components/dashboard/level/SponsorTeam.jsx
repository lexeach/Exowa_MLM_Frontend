import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getDynamicStyles, getdynamicStylesInput } from "../GlobalApi/Global";
import { Link } from "react-router-dom";
import { ChevronRight, LucideLayoutDashboard, Search } from "lucide-react";

const SponsorTeam = () => {
  const ApiAllData = useSelector((state) => state.doWin.ApiAllData);
  const levelsRawData = ApiAllData?.data?.userHeightLevels || [];

  const PageTheme = useSelector((state) => state.doWin.PageTheme);
  const Theme = useSelector((state) => state.doWin.Theme);

  const [currentPage, setCurrentPage] = useState(1);
  const [tableborder, setTableBorder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  const invoices = levelsRawData?.map((item, index) => ({
    level: index + 1,
    values: item,
  }));

  // Search (Optional)
  const filteredInvoices = invoices?.filter((invoice) => {
    const values = invoice.values || {};
    const searchMatch = Object.values(values).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
    return searchMatch;
  });

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const paginatedInvoices = filteredInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // Get all level keys dynamically (e.g., ['level_1', 'level_2', ..., 'level_n'])
  const levelKeys =
    levelsRawData?.[0] &&
    Object.keys(levelsRawData[0]).filter((key) => key.startsWith("level_"));

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const dynamicStylesInput = useMemo(
    () => getdynamicStylesInput(Theme),
    [Theme]
  );

  const dynamicStyles = useMemo(
    () => getDynamicStyles(PageTheme || Theme),
    [PageTheme, Theme]
  );

  useEffect(() => {
    setTableBorder(Theme.mode === "dark" ? "#4b5563" : "#eef2ff");
  }, [Theme]);

  const headerCellClass =
    "px-4 py-3.5 text-left text-sm font-medium text-gray-700";
  const cellClass = "px-4 py-3.5 text-sm";
  const textStyle = { color: Theme.textcolor };

  return (
    <div className="max-h-screen py-4 lg:px-10 px-3">
      <nav
        className="flex bg-white rounded-xl p-4 border border-violet-50"
        aria-label="Breadcrumb"
        style={{
          color: Theme.textcolor,
          background: Theme.background,
          borderColor: Theme.bordercolor,
        }}
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li className="inline-flex items-center">
            <Link
              to="/level"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#4d33f8]"
            >
              <LucideLayoutDashboard className="w-4 h-4 mr-2" />
              Level
            </Link>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4" />
              <span className="ml-1 text-sm font-medium text-gray-500">
                My Sponsors Team
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="overflow-x-auto px-2 py-4 md:mt-5">
        <div className="mb-4 flex items-center justify-end gap-4">
          <div className="relative xl:w-1/3 lg:w-1/2 w-full">
            <input
              type="text"
              placeholder="Search By upgrad level"
              value={searchTerm}
              style={dynamicStylesInput}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none w-full"
            />
            <button className="absolute  top-[20px] right-3">
              <Search className="text-gray-600 hover:text-[#4d33f8]" />
            </button>
          </div>
        </div>

        <div className="overflow-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b" style={dynamicStylesInput}>
                <th className={headerCellClass}>Upgrad Level</th>
                {levelKeys?.map((key, i) => (
                  <th key={key} className={headerCellClass}>
                    Level {i + 1}
                  </th>
                ))}
                <th className={headerCellClass}>Total</th>
              </tr>
            </thead>
            <tbody>
              {paginatedInvoices?.map((row, rowIndex) => {
                const values = row.values;
                const total = levelKeys.reduce(
                  (sum, key) => sum + (Number(values[key]) || 0),
                  0
                );
                return (
                  <tr
                    key={rowIndex}
                    className="border-b"
                    style={{ borderColor: tableborder }}
                  >
                    <td className={cellClass} style={textStyle}>
                      {values?.pool_level || row.level}
                    </td>
                    {levelKeys?.map((key) => (
                      <td key={key} className={cellClass} style={textStyle}>
                        {values[key] || 0}
                      </td>
                    ))}
                    {/* Total column */}
                    <td className={cellClass} style={textStyle}>
                      {total}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end items-center gap-4 mt-4">
          <button
            className="px-4 py-2 bg-[#4d33f8] text-white rounded-md text-sm"
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
            className="px-4 py-2 bg-[#4d33f8] text-white rounded-md text-sm"
            disabled={currentPage === totalPages}
            style={dynamicStyles}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SponsorTeam;
