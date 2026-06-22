import React, { useEffect, useState } from 'react';
import { Search, Eye } from 'lucide-react';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { allDrivers, type TDriver } from '../../api/auth.api';
import Pagination from '../../components/Pagination';
import SmallLoading from '../../Loading/SmallLoading';
import { useDebounce } from '../../utils/debounce';


const getStatusStyle = (status: string) => {
    switch (status) {
        case 'ACTIVE': return 'bg-emerald-100 text-emerald-700';

        case 'INACTIVE': return 'bg-slate-100 text-slate-500';
        default: return 'bg-gray-100 text-gray-600';
    }
};



const DriverTable: React.FC = () => {

    const [page, setPage] = useState<number>(1)
    const [searchTerm, setSearchTerm] = useState("");
    const [finalSarch, setFinalSearch] = useState<string>(searchTerm)
    const [driverStatus, setDriverStatus] = useState<string>('')
    const [docsStatus, setDocsStatus] = useState("");

    const debounce = useDebounce(searchTerm, 1000)


    useEffect(() => {
        setFinalSearch(debounce);
    }, [debounce]);

    const { data: driverData, isLoading } = useQuery({
        queryKey: ['drivers', page, finalSarch, driverStatus, docsStatus],
        queryFn: () => allDrivers(page, finalSarch, driverStatus, docsStatus)
    })



    const onPrev = () => {
        setPage(page - 1)
    }

    const onNext = () => {
        setPage(page + 1)
    }

    console.log(driverData?.drivers?.length)

    return (<div className="bg-gray-50 w-full  ">

        {/* Toolbar (Keep as is) */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
            <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"

                    placeholder="Search by name..."
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-100 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="relative">


                <select
                    // value={driverStatus}
                    onChange={(e) => {
                        setDriverStatus((e.target.value).toUpperCase());

                    }}
                    className="w-full cursor-pointer px-4 py-2 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                    <option value="">All Status</option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                </select>
            </div>

            <div className='relative'>
                <select
                    value={docsStatus}
                    onChange={(e) => setDocsStatus(e.target.value)}
                    className="w-full cursor-pointer px-4 py-2 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                    <option value="">Docs Status</option>
                    <option value="Verified">Verified</option>
                    <option value="Incomplete">Incompleted</option>
                </select>
            </div>
        </div>

        {/* Mobile Card View (Visible only on small screens) */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
            {isLoading ? <div className='col-auto'>
                <SmallLoading message='drivers loading....'></SmallLoading>
            </div> : driverData?.drivers?.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-2xl text-black">No drivers found</div>
            ) : (
                driverData?.drivers?.map((user: TDriver) => (
                    <div key={user._id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-gray-800">{user.fullName}</h3>
                                <p className="text-[11px] text-gray-400">{user.registeredDate}</p>
                            </div>
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusStyle(user.status)}`}>
                                {user.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-y-3 text-sm">
                            <div>
                                <p className="text-gray-400 text-xs">License</p>
                                <p className="font-mono text-gray-700">{user.licenseNumber}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs">Phone</p>
                                <p className="text-gray-700">{user.phone}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs">DOT Exp.</p>
                                <p className="text-gray-700">{user.dotExpiration}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs">Docs Status</p>
                                <span
                                    className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-semibold ${user.docsStatus !== "Incomplete"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-orange-100 text-orange-700"
                                        }`}
                                >
                                    <span
                                        className={`w-2 h-2 rounded-full ${user.docsStatus !== "Incomplete"
                                            ? "bg-green-500"
                                            : "bg-orange-500"
                                            }`}
                                    />
                                    {user.docsStatus}
                                </span>
                            </div>
                        </div>

                        <Link to={`/dashboard/drivers/details/${user._id}`} className="block">
                            <button className="w-full py-2.5 bg-blue-50 text-blue-600 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm">
                                <Eye size={16} /> View Details
                            </button>
                        </Link>
                    </div>
                ))
            )}
        </div>

        {/* Table View (Hidden on Mobile, Visible on md: and up) */}
        <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-400 text-xs uppercase font-semibold tracking-wide">
                            <th className="px-5 py-4">Name</th>
                            <th className="px-5 py-4">License</th>
                            <th className="px-5 py-4">Phone</th>
                            <th className="px-5 py-4">Status</th>
                            <th className="px-5 py-4">DOT Exp.</th>
                            <th className="px-5 py-4">Docs Status</th>
                            <th className="px-5 py-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {isLoading ?
                            <tr>
                                <td colSpan={10} className="py-10">
                                    <SmallLoading message="Loading drivers..." />
                                </td>
                            </tr>
                            : driverData?.drivers?.length == 0 ? <tr>
                                <td colSpan={10} className="py-10">
                                    <div className="text-center py-10 bg-white rounded-2xl text-black">No drivers found</div>
                                </td>
                            </tr> : driverData?.drivers?.map((user: TDriver) => (
                                <tr key={user._id} className="hover:bg-blue-50/40 transition-colors duration-200">
                                    <td className="px-5 py-4">
                                        <div className="font-semibold text-gray-800 text-sm">{user?.fullName}</div>
                                        <div className="text-[11px] text-gray-400 mt-0.5">{user?.registeredDate}</div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className="text-xs bg-gray-100 px-2.5 py-1 rounded-lg text-gray-600 font-mono">{user?.licenseNumber}</span>
                                    </td>
                                    <td className="px-5 py-4 text-sm text-gray-500">{user?.phone}</td>
                                    <td className="px-5 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase ${getStatusStyle(user.status)}`}>
                                            {user?.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className="text-xs bg-gray-100 px-2.5 py-1 rounded-lg text-gray-600">{user.dotExpiration}</span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span
                                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold
    ${user.docsStatus !== "Incomplete"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-orange-100 text-orange-700"
                                                }`}
                                        >
                                            <span
                                                className={`w-2 h-2 rounded-full
      ${user.docsStatus !== "Incomplete"
                                                        ? "bg-green-500"
                                                        : "bg-orange-500"
                                                    }`}
                                            />
                                            {user.docsStatus}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-center">
                                        <Link to={`/dashboard/drivers/details/${user._id}`}>
                                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white hover:shadow-sm rounded-xl transition-all">
                                                <Eye size={18} />
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>

        <Pagination onNext={onNext} onPrev={onPrev} currentPage={driverData?.pagination?.page} totalPages={driverData?.pagination?.totalPages}></Pagination>
    </div>
    );
};

export default DriverTable;