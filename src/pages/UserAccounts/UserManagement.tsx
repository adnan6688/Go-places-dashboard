import { Calendar, ChevronDown, Edit2, Filter, Mail, Search, UserPlus } from 'lucide-react';
import React, { useState } from 'react';
import { AddUserModal } from './AddUserModal';

// Types
type Role = 'Admin' | 'Staff' | 'Rider' | 'Driver';
type Status = 'active' | 'inactive';

interface User {
    id: number;
    name: string;
    email: string;
    role: Role;
    status: Status;
    lastLogin: string;
}

const UserManagement: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modaltype, setModaltype] = useState<string>('')
    const [search, setSearch] = useState('');

    const [status, setStatus] = useState<string | 'All'>('All');

    const [users] = useState<User[]>([
        { id: 1, name: 'Admin Super', email: 'admin@transport.com', role: 'Staff', status: 'active', lastLogin: '2024-03-15 08:30 AM' },
        { id: 2, name: 'John Operations', email: 'j.ops@transport.com', role: 'Staff', status: 'active', lastLogin: '2024-03-15 09:15 AM' },
        { id: 3, name: 'Sarah Finance', email: 's.finance@transport.com', role: 'Staff', status: 'active', lastLogin: '2024-03-14 04:00 PM' },
        { id: 4, name: 'Mike Support', email: 'm.support@transport.com', role: 'Staff', status: 'inactive', lastLogin: '2024-03-10 11:00 AM' },
        { id: 5, name: 'Ariful Islam', email: 'ariful.rider@transport.com', role: 'Staff', status: 'active', lastLogin: '2024-04-18 10:20 AM' },
        { id: 6, name: 'Tanvir Ahmed', email: 'tanvir.driver@transport.com', role: 'Staff', status: 'active', lastLogin: '2024-04-18 07:45 AM' },
        { id: 7, name: 'Fatima Zohra', email: 'fatima.staff@transport.com', role: 'Staff', status: 'active', lastLogin: '2024-04-17 02:30 PM' },
        { id: 8, name: 'Rakib Hossain', email: 'rakib.admin@transport.com', role: 'Staff', status: 'active', lastLogin: '2024-04-18 11:00 AM' },
        { id: 9, name: 'Kamrul Hasan', email: 'kamrul.driver@transport.com', role: 'Staff', status: 'inactive', lastLogin: '2024-04-12 09:15 AM' },
        { id: 10, name: 'Sajid Afridi', email: 'sajid.rider@transport.com', role: 'Staff', status: 'active', lastLogin: '2024-04-18 08:50 AM' },
        { id: 11, name: 'Mehedi Hasan', email: 'mehedi.staff@transport.com', role: 'Staff', status: 'inactive', lastLogin: '2024-04-05 11:20 AM' },
        { id: 12, name: 'Nusrat Jahan', email: 'nusrat.rider@transport.com', role: 'Staff', status: 'active', lastLogin: '2024-04-17 06:10 PM' },
        { id: 13, name: 'Abdur Rahman', email: 'abdur.driver@transport.com', role: 'Staff', status: 'active', lastLogin: '2024-04-18 05:30 AM' },
        { id: 14, name: 'Lutfur Rahman', email: 'lutfur.admin@transport.com', role: 'Staff', status: 'active', lastLogin: '2024-04-18 12:45 PM' },
    ]);




    const getRoleBadgeColor = (role: Role) => {
        const colors = {
            Admin: 'bg-blue-50 text-blue-600 border-blue-100',
            Staff: 'bg-purple-50 text-purple-600 border-purple-100',
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
                        className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition-all active:scale-95 font-semibold shadow-sm"
                    >
                        <UserPlus size={19} />
                        <span>Add Staff</span>
                    </button>
                </div>


                <div className="w-full p-4 mb-4 md:p-6 bg-white shadow-xl shadow-blue-50/50 rounded-3xl border border-gray-100">
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
                                    <option value="All">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                                <div className={`absolute left-3.5 top-5 h-2 w-2 rounded-full pointer-events-none ${status === 'active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : status === 'inactive' ? 'bg-red-500' : 'bg-gray-400'}`} />
                                <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-gray-400 pointer-events-none group-hover:translate-y-0.5 transition-transform" />
                            </div>


                            <button
                                onClick={() => { setSearch('');  setStatus('All'); }}
                                className="w-full md:w-auto px-5 py-3 text-sm font-bold text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                            >
                                Reset
                            </button>

                        </div>
                    </div>
                </div>



                {/* --- MOBILE VIEW: CARD LAYOUT (Visible only on small screens) --- */}
                <div className="grid grid-cols-1 gap-4 sm:hidden">
                    {users.map((user) => (
                        <div key={user.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
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
                                <span>Last login: {user.lastLogin}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- TABLE VIEW: DESKTOP LAYOUT (Hidden on small screens) --- */}
                <div className="hidden sm:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-[11px] uppercase tracking-widest font-bold">
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Last Login</th>
                                    <th className="px-6 py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {users.map((user) => (
                                    <tr key={user.id} className="group hover:bg-blue-50/30 transition-colors">
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-800">{user.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
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
                                        <td className="px-6 py-4 text-sm text-gray-400 font-medium">{user.lastLogin}</td>
                                        <td className="px-6 py-4 text-center">
                                            <button onClick={() => {
                                                setModaltype('edit')
                                                setIsModalOpen(true)
                                            }} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                                <Edit2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isModalOpen && <AddUserModal
                mode={modaltype}
                initialData={{ name: "John Doe", email: "john@example.com", role: "Rider" }}
                onClose={handleClose}
            />}
        </div>
    );
};




export default UserManagement;