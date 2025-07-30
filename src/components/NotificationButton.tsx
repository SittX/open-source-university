import React from "react";
import { Bell } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

// TODO: Dropdown list for notification
const NotificationButton = () => {
  return (
    <Button size="icon" variant={"ghost"}>
      <Link href={"/notifications"}>
        <Bell className="w-5 h-5 hover:cursor-pointer" />
      </Link>
    </Button>
  );
};

export default NotificationButton;
