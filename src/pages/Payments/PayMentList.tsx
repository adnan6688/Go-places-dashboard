import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router";
import { getPaymentList, type WithdrawalRequest } from "./paymentApi";
import SmallLoading from "../../Loading/SmallLoading";

const statusStyle: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700 ring-1 ring-amber-200",
  TRANSFERRED: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
  REJECTED: "bg-rose-100 text-rose-700 ring-1 ring-rose-200",
  FAILED: "bg-rose-100 text-red-500 ring-1 ring-rose-200",
};

const dotStyle: Record<string, string> = {
  PENDING: "bg-amber-500",
  TRANSFERRED: "bg-emerald-500",
  REJECTED: "bg-rose-500",
  FAILED: "bg-rose-100 text-red-500 ring-1 ring-rose-200",
};



const PayMentList: React.FC = () => {

  const [status, setStatus] = useState<string>('')

  const { data: paymentData, isLoading } = useQuery({
    queryKey: ['payment_list', status],
    queryFn: () => getPaymentList(status)
  })

  console.log(status)




  return (
    <div className="p-1 md:p-0 bg-gray-50 ">
      <div className="">

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 mb-8 bg-white/50 backdrop-blur-md border border-gray-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">

          {/* Header Section: Title & Badge */}
          <div className="flex items-center gap-4">
            <div className="h-12 w-1.5 bg-indigo-600 rounded-full"></div>
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                Payment Requests
              </h2>
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                Management Portal
              </p>
            </div>
          </div>

          {/* Search & Filter Section */}
          <div className="flex flex-1 flex-col sm:flex-row items-center gap-4 w-full lg:max-w-3xl">

            {/* Animated Search Bar */}
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search requests by name..."
                className="w-full pl-11 pr-4 py-3 bg-gray-50/50 border-0 ring-1 ring-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-300 outline-none placeholder:text-gray-400"
              />
            </div>

            {/* Custom Styled Select Container */}
            <div className="relative w-full sm:w-64 group">
              <select onChange={(e) => setStatus(e.target.value)} className="appearance-none w-full pl-4 pr-10 py-3 bg-gray-50/50 border-0 ring-1 ring-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-300 outline-none text-gray-700 font-medium cursor-pointer">
                <option value="">All Status</option>
                <option value="PENDING">🕒 Pending</option>
                <option value="TRANSFERRED">✅ Transferred</option>
                <option value="REJECTED">❌ Rejected</option>
                <option value="FAILED">⚠️ Failed</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400 group-hover:text-indigo-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Stats Badge */}
          <div className="flex items-center gap-2 px-5 py-2.5 bg-indigo-50 rounded-xl border border-indigo-100">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
            <span className="text-sm font-bold text-indigo-700 whitespace-nowrap">
              {paymentData?.data?.data?.length} Total Logs
            </span>
          </div>

        </div>

        {/* --- Mobile View (Cards) --- */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {paymentData?.data?.data?.map((item: WithdrawalRequest) => (
            <div key={item._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 active:scale-[0.98] transition-transform">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="h-11 w-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shadow-sm">
                    {item.driver?.fullName.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-bold text-gray-900">{item.driver?.fullName}</p>
                    <p className="text-xs text-gray-400">ID: {item?.driver?.driverId}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusStyle[item.status]}`}>
                  <span className={`h-1.5 w-1.5 rounded-full mr-1.5 ${dotStyle[item.status]}`}></span>
                  {item.status}
                </span>
              </div>

              <div className="flex justify-between items-end border-t border-gray-50 pt-4">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-semibold">Amount</p>
                  <p className="text-lg  font-semibold text-gray-800">${item.amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-400 mt-1">{new Date(item?.createdAt).toLocaleString()}</p>
                </div>
                <button className="px-5 py-2 bg-blue-50 text-blue-700 text-sm font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* --- Desktop View (Table) --- */}
        <div className="hidden md:block bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-left font-semibold text-gray-500  ">Driver Details</th>
                <th className="px-6 py-4 text-left  font-semibold text-gray-500 ">Status</th>
                <th className="px-6 py-4 text-left  font-semibold text-gray-500">Amount</th>
                <th className="px-6 py-4 text-left  font-semibold text-gray-500  ">Request Date</th>
                <th className="px-6 py-4 text-left  font-semibold text-gray-500  ">Trip</th>
                <th className="px-6 py-4 text-left  font-semibold text-gray-500  ">Miles</th>
                <th className="px-6 py-4 text-center  font-semibold text-gray-500 ">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? <tr>
                <td colSpan={100} className="text-center py-10">
                  <div className="inline-flex justify-center items-center w-full">
                    <SmallLoading message="transection loading...." />
                  </div>
                </td>
              </tr> : !paymentData?.data?.data?.length ? <tr>
                <td colSpan={100} className="text-center py-8 text-slate-400 font-medium">
                  transection not found
                </td>
              </tr> : paymentData?.data?.data?.map((item: WithdrawalRequest) => (
                <tr key={item._id} className="group hover:bg-blue-50/30 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 shrink-0 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs shadow-sm">
                        {item.driver?.fullName.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-semibold text-gray-900">{item.driver?.fullName}</p>
                        <p className="text-xs text-gray-400">ID: {item.driver?.driverId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${statusStyle[item.status]}`}>
                      <span className={`h-1.5 w-1.5 rounded-full mr-1.5 ${dotStyle[item.status]}`}></span>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-700 text-sm">${item.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(item?.createdAt).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 bg-gray-100 rounded-md text-sm font-medium text-gray-800 hover:bg-indigo-100 hover:text-indigo-600 transition">
                      {item.tripCount}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <span className="px-3 py-1 bg-blue-100 text-blue-400 rounded-full text-xs font-semibold">
                      {item.totalMiles} miles
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link to={`/dashboard/payments/details/${item?._id}`}>
                      <button className="px-4 py-2 text-sm font-semibold rounded-lg text-white bg-linear-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                        Details
                      </button></Link>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PayMentList;