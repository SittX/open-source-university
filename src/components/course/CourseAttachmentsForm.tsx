"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUpload } from "@/components/ui/file-upload";
import CourseAttachmentCard from "./CourseAttachmentCard";
import { toast } from "sonner";
import { Attachment, Course } from "@prisma/client";
import { useState } from "react";
import { File, Upload } from "lucide-react";
import { courseAttachmentsFormAction } from "@/actions/courses/action";

type CourseWithAttachments = Course & { attachments: Attachment[] };

type CourseAttachmentProps = {
  course: CourseWithAttachments;
};

const CourseAttachmentsForm = ({ course: course }: CourseAttachmentProps) => {
  const [courses, setCourses] = useState<Attachment[]>([...course.attachments]);

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2">
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
            <div className="flex items-center gap-2">
              <File className="w-4 h-4" />{" "}
              <span>Course Attachments ({courses.length})</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {course.attachments && course.attachments.length > 0 ? (
              course.attachments.map((attachment, index) => [
                <CourseAttachmentCard attachment={attachment} key={index} />,
              ])
            ) : (
              <p>No attachment</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseAttachmentsForm;
