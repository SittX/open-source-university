"use client";
import { Course } from "@prisma/client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { redirect } from "next/navigation";

type CourseCardProps = {
  course: Course;
};

const CourseCard = ({ course }: CourseCardProps) => {
  const onCardClick = () => {
    redirect(`/teacher/courses/${course.id}`);
  };
  return (
    <motion.div
      className={`rounded-sm shadow-md p-4 h-full`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        scale: 1.03,
        boxShadow:
          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { duration: 0.2 },
      }}
      onClick={onCardClick}
    >
      <div className="w-full">
        <Image
          src={course.imageUrl || "/default-course-image.jpg"}
          loading="lazy"
          alt="course image"
          width={300}
          height={300}
          className="rounded-sm w-full h-[50%] object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <p className="text-xl font-semibold">{course.title}</p>
        <p className="text-sm text-slate-600">
          {course.description ?? "No Description"}
        </p>
      </div>
    </motion.div>
  );
};

export default CourseCard;
