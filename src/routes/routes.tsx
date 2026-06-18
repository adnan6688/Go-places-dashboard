import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MaiLayout";
import Activity from "../pages/ActivityLog/Activity";
import Dashboard from "../pages/DashboardHome/Dashboard";
import Driver from "../pages/Drivers/Driver";
import Enrollments from "../pages/Enrollments/Enrollments";
import Feedback from "../pages/Feedback/Feedback";
import Legal from "../pages/Legal/Legal";
import Livemap from "../pages/LiveMap/Livemap";
import ManualDispatch from "../pages/ManualDispatch/ManualDispatch";
import Notifications from "../pages/Notifications/Notifications";


import DriverDetails from "../pages/Drivers/DriverDetails";
import Payments from "../pages/Payments/Payments";
import Reports from "../pages/Reports/Reports";
import Rider from "../pages/Riders/Rider";
import RiderDetails from "../pages/Riders/RiderDetails";
import MonitorDteails from "../pages/RidesAndMonitoring/MonitorDteails";
import RidesAndMonitoring from "../pages/RidesAndMonitoring/RidesAndMonitoring";
import Support from "../pages/Support/Support";
import Uploads from "../pages/Uploads/Uploads";
import UserAccount from "../pages/UserAccounts/UserAccount";
import PaymentDetails from "../pages/Payments/PaymentDetails";
import Settings from "../pages/Settings/Settings";
import Login from "../components/Login";
import PrivetRoutes from "./PrivetRoute";
import AuthPrivetRoute from "./AuthPrivetRoute";
import NotFound from "../components/NotFound";


export const router = createBrowserRouter([

    {
        path: '/',
        element: <AuthPrivetRoute>
            <Login></Login>
        </AuthPrivetRoute>
    },
    {
        path: "/dashboard",
        element: <PrivetRoutes>
            <MainLayout />
        </PrivetRoutes>,
        children: [
            {
                index: true,
                Component: Dashboard,
            },

            {
                path: "riders",
                Component: Rider,
            },
            {
                path: "riders/details/:id",
                Component: RiderDetails
            },
            {
                path: "drivers",
                Component: Driver,
            }, {
                path: 'drivers/details/:id',
                Component: DriverDetails
            }
            ,
            {
                path: "enrollments",
                Component: Enrollments
            }, {
                path: 'uploads',
                Component: Uploads
            }, {
                path: 'useraccounts',
                Component: UserAccount
            }, {
                path: 'payments',
                Component: Payments
            },
            {
                path: 'payments/details/:id',
                Component: PaymentDetails
            },
            {

                path: 'notifications',
                Component: Notifications
            },
            {
                path: 'reports',
                Component: Reports
            }, {
                path: 'ridesandmonitoring',
                Component: RidesAndMonitoring
            },
            {
                path: 'ridesandmonitoring/monitorDetails/:id',
                Component: MonitorDteails
            },
            {
                path: 'livemap',
                Component: Livemap
            },
            {
                path: 'manualdispatch',
                Component: ManualDispatch
            },
            {
                path: 'support',
                Component: Support
            },
            {
                path: 'activitylog',
                Component: Activity
            },
            {
                path: 'feedback',
                Component: Feedback
            },

            {
                path: 'legal',
                Component: Legal
            },
            {
                path: 'settings',
                Component: Settings
            }
        ],
    },
    {
        path : '/*',
        element : <NotFound></NotFound>
    }
]);