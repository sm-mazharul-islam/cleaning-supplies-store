// interface DashboardLayoutProps {
//   children: React.ReactNode;
// }
"use client";

import DashboardSideBar from "@/components/dashboard/dashboardDrawer/SideBar";

const DashboardImp = ({ children }: { children: React.ReactNode }) => {
  return <DashboardSideBar>{children}</DashboardSideBar>;
};

export default DashboardImp;
