"use client";

import ProtectedRoute from "../privateRoute/ProtectedRoute";
import DashboardSideBar from "./dashboardDrawer/SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      {/* This sidebar and children are now 100% private */}
      <DashboardSideBar>{children}</DashboardSideBar>
    </ProtectedRoute>
  );
}
