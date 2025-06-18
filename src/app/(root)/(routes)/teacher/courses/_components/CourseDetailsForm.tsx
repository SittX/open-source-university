"use client";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CourseFormSchema, CourseFormValues } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { Save } from "lucide-react";
import React, { useActionState } from "react";
import { useForm } from "react-hook-form";
import { courseFormAction } from "../../../../../../actions/courses/action";
import { redirect } from "next/navigation";
import { useCourseFormContext } from "@/contexts/CourseFormContext";

type CourseFormProps = {
  data: {
    id: string;
    title: string;
    description: string | null;
    price: number | null;
    imageUrl: string | null;
    categoryId: string | null;
  };

  categories: Category[];
};

const CourseDetailsForm = ({ data, categories }: CourseFormProps) => {
  const [courseId, action, isLoading] = useActionState(
    courseFormAction,
    data.id
  );

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(CourseFormSchema),
    defaultValues: {
      title: data.title,
      description: data.description || "",
      price: data.price || 0,
      imageUrl: data.imageUrl || "",
      categoryId: data.categoryId || "",
    },
  });

  const requiredFields = [
    data.title,
    data.description,
    data.categoryId,
    data.price,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionIndicationText = `(${completedFields}/${totalFields}) required fields remaining`;

  const contextCourse = useCourseFormContext();
  console.log("Context data for Course :", contextCourse);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-slate-600 italic">
        {totalFields === completedFields ? "" : completionIndicationText}
      </p>

      <Form {...form}>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-full"
          action={action}
        >
          <input
            type="hidden"
            name="categoryId"
            value={form.watch("categoryId")}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>

                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Course Description</FormLabel>
                  <FormControl>
                    <Input {...field} required disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Course Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min={0}
                      required
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Course Category</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => {
              return (
                <FormItem className="col-span-2">
                  <FormLabel>Course Image</FormLabel>

                  <FormControl>
                    <FileUpload />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading}>
              <Save />
              Save
            </Button>

            <Button
              variant={"ghost"}
              onClick={() => redirect(`/teacher/courses`)}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CourseDetailsForm;
