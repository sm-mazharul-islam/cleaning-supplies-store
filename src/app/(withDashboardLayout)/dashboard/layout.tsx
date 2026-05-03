"use client";

import DashboardSideBar from "@/components/dashboard/dashboardDrawer/SideBar";
import ProtectedRoute from "@/components/privateRoute/ProtectedRoute";

/**
 * Dashboard Layout with Theme Support
 * This wrapper ensures the background and text colors adapt to the system/toggle theme.
 */
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen  transition-colors duration-500">
        <DashboardSideBar>
          <main className="p-4 md:p-8">{children}</main>
        </DashboardSideBar>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
