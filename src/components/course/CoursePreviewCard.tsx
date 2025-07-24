"use client";

import type { Course } from "@prisma/client";
import type React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, BookOpen, Clock, Play, CheckCircle } from "lucide-react";

// Extended course type to include additional fields for the new design
type ExtendedCourse = Course & {
  instructor?: string;
  duration?: string;
  lessons?: number;
  rating?: number;
  students?: number;
  price?: number;
  level?: "Beginner" | "Intermediate" | "Advanced";
  isEnrolled?: boolean;
  progress?: number;
  lastWatched?: string;
  isCompleted?: boolean;
  category?: string;
};

type CourseCardProps = {
  course: Course | ExtendedCourse;
  variant?: "enrolled" | "available";
};

const CoursePreview = ({ course, variant = "available" }: CourseCardProps) => {
  const router = useRouter();

  // Enhanced dummy data to match the new design requirements
  const enhancedCourse = {
    instructor: course.createdBy || "Unknown Instructor",
    duration: "8h 30m",
    lessons: 24,
    rating: 4.8,
    students: 1247,
    level: "Beginner" as const,
    isEnrolled: variant === "enrolled",
    progress: variant === "enrolled" ? 65 : undefined,
    lastWatched: variant === "enrolled" ? "Lesson 16: API Routes" : undefined,
    isCompleted: false,
    category: "Web Development",
    ...course,
  };

  const onCardClick = () => {
    router.push(`/courses/${enhancedCourse.id}`);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (variant === "enrolled") {
      router.push(`/courses/${enhancedCourse.id}/continue`);
    } else {
      router.push(`/courses/${enhancedCourse.id}/enroll`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        y: -2,
        transition: { duration: 0.2 },
      }}
      onClick={onCardClick}
      className="cursor-pointer group"
      role="button"
      tabIndex={0}
      aria-label={`View details for ${enhancedCourse.title}`}
    >
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 h-full flex flex-col">
        {/* Course Image */}
        <div className="relative">
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={
                enhancedCourse.imageUrl ||
                "/placeholder.svg?height=200&width=300"
              }
              alt={`${enhancedCourse.title} course image`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

            {/* Top badges */}
            <div className="absolute top-3 left-3">
              {variant === "available" && (
                <Badge
                  variant="secondary"
                  className="bg-white/90 text-gray-700"
                >
                  {enhancedCourse.level}
                </Badge>
              )}
            </div>

            <div className="absolute top-3 right-3">
              {variant === "enrolled" ? (
                enhancedCourse.isCompleted ? (
                  <Badge className="bg-green-500 hover:bg-green-500 text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                ) : (
                  <Badge className="bg-blue-500 hover:bg-blue-500 text-white">
                    In Progress
                  </Badge>
                )
              ) : enhancedCourse.price === 0 ? (
                <Badge className="bg-green-500 hover:bg-green-500 text-white">
                  Free
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="bg-white/90 text-gray-700 border-white/90"
                >
                  ${enhancedCourse.price}
                </Badge>
              )}
            </div>

            {/* Continue button for enrolled courses */}
            {variant === "enrolled" && !enhancedCourse.isCompleted && (
              <Button
                size="sm"
                onClick={handleButtonClick}
                className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Play className="w-4 h-4 mr-1" />
                Continue
              </Button>
            )}
          </div>
        </div>

        {/* Course Content */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Title and Instructor */}
          <div className="mb-3">
            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 leading-tight">
              {enhancedCourse.title}
            </h3>
            <p className="text-sm text-gray-600">
              by {enhancedCourse.instructor}
            </p>
          </div>

          {/* Description for available courses */}
          {variant === "available" && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
              {enhancedCourse.description ||
                "Learn the fundamentals and advanced concepts in this comprehensive course."}
            </p>
          )}

          {/* Progress section for enrolled courses */}
          {variant === "enrolled" &&
            enhancedCourse.progress !== undefined &&
            !enhancedCourse.isCompleted && (
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{enhancedCourse.progress}%</span>
                </div>
                <Progress value={enhancedCourse.progress} className="h-2" />
                {enhancedCourse.lastWatched && (
                  <p className="text-xs text-gray-500 mt-2">
                    Last: {enhancedCourse.lastWatched}
                  </p>
                )}
              </div>
            )}

          {/* Course Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            {variant === "available" ? (
              <>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{enhancedCourse.rating}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {enhancedCourse.students?.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {enhancedCourse.duration}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4 w-full">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {enhancedCourse.duration}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {enhancedCourse.lessons} lessons
                </span>
              </div>
            )}
          </div>

          {/* Action Button */}
          {variant === "available" && (
            <Button
              onClick={handleButtonClick}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white mt-auto"
            >
              {enhancedCourse.price === 0
                ? "Enroll Free"
                : `Enroll for $${enhancedCourse.price}`}
            </Button>
          )}

          {variant === "enrolled" && enhancedCourse.isCompleted && (
            <Button
              onClick={handleButtonClick}
              variant="outline"
              className="w-full mt-auto bg-transparent"
            >
              Review Course
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CoursePreview;
