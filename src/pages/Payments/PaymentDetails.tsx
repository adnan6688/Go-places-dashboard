import { useQuery } from '@tanstack/react-query';
import { Calendar, CheckCircle2, Clock, History, Navigation } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { paymentDetailsApi } from './paymentApi';
import Pagination from '../../components/Pagination';

interface DriverInfo {
    name: string;
    email: string;
    avatar: string;
    joinedDate: string;
}



const PaymentDetails = () => {


    const { id } = useParams()


    const driverInfo: DriverInfo = {
        name: "Rahim Uddin",
        email: "rahim.dev@example.com",
        avatar: "RU",
        joinedDate: "2024-01-12"
    };


    const [currentPage, setCurrentPage] = useState<number>(1)
    const [selectedTripIds, setSelectedTripIds] = useState<string[]>([]);
    const [filterStatus, setFilterStatus] = useState<'all' | 'paid' | 'unpaid'>('all');


    const { data } = useQuery({
        queryKey: ['payment_datails', id, currentPage,filterStatus],
        queryFn: () => paymentDetailsApi(id, currentPage ,filterStatus)
    })

console.log(data)



    const driverInformation = data?.request || {}
    const tripsData = data?.trips || []
    const meta = data?.meta || {}



    const onPrev = () => {
        setCurrentPage(currentPage - 1)
    }

    const onNext = () => {
        setCurrentPage(currentPage + 1)
    }



    return (
        <div className="w-full bg-gray-50 text-slate-900  sm:p-3">
            <div className=" space-y-6">

                {/* Top Cards Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Driver Profile Card (Admin View) */}
                    <div className="bg-white border border-gray-100 p-8 rounded-[2.5rem] flex flex-col items-center text-center shadow-xl shadow-gray-200/40 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-b from-slate-50 to-transparent"></div>

                        <div className="relative z-10 mb-5">
                            <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-800 text-3xl  shadow-inner group-hover:scale-105 transition-transform duration-300 border-2 border-white">
                                {driverInformation?.driver?.fullName.charAt(0)}{driverInformation?.fullName?.charAt(1)}


                            </div>

                            <div className={`absolute -bottom-1 -right-1 w-7 h-7 ${driverInformation?.driver?.user?.status == 'active' ? 'bg-green-500' : 'bg-red-400'}  border-4 border-white rounded-full shadow-sm`}></div>

                        </div>

                        <div className="relative z-10">
                            <div className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px]  uppercase tracking-widest rounded-full mb-3 inline-block border border-blue-100">
                                Active Driver
                            </div>
                            <h2 className="text-2xl  text-gray-900 tracking-tight">{driverInformation?.driver?.fullName}</h2>
                            <h2 className="text-xl  text-gray-900 tracking-tight">{driverInformation?.driverId}</h2>
                            <p className="text-gray-500 text-sm font-medium mt-1">{driverInformation?.driver?.user?.email}</p>

                            <div className="mt-6 pt-6 border-t border-gray-50 w-full">
                                <div className="flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
                                    <span>Member Since</span>
                                    <span className="text-gray-600">{driverInfo.joinedDate}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Admin Payment Processing Card */}
                    <div className="lg:col-span-2 bg-white border border-gray-100 rounded-[2.5rem] p-2 shadow-xl shadow-gray-200/40 flex flex-col sm:flex-row gap-2">

                        {/* Request Details Context */}
                        <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center space-y-6">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <History className="w-4 h-4 text-emerald-500" />
                                    <span className="text-[11px]  uppercase tracking-widest">Driver's Lifetime Earnings</span>
                                </div>
                                <div className="text-3xl  text-gray-800">
                                    <span className="text-lg text-gray-400 font-medium mr-1">$</span>
                                    {driverInformation?.amount}
                                </div>
                            </div>

                            {/* Admin Message Box */}
                            <div className="p-5 bg-amber-50/50 rounded-3xl border border-amber-100/50 space-y-2">
                                <div className="flex items-center gap-2 text-amber-700  text-[10px] uppercase">
                                    <Clock className="w-3 h-3" /> Payout Request Pending
                                </div>
                                <p className="  text-amber-800/80 font-bold leading-relaxed">
                                    Admin Note: You are about to authorize a payout for <span className="text-amber-900 ">{selectedTripIds.length} trips</span>. Please verify the trip details before releasing the amount.
                                </p>
                            </div>
                        </div>

                        {/* Admin Release Funds Action */}
                        <div className="flex-[1.2] bg-blue-600 rounded-[2.2rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-200">
                            {/* Decorative Circles */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>

                            <div className="relative z-10 h-full flex flex-col justify-between space-y-8">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-blue-100">
                                        <CheckCircle2 className="w-5 h-5" />
                                        <span className="text-[11px]  uppercase tracking-widest">Total Amount to Release</span>
                                    </div>
                                    <div className="text-5xl  tracking-tight drop-shadow-sm">
                                        <span className="text-2xl text-blue-200 font-medium mr-1">$</span>
                                        {driverInformation?.amount}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        disabled={driverInformation?.amount === 0}
                                        onClick={() => alert(`Admin Action: Funds Released $${driverInformation?.amount}`)}
                                        className={`group w-full py-5 rounded-2xl  text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 ${driverInformation?.amount > 0
                                            ? 'bg-white text-blue-600 hover:bg-slate-900 hover:text-white shadow-xl active:scale-95'
                                            : 'bg-blue-500/50 text-blue-200 cursor-not-allowed border border-blue-400/30'
                                            }`}
                                    >
                                        {driverInformation?.amount > 0 ? (
                                            <>
                                                <span>Approve & Release Funds</span>
                                                <Navigation className="w-4 h-4 rotate-90" />
                                            </>
                                        ) : (
                                            'Review Required'
                                        )}
                                    </button>

                                    {driverInformation?.amount > 0 && (
                                        <p className="text-[9px] text-center text-blue-100 font-bold uppercase tracking-widest opacity-80">
                                            Instant transfer via Stripe Connect
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* List Section */}
                <div className="bg-white border border-gray-200 rounded-4xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <h3 className=" text-gray-800 text-lg">Trips</h3>
                            <div className="flex bg-gray-100 p-1 rounded-xl overflow-x-auto">
                                {(['all', 'paid', 'unpaid'] as const).map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setFilterStatus(status)}
                                        className={`px-4 py-2 rounded-lg text-[13px]  uppercase  whitespace-nowrap transition-all ${filterStatus === status ? "bg-white text-blue-600 shadow-sm" : "text-gray-400"}`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Card List (Visible on Small Screens) */}
                    <div className="md:hidden divide-y divide-gray-50">
                        {tripsData?.map((trip) => (
                            <div
                                key={trip._id}

                                className={`p-5 space-y-4 transition-all ${trip.paymentStatus?.toLowerCase() === 'paid' ? 'bg-gray-50/50' : ''} ${selectedTripIds.includes(trip.id) ? 'bg-blue-50/60' : ''}`}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        
                                        <div>
                                            <p className=" text-sm text-gray-800">{trip.rider?.fullName}</p>

                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className=" text-lg text-gray-900">${trip?.billing.driverPayout}</p>
                                        {trip?.paymentStatus?.toLowerCase() === 'paid' ? (
                                            <span className="text-[10px]  text-green-600 bg-green-50 px-2 py-0.5 rounded uppercase">Paid</span>
                                        ) : (
                                            <span className="text-[10px]  text-amber-600 bg-amber-50 px-2 py-0.5 rounded uppercase">Unpaid</span>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 space-y-2">
                                    <div className="flex items-center gap-2 text-[11px] font-bold text-gray-600">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                        <span className="">From: {trip.pickupLocation?.address}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[12px] font-bold text-gray-600">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                                        <span className="">To: {trip.dropoffLocation?.address}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center text-[13px] text-gray-400 font-bold">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" /> {
                                            `${new Date(trip.completedAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })} - ${new Date(trip.completedAt).toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true
                                            })}`
                                        }
                                    </div>
                                    <span>{trip.distanceMiles} miles</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop Table View (Hidden on Small Screens) */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-gray-400 text-[13px]  uppercase tracking-widest border-b border-gray-50 bg-gray-50/50">
                        
                                    <th className="p-6">Rider</th>
                                    <th className="p-6">Route</th>
                                    <th className="p-6">Date</th>
                                    <th className="p-6 text-center">Trips</th>
                                    <th className="p-6">Miles</th>
                                    <th className="p-6">Status</th>
                                    <th className="p-6">Transfer Status</th>
                                    <th className="p-6 text-right">Driver Payout</th>
                                    <th className="p-6 text-right">Total Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {tripsData?.map((trip) => (
                                    <tr
                                        key={trip._id}

                                        className={`hover:bg-blue-50/20 cursor-pointer transition-colors ${selectedTripIds.includes(trip.id) ? 'bg-blue-50/50' : ''}`}
                                    >
                                     
                                        <td className="p-6">
                                            <p className=" text-gray-800 text-[14px]">{trip?.rider?.fullName}</p>
                                            <p className="text-[10px]  text-gray-400 uppercase">{trip.id}</p>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
                                                <span>{trip?.pickupLocation?.address}</span>
                                                <Navigation className="w-3 h-3 text-blue-400 rotate-90" />
                                                <span>{trip?.dropoffLocation?.address}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className="text-sm font-bold text-gray-700">
                                                {new Date(trip?.completedAt).toLocaleDateString()}
                                            </span>
                                        </td>

                                        <td className="p-4 text-center text-gray-800 font-medium">
                                            {trip?.billing?.oneWayUnitsUsed}
                                        </td>

                                        <td className="p-4">
                                            <span className="px-3 py-1 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full">
                                                {trip?.distanceMiles.toFixed(2)}
                                            </span>
                                        </td>

                                        <td className="p-6">
                                            {trip?.paymentStatus.toLowerCase() === 'paid' ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-600 rounded text-[12px]  uppercase ">
                                                    <CheckCircle2 className="w-3 h-3" /> Paid
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-600 rounded text-[12px]  uppercase ">
                                                    <Clock className="w-3 h-3" /> Unpaid
                                                </span>
                                            )}
                                        </td>

                                   
                                    
<td className="p-6 text-gray-900">
  {trip?.transactionStatusLabel}
</td>
                                        <td className="p-6 text-center  text-gray-900">${trip?.billing?.driverPayout}</td>
                                        <td className="p-6 text-right  text-gray-900">${trip?.billing?.grossAmount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <Pagination currentPage={currentPage} totalPages={meta?.totalPages} onNext={onNext} onPrev={onPrev}></Pagination>
            </div>
        </div>
    );
};

export default PaymentDetails;