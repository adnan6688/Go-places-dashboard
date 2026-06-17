import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const RidesByType = () => {

  
  const data = {
    labels: ["Medical", "Pharmacy", "Dental", "Mental Health", "Lab"],
    datasets: [
      {
        data: [892, 342, 215, 198, 200],
        backgroundColor: [
          "#1d4ed8", // blue
          "#059669", // green
          "#f59e0b", // orange
          "#9333ea", // purple
          "#ef4444", // red
        ],
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

  const items = [
    { name: "Medical", value: 892, color: "#1d4ed8" },
    { name: "Pharmacy", value: 342, color: "#059669" },
    { name: "Dental", value: 215, color: "#f59e0b" },
    { name: "Mental Health", value: 198, color: "#9333ea" },
    { name: "Lab", value: 200, color: "#ef4444" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 h-full flex flex-col">

      {/* Title */}
      <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
        Rider's by Type
      </h2>

      <div className="flex flex-col">
        {/* Chart */}
        <div className="flex  justify-center mb-6">
          <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60">
            <Doughnut data={data} options={options} />
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3 mt-auto">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-xs sm:text-sm"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <span
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className="text-gray-600">{item.name}</span>
              </div>

              <span className="text-gray-800 font-semibold">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
};

export default RidesByType;