


import { useLocation } from "react-router";

export const dashboardTitleOptions: {
  [key: string]: { title: string; subtitle: string };
} = {
  "/dashboard": {
    title: "Dashboard Overview",
    subtitle: "Welcome back! Here's what's happening today."
  },
  "/dashboard/riders": {
    title: "Rider Management",
    subtitle: "View and manage all registered riders"
  },
  "/dashboard/drivers": {
    title: "Driver Management",
    subtitle: "View and manage all registered drivers"
  },
  "/dashboard/documents": {
    title: "Document Verification",
    subtitle: "Track and verify driver compliance documents"
  },
  "/dashboard/enrollments": {
    title: "Enrollment Forms",
    subtitle: "Register new riders and drivers using the official forms"
  },
  "/dashboard/uploads": {
    title: "Document Upload Center",
    subtitle: "Upload documents anytime for drivers and riders"
  },
  "/dashboard/payments": {
    title: "Payment & Billing",
    subtitle: "Track financial transactions and payouts"
  },
  "/dashboard/notifications": {
    title: "Notifications",
    subtitle: "Manage and send notifications to users"
  },
  "/dashboard/useraccounts": {
    title: "User Accounts",
    subtitle: "Manage admin and staff accounts"
  },
  "/dashboard/reports": {
    title: "Reports & Analytics",
    subtitle: "View analytics and export reports"
  },
  "/dashboard/ridesandmonitoring": {
    title: "Rides & Monitoring",
    subtitle: "Manage, monitor, and edit all rides in one place"
  },
  "/dashboard/livemap": {
    title: "Live Map Tracking",
    subtitle: "Real-time driver and trip tracking"
  },
  "/dashboard/manualdispatch": {
    title: "Manual Dispatch",
    subtitle: "Create and assign rides manually for users who need assistance"
  },
  "/dashboard/support": {
    title: "Support & Help Center",
    subtitle: "Manage customer support tickets"
  },
  "/dashboard/activitylog": {
    title: "Activity Log",
    subtitle: "Track all admin actions and system activities"
  },
  "/dashboard/feedback": {
    title: "Feedback & Ratings",
    subtitle: "View rider and driver feedback"
  },
  "/dashboard/system-health": {
    title: "System Health",
    subtitle: "Monitor server status and maintenance alerts"
  },
  "/dashboard/legal": {
    title: "Legal & Compliance",
    subtitle: "Manage legal documents and compliance requirements"
  } 

};

export function useDashboardTitle() {
  const location = useLocation();
  const path = location?.pathname as string;

  // Return the corresponding title and subtitle based on the current path
  const currentTitle = dashboardTitleOptions[path] || {
    title: "Page Not Found",
    subtitle: "The page you are looking for doesn't exist."
  };

  return currentTitle;
}