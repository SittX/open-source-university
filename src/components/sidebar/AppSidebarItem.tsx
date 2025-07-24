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
    <SidebarMenuButton
      asChild
      isActive={isActive}
      className={cn(
        "w-full justify-start gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200",
        "hover:bg-accent/50 hover:text-accent-foreground",
        "focus-visible:bg-accent/50 focus-visible:text-accent-foreground",
        "data-[active=true]:bg-primary/8 data-[active=true]:text-primary data-[active=true]:font-semibold",
        "data-[active=true]:shadow-sm data-[active=true]:border data-[active=true]:border-primary/10"
      )}
    >
      <Link href={url}>
        <Icon className="mr-2" />
        <span>{title}</span>
      </Link>
    </SidebarMenuButton>
  );
};

export default AppSidebarItem;
