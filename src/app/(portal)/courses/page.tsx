import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

import { getAuthContext } from "@/utils/auth/auth.service";
import { prisma } from "@/lib/db";
import StudentCourseCard from "@/components/course/StudentCourseCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpen, Filter } from "lucide-react";

const CoursesPage = async () => {
  const context = await getAuthContext();
  const user = await context.getUser();
  const userId = user.data.user!.id;

  const courses = await prisma.course.findMany({
    where: {
      createdBy: userId,
    },
  });

  // TODO: Pagination
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">My Courses</h1>
          <p className="text-muted-foreground">
            Continue your learning journey
          </p>
        </div>
        <Link href={"/browse"}>
          <Button>
            <p>Browse New Course</p>
          </Button>
        </Link>
      </div>

      <div className="flex gap-5 justify-between">
        <Input placeholder="Search your courses" />
        <div className="flex gap-3">
          <Select>
            <SelectTrigger className="w-[180px]">
              <Filter />
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="not_started">Not Started</SelectItem>
            </SelectContent>
          </Select>
          <Button>Reset</Button>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <StudentCourseCard course={course} key={index} />
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No courses found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
