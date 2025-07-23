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
import AppSideBarHeader from "./AppSidebarHeader";
import AppSidebarItem from "./AppSidebarItem";
import {
  sidebarConfig,
  SidebarGroup as SidebarGroupType,
} from "@/configs/sidebar.config";

export function AppSidebar() {
  const role = "student";
  return (
    <Sidebar>
      <AppSideBarHeader />
      <SidebarContent>
        {sidebarConfig.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarMenu>
              {group.routes
                .filter(
                  (route) =>
                    !route.allowedRoles || route.allowedRoles.includes(role)
                )
                .map((route) => {
                  return (
                    <SidebarMenuItem key={route.url}>
                      <AppSidebarItem
                        url={route.url}
                        title={route.title}
                        icon={route.icon}
                      />
                    </SidebarMenuItem>
                  );
                })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
