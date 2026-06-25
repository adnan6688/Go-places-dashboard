import { useQuery } from '@tanstack/react-query';
import { Calendar } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { monthlyRiders } from './reportApi';

const MonthlyRidesChart = () => {
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString()
  );

  const { data } = useQuery({
    queryKey: ['reports', selectedYear],
    queryFn: () => monthlyRiders(selectedYear)
  });


  // month number → name convert
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // API → chart format
  const chartData = useMemo(() => {
    if (!data) return [];

    return data
      // optional: filter by year if backend supports it
      .filter((item: any) => item.year ? item.year == selectedYear : true)
      .map((item: any) => ({
        month: monthNames[item.month - 1],
        rides: item.count
      }));
  }, [data, selectedYear]);



  console.log(selectedYear)

  return (
    <div className="w-full p-6 h-full bg-white rounded-2xl border border-gray-100 shadow-sm">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <h2 className="text-xl font-bold text-gray-800">Monthly Rides</h2>

        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5">
          <Calendar size={16} className="text-gray-500" />

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-transparent text-sm font-medium text-gray-700 outline-none cursor-pointer"
          >
            <option value={new Date().getFullYear()}>
              {new Date().getFullYear()}
            </option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
            <option value="2029">2029</option>
            <option value="2030">2030</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="h-75 sm:h-3/4 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRides" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

            <XAxis
              dataKey="month"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              dy={10}
            />

            <YAxis
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />

            <Area
              type="monotone"
              dataKey="rides"
              stroke="#3b82f6"
              strokeWidth={2.5}
              fill="url(#colorRides)"
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyRidesChart;