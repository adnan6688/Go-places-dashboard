import {
  CheckCircle2,
  XCircle,
  FileText,
  Image as ImageIcon,
  Download,
} from "lucide-react";

interface Props {
  title: string;
  category: string;
  type: string;
  date: string;
  fileUrl: string;
  status: string;
}

export const DocumentFileCard = ({
  title,
  category,
  type,
  date,
  fileUrl,
  status,
}: Props) => {
  const isImage = type.startsWith("image/");
  const isPdf = type === "application/pdf";
  const isVerified = status?.toLowerCase() === "verified";

  return (
    <div className="bg-white rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition">

      {/* ================= PREVIEW ================= */}
      <div className="h-36 bg-white overflow-hidden flex items-center justify-center relative">

        {/* IMAGE */}
        {isImage && (
          <img
            src={fileUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}

        {/* PDF (CLEAN IFRAME - NO TOOLBAR) */}
        {isPdf && (
          <iframe
            src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
            title={title}
            className="w-full h-full border-0"
          />
        )}

        {/* FILE fallback */}
        {!isImage && !isPdf && (
          <FileText size={40} className="text-slate-400" />
        )}

        {/* PDF badge */}
        {isPdf && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] px-2 py-1 rounded-full font-bold">
            PDF
          </span>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-3 space-y-2">

        {/* TITLE */}
        <h3 className="text-sm font-semibold text-slate-800 truncate">
          {title}
        </h3>

        {/* CATEGORY */}
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <ImageIcon size={14} />
          {category}
        </div>

        {/* TYPE + DATE */}
        <div className="flex justify-between text-[11px] text-slate-500">
          <span className="uppercase bg-slate-100 px-2 py-1 rounded-md">
            {type.split("/")[1] || type}
          </span>

          <span>
            {new Date(date).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        {/* STATUS */}
        <div
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
            isVerified
              ? "bg-emerald-100 text-emerald-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {isVerified ? (
            <CheckCircle2 size={12} />
          ) : (
            <XCircle size={12} />
          )}
          {isVerified ? "Verified" : "Unverified"}
        </div>

        {/* DOWNLOAD */}
        <a
          href={fileUrl}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition"
        >
          <Download size={14} />
          Download
        </a>

      </div>
    </div>
  );
};