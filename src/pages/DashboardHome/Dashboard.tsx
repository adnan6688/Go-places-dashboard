import { CarFront, CircleCheckBig, Clock7, DollarSign, Send, TrendingUp, TriangleAlert, Users } from "lucide-react";
import DashboardHeading from "../../components/DashboardHeading";
import { useDashboardTitle } from "../../Config/sendLocation";
import RidesOverview from "./RidesOverview";
import RidesByType from "./RidesByType";
import RidesActivity from "./RidesActivity";
import RevenueChart from "./RevenueChart";
import { useQuery } from "@tanstack/react-query";
import { dashboardOverView } from "../../api/auth.api";



export default function Dashboard() {
  const { title, subtitle } = useDashboardTitle();

  const { data } = useQuery({
    queryKey: ['dash_overView'],
    queryFn: dashboardOverView,
    retry: false
  })


  // data.ts
  const dashboardData = [
    {
      title: 'Total Riders',
      value: data?.totalRiders ?? 0,
      percentage: data?.riderGrowth ?? '',
      icon: <Users className="text-[#0073E6]" size={20} />,
      bg: '#0073E61A'
    },
    {
      title: 'Total Drivers',
      value: data?.totalDrivers ?? 0,
      percentage: data?.driverGrowth ?? '',
      icon: <CarFront className="text-[#14B88F]" size={20} />,
      bg: '#14B88F1A'
    },
    {
      title: 'Active Rides',
      value: data?.activeRides ?? 0,
      percentage: '',
      icon: <Send className="text-[#F59F0A]" size={20} />,
      bg: '#F59F0A1A'
    },
    {
      title: 'Pending Tasks',
      value: data?.pendingTasks ?? 0,
      percentage: '',
      icon: <TriangleAlert className="text-[#DF3A3A]" size={20} />,
      bg: '#DF3A3A1A'
    },
    {
      title: 'Completed Rides',
      value: data?.completedRides ?? 0,
      percentage: '',
      icon: <CircleCheckBig className="text-[#1DAF7E]" size={20} />,
      bg: '#1DAF7E1A'
    },
    {
      title: 'Total Revenue',
      value: `${data?.totalRevenue ?? ''}$`,
      percentage: '',
      icon: <DollarSign className="text-[#0073E6]" size={20} />,
      bg: '#0073E61A'
    },
    {
      title: 'Pending Registrations',
      value: data?.pendingRegistrations ?? 0,
      percentage: '',
      icon: <Clock7 className="text-[#F59F0A]" size={20} />,
      bg: '#F59F0A1A'
    },
    {
      title: 'Monthly Growth',
      value: data?.monthlyGrowth ?? 0,
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
