import React from "react";

type PriceFormProps = {
  initialData: {
    id: string;
    price: number | null;
  };
};

const CoursePriceForm = ({ initialData }: PriceFormProps) => {
  return <div>{initialData?.price || 0.0}</div>;
};

export default CoursePriceForm;
