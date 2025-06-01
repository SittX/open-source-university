import React from "react";

type ImageFormProps = {
  initialData: {
    id: string;
    imageUrl: string | null;
  };
};

const CourseImageForm = ({ initialData }: ImageFormProps) => {
  return <div>{initialData?.imageUrl || 0.0}</div>;
};

export default CourseImageForm;
