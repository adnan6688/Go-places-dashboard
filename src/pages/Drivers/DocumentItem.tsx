import { CheckCircle2, XCircle, Clock } from "lucide-react";

export const DocumentItem = ({label, status,}: {
  label: string;
  status: "verified" | "pending" | "expired";
}) => {



  const getStatusUI = () => {
    switch (status) {
      case "verified":
        return {
          icon: <CheckCircle2 size={20} className="text-[#065F46]" />,
          text: "Verified",
          style: "bg-[#D1FAE5] text-[#075843]",
        };

      case "pending":
        return {
          icon: <Clock size={20} className="text-yellow-600" />,
          text: "Pending",
          style: "bg-yellow-50 text-yellow-700",
        };

      case "expired":
        return {
          icon: <XCircle size={20} className="text-red-600" />,
          text: "Expired",
          style: "bg-red-50 text-red-600",
        };

      default:
        return {
          icon: <XCircle size={20} className="text-gray-400" />,
          text: "Unknown",
          style: "bg-gray-50 text-gray-500",
        };
    }
  };

  const { icon, text, style } = getStatusUI();

  return (
    <div className="flex justify-between py-3 border-b border-slate-50 last:border-0 items-center">
      <span className="text-slate-600 text-sm">{label}</span>

      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${style}`}>
        {icon}
        <span className="text-sm font-semibold tracking-tight">{text}</span>
      </div>
    </div>
  );
};