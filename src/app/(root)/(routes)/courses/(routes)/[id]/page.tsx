import { prisma } from "@/lib/db";
import React from "react";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Layers, Paperclip } from "lucide-react";
import CourseDetailsForm from "@/components/course/CourseDetailsForm";
import CourseAttachmentsForm from "@/components/course/CourseAttachmentsForm";
import CourseChaptersForm from "@/components/course/CourseChaptersForm";
import { Course } from "@prisma/client";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const CourseDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;

  if (!id) {
    return redirect("/courses");
  }
  // OpenSourceUniversityDev

  const course = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      attachments: true,
      chapters: {
        include: {
          lessons: true,
        },
      },
    },
  });

  console.log("Course Details Page - Course: ", course);

  if (!course) {
    return redirect("/courses");
  }

  const categories = await prisma.category.findMany();

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-medium">Course Setup</h1>
      <Tabs className="w-full" defaultValue="details">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger
            value="details"
            className="flex items-center gap-2 border-2"
          >
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Course Details</span>
          </TabsTrigger>
          <TabsTrigger value="attachments" className="flex items-center gap-2">
            <Paperclip className="h-4 w-4" />
            <span className="hidden sm:inline">Course Attachments</span>
          </TabsTrigger>
          <TabsTrigger value="chapters" className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            <span className="hidden sm:inline">Chapters Setup</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <CourseDetailsForm course={course} categories={categories} />
        </TabsContent>
        <TabsContent value="attachments">
          <CourseAttachmentsForm course={course} />
        </TabsContent>
        <TabsContent value="chapters">
          <CourseChaptersForm course={course} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseDetailsPage;
