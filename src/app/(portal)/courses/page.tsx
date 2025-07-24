import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

import { SquarePlus } from "lucide-react";
import { getAuthContext } from "@/utils/auth/auth.service";
import { prisma } from "@/lib/db";
import StudentCourseCard from "@/components/course/StudentCourseCard";

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
          <p className="text-muted-foreground">View all the enrolled courses</p>
        </div>
        <Link href={"/browse"}>
          <Button>
            <p>Browse Course</p>
          </Button>
        </Link>
      </div>

      <div>Sort By / Filter By and search course here</div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length === 0 ? (
          <div>No courses</div>
        ) : (
          courses.map((course, index) => (
            <StudentCourseCard course={course} key={course.id} />
          ))
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
