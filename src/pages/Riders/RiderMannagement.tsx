



import React, { useEffect, useState } from 'react';
import { Search, Filter, Eye, ChevronDown, Phone, Hash } from 'lucide-react';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { allRiders, type TRider } from './Rider';
import Pagination from '../../components/Pagination';
import SmallLoading from '../../Loading/SmallLoading';
import { useDebounce } from '../../utils/debounce';



const getRiderTypeColor = (type: 'standard' | 'assist' | 'wheelchair') => {
    switch (type) {
        case 'standard':
            return 'bg-blue-100 text-blue-700';

        case 'assist':
            return 'bg-emerald-100 text-emerald-700';

        case 'wheelchair':
            return 'bg-purple-100 text-purple-700';

        default:
            return 'bg-gray-100 text-gray-700';
    }
};
const getStatusStyle = (status: string) => {
    switch (status) {
        case 'active': return 'bg-emerald-100 text-emerald-600';
        case 'pending': return 'bg-amber-100 text-amber-600';
        case 'inactive': return 'bg-slate-200 text-slate-500';
        default: return 'bg-gray-100 text-gray-600';
    }
};

const RiderManagement: React.FC = () => {



    const [status, setStatus] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1)
    const [finalSearch, setFinalSarch] = useState<string>('')

    const [openStatus, setOpenStatus] = useState(false);
    const [openType, setOpenType] = useState(false);
    const [riderType, setRiderType] = useState("");




    const debounce = useDebounce(searchTerm, 500)

    useEffect(() => {
        setFinalSarch(debounce)
    }, [debounce])




    const { data: ridersData, isLoading: riderDataLoading } = useQuery({
        queryKey: ['rData', finalSearch, status , riderType],
        queryFn: () => allRiders(20, finalSearch, status , riderType)
    })




    console.log(riderType)



    const onPrev = () => {

        setPage(page - 1)
    }
    const onNext = () => {
        setPage(page + 1)
    }



    return (
        /* 1. Main wrapper-e overflow-x-hidden dilam jate screen-er baire kichu na jay */
        <div className=" bg-gray-50    w-full overflow-x-hidden">
            <div className="space-y-6">


                <div className="flex flex-col md:flex-row gap-2 sm:gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mx-2">

                    {/* SEARCH */}
                    <div className="relative w-full md:w-1/2">
                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                            <Search size={18} />
                        </span>

                        <input
                            type="text"
                            placeholder="Search by name..."
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base transition-all"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* FILTERS WRAPPER */}
                    <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">

                        {/* STATUS FILTER */}
                        <div className="relative w-full md:w-48">
                            <button
                                onClick={() => setOpenStatus(!openStatus)}
                                className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-all text-sm"
                            >
                                <div className="flex items-center gap-2">
                                    <Filter size={18} className="text-gray-400" />
                                    <span className="font-medium">{status== '' ? 'All Status' : status }</span>
                                </div>
                                <ChevronDown size={16} className={`transition-transform ${openStatus ? 'rotate-180' : ''}`} />
                            </button>

                            {openStatus && (
                                <div className="absolute mt-2 w-full bg-white border rounded-xl shadow-xl z-30">
                                    <ul className="py-1 text-sm">
                                        {["All Status", "Active", "Inactive"].map((item) => (
                                            <li
                                                key={item}
                                                onClick={() => {
                                                    setStatus(item == 'All Status' ? '' : item.toLowerCase());
                                                    setOpenStatus(false);
                                                }}
                                                className="px-4 py-3 hover:bg-blue-50 cursor-pointer"
                                            >
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* RIDER TYPE FILTER */}
                        <div className="relative w-full md:w-52">
                            <button
                                onClick={() => setOpenType(!openType)}
                                className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-all text-sm"
                            >
                                <span className="font-medium capitalize">{riderType || "All Types"}</span>
                                <ChevronDown size={16} className={`transition-transform ${openType ? 'rotate-180' : ''}`} />
                            </button>

                            {openType && (
                                <div className="absolute mt-2 w-full bg-white border rounded-xl shadow-xl z-30">
                                    <ul className="py-1 text-sm text-gray-700">

                                        {["all", "standard", "assist", "wheelchair"].map((type) => (
                                            <li
                                                key={type}
                                                onClick={() => {
                                                    setRiderType(type);
                                                    setOpenType(false);
                                                }}
                                                className="px-4 py-3 hover:bg-blue-50 cursor-pointer capitalize"
                                            >
                                                {type}
                                            </li>
                                        ))}

                                    </ul>
                                </div>
                            )}
                        </div>

                    </div>
                </div>


                <div className="w-full  ">
                    {/* Container with subtle glass effect */}
                    <div className="bg-white/70 backdrop-blur-md rounded-2xl border shadow  border-gray-100  overflow-hidden">

                        {/* Desktop View: Standard Table (visible on md+) */}
                        <div className="hidden md:block overflow-x-auto   ">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-100/50 text-gray-500 text-xs uppercase tracking-widest font-bold">
                                        <th className="px-6 py-5">User Info</th>
                                        <th className="px-6 py-5">PMI</th>
                                        <th className="px-6 py-5">Country</th>
                                        <th className="px-6 py-5">Rider Id</th>
                                        <th className="px-6 py-5">Phone</th>
                                        <th className="px-6 py-5">Rider Type</th>
                                        <th className="px-6 py-5">Status</th>
                                        <th className="px-6 py-5 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {riderDataLoading ? <tr>

                                        <td colSpan={10} className="py-10">
                                            <SmallLoading message="Loading riders..." />
                                        </td>
                                    </tr> : !ridersData?.data?.riders?.length ? <tr>
                                        <td colSpan={10} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
                                                <span className="text-sm">No riders found</span>
                                            </div>
                                        </td>
                                    </tr> : ridersData?.data?.riders?.map((rider: TRider) => (
                                        <tr key={rider._id} className="hover:bg-blue-50/40 transition-all duration-300 group">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-800">{rider?.fullName}</div>
                                                <div className="text-[10px] text-gray-400 italic">
                                                    {new Date(rider?.createdAt).toLocaleDateString()}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded text-gray-600">
                                                    {rider?.pmiNumber ? rider.pmiNumber : 'Not provide'} 
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-sm">
                                                {rider?.county}
                                            </td>

                                            <td className="px-6 py-4 text-sm">
                                                {rider?.riderId}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                {rider?.phone}
                                            </td>

                                            <td className="px-6 py-4 text-sm">
                                                <span className={`px-3 py-1 rounded-full font-medium ${getRiderTypeColor(rider?.riderType)}`}>
                                                    {rider?.riderType}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-[10px] tracking-tighter uppercase ${getStatusStyle(
                                                        rider?.user?.status
                                                    )}`}
                                                >
                                                    {rider?.user?.status}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-center">
                                                <Link to={`/dashboard/riders/details/${rider?._id}`}>
                                                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white shadow-sm hover:shadow-md rounded-xl transition-all">
                                                        <Eye size={20} />
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile View: Card Layout (visible below md) */}
                        <div className="md:hidden grid grid-cols-1 gap-4 p-2 sm:p-4 bg-gray-50/50">
                            {riderDataLoading ? <div className=' col-span-full'>
                                <SmallLoading message='riders loading....'></SmallLoading>
                            </div> : !ridersData?.data?.riders?.length ? <div>
                                <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
                                    <span className="text-sm">No riders found</span>
                                </div>

                            </div> : ridersData?.data?.riders?.map((rider: TRider) => (
                                <div key={rider._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3 relative overflow-hidden">
                                    {/* Status Badge - Top Right */}
                                    <div className="absolute top-4 right-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusStyle(rider?.user.status)}`}>
                                            {rider?.user.status}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                            {rider?.fullName.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800">{rider.fullName}</h3>
                                            <p className="text-[10px] text-gray-400">{rider.createdAt}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-y-3 mt-2 text-sm border-t border-gray-50 pt-3">
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <Hash size={14} className="text-blue-400" />
                                            <span className="font-mono">{rider.pmiNumber}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <Phone size={14} className="text-green-400" />
                                            <span>{rider.phone}</span>
                                        </div>
                                    </div>

                                    <Link to={`/dashboard/riders/details/${rider?._id}`}>

                                        <button className="w-full mt-2 py-3 bg-blue-50 text-blue-600 rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform">
                                            <Eye size={18} /> View Profile
                                        </button>

                                    </Link>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                <div>
                    <Pagination currentPage={1} totalPages={ridersData?.data?.pagination?.totalPages} onNext={onNext} onPrev={onPrev}></Pagination>

                </div>
            </div>
        </div>
    );
};

export default RiderManagement;