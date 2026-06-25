import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { activityData, type ActivityLog } from './activityapi';
import Pagination from '../../components/Pagination';
import { useDebounce } from '../../utils/debounce';



const AuditLogTable: React.FC = () => {


  const [currentPage, setCurrentPage] = useState<number>(1)
  const [search, setSearch] = useState<string>('')
  const [finalSearch, setFinalSearch] = useState<string>(search)

  const [target, setTargetType] = useState<string>("")
  const [startDate, setStartDate] = useState<string>("")
  // const [endDate, setEndDate] = useState<string>("")

  const debounce = useDebounce(search, 1000)


  useEffect(() => {
    setFinalSearch(debounce);
  }, [debounce]);


  const { data } = useQuery({
    queryKey: ['áctivitylog', currentPage, finalSearch, target,startDate],
    queryFn: () => activityData(currentPage, finalSearch, target,startDate)
  })

  const logData = data?.data || []
  const pagination = data?.pagination || {}


  const onPrev = () => {
    setCurrentPage(currentPage - 1)
  }

  const onNext = () => {
    setCurrentPage(currentPage + 1)
  }


  const typeStyles: Record<string, string> = {
    DRIVER: 'bg-blue-50 text-blue-600',
    Ride: 'bg-slate-50 text-slate-600',
    DOCUMENT: 'bg-teal-50 text-teal-600',
    STAFF: 'bg-indigo-50 text-indigo-600',
    RIDER: 'bg-gray-50 text-gray-600',
    PAYMENT: 'bg-gray-50 text-sky-600',
  };




  return (
    <div className=" bg-gray-50 ">
      <div className=" bg-white rounded-xl  border border-gray-100 overflow-hidden">



        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between gap-4">

          {/* LEFT SIDE - SEARCH */}
          <div className="relative w-full sm:w-72">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>

            <input
              type="text"
              placeholder="Search logs..."
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* RIGHT SIDE - FILTERS */}
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">

            {/* START DATE */}
            <input
              type="date"
              onChange={(e) => setStartDate(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* END DATE */}
            {/* <input
              type="date"
              onChange={(e) => setEndDate(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> */}

            {/* TYPE SELECT */}
            <select
              onChange={(e) => setTargetType(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              <option value="STAFF">STAFF</option>
              <option value="RIDER">RIDER</option>
              <option value="DRIVER">DRIVER</option>
              <option value="RIDE">RIDE</option>
              <option value="DOCUMENT">DOCUMENT</option>
              <option value="PAYMENT">PAYMENT</option>
              <option value="SYSTEM">SYSTEM</option>
            </select>

          </div>
        </div>
        {/* --- MOBILE VIEW (Visible only on small screens) --- */}
        <div className="block md:hidden">
          {logData?.map((log: ActivityLog) => (
            <div
              key={log._id}
              className="p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition"
            >
              {/* top row */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-400">
                  {new Date(log?.createdAt).toLocaleString()}
                </span>

                <span
                  className={`px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${typeStyles[log.targetType]
                    }`}
                >
                  {log.targetType}
                </span>
              </div>

              {/* actor (who updated) */}
              <div className="text-sm font-semibold text-gray-800">
                Updated By:{" "}
                <span className="text-gray-600 font-normal">
                  {log?.actor?.email} ({log?.actor?.role})
                </span>
              </div>

              {/* action */}
              <div className="text-sm text-gray-600 mt-1 flex flex-wrap gap-1">
                <span className="font-medium text-blue-600">{log.action}:</span>
                <span className="text-gray-700">
                  {log.metadata?.staffEmail || "-"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* --- DESKTOP VIEW (Visible only on medium screens and up) --- */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 text-sm  border-b border-gray-50">
                <th className="px-6 py-4">CreatedAt</th>
                <th className="px-6 py-4">UpdatedAt</th>
                <th className="px-6 py-4">Updated By</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Target User</th>

                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4 text-right">Target Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logData?.map((log: ActivityLog) => (
                <tr
                  key={log._id}
                  className="hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {new Date(log?.createdAt).toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {new Date(log?.updatedAt).toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    {log?.actor?.email ?? 'Not include'}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 rounded-md bg-blue-50 text-blue-600 font-medium text-xs uppercase">
                      {log?.actor?.role ?? "Uffs"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                    {log.action}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {log.metadata?.staffEmail || "Not Provide"}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    {log.title}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${typeStyles[log.targetType]
                        }`}
                    >
                      {log.targetType}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        {/* Empty State */}
        {logData?.length === 0 && (
          <div className="p-10 text-center text-gray-400 text-sm">
            No results found matching your filters.
          </div>
        )}
      </div>
      <Pagination onNext={onNext} onPrev={onPrev} currentPage={currentPage} totalPages={pagination?.totalPages}></Pagination>

    </div>
  );
};

export default AuditLogTable;