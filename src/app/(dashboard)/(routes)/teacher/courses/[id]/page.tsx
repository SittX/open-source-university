import { prisma } from "@/lib/db";
import React from "react";
import { redirect } from "next/navigation";
import CourseForm from "../_components/CourseForm";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const CourseDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;

  if (!id) {
    return redirect("/teacher/courses");
  }

  const course = await prisma.course.findUnique({
    where: {
      id,
    },
  });

  if (!course) {
    return redirect("/teacher/courses");
  }

  const categories = await prisma.category.findMany();

  const requiredFields = [
    course.title,
    course.description,
    course.categoryId,
    course.price,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionIndicationText = `(${completedFields}/${totalFields}) required fields remaining`;

  return (
    <div className="p-6 h-full">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course Setup</h1>
          <span className="text-sm text-slate-500 italic">
            {completedFields === totalFields ? "" : completionIndicationText}
          </span>
          <h2 className="font-xl">Edit course details</h2>
        </div>
      </div>
      <div className="mt-6">
        <CourseForm data={course} categories={categories} />
      </div>
    </div>
  );
};

export default CourseDetailsPage;
