"use client";
import Link from "next/link";
import React from "react";
import { SidebarItem } from "./app-sidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SidebarMenuButton } from "@/components/ui/sidebar";

const AppSidebarItem = ({ url, title, icon: Icon }: SidebarItem) => {
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
          "hover:text-black hover:bg-slate-300 hover:transition-all",
          isActive && "text-black bg-slate-200"
        )}
      >
        <Icon />
        <span>{title}</span>
        <div
          className={cn(
            "ml-auto opacity-0 border-r-3 border-sky-600 h-full transition-all",
            isActive && "opacity-100"
          )}
        />
      </Link>
    </SidebarMenuButton>
  );
};

export default AppSidebarItem;
