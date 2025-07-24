"use client";

import React, { useState, useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Type definitions
export type ActivityType =
  | "lesson"
  | "assignment"
  | "quiz"
  | "discussion"
  | "resource"
  | "other";

export interface ActivityDataPoint {
  date: string; // ISO date string (YYYY-MM-DD)
  count: number;
  activityTypes: ActivityType[];
}

export interface ActivityChartProps {
  data: ActivityDataPoint[];
  monthsToShow?: number;
  title?: string;
  className?: string;
}

// Helper functions
const parseDate = (dateString: string): Date => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${dateString}`);
  }
  return date;
};

const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

const getMonthName = (date: Date): string => {
  return date.toLocaleString("default", { month: "short" });
};

// Activity level colors (GitHub-style)
const LEVEL_COLORS = [
  "bg-gray-200", // Level 0
  "bg-green-300", // Level 1
  "bg-green-400", // Level 2
  "bg-green-500", // Level 3
  "bg-green-600", // Level 4
];

// Main component
const ActivityChart: React.FC<ActivityChartProps> = ({
  data,
  monthsToShow = 12,
  title = "Learning Activity",
  className = "",
}) => {
  // Process data into a map for efficient lookup
  const processedData = useMemo(() => {
    const dataMap: Record<string, ActivityDataPoint> = {};

    data.forEach((point) => {
      try {
        const date = parseDate(point.date);
        const dateStr = formatDate(date);
        dataMap[dateStr] = point;
      } catch (error) {
        console.warn(`Skipping invalid date entry: ${point.date}`);
      }
    });

    return dataMap;
  }, [data]);

  // Generate date range
  const dateRange = useMemo(() => {
    const dates: Date[] = [];
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - monthsToShow);

    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      dates.push(new Date(d));
    }

    return dates;
  }, [monthsToShow]);

  // Get activity level (0-4) based on count
  const getActivityLevel = (count: number): number => {
    if (count === 0) return 0;
    if (count <= 1) return 1;
    if (count <= 3) return 2;
    if (count <= 6) return 3;
    return 4;
  };

  // Group dates by weeks
  const weeks = useMemo(() => {
    const weeks: (Date | null)[][] = [];
    let currentWeek: (Date | null)[] = [];

    dateRange.forEach((date, index) => {
      currentWeek.push(date);

      // Saturday is the end of the week (6 = Saturday)
      if (date.getDay() === 6 || index === dateRange.length - 1) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    });

    // Pad first week with empty days if needed
    if (weeks[0]?.length < 7) {
      const emptyDays = 7 - weeks[0].length;
      for (let i = 0; i < emptyDays; i++) {
        weeks[0].unshift(null);
      }
    }

    return weeks;
  }, [dateRange]);

  // Generate month labels
  const monthLabels = useMemo(() => {
    const labels: { weekIndex: number; month: string }[] = [];
    let lastMonth = -1;

    weeks.forEach((week, weekIndex) => {
      const firstDay = week.find((day) => day !== null);

      if (firstDay && firstDay.getMonth() !== lastMonth) {
        labels.push({
          weekIndex,
          month: getMonthName(firstDay),
        });
        lastMonth = firstDay.getMonth();
      }
    });

    return labels;
  }, [weeks]);

  // Generate day labels
  const dayLabels = useMemo(() => {
    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  }, []);

  return (
    <div className={`p-6 bg-card rounded-lg border shadow-sm ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      <div className="flex flex-col gap-2">
        {/* Month labels */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `30px repeat(${weeks.length}, 1fr)`,
            paddingLeft: "30px",
          }}
        >
          {monthLabels.map((label, index) => (
            <div
              key={index}
              className="text-xs text-muted-foreground text-center"
              style={{ gridColumn: label.weekIndex + 1 }}
            >
              {label.month}
            </div>
          ))}
        </div>

        {/* Activity grid */}
        <div className="flex gap-2">
          {/* Day labels */}
          <div className="flex flex-col justify-between h-40 text-xs text-muted-foreground text-right pr-2">
            {dayLabels.map((day, index) => (
              <div key={index} className="h-4 leading-4">
                {day}
              </div>
            ))}
          </div>

          {/* Activity squares */}
          <div className="flex gap-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((date, dayIndex) => {
                  if (!date) {
                    return <div key={dayIndex} className="w-4 h-4" />;
                  }

                  const dateStr = formatDate(date);
                  const dataPoint = processedData[dateStr];
                  const count = dataPoint?.count || 0;
                  const level = getActivityLevel(count);

                  return (
                    <TooltipProvider key={dayIndex}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={`w-4 h-4 rounded-sm ${LEVEL_COLORS[level]} transition-transform hover:scale-110 hover:z-10 hover:shadow-sm cursor-pointer`}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {count} activities on {date.toLocaleDateString()}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-muted-foreground">Less</span>
          {LEVEL_COLORS.map((color, index) => (
            <div key={index} className={`w-4 h-4 rounded-sm ${color}`} />
          ))}
          <span className="text-xs text-muted-foreground">More</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;
