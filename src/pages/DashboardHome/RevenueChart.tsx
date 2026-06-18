import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { revenueChartApi } from '../../api/auth.api';


const RevenueChart: React.FC = () => {



  const { data: reveneuData } = useQuery({
    queryKey: ['revenue-data'],
    queryFn: revenueChartApi
  })

  const formattedRevenueData = reveneuData?.map((item: { month: string; revenue: number; }) => ({
    month: new Date(item.month + "-01").toLocaleString("en-US", {
      month: "short",
    }),
    revenue: item.revenue,
  }));


  console.log(formattedRevenueData)

  const formatYAxis = (value: number) => {
    if (value >= 1000) {
      return `$${value / 1000}k`;
    }
    return `$${value}`;
  };


  return (
    <div className="w-full bg-white p-2 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-8">Revenue Trend</h2>

      <div className="h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={formattedRevenueData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            barGap={0}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />

            <XAxis
              dataKey="month"
              axisLine={true}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              dy={10}
            />

            <YAxis
              tickFormatter={formatYAxis}
              axisLine={true}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              domain={[0, "dataMax + 100"]}
            />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />

            <Bar
              dataKey="revenue"
              fill="#10B981"
              radius={[4, 4, 0, 0]}
              barSize={80}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;