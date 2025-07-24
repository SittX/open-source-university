import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { LucideIcon } from "lucide-react";

type HeaderCardProps = {
  title: string;
  icon?: LucideIcon;
  value: string;
  hint?: string;
};

const DashboardHeaderCard = ({ title, icon, value, hint }: HeaderCardProps) => {
  return (
    <Card className="shadow-sm gap-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-md font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </CardContent>
    </Card>
  );
};

export default DashboardHeaderCard;
