import ActivityChart, {
  ActivityDataPoint,
} from "@/components/dashboard/ActivityChart";
import DashboardHeaderCard from "@/components/dashboard/DashboardHeaderCard";
import DashboardListItem from "@/components/dashboard/DashboardListItem";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const headerCards = [
    { title: "Enrolled courses", value: "4", hint: "2 in progress" },
    { title: "Study Hours", value: "5.5", hint: "Average 2 hours per day" },
    { title: "Study Hours", value: "5.5", hint: "Average 2 hours per day" },
    { title: "Study Hours", value: "5.5", hint: "Average 2 hours per day" },
  ];

  const activityData: ActivityDataPoint[] = [
    { date: "2025-04-10", count: 1, activityTypes: ["lesson", "assignment"] },
    { date: "2025-04-11", count: 5, activityTypes: ["quiz", "resource"] },
    { date: "2025-04-12", count: 7, activityTypes: ["discussion", "lesson"] },
    { date: "2025-05-13", count: 8, activityTypes: ["assignment", "resource"] },
    { date: "2025-05-14", count: 9, activityTypes: ["lesson", "quiz"] },
    {
      date: "2025-05-15",
      count: 10,
      activityTypes: ["discussion", "assignment"],
    },
    { date: "2025-06-16", count: 7, activityTypes: ["resource", "lesson"] },
    { date: "2025-06-17", count: 2, activityTypes: ["quiz", "assignment"] },
    { date: "2025-06-18", count: 9, activityTypes: ["lesson", "resource"] },
    { date: "2025-06-19", count: 1, activityTypes: ["discussion", "quiz"] },
    { date: "2025-07-20", count: 8, activityTypes: ["assignment", "lesson"] },
    { date: "2025-07-21", count: 2, activityTypes: ["resource", "quiz"] },
    { date: "2025-07-22", count: 1, activityTypes: ["lesson", "discussion"] },
    { date: "2025-07-23", count: 7, activityTypes: ["assignment", "resource"] },
    { date: "2025-07-24", count: 1, activityTypes: ["quiz", "lesson"] },
    {
      date: "2025-07-25",
      count: 9,
      activityTypes: ["discussion", "assignment"],
    },
    { date: "2025-07-26", count: 10, activityTypes: ["resource", "lesson"] },
    { date: "2025-07-27", count: 8, activityTypes: ["quiz", "assignment"] },
    { date: "2025-07-28", count: 9, activityTypes: ["lesson", "resource"] },
    { date: "2025-07-29", count: 10, activityTypes: ["discussion", "quiz"] },
  ];

  const recentActivity = [
    { title: "Data Structure & Algorithms", description: "Learn DSA" },
    { title: "Data Structure & Algorithms", description: "Learn DSA" },
    { title: "Data Structure & Algorithms", description: "Learn DSA" },
    { title: "Data Structure & Algorithms", description: "Learn DSA" },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold">Welcome back, Jack!</h1>
        <p className="text-muted-foreground">Let's continue learning!</p>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {headerCards.map((card, index) => (
          <DashboardHeaderCard
            title={card.title}
            value={card.value}
            hint={card.hint}
            key={index}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Recent Course
            </CardTitle>
            <CardDescription>Your last access course</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <DashboardListItem
                  title={activity.title}
                  description={activity.description}
                  key={index}
                />
              ))}
              <Link href={"/courses"}>
                <Button
                  variant="outline"
                  className="bg-black text-white w-full border-0 hover:bg-black hover:text-white hover:cursor-pointer"
                >
                  View All Courses
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Assignments</CardTitle>
            <CardDescription>Your course assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <DashboardListItem
                  title={activity.title}
                  description={activity.description}
                  key={index}
                />
              ))}
              <Link href={"/assignments"}>
                <Button
                  variant="outline"
                  className="bg-black text-white w-full border-0 hover:bg-black hover:text-white hover:cursor-pointer"
                >
                  View More
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <ActivityChart
          data={activityData}
          monthsToShow={6}
          title="My Learning Activity"
        />
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <DashboardListItem
                  title={activity.title}
                  description={activity.description}
                  key={index}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
