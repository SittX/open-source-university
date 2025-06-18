"use client";
import { createContext, useContext } from "react";

const CourseFormContext = createContext("Hello");

export const CourseFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <CourseFormContext.Provider value={"Hello world"}>
      {children}
    </CourseFormContext.Provider>
  );
};

export const useCourseFormContext = () => {
  return useContext(CourseFormContext);
};
