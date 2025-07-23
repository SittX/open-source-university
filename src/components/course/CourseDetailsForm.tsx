"use client";

import { z } from "zod";
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
import { CourseDetailsSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Course } from "@prisma/client";
import {
  AlertCircle,
  Currency,
  Edit,
  File,
  Info,
  MoveRight,
  Save,
  Tag,
  Trash,
} from "lucide-react";
import React, { useActionState } from "react";
import { useForm } from "react-hook-form";
import { courseDetailsFormAction } from "../../actions/courses/action";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

type DetailsFormProps = {
  course: Course;
  categories: Category[];
};

const CourseDetailsForm = ({ course: data, categories }: DetailsFormProps) => {
  const [error, action, isLoading] = useActionState(
    courseDetailsFormAction,
    ""
  );

  const form = useForm<z.infer<typeof CourseDetailsSchema>>({
    resolver: zodResolver(CourseDetailsSchema),
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
  const progressPercentage = (completedFields / totalFields) * 100;

  return (
    <Form {...form}>
      <form action={action} className="space-y-4">
        {/* Required fields indicator */}
        {progressPercentage != 100 ? (
          <Card className="border-1 shadow-sm bg-white/70 backdrop-blur-sm p-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {totalFields - completedFields} required fields remaining
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {completedFields}/{totalFields} completed
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </CardContent>
          </Card>
        ) : (
          ""
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <input type="hidden" name="courseId" value={data.id} />

              <input
                type="hidden"
                name="categoryId"
                value={form.watch("categoryId")}
              />
              <input
                type="hidden"
                name="imageUrl"
                value={form.watch("imageUrl")}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-md font-semibold">
                        Course Title
                      </FormLabel>

                      <FormControl>
                        <Input {...field} disabled={isLoading} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="text-md font-semibold">
                          Course Price
                        </FormLabel>
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
                        <FormLabel className="text-md font-semibold">
                          Course Category
                        </FormLabel>

                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={isLoading}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full min-w-0 truncate">
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
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-md font-semibold">
                        Course Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          required
                          disabled={isLoading}
                          placeholder="Describe the course overall context"
                          className="max-h-[150px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between items-center">
                  <span className="text-lg">Course Image</span>
                  <div className="flex gap-3">
                    <Button>
                      <Edit />
                      Replace
                    </Button>
                    <Button
                      variant={"outline"}
                      className="hover:border-red-400 hover:bg-red-100 text-red-500 hover:text-red-500 border-red-400"
                    >
                      <Trash />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="imageUrl"
                render={() => {
                  return (
                    <FormItem className="col-span-2">
                      <FormControl>
                        {data.imageUrl ? (
                          <div>
                            <Image
                              src={data.imageUrl}
                              alt="course image"
                              width={500}
                              height={500}
                              className="mx-auto rounded-lg"
                            />
                          </div>
                        ) : (
                          <FileUpload
                            config={{
                              bucket: "course-attachments",
                              path: `${data.id}/images`,
                              maxFiles: 1,
                              maxFileSize: 5,
                              acceptedFileTypes: ["image/*"],
                            }}
                            onUploadComplete={(file) => {
                              console.log(
                                "Uploaded File public url : ",
                                file.publicUrl
                              );
                              form.setValue("imageUrl", file.publicUrl ?? "");
                            }}
                          />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => redirect(`/courses`)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading} variant="outline">
              <Save />
              Save draft
            </Button>

            <Button type="submit" disabled={isLoading}>
              <MoveRight />
              Save & continue
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CourseDetailsForm;
