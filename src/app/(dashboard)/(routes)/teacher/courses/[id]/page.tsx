import { prisma } from "@/lib/db";
import React from "react";
import { redirect } from "next/navigation";
import CourseDetailsForm from "../_components/CourseDetailsForm";
import CourseAttachmentsForm from "../_components/CourseAttachmentsForm";
import CourseChaptersForm from "../_components/CourseChaptersForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Layers } from "lucide-react";

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

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-medium">Course Setup</h1>
      <Tabs className="w-full" defaultValue="details">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="details" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Course Details</span>
          </TabsTrigger>
          <TabsTrigger value="attachments" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Attachments</span>
          </TabsTrigger>
          <TabsTrigger value="chapters" className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            <span className="hidden sm:inline">Chapters Setup</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <CourseDetailsForm data={course} categories={categories} />
        </TabsContent>
        <TabsContent value="attachments">
          <CourseAttachmentsForm />
        </TabsContent>
        <TabsContent value="chapters">
          <CourseChaptersForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseDetailsPage;
