import { Home, Search, BookOpen, NotebookPen, Bell, User, Settings, Info } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SidebarRoute = {
    title: string;
    url: string;
    icon: LucideIcon;
    allowedRoles?: string[];
};

export type SidebarGroup = {
    label: string;
    routes: SidebarRoute[];
};

export const sidebarConfig: SidebarGroup[] = [
    {
        label: "Application",
        routes: [
            { title: "Dashboard", url: "/", icon: Home, allowedRoles: ["student", "teacher", "admin"] },
            { title: "Browse", url: "/search", icon: Search, allowedRoles: ["student", "teacher"] },
            { title: "My Courses", url: "/courses", icon: BookOpen, allowedRoles: ["student", "teacher"] },
            { title: "Assignments", url: "/assignments", icon: NotebookPen, allowedRoles: ["student", "teacher"] }
        ]
    },
    {
        label: "Account",
        routes: [
            { title: "Notifications", url: "/notifications", icon: Bell },
            { title: "Profile", url: "/profile", icon: User },
            { title: "Settings", url: "/settings", icon: Settings },
            { title: "Help", url: "/help", icon: Info }
        ]
    }
]; 