import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const CoursesPage = () => {
  return (
    <div className="p-4">
      <Link href={"/teacher/courses/create"}>
        <Button>Create New Course</Button>
      </Link>
    </div>
  );
};

export default CoursesPage;
