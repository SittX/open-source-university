"use client";
import { useSortable } from "@dnd-kit/sortable";
import { Lesson } from "@prisma/client";
import { CSS } from "@dnd-kit/utilities";
import {
  Clock,
  Edit3,
  Eye,
  EyeOff,
  FileIcon,
  GripVertical,
  HelpCircle,
  Play,
  Trash2,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

type CourseLessonProps = {
  index: number;
  lesson: Lesson;
  chapterId: string;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePublished: () => void;
};
const CourseLesson = ({
  index,
  lesson,
  onDelete,
  onEdit,
  onTogglePublished,
}: CourseLessonProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lesson.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return Play;
      case "document":
        return FileIcon;
      case "quiz":
        return HelpCircle;
      default:
        return FileIcon;
    }
  };

  const LessonIcon = getLessonIcon(lesson.type);
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50/50 transition-colors group ${
        isDragging ? "shadow-lg ring-2 ring-blue-400 bg-white" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <GripVertical className="w-4 h-4 text-gray-400" />
        </div>
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
          <LessonIcon className="w-4 h-4 text-blue-600" />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-sm font-semibold text-gray-900">
            {index + 1}. {lesson.title}
          </h4>
          <div className="flex items-center gap-1">
            <Badge
              variant={lesson.isPublished ? "default" : "secondary"}
              className="text-xs"
            >
              {lesson.isPublished ? "Published" : "Draft"}
            </Badge>
            {/* {lesson.isFree && (
              <Badge variant="outline" className="text-xs">
                Free
              </Badge>
            )} */}
          </div>
        </div>
        <p className="text-xs text-gray-600 line-clamp-1">
          {lesson.description}
        </p>
        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {lesson.duration}m
          </span>
          <span className="capitalize">{lesson.type}</span>
          {/* {lesson.type === "quiz" && lesson.quizQuestions && (
            <span>{lesson.quizQuestions} questions</span>
          )} */}
        </div>
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="sm"
          onClick={onTogglePublished}
          className="h-8 w-8 p-0 hover:bg-blue-100"
        >
          {lesson.isPublished ? (
            <Eye className="w-4 h-4" />
          ) : (
            <EyeOff className="w-4 h-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className="h-8 w-8 p-0 hover:bg-gray-100"
        >
          <Edit3 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default CourseLesson;
