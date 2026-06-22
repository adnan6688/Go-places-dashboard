import React from 'react';
import { InfoRow } from '../Drivers/InforRow';
import { DocumentFileCard } from '../Drivers/DocumentFileCard';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { riderDetails } from './Rider';
import GlobalLoading from '../../Loading/Loading';
import type { TDocumentFile } from '../../api/auth.api';

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full">
    <div className="px-6 py-5 border-b border-slate-100">
      <h3 className="text-[17px] font-semibold text-slate-800">{title}</h3>
    </div>
    <div className="px-6 py-2">
      {children}
    </div>
  </div>
);


const requiredCategories = ["Enrollment Agreement", "General Document"];

const RiderDetails = () => {


  const { id } = useParams()


  const { data: details, isLoading, refetch } = useQuery({
    queryKey: ['rider-details', id],
    queryFn: () => riderDetails(id as string),
    enabled: !!id
  })


  const birthDate = details?.dateOfBirth
    ? new Date(details.dateOfBirth).toLocaleDateString()
    : "";


  const startService = details?.serviceStartDate ? new Date(details?.serviceStartDate).toLocaleDateString() : ''
  const serviceEndDate = details?.serviceEndDate ? new Date(details?.serviceEndDate).toLocaleDateString() : ''
  const registeredDate = details?.registeredDate ? new Date(details?.registeredDate).toLocaleDateString() : ''



  const existingCategories = details?.documents?.map((doc: TDocumentFile) => doc.category) || [];
  const missingCategories = requiredCategories.filter(
    (cat) => !existingCategories.includes(cat)
  );


  if (isLoading) {
    return <div>
      <GlobalLoading></GlobalLoading>
    </div>
  }
  return (
    <div className=" bg-[#f8fafc] p-2 md:p-3">


      {missingCategories.length > 0 ? (
        <div className="text-red-500 text-sm font-medium">
          Missing Documents: {missingCategories.join(", ")}
        </div>
      ) : (
        <div className="text-green-600 text-sm font-medium">
          All documents are uploaded ✅
        </div>
      )}
      <div className="">

        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-3xl font-black text-[#1e293b]"> {details?.fullName} </h1>
          <p className="text-slate-400 text-[13px] mt-1 font-medium">
            Rider ID: {details?.riderId} • PMI: {details?.pmiNumber}
          </p>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Personal Information */}
          <Card title="Personal Information">
            <InfoRow label="Full Name" value={details?.fullName} />
            <InfoRow label="Date of Birth" value={birthDate} />
            <InfoRow label="PMI Number" value={details?.pmiNumber} />
            <InfoRow label="Phone" value={details?.phone} />
            <InfoRow label="Email" value={details?.user?.email} />
            <InfoRow label="Status" value={details?.user?.status} isStatus />
          </Card>

          {/* Case Management */}
          <Card title="Case Management">
            <InfoRow label="Case Manager" value={details?.caseManager?.name} />
            <InfoRow label="Email" value={details?.caseManager?.email} />
            <InfoRow label="Phone" value={details?.caseManager?.phone} />
          </Card>

          {/* Service Details */}
          <Card title="Service Details">
            <InfoRow label="Service Start" value={startService} />
            <InfoRow label="Service End" value={serviceEndDate} />
            <InfoRow label="Registered" value={registeredDate} />
          </Card>

          {/* Transportation Authorization */}
          <Card title="Transportation Authorization">
            <InfoRow label="One-Way Transport Cost" value={`${details?.transportAuthorization?.oneWayTransport?.totalCost}$`} />
            <InfoRow label="Mileage Reimbursement Rate" value={`${details?.transportAuthorization?.mileageReimbursement?.totalCost}$/mile`} />
          </Card>

        </div>



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

export default RiderDetails;