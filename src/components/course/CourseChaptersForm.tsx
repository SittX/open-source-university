"use client";
import { Button } from "../ui/button";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Chapter, Course, Lesson } from "@prisma/client";
import ChapterForm from "./ChapterForm";
import CourseChapterCard from "./CourseChapterDndCard";

export type ChapterWithLessons = Chapter & {
  lessons: Lesson[];
  isExpanded: Boolean;
};

export type CourseWithChapters = Course & {
  chapters: ChapterWithLessons[];
};

type ChapterFormProps = {
  course: CourseWithChapters;
};

const CourseChaptersForm = ({ course }: ChapterFormProps) => {
  const [chapters, setChapters] = useState<ChapterWithLessons[]>(
    course.chapters
  );

  const chapterSensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // start dragging after moving 5px
      },
    })
  );

  const chapterDragEndEvent = (event: DragEndEvent) => {
    console.log("Event : ", event);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = chapters.findIndex((item) => item.id === active.id);
    const newIndex = chapters.findIndex((item) => item.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Course Chapters Setup</h2>
      <p>Organize your course content into chapters and lessons</p>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add New Chapter</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Chapter</DialogTitle>
            <DialogDescription>
              Add a new chapter to your course.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <ChapterForm courseId={course.id} />
          </div>
        </DialogContent>
      </Dialog>

      <DndContext
        sensors={chapterSensors}
        collisionDetection={closestCenter}
        onDragEnd={chapterDragEndEvent}
      >
        <SortableContext
          items={chapters}
          strategy={verticalListSortingStrategy}
        >
          {chapters.map((chapter, index) => (
            <CourseChapterCard
              index={index}
              key={chapter.id}
              chapter={{ ...chapter }}
              onDelete={() => {}}
              onEdit={() => {}}
              onExpended={() => {}}
              onToggleChapterPublish={() => {}}
              onToggleExpand={(id: string) => {
                console.log("Toggle expand chapter : ", id);
                console.log("Chapters : ", chapters);
                setChapters((chapters) =>
                  chapters.map((chapter) =>
                    chapter.id === id
                      ? { ...chapter, isExpanded: !chapter.isExpanded }
                      : chapter
                  )
                );
              }}
              onDeleteLesson={() => {}}
              onEditLesson={() => {}}
              onToggleLessonPublish={() => {}}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default CourseChaptersForm;
