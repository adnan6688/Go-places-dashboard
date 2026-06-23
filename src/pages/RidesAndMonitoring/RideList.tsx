import { useMemo, useState } from 'react';
import { Link } from 'react-router';

// --- Types & Mock Data ---
type RideStatus = 'in-progress' | 'completed' | 'scheduled' | 'canceled';
type RideType = 'Medical' | 'Pharmacy' | 'Lab' | 'Dental' | 'Mental Health';

interface Ride {
    id: string;
    rider: string;
    driver: string;
    route: string;
    type: RideType;
    cost: number;
    status: RideStatus;
    dateTime: string;
}

const RIDE_DATA: Ride[] = [
    { id: 'RIDE-001', rider: 'Sarah Johnson', driver: 'James Wilson', route: '123 Main St → City Hospital', type: 'Medical', cost: 45, status: 'in-progress', dateTime: '2024-03-15 09:30 AM' },
    { id: 'RIDE-002', rider: 'Michael Chen', driver: 'Maria Garcia', route: '456 Oak Ave → Downtown C...', type: 'Medical', cost: 38, status: 'completed', dateTime: '2024-03-14 02:15 PM' },
    { id: 'RIDE-003', rider: 'Angela Rivera', driver: 'Kevin Brown', route: '789 Pine Rd → Pharmacy', type: 'Pharmacy', cost: 25, status: 'completed', dateTime: '2024-03-14 11:00 AM' },
    { id: 'RIDE-004', rider: 'David Thompson', driver: 'Linda Martinez', route: '321 Elm St → Physical Thera...', type: 'Medical', cost: 55, status: 'in-progress', dateTime: '2024-03-15 10:45 AM' },
    { id: 'RIDE-005', rider: 'Robert Kim', driver: 'James Wilson', route: '654 Maple Dr → Specialist O...', type: 'Medical', cost: 42, status: 'scheduled', dateTime: '2024-03-16 08:00 AM' },
    { id: 'RIDE-006', rider: 'Patricia Williams', driver: 'Maria Garcia', route: '987 Cedar Ln → Lab Services', type: 'Lab', cost: 30, status: 'canceled', dateTime: '2024-03-13 03:30 PM' },
    { id: 'RIDE-007', rider: 'Sarah Johnson', driver: 'Linda Martinez', route: '123 Main St → Dental Clinic', type: 'Dental', cost: 35, status: 'completed', dateTime: '2024-03-12 01:00 PM' },
    { id: 'RIDE-008', rider: 'Michael Chen', driver: 'Steven Park', route: '456 Oak Ave → Mental Healt...', type: 'Mental Health', cost: 48, status: 'completed', dateTime: '2024-03-11 04:00 PM' },
];

const RideList = () => {
    const [activeTab, setActiveTab] = useState<'All' | 'Upcoming' | 'Active' | 'Completed'>('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredRides = useMemo(() => {
        return RIDE_DATA.filter((ride) => {
            const matchesTab =
                activeTab === 'All' ||
                (activeTab === 'Upcoming' && ride.status === 'scheduled') ||
                (activeTab === 'Active' && ride.status === 'in-progress') ||
                (activeTab === 'Completed' && ride.status === 'completed');

            const s = searchQuery.toLowerCase();
            return matchesTab && (
                ride.rider.toLowerCase().includes(s) ||
                ride.driver.toLowerCase().includes(s) ||
                ride.id.toLowerCase().includes(s)
            );
        });
    }, [activeTab, searchQuery]);

    const getStatusStyles = (status: RideStatus) => {
        const base = "px-3 py-1 rounded-full text-xs font-medium capitalize";
        switch (status) {
            case 'in-progress': return `${base} bg-blue-50 text-blue-600`;
            case 'completed': return `${base} bg-green-50 text-green-600`;
            case 'scheduled': return `${base} bg-orange-50 text-orange-600`;
            case 'canceled': return `${base} bg-red-50 text-red-600`;
            default: return base;
        }
    };

    return (
        <div className=" text-slate-700">
            <div className=" bg-white rounded-xl shadow-sm border border-gray-200">

                {/* Responsive Tabs & Search Container */}
                <div className="p-4 space-y-4 border-b border-gray-100 bg-gray-50/30">
                    <div className="flex flex-wrap gap-2">
                        {['All', 'Upcoming', 'Active', 'Completed'].map((tab) => (
                            <button
                                key={tab}
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                onClick={() => setActiveTab(tab as any)}
                                className={`px-4 py-1.5 rounded-lg text-sm transition-all whitespace-nowrap ${activeTab === tab
                                    ? 'bg-white shadow-sm cursor-pointer border-gray-200 font-semibold text-blue-600'
                                    : 'text-gray-500 hover:bg-gray-100'
                                    }`}
                            >
                                {tab} {tab === 'All' && <span className="ml-1 opacity-50">({RIDE_DATA.length})</span>}
                            </button>
                        ))}
                    </div>

                    <div className="relative">
                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">🔍</span>
                        <input
                            type="text"
                            placeholder="Search rider, driver, or ID..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* --- Mobile View (Cards) --- */}
                <div className="md:hidden divide-y  divide-gray-300">
                    {filteredRides.map((ride) => (
                        <div key={ride.id} className="p-4 space-y-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-xs font-bold text-gray-400 uppercase">{ride.id}</div>
                                    <div className="font-bold text-gray-900">{ride.rider}</div>
                                </div>
                                <div className={getStatusStyles(ride.status)}>{ride.status}</div>
                            </div>
                            <div className="text-sm text-gray-600">
                                <span className="text-gray-400">Driver:</span> {ride.driver}
                            </div>
                            <div className="text-xs text-gray-400 italic bg-gray-50 p-2 rounded">
                                {ride.route}
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-500">{ride.type}</span>
                                <span className="font-bold text-lg">${ride.cost}</span>
                            </div>
                            <div className="text-[10px] text-gray-400 uppercase tracking-tighter">
                                {ride.dateTime}
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- Desktop View (Table) --- */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-medium">Ride ID</th>
                                <th className="px-6 py-4 font-medium">Rider</th>
                                <th className="px-6 py-4 font-medium">Driver</th>
                                <th className="px-6 py-4 font-medium">Route</th>
                                <th className="px-6 py-4 font-medium">Type</th>
                                <th className="px-6 py-4 font-medium text-right">Cost</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Date/Time</th>
                                <th className="px-6 py-4 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {filteredRides.map((ride) => (
                                <tr key={ride.id} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="px-6 py-4 font-semibold text-gray-900">{ride.id}</td>
                                    <td className="px-6 py-4">{ride.rider}</td>
                                    <td className="px-6 py-4 text-gray-600">{ride.driver}</td>
                                    <td className="px-6 py-4 text-gray-400 text-xs max-w-200 truncate" title={ride.route}>
                                        {ride.route}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 bg-gray-100 text-gray-500 rounded-full text-[11px] font-medium">
                                            {ride.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-gray-900">${ride.cost}</td>
                                    <td className="px-6 py-4">
                                        <span className={getStatusStyles(ride.status)}>
                                            {ride.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400 whitespace-nowrap text-xs">{ride.dateTime}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link to={`/dashboard/ridesandmonitoring/monitorDetails/:id`}>
                                            <button className="inline-flex items-center px-4 py-2 border border-transparent text-xs font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm">
                                                View Details
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {filteredRides.length === 0 && (
                    <div className="p-12 text-center text-gray-400 flex flex-col items-center">
                        <div className="text-4xl mb-2">🔎</div>
                        <p>No rides found matching your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RideList;