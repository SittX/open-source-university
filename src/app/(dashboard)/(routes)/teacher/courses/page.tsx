import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

import { SquarePlus } from "lucide-react";
import { getAuthContext } from "@/utils/auth/auth.service";
import { prisma } from "@/lib/db";
import CourseCard from "./_components/CourseCard";

const CoursesPage = async () => {
  const context = await getAuthContext();
  const user = await context.getUser();
  const userId = user.data.user!.id;

  const courses = await prisma.course.findMany({
    where: {
      createdBy: userId,
    },
  });

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h2 className="text-2xl">My Courses</h2>
        <Link href={"/teacher/courses/create"}>
          <Button>
            <SquarePlus />
            <span>Create New Course</span>
          </Button>
        </Link>
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          return <CourseCard course={course} key={course.id} />;
        })}
      </div>
    </div>
  );
};

export default CoursesPage;
