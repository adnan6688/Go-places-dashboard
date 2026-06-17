import { CarFront, CircleCheckBig, Clock7, DollarSign, Send, TrendingUp, TriangleAlert, Users } from "lucide-react";
import DashboardHeading from "../../components/DashboardHeading";
import { useDashboardTitle } from "../../Config/sendLocation";
import RidesOverview from "./RidesOverview";
import RidesByType from "./RidesByType";
import RidesActivity from "./RidesActivity";
import RevenueChart from "./RevenueChart";



export default function Dashboard() {
  const { title, subtitle } = useDashboardTitle();


  // data.ts
  const dashboardData = [
    {
      title: 'Total Riders',
      value: 248,
      percentage: '+12.5%',
      icon: <Users className="text-[#0073E6]" size={20} />,
      bg: '#0073E61A'
    },
    {
      title: 'Total Drivers',
      value: 64,
      percentage: '+8.2%',
      icon: <CarFront className="text-[#14B88F]" size={20} />,
      bg: '#14B88F1A'
    },
    {
      title: 'Active Rides',
      value: 8,
      percentage: '',
      icon: <Send className="text-[#F59F0A]" size={20} />,
      bg: '#F59F0A1A'
    },
    {
      title: 'Pending Tasks',
      value: 23,
      percentage: '',
      icon: <TriangleAlert className="text-[#DF3A3A]" size={20} />,
      bg: '#DF3A3A1A'
    },
    {
      title: 'Completed Rides',
      value: 1847,
      percentage: '',
      icon: <CircleCheckBig className="text-[#1DAF7E]" size={20} />,
      bg: '#1DAF7E1A'
    },
    {
      title: 'Total Revenue',
      value: '$89,420',
      percentage: '+15.3%',
      icon: <DollarSign className="text-[#0073E6]" size={20} />,
      bg: '#0073E61A'
    },
    {
      title: 'Pending Registrations',
      value: 12,
      percentage: '',
      icon: <Clock7 className="text-[#F59F0A]" size={20} />,
      bg: '#F59F0A1A'
    },
    {
      title: 'Monthly Growth',
      value: '12.5%',
      percentage: '',
      icon: <TrendingUp size={20} className="text-[#14B88F]" />,
      bg: '#14B88F1A'
    },
  ];


  return (
    <div className="sm:p-3">
      <DashboardHeading title={title} subtitle={subtitle}></DashboardHeading>



      {/* stats */}

      <div className="grid my-3 sm:my-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 ">
        {dashboardData?.map((item, index) => (
          <div key={index} className="flex bg-[#FFFFFF] border border-[#E2E4E9] rounded-xl shadow-sm justify-between p-5">

            <div className="flex gap-y-2 flex-col">

              <h1 className="text-[#737B8C] text-sm">{item?.title}</h1>

              <h1 className=" text-xl sm:text-2xl font-bold text-[#121721]">{item?.value}</h1>

              {item.percentage && <h1 className="text-[#1DAF7E] text-sm">{item.percentage} </h1>}


            </div>

            <div>

              <div
                className="p-2.5 rounded-lg"
                style={{ backgroundColor: item?.bg }} // Dynamically apply the background color
              >
                {item?.icon}
              </div>
            </div>


          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-2/3">
          <RidesOverview />
        </div>

        <div className="w-full lg:w-1/3">
          <RidesByType />
        </div>
      </div>

      <div className=" my-2 sm:my-6">
        <RidesActivity></RidesActivity>
      </div>

      <div>
        <RevenueChart></RevenueChart>
      </div>



    </div>
  )
}
