import { Calendar, ChevronDown, Edit2, Filter, Mail, Search, UserPlus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { AddUserModal } from './AddUserModal';
import { useQuery } from '@tanstack/react-query';
import { staffApi } from './staff';
import Pagination from '../../components/Pagination';
import SmallLoading from '../../Loading/SmallLoading';
import { useDebounce } from '../../utils/debounce';

// Types
type Role = 'staff' | 'admin'
type Status = 'active' | 'inactive';

interface TStaff {
    _id: string;
    fullName: string;
    email: string;
    role: Role;
    status: Status;
    createdAt: string;
    updatedAt: string;
    isFirstLogin: boolean;
    isDeleted: boolean;
    createdBy: string
}

const UserManagement: React.FC = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modaltype, setModaltype] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [search, setSearch] = useState('');
    const [finalSearch, setFinalSearch] = useState<string>('')
    const [status, setStatus] = useState<string | ''>('');

    const [editStaffId,setEditStaffId] = useState<string>("")


    const debounce = useDebounce(search, 500)

    useEffect(() => {
        setFinalSearch(debounce);
    }, [debounce]);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['staff-result', finalSearch, status],
        queryFn: () => staffApi(finalSearch, status)
    })


    const onPrev = () => {
        setCurrentPage(currentPage - 1)
    }

    const onNext = () => {
        setCurrentPage(currentPage + 1)
    }


    const getRoleBadgeColor = (role: Role) => {
        const colors = {
            admin: 'bg-blue-50 text-blue-600 border-blue-100',
            staff: 'bg-purple-50 text-purple-600 border-purple-100',
            Rider: 'bg-orange-50 text-orange-600 border-orange-100',
            Driver: 'bg-teal-50 text-teal-600 border-teal-100',
        };
        return colors[role] || 'bg-gray-50 text-gray-600';
    };

    const handleClose = () => {
        setIsModalOpen(false)
        setModaltype('')
    }



    return (
        <div className=" ">
            <div className="">

                {/* Header Section */}
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Staff Accounts</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage permissions for all user types.</p>
                    </div>
                    <button
                        onClick={() => {
                            setModaltype('add')
                            setIsModalOpen(true)
                        }}
                        className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition-all active:scale-95 font-semibold shadow"
                    >
                        <UserPlus size={19} />
                        <span>Add Staff</span>
                    </button>
                </div>


                <div className="w-full p-4 mb-4 md:p-6 bg-white shadow shadow-blue-50/50 rounded-3xl border border-gray-100">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">


                        <div className="relative w-full lg:max-w-md group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-300 outline-none text-sm placeholder:text-gray-400"
                                placeholder="Search by name, email or phone..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {/* --- Filters Wrapper --- */}
                        <div className="flex flex-wrap md:flex-nowrap items-center gap-3 w-full lg:w-auto">

                            <div className=" items-center gap-2 text-gray-400 mr-2 hidden md:flex">
                                <Filter size={18} />
                                <span className="text-sm font-medium">Filters:</span>
                            </div>



                            {/* --- Unique Status Filter --- */}
                            <div className="relative w-[48%] md:w-40 group">
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="appearance-none w-full pl-10 pr-10 py-3 bg-gray-50 border border-transparent rounded-2xl text-sm font-semibold text-gray-700 focus:ring-4 focus:ring-green-50 transition-all outline-none cursor-pointer group-hover:bg-gray-100"
                                >
                                    <option value="">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                                <div className={`absolute left-3.5 top-5 h-2 w-2 rounded-full pointer-events-none ${status === 'active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : status === 'inactive' ? 'bg-red-500' : 'bg-gray-400'}`} />
                                <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-gray-400 pointer-events-none group-hover:translate-y-0.5 transition-transform" />
                            </div>


                            <button
                                onClick={() => { setSearch(''); setStatus(''); }}
                                className="w-full md:w-auto px-5 py-3 text-sm font-bold text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                            >
                                Reset
                            </button>

                        </div>
                    </div>
                </div>



                {/* --- MOBILE VIEW: CARD LAYOUT (Visible only on small screens) --- */}
                <div className="grid grid-cols-1 gap-4 sm:hidden">
                    {data?.data?.data?.map((user: TStaff) => (
                        <div key={user._id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{user?.fullName}</h3>
                                    <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-1">
                                        <Mail size={14} />
                                        {user.email}
                                    </div>
                                </div>
                                <button onClick={() => {
                                    setModaltype('edit')
                                    setIsModalOpen(true)
                                }} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                    <Edit2 size={16} />
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-50">
                                <div className="flex items-center gap-1.5">
                                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${getRoleBadgeColor(user.role)}`}>
                                        {user.role}
                                    </span>
                                </div>
                                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${user.status === 'active' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-gray-50 text-gray-500 border border-gray-200'}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                                    {user.status.toUpperCase()}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 p-2 rounded-lg">
                                <Calendar size={14} />
                                <span>CreatedAt: {new Date(user?.createdAt).toLocaleString()}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- TABLE VIEW: DESKTOP LAYOUT (Hidden on small screens) --- */}
                <div className="hidden sm:block bg-white rounded-2xl shadow border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-sm   font-bold">
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">CreatedAt</th>
                                  <th className="px-6 py-4 text-center">Availability</th>
                                    <th className="px-6 py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {isLoading ? <tr>
                                    <td colSpan={999} className="text-center py-10">
                                        <SmallLoading message="Staff Loading.." />
                                    </td>
                                </tr> : !data?.data?.data?.length ? <tr className=''>
                                    <td colSpan={5} className="text-center text-gray-600 py-10">
                                        Staff not found
                                    </td>
                                </tr> : data?.data?.data.map((user: TStaff) => (
                                    <tr key={user._id} className="group hover:bg-blue-50/30 transition-colors">
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-800">{user?.fullName}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{user?.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[12px] font-bold border ${getRoleBadgeColor(user.role)}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                                                <span className={`text-xs font-medium ${user.status === 'active' ? 'text-green-700' : 'text-gray-500'}`}>
                                                    {user.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-400 font-medium">
                                            {new Date(user.createdAt).toLocaleString()}
                                        </td>
                                      <td className='flex justify-center'>
                                          <span
                                            className={`px-2 py-1 rounded-full  text-xs font-medium ${user?.isDeleted
                                                    ? "bg-gray-200 text-gray-600"
                                                    : "bg-blue-100 text-blue-600"
                                                }`}
                                        >
                                            { user?.isDeleted ? "Archived" : "On Duty"}
                                        </span>
                                      </td>
                                        <td className="px-6 py-4 text-center">
                                            <button onClick={() => {
                                                setModaltype('edit')
                                                setEditStaffId(user?._id)
                                                setIsModalOpen(true)
                                            }} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                                <Edit2  size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            <div>
                <Pagination onNext={onNext} onPrev={onPrev} currentPage={currentPage} totalPages={data?.data?.pagination?.totalPages}></Pagination>
            </div>
            {isModalOpen && <AddUserModal
                mode={modaltype}
                editStaffId={editStaffId}
                initialData={{ name: "John Doe", email: "john@example.com", role: "Rider" }}
                onClose={handleClose}
                refetch={refetch}
            />}
        </div>
    );
};




export default UserManagement;