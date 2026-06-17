import { useState } from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { ridesOverView } from "../../api/auth.api";
import { ArrowDownNarrowWide } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const RidesOverview = () => {

  const currentYear = new Date().getFullYear();
  const years = [currentYear - 2, currentYear - 1, currentYear];

  const [year, setYear] = useState<number>(currentYear);


  const { data: rideOverViewData } = useQuery({
    queryKey: ['overview', year],
    queryFn: () => ridesOverView(Number(year)),
    retry: false
  })


const chartValues = Array.from({ length: 12 }, (_, i) => {
  const found = rideOverViewData?.find(
    (item: { count: number; month: number }) => item.month === i + 1
  );

  return found?.count || 0;
});

  


  const data = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    datasets: [
      {
        label: "Rides Overview",
        data: chartValues,
        fill: true,
        borderColor: "rgba(29, 78, 216, 1)",


        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        backgroundColor: (context: any) => {
          const { chart } = context;
          const { ctx, chartArea } = chart;

          if (!chartArea) return null; // important!

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );

          gradient.addColorStop(0, "rgba(29, 78, 216, 0.5)");
          gradient.addColorStop(1, "rgba(29, 78, 216, 0)");

          return gradient;
        },

        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, //eta add kor
      },
      title: {
        display: true,
        text: `Rides Overview (${year})`,
      },
    },
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-2xl shadow-md h-full flex flex-col">

      {/* Filter */}
      <div className="flex justify-end mb-4">
        <div className="relative">
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="appearance-none cursor-pointer bg-white border border-gray-200 px-4 py-2 pr-10 rounded-lg text-sm shadow-sm hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          {/* custom arrow */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            <ArrowDownNarrowWide></ArrowDownNarrowWide>
          </div>
        </div>
      </div>
      {/* Chart */}
      <div className="flex-1 sm:min-h-62.5 ">
        <Line className="sm:w-full h-full" data={data} options={options} />
      </div>
    </div>
  );
};

export default RidesOverview;