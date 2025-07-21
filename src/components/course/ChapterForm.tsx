"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { ChapterSchema } from "@/lib/schema";
import z from "zod";
import { Textarea } from "../ui/textarea";
import { courseChapterFormAction } from "@/actions/courses/action";
import { Button } from "../ui/button";
import { Chapter } from "@prisma/client";

type ChapterFormProps = {
  courseId: string;
};

const ChapterForm = ({ courseId }: ChapterFormProps) => {
  // Initialize forms for chapter and lesson
  const chapterForm = useForm<z.infer<typeof ChapterSchema>>({
    defaultValues: {
      title: "",
      description: "",
      order: 0,
      duration: 0,
      isPublished: false,
      courseId: "",
    },
  });

  return (
    <Form {...chapterForm}>
      <form
        onSubmit={chapterForm.handleSubmit(async (data) => {
          console.log("Chapter Form Data", data);
          // Ensure courseId is set from props if not present
          // Convert payload to FormData
          const formData = new FormData();
          formData.append("title", data.title);
          formData.append("description", data.description);
          formData.append("order", data.order.toString());
          formData.append("duration", data.duration.toString());
          formData.append("isPublished", data.isPublished.toString());
          formData.append("courseId", courseId);

          await courseChapterFormAction(formData);
          chapterForm.reset();
        })}
      >
        <FormField
          control={chapterForm.control}
          name="title"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-md">Title</FormLabel>

                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={chapterForm.control}
          name="description"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-md">Description</FormLabel>

                <FormControl>
                  <Textarea {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit" className="mt-4">
          Save Chapter
        </Button>
      </form>
    </Form>
  );
};

export default ChapterForm;
