import { CheckCircle2, XCircle } from "lucide-react";

export const DocumentItem = ({ label, status } : {label : string , status : string}) => {
  const isVerified = status === "verified";

  return (
    <div className="flex justify-between py-3 border-b border-slate-50 last:border-0 items-center">
      <span className="text-slate-600 text-sm">{label}</span>

      <div
        className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${
          isVerified
            ? "bg-[#D1FAE5] text-[#075843]"
            : "bg-red-50 text-red-600"
        }`}
      >
        {isVerified ? (
          <CheckCircle2 size={20} className="text-white fill-[#065F46]" />
        ) : (
          <XCircle size={20} className="text-red-600" />
        )}

        <span className="text-sm font-semibold tracking-tight">
          {isVerified ? "Verified" : "Unverified"}
        </span>
      </div>
    </div>
  );
};