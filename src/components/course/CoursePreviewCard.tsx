"use client";

import type { Course } from "@prisma/client";
import type React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star,
  Users,
  BookOpen,
  Clock,
  Play,
  CheckCircle,
  Eye,
  Heart,
  Plus,
  User,
  Zap,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

// Extended Course type to include additional fields for the new design
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
  tags?: string[];
  favorites?: string[];
};

type CourseCardProps = {
  course: Course | ExtendedCourse;
  variant?: "enrolled" | "available";
};

const CoursePreviewCard = ({
  course,
  variant = "available",
}: CourseCardProps) => {
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
    featured: "str",
    bestseller: true,
    new: false,
    originalPrice: 2000,
    tags: ["JavaScript"],
    favorites: ["1232"],
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
      <Card
        key={enhancedCourse.id}
        className="group hover:shadow-lg transition-all duration-200 border-0 shadow-md h-full flex flex-col"
      >
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={"/default-course-image.jpg"}
            alt={enhancedCourse.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            {enhancedCourse.featured && (
              <Badge className="bg-yellow-500 text-yellow-900 hover:bg-yellow-600">
                <Zap className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
            {enhancedCourse.bestseller && (
              <Badge className="bg-orange-500 text-white hover:bg-orange-600">
                Bestseller
              </Badge>
            )}
            {enhancedCourse.new && (
              <Badge className="bg-green-500 text-white hover:bg-green-600">
                New
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-3 right-3 h-8 w-8 p-0 bg-white/90 hover:bg-white"
          >
            <Heart
              className={`h-4 w-4 ${
                enhancedCourse.favorites?.includes(enhancedCourse.id)
                  ? "fill-red-500 text-red-500"
                  : "text-gray-600"
              }`}
            />
          </Button>
        </div>

        <CardHeader className="pb-3 flex-shrink-0">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {enhancedCourse.title}
            </CardTitle>
            <div className="text-right flex-shrink-0">
              <div className="text-xl font-bold">${enhancedCourse.price}</div>
              {enhancedCourse.originalPrice > 0 && (
                <div className="text-sm text-muted-foreground line-through">
                  ${enhancedCourse.originalPrice}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{enhancedCourse.instructor}</span>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col flex-1 p-4">
          <div className="flex-grow space-y-4">
            <p className="text-sm text-muted-foreground line-clamp-2 flex-shrink-0">
              {enhancedCourse.description}
            </p>

            {/* course Info */}
            <div className="flex items-center justify-between text-sm text-muted-foreground flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{enhancedCourse.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{enhancedCourse.rating}</span>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {enhancedCourse.level}
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground flex-shrink-0">
              <Users className="h-4 w-4" />
              <span>{enhancedCourse.students.toLocaleString()} students</span>
            </div>
            {/* Tags */}
            <div className="flex flex-wrap gap-1 flex-shrink-0">
              {(enhancedCourse.tags ?? []).slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-4 mt-auto">
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground min-h-[40px]"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Enroll Now
            </Button>
            <Button
              variant="outline"
              className="sm:min-w-[100px] min-h-[40px] bg-transparent"
              size="sm"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CoursePreviewCard;
