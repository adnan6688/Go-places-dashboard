



import React, { useState } from 'react';
import { Search, Filter, Eye, ChevronDown, Phone, Hash } from 'lucide-react';
import { Link } from 'react-router';

interface User {
    id: string;
    name: string;
    pmi: string;
    phone: string;
    status: 'active' | 'pending' | 'inactive';
    registered: string;
}

const users: User[] = [
    { id: '1', name: 'Sarah Johnson', pmi: 'PMI-20234', phone: '(555) 123-4567', status: 'active', registered: '2024-01-15' },
    { id: '2', name: 'Michael Chen', pmi: 'PMI-20235', phone: '(555) 234-5678', status: 'active', registered: '2024-02-10' },
    { id: '3', name: 'Angela Rivera', pmi: 'PMI-20236', phone: '(555) 345-6789', status: 'pending', registered: '2024-03-05' },
    { id: '4', name: 'David Thompson', pmi: 'PMI-20237', phone: '(555) 456-7890', status: 'active', registered: '2024-01-20' },
    { id: '5', name: 'Patricia Williams', pmi: 'PMI-20238', phone: '(555) 567-8901', status: 'inactive', registered: '2023-11-10' },
    { id: '6', name: 'Robert Kim', pmi: 'PMI-20239', phone: '(555) 678-9012', status: 'active', registered: '2024-03-12' },
];





const RiderManagement: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState("All Status");
    const [searchTerm, setSearchTerm] = useState("");

    const handleSelect = (value: string) => {
        setStatus(value);
        setOpen(false);
    };
    console.log(searchTerm)

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'active': return 'bg-emerald-100 text-emerald-600';
            case 'pending': return 'bg-amber-100 text-amber-600';
            case 'inactive': return 'bg-slate-200 text-slate-500';
            default: return 'bg-gray-100 text-gray-600';
        }
    };





    return (
        /* 1. Main wrapper-e overflow-x-hidden dilam jate screen-er baire kichu na jay */
        <div className=" bg-gray-50    w-full overflow-x-hidden">
            <div className="space-y-6">



                {/* Search + Filter - Flex wrap handle kora hoyeche */}
                <div className="flex flex-col md:flex-row gap-2 sm:gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mx-2">
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

                    <div className="relative w-full md:w-auto">
                        <button
                            onClick={() => setOpen(!open)}
                            className="w-full md:w-48 flex items-center justify-between gap-3 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-all active:scale-95 text-sm sm:text-base"
                        >
                            <div className="flex items-center gap-2">
                                <Filter size={18} className="text-gray-400" />
                                <span className="font-medium">{status}</span>
                            </div>
                            <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
                        </button>

                        {open && (
                            <div className="absolute mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-xl z-30">
                                <ul className="py-1 text-sm text-gray-700">
                                    {["All Status", "Active", "Pending", "Inactive"].map((item) => (
                                        <li
                                            key={item}
                                            onClick={() => handleSelect(item)}
                                            className="px-4 py-3 hover:bg-blue-50 cursor-pointer"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>



                <div className="w-full  ">
                    {/* Container with subtle glass effect */}
                    <div className="bg-white/70 backdrop-blur-md rounded-2xl border shadow-2xl  border-gray-100  overflow-hidden">

                        {/* Desktop View: Standard Table (visible on md+) */}
                        <div className="hidden md:block overflow-x-auto   ">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-100/50 text-gray-500 text-xs uppercase tracking-widest font-bold">
                                        <th className="px-6 py-5">User Info</th>
                                        <th className="px-6 py-5">PMI</th>
                                        <th className="px-6 py-5">Contact</th>
                                        <th className="px-6 py-5">Status</th>
                                        <th className="px-6 py-5 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {users.map((user) => (
                                        <tr key={user.id} className="hover:bg-blue-50/40 transition-all duration-300 group">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-800">{user.name}</div>
                                                <div className="text-[10px] text-gray-400 italic">{user.registered}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded text-gray-600">
                                                    {user.pmi}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{user.phone}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-[10px]  tracking-tighter uppercase ${getStatusStyle(user.status)}`}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <Link to={'/dashboard/riders/details/:id'}>

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
                            {users.map((user) => (
                                <div key={user.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3 relative overflow-hidden">
                                    {/* Status Badge - Top Right */}
                                    <div className="absolute top-4 right-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusStyle(user.status)}`}>
                                            {user.status}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800">{user.name}</h3>
                                            <p className="text-[10px] text-gray-400">{user.registered}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-y-3 mt-2 text-sm border-t border-gray-50 pt-3">
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <Hash size={14} className="text-blue-400" />
                                            <span className="font-mono">{user.pmi}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <Phone size={14} className="text-green-400" />
                                            <span>{user.phone}</span>
                                        </div>
                                    </div>

                                    <Link to={'/dashboard/riders/details/:id'}>


                                        <button className="w-full mt-2 py-3 bg-blue-50 text-blue-600 rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform">
                                            <Eye size={18} /> View Profile
                                        </button>

                                    </Link>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default RiderManagement;