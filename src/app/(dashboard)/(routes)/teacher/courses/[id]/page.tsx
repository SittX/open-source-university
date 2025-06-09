import { prisma } from "@/lib/db";
import React from "react";
import { redirect } from "next/navigation";
import {
  CourseDescriptionForm,
  CourseImageForm,
  CoursePriceForm,
  CourseTitleForm,
} from "../_components";

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

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionIndicationText = `(${totalFields}/${completedFields}) required fields remaining`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course Setup</h1>
          <span>{completionIndicationText}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <CourseTitleForm initialData={{ id: course.id, title: course.title }} />
        <CourseDescriptionForm
          initialData={{
            id: course.id,
            description: course.description,
          }}
        />
        <CourseImageForm
          initialData={{
            id: course.id,
            imageUrl: course.imageUrl,
          }}
        />
        <CoursePriceForm initialData={{ id: course.id, price: course.price }} />
      </div>
    </div>
  );
};

export default CourseDetailsPage;
