import { Lesson } from "@prisma/client";
import React from "react";

type CourseLessonProps = {
  index: number;
  lesson: Lesson;
  chapterId: string;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePublished: () => void;
};
const CourseLesson = ({}: CourseLessonProps) => {
  return <div>CourseLesson</div>;
};

export default CourseLesson;
