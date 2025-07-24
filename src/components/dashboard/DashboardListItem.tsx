import React from "react";
import { Progress } from "../ui/progress";
import { Award } from "lucide-react";

type DashboardListItemProps = {
  title: string;
  description: string;
  progress?: number;
};

const DashboardListItem = ({
  title,
  description,
  progress,
}: DashboardListItemProps) => {
  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex items-center space-x-4 min-w-0 flex-1">
        <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium truncate">{title}</p>
          <p className="text-xs text-muted-foreground truncate">
            {description}
          </p>
        </div>
      </div>
      {progress == null ? null : (
        <div className="text-right flex-shrink-0">
          <Progress value={progress} className="w-16 h-2" />
          <p className="text-xs text-muted-foreground mt-1">{progress}%</p>
        </div>
      )}
    </div>
  );
};

export default DashboardListItem;
