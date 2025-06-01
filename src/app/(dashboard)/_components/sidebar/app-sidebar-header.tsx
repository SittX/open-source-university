import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SidebarHeader } from "@/components/ui/sidebar";

const AppSideBarHeader = () => {
  return (
    <SidebarHeader className="mr-auto p-3">
      <Link href="/" className="flex gap-3 justify-around">
        <span className="text-lg font-bold">Open Source University</span>
        <Image src={"/logo.svg"} alt="logo" width={50} height={50} />
      </Link>
    </SidebarHeader>
  );
};

export default AppSideBarHeader;
