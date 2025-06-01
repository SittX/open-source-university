import React from "react";

type DescriptionFormProps = {
  initialData: {
    id: string;
    description: string | null;
  };
};

const CourseDescriptionForm = ({ initialData }: DescriptionFormProps) => {
  return <div>{initialData?.description || "No description"}</div>;
};

export default CourseDescriptionForm;
