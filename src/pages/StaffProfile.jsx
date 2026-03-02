import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  User,
  Hash,
} from "lucide-react";
import { useStaffById } from "../hooks/useStaffQueries";
import StatusBadge from "../components/StatusBadge";

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3">
      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-slate-500" />
      </div>
      <div>
        <p className="text-xs text-slate-400 font-medium">{label}</p>
        <p className="text-sm text-slate-800 font-medium mt-0.5">
          {value || "N/A"}
        </p>
      </div>
    </div>
  );
}

export default function StaffProfile() {
  const { id } = useParams();
  const { data: member, isLoading } = useStaffById(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-nis-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <h2 className="text-xl font-bold text-slate-800 mb-2">
          Officer Not Found
        </h2>
        <p className="text-slate-500 mb-6">
          The staff member you are looking for does not exist.
        </p>
        <Link
          to="/staff"
          className="inline-flex items-center gap-2 text-sm font-medium text-nis-green hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Staff List
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Back button */}
      <Link
        to="/staff"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-nis-green transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Staff Directory
      </Link>

      {/* Profile Header Card */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6">
        <div className="h-24 bg-gradient-to-r from-nis-green to-nis-green-light" />
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-10">
            <div className="w-20 h-20 bg-nis-green border-4 border-white rounded-xl flex items-center justify-center shadow-md">
              <span className="text-2xl font-bold text-white">
                {member.firstName[0]}
                {member.lastName[0]}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h1 className="text-xl font-bold text-slate-800">
                  {member.name}
                </h1>
                <StatusBadge status={member.status} />
              </div>
              <p className="text-sm text-slate-500 mt-0.5">{member.rank}</p>
              <p className="text-xs text-slate-400 mt-1">
                {member.serviceNumber}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-1">
            Personal Information
          </h3>
          <p className="text-xs text-slate-400 mb-3">Basic contact details</p>
          <div className="divide-y divide-slate-100">
            <InfoRow icon={User} label="Gender" value={member.gender} />
            <InfoRow
              icon={Calendar}
              label="Date of Birth"
              value={member.dateOfBirth}
            />
            <InfoRow icon={Mail} label="Email" value={member.email} />
            <InfoRow icon={Phone} label="Phone" value={member.phone} />
            <InfoRow
              icon={MapPin}
              label="State Command"
              value={member.stateCommand}
            />
          </div>
        </div>

        {/* Rank & Career */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-1">
            {"Rank & Career"}
          </h3>
          <p className="text-xs text-slate-400 mb-3">Service history</p>
          <div className="divide-y divide-slate-100">
            <InfoRow icon={Award} label="Current Rank" value={member.rank} />
            <InfoRow
              icon={Hash}
              label="Service Number"
              value={member.serviceNumber}
            />
            <InfoRow
              icon={Calendar}
              label="Date of Enlistment"
              value={member.dateOfEnlistment}
            />
            <InfoRow
              icon={Calendar}
              label="Years in Service"
              value={`${member.yearsInService} year${member.yearsInService !== 1 ? "s" : ""}`}
            />
          </div>

          {/* Status Indicator */}
          <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-100">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Current Status
            </p>
            <StatusBadge status={member.status} />
            {member.status === "Retired Soon" && (
              <p className="text-xs text-red-500 mt-2">
                This officer is approaching retirement eligibility with{" "}
                {member.yearsInService} years of service.
              </p>
            )}
          </div>
        </div>

        {/* Training Records */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-1">
            Training Records
          </h3>
          <p className="text-xs text-slate-400 mb-3">
            {member.training.length} course
            {member.training.length !== 1 ? "s" : ""} recorded
          </p>

          {member.training.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-slate-400">No training records</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
              {member.training.map((t, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-medium text-slate-700 leading-relaxed">
                      {t.course}
                    </p>
                    <span
                      className={`shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                        t.status === "Completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Year: {t.year}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
