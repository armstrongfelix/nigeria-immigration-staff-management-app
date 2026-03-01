import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  UserCheck,
  Clock,
  UserMinus,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import useStaffStore from "../store/useStaffStore";
import StatusBadge from "../components/StatusBadge";

function StatCard({ icon: Icon, label, value, color, trend }) {
  const colorStyles = {
    green: "bg-emerald-50 text-emerald-600 border-emerald-200",
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    amber: "bg-amber-50 text-amber-600 border-amber-200",
    red: "bg-red-50 text-red-600 border-red-200",
  };

  const iconBg = {
    green: "bg-emerald-100",
    blue: "bg-blue-100",
    amber: "bg-amber-100",
    red: "bg-red-100",
  };

  return (
    <div className={`bg-white rounded-xl border p-5 ${colorStyles[color]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="text-3xl font-bold mt-1 text-slate-800">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-3 h-3 text-emerald-500" />
              <span className="text-xs text-emerald-600 font-medium">
                {trend}
              </span>
            </div>
          )}
        </div>
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg[color]}`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const staff = useStaffStore((state) => state.staff);
  const [recentStaff, setRecentStaff] = useState([]);

  const totalCount = staff.length;
  const activeCount = staff.filter((s) => s.status === "Active").length;
  const nearRetirement = staff.filter(
    (s) => s.status === "Retired Soon",
  ).length;
  const onLeave = staff.filter((s) => s.status === "On Leave").length;

  useEffect(() => {
    // Simulate fetching recent staff additions
    setRecentStaff(staff.slice(-5).reverse());
  }, [staff]);

  // Rank distribution for the overview
  const rankGroups = staff.reduce((acc, s) => {
    const group =
      s.rank.includes("Comptroller") && !s.rank.includes("Superintendent")
        ? "Senior Officers"
        : s.rank.includes("Superintendent")
          ? "Mid-Level Officers"
          : "Junior Officers";
    acc[group] = (acc[group] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Welcome back, Admin
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Here is an overview of the NIS personnel across all 37 commands.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={Users}
          label="Total Staff"
          value={totalCount}
          color="blue"
          trend="+3 this month"
        />
        <StatCard
          icon={UserCheck}
          label="Active Staff"
          value={activeCount}
          color="green"
        />
        <StatCard
          icon={UserMinus}
          label="On Leave"
          value={onLeave}
          color="amber"
        />
        <StatCard
          icon={Clock}
          label="Near Retirement"
          value={nearRetirement}
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Staff Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-800">
              Recent Staff
            </h3>
            <Link
              to="/staff"
              className="text-xs text-nis-green font-medium hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Command
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentStaff.map((member) => (
                  <tr
                    key={member.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <Link
                        to={`/staff/${member.id}`}
                        className="font-medium text-slate-700 hover:text-nis-green transition-colors"
                      >
                        {member.name}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-slate-500 text-xs">
                      {member.rank}
                    </td>
                    <td className="px-5 py-3 text-slate-500">
                      {member.stateCommand}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={member.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rank Distribution */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">
            Staff Distribution
          </h3>
          <div className="flex flex-col gap-4">
            {Object.entries(rankGroups).map(([group, count]) => {
              const pct = Math.round((count / totalCount) * 100);
              const barColor =
                group === "Senior Officers"
                  ? "bg-nis-green"
                  : group === "Mid-Level Officers"
                    ? "bg-blue-500"
                    : "bg-amber-500";
              return (
                <div key={group}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-slate-600">
                      {group}
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${barColor} transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Quick Actions
            </h4>
            <div className="flex flex-col gap-2">
              <Link
                to="/staff/add"
                className="flex items-center gap-2 px-3 py-2.5 bg-nis-green text-white rounded-lg text-xs font-medium hover:bg-nis-green-dark transition-colors"
              >
                <Users className="w-4 h-4" />
                Add New Staff
              </Link>
              <Link
                to="/staff"
                className="flex items-center gap-2 px-3 py-2.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-200 transition-colors"
              >
                <Users className="w-4 h-4" />
                View All Staff
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
