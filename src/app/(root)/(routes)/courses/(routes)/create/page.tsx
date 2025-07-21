"use client";
import { createCourseAction } from "@/actions/courses/action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CourseInitialFormSchema, TCourseCreateForm } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useActionState } from "react";
import { useForm } from "react-hook-form";

const CreateCoursePage = () => {
  const [error, action, isLoading] = useActionState(createCourseAction, null);
  console.log(error);

  const form = useForm<TCourseCreateForm>({
    resolver: zodResolver(CourseInitialFormSchema),
    defaultValues: {
      title: "",
    },
  });

  return (
    <div className="max-w-2xl mx-auto">
      <Link href={"/courses"}>
        <Button>Go back to Course Page</Button>
      </Link>

      <Form {...form}>
        <form className="space-y-8 mt-5" action={action}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Title</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="e.g Introduction to NextJS"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  What are you going to teach in the course? Don&apos;t worry.
                  You can change it later.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-x-2">
            <Link href={"s/courses"}>
              <Button variant={"ghost"} disabled={isLoading}>
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isLoading}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateCoursePage;
