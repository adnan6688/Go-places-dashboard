import { useQuery } from "@tanstack/react-query";
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { RidesTypeAp } from "../Reports/reportApi";

ChartJS.register(ArcElement, Tooltip, Legend);

const RidesByType = () => {

  const { data: typeOfRides } = useQuery({
    queryKey: ['typeOf'],
    queryFn: RidesTypeAp
  });

  // fallback safe data
  const chartData = typeOfRides || [];

  const labels = chartData.map((item: any) => item.type);

  const values = chartData.map((item: any) => item.count);

  const colors = ["#1d4ed8", "#059669", "#f59e0b", "#9333ea", "#ef4444"];

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors.slice(0, values.length),
        borderWidth: 0,
        cutout: "65%",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 h-full flex flex-col">

      {/* Title */}
      <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
        Rides by Type
      </h2>

      <div className="flex flex-col">

        {/* Chart */}
        <div className="flex justify-center mb-6">
          <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60">
            <Doughnut data={data} options={options} />
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3 mt-auto">
          {chartData.map((item: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between text-xs sm:text-sm"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <span
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                  style={{ backgroundColor: colors[index % colors.length] }}
                ></span>
                <span className="text-gray-600">{item.type}</span>
              </div>

              <span className="text-gray-800 font-semibold">
                {item.count}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default RidesByType;