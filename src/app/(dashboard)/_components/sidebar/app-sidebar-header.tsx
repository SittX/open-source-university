import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SidebarHeader } from "@/components/ui/sidebar";

const AppSideBarHeader = () => {
  return (
    <SidebarHeader>
      <Link href="/" className="flex gap-2 items-center">
        <Image src={"/logo.svg"} alt="logo" width={125} height={125} />
      </Link>
    </SidebarHeader>
  );
};

export default AppSideBarHeader;
