"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Bell,
  BookOpen,
  ChartBar,
  Home,
  Info,
  Layout,
  List,
  LucideIcon,
  NotebookPen,
  Search,
  Settings,
  User,
} from "lucide-react";
import AppSideBarHeader from "./AppSidebarHeader";
import AppSidebarItem from "./AppSidebarItem";
import { info } from "console";

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
  const applicationSidebarGroup: SidebarGroup = {
    label: "Application",
    routes: [
      {
        title: "Dashboard",
        url: "/",
        icon: Home,
      },
      {
        title: "Browse",
        url: "/search",
        icon: Search,
      },
      {
        title: "My Courses",
        url: "/courses",
        icon: BookOpen,
      },
      {
        title: "Assignments",
        url: "/assignments",
        icon: NotebookPen,
      },
    ],
  };

  const accountSidebarGroup: SidebarGroup = {
    label: "Account",
    routes: [
      {
        title: "Notifications",
        url: "/notifications",
        icon: Bell,
      },
      {
        title: "Profile",
        url: "/profile",
        icon: User,
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings,
      },
      {
        title: "Help",
        url: "/help",
        icon: Info,
      },
    ],
  };

  const sidebarGroups: SidebarGroup[] = [
    applicationSidebarGroup,
    accountSidebarGroup,
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
