export default function StatusBadge({ status }) {
  const styles = {
    Active: "bg-emerald-100 text-emerald-700",
    "On Leave": "bg-amber-100 text-amber-700",
    "Retired Soon": "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
          status === "Active"
            ? "bg-emerald-500"
            : status === "On Leave"
              ? "bg-amber-500"
              : "bg-red-500"
        }`}
      />
      {status}
    </span>
  );
}
