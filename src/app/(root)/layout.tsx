import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "../../components/sidebar/AppSidebar";
import AvatarButton from "../../components/AvatarButton";
import Navbar from "@/components/Navbar";
import NotificationButton from "@/components/NotificationButton";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-[100vh] flex flex-col">
        <div className="h-[50px] flex justify-between items-center border-b p-4 shadow-sm">
          <Navbar />
          <div className="flex justify-between gap-5 items-center">
            <NotificationButton />
            <AvatarButton />
          </div>
        </div>
        <div className="flex-1 p-2">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
