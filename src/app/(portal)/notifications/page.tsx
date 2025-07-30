import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const Notifications = () => {
  const notificationList = [
    {
      title: "New assignment posted",
      description: "React development-Final project is now available",
      postedDatatime: "2 hours ago",
      type: "ASSIGNMENT",
      isRead: false,
    },
    {
      title: "Course update",
      description: "New resources added to the React course",
      postedDatatime: "1 day ago",
      type: "COURSE UPDATE",
      isRead: false,
    },
    {
      title: "New message from instructor",
      description: "Your question about the last assignment has been answered",
      postedDatatime: "3 days ago",
      type: "MESSAGE",
      isRead: true,
    },
  ];
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with your notifications
          </p>
        </div>
        <Button>Mark All Read</Button>
      </div>
      {notificationList.map((notification, index) => {
        return (
          <Card
            key={index}
            className={`border ${
              notification.isRead ? "" : "border-blue-400 bg-blue-100"
            }`}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div
                  className={`${
                    notification.isRead ? "bg-primary none" : "bg-blue-400"
                  } rounded-2xl w-2 h-2`}
                ></div>
                {notification.title}
              </CardTitle>
              <CardDescription className="flex flex-col space-y-2">
                <h1>{notification.description}</h1>
                <p>{notification.postedDatatime}</p>
              </CardDescription>
              <CardAction>
                <Badge
                  className="text-center font-semibold"
                  variant={"outline"}
                >
                  {notification.type.toLowerCase()}
                </Badge>
              </CardAction>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
};

export default Notifications;
