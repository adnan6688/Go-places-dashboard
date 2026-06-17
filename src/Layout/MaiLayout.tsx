import {
  ActivityIcon,
  ArrowLeftRight,
  ArrowUpFromLine,
  BadgeQuestionMark,
  Bell,
  BellDot,
  CarFront,
  ChartLine,
  CreditCard,
  FilePlusCorner,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  Send,
  Settings,
  SquareUserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import logo from "../assets/Logo.png";
import SideNavigation from "../components/SideNavigation";
import "./laytout.css";
import { logOutFromSite } from "../api/auth.api";
import { showError } from "../utils/toast";
import { useAuth } from "../Hook/useAuth";
import { useQueryClient } from "@tanstack/react-query";

export type SidebarItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

const sidebarItems: SidebarItem[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "Drivers",
    path: "/dashboard/drivers",
    icon: <CarFront size={20} />,
  },
  {
    name: "Riders",
    path: "/dashboard/riders",
    icon: <ArrowLeftRight size={20} />,
  },
  {
    name: "Enrollments",
    path: "/dashboard/enrollments",
    icon: <FilePlusCorner size={20} />,
  },
  {
    name: "Uploads",
    path: "/dashboard/uploads",
    icon: <ArrowUpFromLine size={20} />,
  },
];

const manageMentItems: SidebarItem[] = [
  {
    name: "Payments Request",
    path: "/dashboard/payments",
    icon: <CreditCard size={20} />,
  },
  {
    name: "Notifications",
    path: "/dashboard/notifications",
    icon: <Bell size={20} />,
  },
  {
    name: "Staff Accounts",
    path: "/dashboard/useraccounts",
    icon: <SquareUserRound size={20} />,
  },
  {
    name: "Reports",
    path: "/dashboard/reports",
    icon: <ChartLine size={20} />,
  },
];

const OperationsItems: SidebarItem[] = [
  {
    name: "Rides & Monitoring",
    path: "/dashboard/ridesandmonitoring",
    icon: <Send size={20} />,
  },
  {
    name: "Live Map",
    path: "/dashboard/livemap",
    icon: <MapPin size={20} />,
  },
  {
    name: "Manual Dispatch",
    path: "/dashboard/manualdispatch",
    icon: <Send size={20} />,
  },
];

const SystemItems: SidebarItem[] = [
  {
    name: "Activity Log",
    path: "/dashboard/activitylog",
    icon: <ActivityIcon size={20} />,
  },
  {
    name: "Feedback",
    path: "/dashboard/feedback",
    icon: <BadgeQuestionMark size={20} />,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: <Settings size={20} />,
  },
];

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [load, setLoad] = useState<boolean>(false)
  const navigate = useNavigate()
  const { user } = useAuth()
  const queryClient = useQueryClient();


  const handleLogout = async () => {
    setLoad(true)
    try {
      const res = await logOutFromSite();

      if (res?.data?.success) {
        queryClient.setQueryData(["currentUser"], null);
        queryClient.removeQueries({ queryKey: ["currentUser"] });

        navigate('/')
        showError(res?.data?.message)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false)
    }
  };

  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen
          w-[80%] sm:w-[320px] md:w-70
          lg:w-65 xl:w-70
          bg-white shadow-lg
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:sticky lg:top-0 lg:shrink-0
          overflow-y-auto no-scrollbar
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-4">
          <img
            className="w-24 sm:w-28 md:w-32"
            src={logo}
            alt="Logo"
          />

          <button
            className="lg:hidden text-gray-600"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <div className="px-3 md:px-4">
          <SideNavigation
            title="Overview"
            sideItemsArray={sidebarItems}
            setIsSidebarOpen={setIsSidebarOpen}
          />

          <div className="mt-4">
            <SideNavigation
              title="Management"
              sideItemsArray={manageMentItems}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </div>

          <div className="mt-4">
            <SideNavigation
              title="Operations"
              sideItemsArray={OperationsItems}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </div>

          <div className="mt-4">
            <SideNavigation
              title="System"
              sideItemsArray={SystemItems}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </div>

          {/* Logout */}
          <div className="w-full my-5">
            <button
              onClick={handleLogout}
              disabled={load}
              className="
      flex items-center gap-2
      w-full px-4 py-3
      text-sm font-medium text-red-600
      bg-red-50 hover:bg-red-100
      border border-red-100 rounded-xl
      transition duration-200
      active:scale-95 cursor-pointer


      disabled:opacity-50
      disabled:cursor-not-allowed
      disabled:bg-red-100
    "
            >
              <LogOut size={18} />

              <span>
                {load ? "Logging out..." : "Logout"}
              </span>
            </button>
          </div>

        </div>
      </aside>


      {/* Main Section */}
      <div className="flex-1 flex flex-col min-w-0 h-screen">

        {/* Topbar */}
        <header
          className="
            sticky top-0 z-30
            bg-white border-b border-gray-200
            px-3 sm:px-4 md:px-6 py-4
            flex items-center justify-between
          "
        >
          <div className="flex items-center gap-3 min-w-0">

            {/* Menu */}
            <button
              className="lg:hidden text-gray-700 shrink-0"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>

            {/* Title */}
            <h1
              className="
                max-w-37.5
                sm:max-w-full
                overflow-hidden whitespace-nowrap
                text-xs sm:text-sm md:text-lg lg:text-xl
                font-semibold text-gray-800
              "
            >
              <span className="inline-block animate-marquee">
                <span className="
                  bg-linear-to-r 
                  from-gray-700 via-gray-950 to-gray-700
                  bg-size-[200%_100%]
                  bg-clip-text text-transparent animate-shine
                ">
                  Welcome to Go Places Dashboard — {user?.user?.role === "admin" ? "Admin Panel Access" : "Staff Panel Access"}
                </span>
              </span>
            </h1>

          </div>


          {/* Right side */}
          <div className="flex items-center gap-3">

            <div className="hidden sm:flex relative text-gray-600">
              <BellDot size={22} />
              <span
                className="
                  absolute top-0 right-0
                  w-2.5 h-2.5
                  rounded-full bg-red-500
                  border border-white
                "
              />
            </div>

            <div
              className="
                w-9 h-9 sm:w-10 sm:h-10
                rounded-full bg-blue-600
                text-white font-semibold
                flex items-center justify-center
              "
            >
              {user && user?.fullName.charAt(0).toUpperCase()}
            </div>

          </div>
        </header>


        {/* Scrollable Page Content */}
        <main
          className="
            flex-1
            overflow-y-auto
            overflow-x-hidden
            bg-gray-50
          "
        >
          <div className="p-2 sm:p-3 md:p-4 min-h-full">
            <Outlet />
          </div>
        </main>
      
      </div>

    </div>
  );
}