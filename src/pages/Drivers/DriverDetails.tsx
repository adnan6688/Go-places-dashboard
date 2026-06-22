

import {
  Award,
  Shield,
  Truck,
  User
} from 'lucide-react';
import React from 'react';
import { DocumentFileCard } from './DocumentFileCard';
import { DocumentItem } from './DocumentItem';

import { InfoRow } from './InforRow';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { driverDetailsApi, type TDocumentFile } from '../../api/auth.api';
import GlobalLoading from '../../Loading/Loading';




// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Card = ({ title, children, icon: Icon }: { title: string, children: React.ReactNode, icon?: any }) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full">
    <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
      {Icon && <Icon size={18} className="text-slate-400" />}
      <h3 className="text-lg font-bold text-slate-800">{title}</h3>
    </div>
    <div className="p-6">{children}</div>
  </div>
);





const requiredCategories = ["MnDOT Training", "General Training", "Driving Record", "General Document"];

const DriverDetails: React.FC = () => {


  const { id } = useParams()

  const { data: details, isLoading  , refetch} = useQuery({
    queryKey: ['details'],
    queryFn: () => driverDetailsApi(id as string)
  })

  const existingCategories = details?.documents?.map((doc: TDocumentFile) => doc.category) || [];

  const missingCategories = requiredCategories.filter(
    (cat) => !existingCategories.includes(cat)
  );

  console.log("details", details)


  if (isLoading) {
    return <GlobalLoading></GlobalLoading>
  }

  return (
    <div className=" bg-slate-50   sm:p-3 text-slate-900">
      <div className="">
        {missingCategories.length > 0 ? (
          <div className="text-red-500 text-sm font-medium">
            Missing Documents: {missingCategories.join(", ")}
          </div>
        ) : (
          <div className="text-green-600 text-sm font-medium">
            All documents are uploaded ✅
          </div>
        )}
        {/* Header Section */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">{details?.fullName}</h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-slate-400 font-bold uppercase text-[11px] tracking-[0.2em]">
                Driver ID: <span className="text-slate-800">{details?.driverId}</span>
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-300"></span>
              <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest">

                {/* DOT */}
                <span
                  className={`h-2 w-2 rounded-full ${details?.availability?.isOnline
                      ? "bg-emerald-400 animate-pulse shadow-md shadow-emerald-400/40"
                      : "bg-slate-400"
                    }`}
                />

                {/* TEXT */}
                <span
                  className={`font-semibold ${details?.availability?.isOnline
                      ? "text-emerald-500"
                      : "text-slate-400"
                    }`}
                >
                  {details?.availability?.isOnline ? "Online" : "Offline"}
                </span>

              </span>
            </div>
          </div>

        </header>

        {/* 4-Card Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

          <Card title="Personal Information" icon={User}>
            <InfoRow label="Full Name" value={details?.fullName} />
            <InfoRow
              label="Date of Birth"
              value={
                details?.dateOfBirth
                  ? new Date(details.dateOfBirth).toLocaleDateString("en-GB")
                  : "-"
              }
            />
            <InfoRow label="Phone" value={details?.phone} />
            <InfoRow label="Email" value={details?.email} />
            <InfoRow label="Address" value={details?.address} />
            <InfoRow label="Status" value={details?.user?.status} isStatus />
          </Card>

          <Card title="Licensing & Certification" icon={Award}>
            <InfoRow label="License Number" value={details?.licensing?.licenseNumber} />
            <InfoRow label="Issuing State" value={details?.licensing?.issuingState} />
            <InfoRow label="DOT Medical Expiration" value={
              details?.licensing?.dotMedicalCardExpiration
                ? new Date(details?.licensing?.dotMedicalCardExpiration).toLocaleDateString("en-GB")
                : "-"
            } />
            <InfoRow label="Insurance Expiration" value={
              details?.licensing?.autoInsuranceExpiration ? new Date(details?.licensing?.autoInsuranceExpiration).toLocaleDateString('en-GB') : "-"
            } />
          </Card>

          <Card title="Document Checklist" icon={Shield}>
            {details?.documents?.map((doc: TDocumentFile) => (
              <DocumentItem
                key={doc._id}
                label={doc.category}
                status={doc?.status}
              />
            ))}
          </Card>

          <Card title="Vehicle Information" icon={Truck}>
            <InfoRow label="Make" value={details?.vehicle?.category} />
            <InfoRow label="Model" value={details?.vehicle?.model} />
            <InfoRow label="Year" value={details?.vehicle?.year} />
            <InfoRow label="License Plate" value={details?.vehicle?.licensePlate} />
            <InfoRow label="Color" value={details?.vehicle?.color} />
            <InfoRow label="Total Seats" value={details?.vehicle?.totalSeatCount} />
          </Card>
        </div>


        {/* --- NEW SECTION: Document Gallery --- */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Attached Documents</h2>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {details?.documents?.map((doc: TDocumentFile) => (
              <DocumentFileCard
                key={doc?._id}
                id={doc?._id}
                title={doc?.title}
                category={doc?.category}
                type={doc?.mimeType}
                date={doc?.uploadedAt}
                fileUrl={doc?.url}
                status={doc?.status}
                driverId={id as string}
                refetch={refetch}
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default DriverDetails;