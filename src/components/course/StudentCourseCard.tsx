"use client";

import type { Course } from "@prisma/client";
import type React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { BookOpen, CheckCircle, Clock, Play, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

type CourseCardProps = {
  course: Course & {
    // Optional extended properties
    status?: string;
    progress?: number;
    completedLessons?: number;
    totalLessons?: number;
    rating?: number;
    students?: number;
    instructor?: string;
  };
};

const CourseCard = ({ course }: CourseCardProps) => {
  const router = useRouter();

  // Enhanced course data with better defaults
  const courseData = {
    status: "In Progress",
    progress: 50,
    completedLessons: 5,
    totalLessons: 10,
    rating: 4.5,
    students: 120,
    isCompleted: false,
    duration: "8h 20m",
    lessons: 20,
    lastWatched: "Yesterday",
    instructor: course.createdBy || "Unknown Instructor",
    ...course,
  };

  const onCardClick = () => {
    router.push(`/courses/${courseData.id}`);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/courses/${courseData.id}`);
  };

  const getStatusVariant = (status: string) => {
    return status === "Completed" ? "default" : "secondary";
  };

  const getButtonText = (status: string) => {
    return status === "Completed" ? "Review Course" : "Continue Learning";
  };

  const getButtonVariant = (status: string) => {
    return status === "Completed" ? "outline" : "default";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        y: -4,
        transition: { duration: 0.2 },
      }}
      onClick={onCardClick}
      className="cursor-pointer"
      role="button"
      tabIndex={0}
      aria-label={`View details for ${courseData.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onCardClick();
        }
      }}
    >
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 group">
        <div className="relative">
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={courseData.imageUrl || "/placeholder.svg"}
              alt={courseData.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="absolute top-3 right-3">
              {courseData.isCompleted ? (
                <Badge className="bg-green-500 hover:bg-green-500 text-white">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Completed
                </Badge>
              ) : (
                <Badge className="bg-blue-500 hover:bg-blue-500 text-white">
                  In Progress
                </Badge>
              )}
            </div>
            <Button
              size="sm"
              className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Play className="w-4 h-4 mr-1" />
              Continue
            </Button>
          </div>
        </div>

        <div className="p-5">
          <div className="mb-3">
            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
              {courseData.title}
            </h3>
            <p className="text-sm text-gray-600">by {courseData.instructor}</p>
          </div>

          {courseData.progress !== undefined && !courseData.isCompleted && (
            <div className="mb-4">
              <div className="flex text-sm text-gray-600 mb-2">
                <span>{courseData.progress}% completed</span>
              </div>
              <Progress value={courseData.progress} className="h-2" />
              {courseData.lastWatched && (
                <p className="text-xs text-gray-500 mt-2">
                  Last: {courseData.lastWatched}
                </p>
              )}
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {courseData.duration}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {courseData.lessons} lessons
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
