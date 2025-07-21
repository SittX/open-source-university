import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Chapter, Lesson } from "@prisma/client";
import {
  ChevronDown,
  ChevronRight,
  Edit3,
  GripVertical,
  Plus,
  Trash2,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { ChapterWithLessons } from "./CourseChaptersForm";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import CourseLesson from "./CourseLesson";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import LessonForm from "./LessonForm";

type CourseChapterCardProps = {
  index: number;
  chapter: ChapterWithLessons;
  onExpended: () => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onToggleChapterPublish: (chapterId: string) => void;
  onToggleExpand: (id: string) => void;
  onEditLesson: (chapter: Chapter, lesson: Lesson) => void;
  onDeleteLesson: (chapterId: string, lessonId: string) => void;
  onToggleLessonPublish: (chapterId: string, lessonId: string) => void;
};

const CourseChapterCard = ({
  index,
  chapter,
  onEdit,
  onDelete,
  onExpended,
  onToggleChapterPublish: onChapterTogglePublish,
  onToggleExpand,
  onEditLesson,
  onDeleteLesson,
  onToggleLessonPublish,
}: CourseChapterCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: chapter.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: 10,
    margin: 5,
    border: "1px solid #ccc",
    background: "white",
    cursor: "grab",
  };

  const lessonSensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // start dragging after moving 5px
      },
    })
  );

  const handleLessonDragEnd = (event: DragEndEvent) => {};

  const handleLessonDragStart = (event: DragStartEvent) => {};

  return (
    <div className="p-6 border border-black rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="flex items-center gap-2">
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <GripVertical className="w-4 h-4 text-gray-400" />
            </div>
            <button
              onClick={() => onToggleExpand(chapter.id)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              {chapter.isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-lg font-semibold text-gray-900">
                Chapter {index + 1}: {chapter.title}
              </h3>
              <Badge variant={chapter.isPublished ? "default" : "secondary"}>
                {chapter.isPublished ? "Published" : "Draft"}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">
              {chapter.description}
            </p>
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
              <span>{chapter.lessons.length} lessons</span>
              <span>
                {/* {formatDuration(
                  chapter.lessons.reduce(
                    (sum, lesson) => sum + (lesson.duration || 0),
                    0
                  )
                )} */}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={chapter.isPublished}
            onCheckedChange={() => onChapterTogglePublish(chapter.id)}
          />
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-gray-100"
          >
            <Edit3 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {chapter.isExpanded && (
        <div className="p-6 space-y-4">
          {/* Add Lesson Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add New Lesson</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Lesson</DialogTitle>
                <DialogDescription>
                  Add a new lesson to your chapter.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <LessonForm
                  courseId={chapter.courseId}
                  chapterId={chapter.id}
                />
              </div>
            </DialogContent>
          </Dialog>

          {/* Lessons List with separate Drag Context */}
          {chapter.lessons.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">No lessons in this chapter yet</p>
            </div>
          ) : (
            <DndContext
              sensors={lessonSensors}
              collisionDetection={closestCenter}
              onDragStart={handleLessonDragStart}
              onDragEnd={handleLessonDragEnd}
            >
              <SortableContext
                items={chapter.lessons.map((lesson) => lesson.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3">
                  {chapter.lessons.map((lesson, lessonIndex) => (
                    <CourseLesson
                      key={lesson.id}
                      lesson={lesson}
                      index={lessonIndex}
                      chapterId={chapter.id}
                      onEdit={() => onEditLesson(chapter, lesson)}
                      onDelete={() => onDeleteLesson(chapter.id, lesson.id)}
                      onTogglePublished={() =>
                        onToggleLessonPublish(chapter.id, lesson.id)
                      }
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseChapterCard;
