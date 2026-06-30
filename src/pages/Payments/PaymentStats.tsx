import React from "react";

import { CheckCircle, Clock, DollarSign, Inbox, Repeat, X, XCircle, type LucideIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { paymentSummary } from "./paymentApi";


type StatItem = {
  key: string;
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
};

const PaymentStats: React.FC = () => {

  const { data } = useQuery({ queryKey: ['summary'], queryFn: paymentSummary })

  const summaryStats = data && {
    ...data.transactions,
    ...data.requests,
  };
  const payMentstatsType = [
    {
      key: "totalSentAmount",
      title: "Total Sent Amount",
      value: summaryStats?.totalSentAmount ?? 0,
      icon: DollarSign,
      color: "bg-green-100 text-green-600"
    },
    {
      key: "totalTransactions",
      title: "Total Transactions",
      value: 10,
      icon: Repeat,
      color: "bg-blue-100 text-blue-600"
    },
    {
      key: "successfulTransactions",
      title: "Successful Transactions",
      value: summaryStats?.completed ?? 0,
      icon: CheckCircle,
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      key: "failedTransactions",
      title: "Failed Transactions",
      value: 2,
      icon: XCircle,
      color: "bg-red-100 text-red-600"
    },
    {
      key: "pendingTransactions",
      title: "Pending Transactions",
      value: 0,
      icon: Clock,
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      key: "totalRequests",
      title: "Total Requests",
      value: summaryStats?.total ?? 0,
      icon: Inbox,
      color: "bg-purple-100 text-purple-600"
    },
    {
      key: "pendingRequests",
      title: "Pending Requests",
      value: summaryStats?.pending ?? 0,
      icon: Clock,
      color: "bg-yellow-100 text-yellow-600"
    },

    {
      key: "rejectedRequests",
      title: "Rejected Requests",
      value: summaryStats?.rejected ?? 0,
      icon: X,
      color: "bg-red-100 text-red-600"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {payMentstatsType.map((item: StatItem) => {
        const Icon = item.icon;

        // bg-[#FFFFFF] border border-[#E2E4E9] rounded-xl shadow-sm
        return (
          <div
            key={item.key}
            className="sm:p-6 p-4 bg-[#FFFFFF] border border-[#E2E4E9] rounded-xl shadow-sm flex items-center gap-4"
          >
            {/* Icon */}
            <div className={`p-3 rounded-xl ${item.color}`}>
              <Icon size={20} />
            </div>

            {/* Text */}
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <h2 className="text-lg font-semibold">{item.value}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PaymentStats;