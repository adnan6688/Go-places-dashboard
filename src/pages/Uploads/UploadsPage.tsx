import { useState } from "react";
import DashboardHeading from "../../components/DashboardHeading";
import { useDashboardTitle } from "../../Config/sendLocation";
import { Car, UserPlus } from "lucide-react";
import DocumentUploadForm from "./DocumentUploadForm";

export default function UploadsPage() {
  const { title, subtitle } = useDashboardTitle();
  const [activeTab, setActiveTab] = useState<'rider' | 'driver'>('rider');




  return (
    <div className="sm:p-3">

      <DashboardHeading title={title} subtitle={subtitle}></DashboardHeading>




      <div className="my-2">
        {/* Main Tab Container */}
        <div className="bg-[#f1f3f6] p-1.5 rounded-2xl inline-flex items-center gap-1 border border-slate-200/50 shadow-inner">

          {/* Rider Enrollment Tab */}
          <button
            onClick={() => setActiveTab('rider')}
            className={`flex cursor-pointer items-center gap-2.5 px-4 py-2 sm:px-8 sm:py-3.5 rounded-xl transition-all duration-200 ${activeTab === 'rider'
              ? 'bg-white text-slate-900 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)]'
              : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            <Car size={20} strokeWidth={activeTab === 'driver' ? 2 : 1.5} />
            <span className={`text-sm font-semibold `}>
              Driver Uploads
            </span>
          </button>

          {/* Driver Registration Tab */}
          <button
            onClick={() => setActiveTab('driver')}
            className={`flex cursor-pointer items-center gap-2.5 px-4  py-2 sm:px-8 sm:py-3.5 rounded-xl transition-all duration-200 ${activeTab === 'driver'
              ? 'bg-white text-slate-900 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)]'
              : 'text-slate-500 hover:text-slate-700'
              }`}
          >

            <UserPlus size={20} strokeWidth={activeTab === 'rider' ? 2 : 1.5} />
            <span className={`text-sm font-semibold `}>
              Rider Uploads
            </span>
          </button>
        </div>

        {/* Content Section - This switches based on activeTab */}
        <div className="mt-8 transition-opacity duration-300">
          {activeTab === 'rider' ? (
            <div className="animate-in fade-in slide-in-from-bottom-2">


              <DocumentUploadForm type={'Driver'}></DocumentUploadForm>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-2">

              <DocumentUploadForm type={'Rider'}></DocumentUploadForm>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
