import { ArrowLeft, MapPinned, Bike } from "lucide-react";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#1F3A5F]/10 via-white to-[#1F3A5F]/5 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">

        {/* Icon */}
        <div className="relative mx-auto w-32 h-32 mb-6">
          <div className="absolute inset-0 bg-[#1F3A5F]/20 rounded-full animate-ping opacity-40"></div>

          <div className="relative w-full h-full bg-[#1F3A5F] rounded-full flex items-center justify-center shadow-xl">
            <Bike size={60} className="text-white" />
          </div>
        </div>

        {/* 404 */}
        <h1 className="text-7xl font-black text-gray-800 mb-2">
          4<span className="text-[#1F3A5F]">0</span>4
        </h1>

        <h2 className="text-2xl font-bold text-gray-700 mb-3">
          Oops! Rider went off route 
        </h2>

        <p className="text-gray-500 mb-8">
          The page you're looking for doesn’t exist or has been moved.
        </p>

        {/* Status */}
        <div className="flex items-center justify-center gap-2 text-[#1F3A5F] mb-8">
          <MapPinned size={18} />
          <span className="font-medium">
            Recalculating route...
          </span>
        </div>

        {/* Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#1F3A5F] hover:bg-[#16304A] text-white px-6 py-3 rounded-full font-semibold transition-all shadow-lg hover:scale-105"
        >
          <ArrowLeft size={18} />
          Back To Dashboard
        </Link>
      </div>
    </div>
  );
}