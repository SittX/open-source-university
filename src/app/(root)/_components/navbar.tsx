import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const Navbar = () => {
  return (
    <nav className="h-full flex items-center">
      <SidebarTrigger className="mr-5" />
    </nav>
  );
};

export default Navbar;
