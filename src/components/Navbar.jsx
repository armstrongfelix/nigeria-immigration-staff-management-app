import { useLocation } from "react-router-dom";
import { Bell, Search } from "lucide-react";

const pageTitle = {
  "/": "Dashboard",
  "/staff": "Staff Directory",
  "/staff/add": "Add New Staff",
};

export default function Navbar() {
  const location = useLocation();

  // Match dynamic profile route
  const isProfile =
    location.pathname.startsWith("/staff/") &&
    location.pathname !== "/staff/add";
  const title = isProfile
    ? "Staff Profile"
    : pageTitle[location.pathname] || "Dashboard";

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Spacer for mobile menu button */}
        <div className="w-8 lg:hidden" />
        <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
      </div>

      <div className="flex items-center gap-3">
        {/* Search (desktop only) */}
        <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-slate-600 outline-none w-40"
          />
        </div>

        {/* Notification bell */}
        <button
          className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-slate-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 bg-nis-green rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">AD</span>
          </div>
          <span className="hidden sm:block text-sm font-medium text-slate-700">
            Admin
          </span>
        </div>
      </div>
    </header>
  );
}
