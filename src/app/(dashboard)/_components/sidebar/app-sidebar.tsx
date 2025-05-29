"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChartBar, Layout, List, LucideIcon, Search } from "lucide-react";
import AppSideBarHeader from "./app-sidebar-header";
import AppSidebarItem from "./app-sidebar-item";

export type SidebarGroup = {
  label: string;
  routes: SidebarItem[];
};

export type SidebarItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

export function AppSidebar() {
  const studentSidebarGroup: SidebarGroup = {
    label: "Application",
    routes: [
      {
        title: "Dashboard",
        url: "/",
        icon: Layout,
      },
      {
        title: "Browse",
        url: "/search",
        icon: Search,
      },
    ],
  };

  const teacherSidebarGroup: SidebarGroup = {
    label: "Teacher dashboard",
    routes: [
      {
        title: "Courses",
        url: "/teacher/courses",
        icon: List,
      },
      {
        title: "Analytics",
        url: "/teacher/analytics",
        icon: ChartBar,
      },
    ],
  };

  const sidebarGroups: SidebarGroup[] = [
    studentSidebarGroup,
    teacherSidebarGroup,
  ];

  return (
    <Sidebar>
      <AppSideBarHeader />
      <SidebarContent>
        {sidebarGroups.map((sidebar) => {
          return (
            <SidebarGroup key={sidebar.label}>
              <SidebarGroupLabel>{sidebar.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebar.routes.map((route) => (
                    <SidebarMenuItem key={route.title}>
                      <AppSidebarItem
                        url={route.url}
                        title={route.title}
                        icon={route.icon}
                      />
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
