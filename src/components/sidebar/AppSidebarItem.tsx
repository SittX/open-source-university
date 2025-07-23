"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import type { LucideIcon } from "lucide-react";

interface AppSidebarItemProps {
  url: string;
  title: string;
  icon: LucideIcon;
}

const AppSidebarItem = ({ url, title, icon: Icon }: AppSidebarItemProps) => {
  const pathname = usePathname();

  const isActive =
    (pathname == "/" && url == "/") ||
    pathname === url ||
    pathname.startsWith(`${url}/`);

  return (
    <SidebarMenuButton asChild className="p-0 pl-2 rounded-none">
      <Link
        href={url}
        className={cn(
          "hover:text-black hover:bg-gray-300 hover:transition-all",
          isActive && "text-black bg-gray-300"
        )}
      >
        <Icon className="mr-2" />
        <span>{title}</span>
        <div
          className={cn(
            "ml-auto opacity-0 border-r-3 border-gray-500 h-full transition-all",
            isActive && "opacity-100"
          )}
        />
      </Link>
    </SidebarMenuButton>
  );
};

export default AppSidebarItem;
