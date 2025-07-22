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
import { DialogClose } from "@radix-ui/react-dialog";

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
      courseId: courseId,
    },
  });

  return (
    <Form {...chapterForm}>
      <form
        className="space-y-4"
        onSubmit={chapterForm.handleSubmit(async (data) => {
          const formData = new FormData();
          Object.entries(data).forEach(([key, value]) => {
            if (key !== "courseId") {
              formData.append(key, String(value));
            } else {
              formData.append("courseId", courseId); // Always from prop
            }
          });
          await courseChapterFormAction(formData);
          chapterForm.reset();
        })}
      >
        <Input type="hidden" name="courseId" value={courseId} />
        <FormField
          control={chapterForm.control}
          name="title"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-md font-semibold">Title</FormLabel>

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
                <FormLabel className="text-md font-semibold">
                  Description
                </FormLabel>

                <FormControl>
                  <Textarea {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            );
          }}
        />

        <div className="flex items-center justify-end-safe space-x-5">
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>

          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
};

export default ChapterForm;
