"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUpload } from "@/components/ui/file-upload";
import CourseAttachmentCard from "./CourseAttachmentCard";
import { toast } from "sonner";
import { Attachment, Course } from "@prisma/client";
import { useState } from "react";
import { File, Upload } from "lucide-react";
import { courseAttachmentsFormAction } from "@/actions/courses/action";

type CourseAttachmentProps = {
  course: Course;
  attachments: Attachment[];
};

const CourseAttachmentsForm = ({
  course,
  attachments,
}: CourseAttachmentProps) => {
  const [courses, setCourses] = useState<Attachment[]>([...attachments]);

  console.log("Course ", course);
  console.log("Attachment ", attachments);
  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-3">
              <Upload className="w-4 h-4" />
              <span>Upload Attachments</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FileUpload
            config={{
              bucket: "course-attachments",
              path: `${course.id}/attachments`,
              maxFiles: 1,
              maxFileSize: 5,
              acceptedFileTypes: ["image/*"],
            }}
            onUploadComplete={(file) => {
              console.log("Uploaded File: ", file);
              toast.success("Successful upload of attachment file");
              // Save to the database
              const formData = new FormData();
              formData.append("fileType", file.file.type);
              formData.append("name", file.file.name);
              formData.append("publicUrl", file.publicUrl ?? "");
              formData.append("fileSize", String(file.file.size));
              formData.append("courseId", course.id);
              courseAttachmentsFormAction(formData);
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <span className="flex items-center gap-2">
              <File className="w-4 h-4" /> Course Attachments ({courses.length})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            {attachments && attachments.length > 0 ? (
              attachments.map((attachment, index) => [
                <CourseAttachmentCard data={attachment} key={index} />,
              ])
            ) : (
              <p>No data yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseAttachmentsForm;
