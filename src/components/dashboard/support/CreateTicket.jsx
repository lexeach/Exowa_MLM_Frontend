import { Search } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getDynamicStyles, getdynamicStylesInput } from "../GlobalApi/Global";

const CreateTicket = () => {
  const invoices = [
    // {
    //     id: 1,
    //     date: "2025-01-10",
    //     client: "John Doe",
    //     amount: 1000,
    //     status: "Paid",
    // },
    // {
    //     id: 2,
    //     date: "2025-01-15",
    //     client: "Jane Smith",
    //     amount: 500,
    //     status: "Pending",
    // },
    // {
    //     id: 3,
    //     date: "2025-01-17",
    //     client: "Alice Brown",
    //     amount: 1200,
    //     status: "Paid",
    // },
    // {
    //     id: 4,
    //     date: "2025-01-18",
    //     client: "Bob Johnson",
    //     amount: 800,
    //     status: "Cancelled",
    // },
    // {
    //     id: 5,
    //     date: "2025-01-20",
    //     client: "Charlie King",
    //     amount: 1500,
    //     status: "Pending",
    // },
    // {
    //     id: 6,
    //     date: "2025-01-22",
    //     client: "Emma White",
    //     amount: 1100,
    //     status: "Paid",
    // },
    // {
    //     id: 7,
    //     date: "2025-01-23",
    //     client: "David Gray",
    //     amount: 950,
    //     status: "Cancelled",
    // },
    // Add more data as needed
  ];

  // State for search, filter, and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

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
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b" style={dynamicStylesInput}>
            <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
              ID
            </th>
            <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
              Subject
            </th>
            <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
              Message
            </th>
            <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
              Priority
            </th>
            <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
              Status
            </th>
            <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
              Last Update
            </th>
            <th className="px-4 py-3.5 text-end text-sm font-medium text-gray-700">
              Chat
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
                {invoice.date}
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
                <span
                  className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                    invoice.status === "Paid"
                      ? "bg-green-100 text-green-600"
                      : invoice.status === "Pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {invoice.status}
                </span>
              </td>
              <td
                className="px-4 py-3.5 text-sm text-gray-600"
                style={{ color: Theme.textcolor }}
              >
                {invoice.client}
              </td>
              <td
                className="px-4 py-3.5 text-sm text-end text-gray-600"
                style={{ color: Theme.textcolor }}
              >
                ${invoice.amount}
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

export default CreateTicket;
