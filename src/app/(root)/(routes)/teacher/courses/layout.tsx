import { CourseFormProvider } from "@/contexts/CourseFormContext";
import React from "react";

const CourseLayout = ({ children }: { children: React.ReactNode }) => {
  return <CourseFormProvider>{children}</CourseFormProvider>;
};

export default CourseLayout;
