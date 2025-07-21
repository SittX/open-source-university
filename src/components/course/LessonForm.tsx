import { LessonSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form } from "../ui/form";

const LessonForm = () => {
  const lessonForm = useForm<z.infer<typeof LessonSchema>>({
    defaultValues: {
      title: "",
      description: "",
      order: 0,
      duration: 0,
      chapterId: 0,
    },
  });

  return (
    <Form {...lessonForm}>
      <form></form>
    </Form>
  );
};

export default LessonForm;
