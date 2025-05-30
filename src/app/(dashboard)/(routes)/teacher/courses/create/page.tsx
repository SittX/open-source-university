"use client";
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
import { courseCreateForm, TCourseCreateForm } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { createCourseAction } from "./action";
import toast from "react-hot-toast";

const CreateCoursePage = () => {
  const form = useForm<TCourseCreateForm>({
    resolver: zodResolver(courseCreateForm),
    defaultValues: {
      title: "",
    },
  });

  return (
    <div className="max-w-2xl mx-auto">
      <Link href={"/teachers/courses"}>
        <Button>Go back to Course Page</Button>
      </Link>

      <Form {...form}>
        <form className="space-y-8 mt-5" action={createCourseAction}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Course Title</FormLabel>
                <FormControl>
                  <Input
                    disabled={form.formState.isSubmitting}
                    placeholder="e.g Introduction to NextJS"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter the course title for new course. You can change it
                  later.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-x-2">
            <Button type="submit">Submit</Button>
            <Link href={"/teachers/courses"}>
              <Button variant={"ghost"}>Cancel</Button>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateCoursePage;
