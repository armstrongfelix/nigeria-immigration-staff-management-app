import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useStaffList } from "../hooks/useStaffQueries";
import StatusBadge from "../components/StatusBadge";

const ITEMS_PER_PAGE = 10;

export default function StaffList() {
  const { data: staff, isLoading } = useStaffList();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-nis-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Filter staff
  const filtered = staff.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.rank.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.stateCommand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.serviceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || member.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Staff Directory</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {filtered.length} officer{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <Link
          to="/staff/add"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-nis-green text-white text-sm font-medium rounded-lg hover:bg-nis-green-dark transition-colors"
        >
          + Add Staff
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 mb-4 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2.5 border border-slate-200">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search by name, rank, command, or service number..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent text-sm text-slate-700 outline-none w-full"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-700 outline-none cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Retired Soon">Near Retirement</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                  State Command
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                  Years in Service
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginated.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <div>
                      <Link
                        to={`/staff/${member.id}`}
                        className="font-medium text-slate-800 hover:text-nis-green transition-colors"
                      >
                        {member.name}
                      </Link>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {member.serviceNumber}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600 text-xs">
                    {member.rank}
                  </td>
                  <td className="px-5 py-3.5 text-slate-600 hidden md:table-cell">
                    {member.stateCommand}
                  </td>
                  <td className="px-5 py-3.5 text-slate-600 hidden lg:table-cell">
                    {member.yearsInService} year
                    {member.yearsInService !== 1 ? "s" : ""}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={member.status} />
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <Link
                      to={`/staff/${member.id}`}
                      className="inline-flex items-center gap-1 text-xs text-nis-green font-medium hover:underline"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View
                    </Link>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-slate-400"
                  >
                    No officers found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-slate-200 bg-slate-50">
            <p className="text-xs text-slate-500">
              Showing {startIdx + 1}-
              {Math.min(startIdx + ITEMS_PER_PAGE, filtered.length)} of{" "}
              {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-md hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4 text-slate-600" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-md text-xs font-medium transition-colors ${
                      page === currentPage
                        ? "bg-nis-green text-white"
                        : "text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-md hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
