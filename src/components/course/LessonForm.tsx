import { LessonSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { courseChapterLessonFormAction } from "@/actions/courses/action";

type LessonFormProps = {
  chapterId: string;
  courseId: string;
};

const LessonForm = ({ chapterId, courseId }: LessonFormProps) => {
  const lessonTypes = [
    { id: "1", name: "Video" },
    { id: "2", name: "Document" },
  ];
  const lessonForm = useForm<z.infer<typeof LessonSchema>>({
    defaultValues: {
      title: "",
      description: "",
      isPublished: false,
      order: 0,
      duration: 0,
      // Do NOT include chapterId in defaultValues
    },
  });

  return (
    <Form {...lessonForm}>
      <form
        onSubmit={lessonForm.handleSubmit(async (data) => {
          const formData = new FormData();
          Object.entries(data).forEach(([key, value]) => {
            // Only append chapterId from prop, not from data
            if (key !== "chapterId") {
              formData.append(key, String(value));
            }
          });
          formData.append("courseId", courseId);
          formData.append("chapterId", chapterId);
          await courseChapterLessonFormAction(formData as any);
        })}
      >
        <FormField
          control={lessonForm.control}
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
          control={lessonForm.control}
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

        <FormField
          control={lessonForm.control}
          name="isPublished"
          render={({ field }) => {
            return (
              <FormItem className="flex items-center justify-start">
                <FormLabel className="text-md">Published</FormLabel>

                <FormControl>
                  <Switch checked={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={lessonForm.control}
          name="type"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-md">Duration</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {lessonTypes.map((lessonType) => (
                      <SelectItem key={lessonType.id} value={lessonType.id}>
                        {lessonType.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormControl></FormControl>

                <FormMessage />
              </FormItem>
            );
          }}
        />

        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
};

export default LessonForm;
