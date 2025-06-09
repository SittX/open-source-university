import React from "react";

type TitleFormProps = {
  initialData: {
    id: string;
    title: string;
  };
};

const CourseTitleForm = ({ initialData }: TitleFormProps) => {
  return <div>{initialData.title || "No Title"}</div>;
};

export default CourseTitleForm;
