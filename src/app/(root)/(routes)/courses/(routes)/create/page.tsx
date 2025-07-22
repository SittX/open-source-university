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
import { CourseInitialFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useActionState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CreateCoursePage = () => {
  const [error, action, isLoading] = useActionState(createCourseAction, null);

  const form = useForm<z.infer<typeof CourseInitialFormSchema>>({
    resolver: zodResolver(CourseInitialFormSchema),
    defaultValues: {
      title: "",
    },
  });

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Form {...form}>
        <form
          action={action}
          className="space-y-5 border-black border-1 p-5 rounded-md"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-2xl font-semibold">Course Title</span>
                </FormLabel>
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

          <div className="space-y-3 space-x-4">
            <Link href={"/"}>
              <Button variant={"outline"} disabled={isLoading}>
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
