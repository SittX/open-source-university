import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./_components/sidebar/app-sidebar";
import Navbar from "./_components/navbar";
import AvatarButton from "./_components/avatar-button";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-[100vh] flex flex-col">
        <div className="h-[50px] flex justify-between items-center border-b p-4 shadow-sm">
          <Navbar />
          <AvatarButton />
        </div>
        <div className="flex-1 p-2">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
