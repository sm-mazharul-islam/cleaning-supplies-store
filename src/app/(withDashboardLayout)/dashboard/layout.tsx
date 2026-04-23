"use client";

import DashboardSideBar from "@/components/dashboard/dashboardDrawer/SideBar";
import ProtectedRoute from "@/components/privateRoute/ProtectedRoute";

/**
 * This is your Dashboard Layout.
 * Any page inside the 'dashboard' folder will now be private.
 */
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute>
      <DashboardSideBar>{children}</DashboardSideBar>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
