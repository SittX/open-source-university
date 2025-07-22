"use client";
import {
  courseAttachmentsFormAction,
  courseAttachmentsUpdateFormAction,
} from "@/actions/courses/action";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatFileSize } from "@/utils/file-utils";
import { Attachment } from "@prisma/client";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
  Calendar,
  Check,
  Download,
  Edit3,
  File,
  FileIcon,
  HardDrive,
  Info,
  Trash2,
  Type,
} from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

type CourseAttachmentProps = {
  attachment: Attachment;
};

const CourseAttachmentCard = ({ attachment }: CourseAttachmentProps) => {
  const form = useForm({
    defaultValues: {
      name: attachment.name,
      description: attachment.description ?? "",
      attachmentId: attachment.id,
    },
  });

  return (
    <Card>
      <CardContent className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-black rounded-md flex items-center justify-center">
            <FileIcon className="w-5 h-5 text-white" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-semibold text-gray-900 truncate">
                {attachment.name}
              </h4>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                {attachment.description || "No description"}
              </p>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <HardDrive className="w-3 h-3" />
                  {formatFileSize(attachment.fileSize)}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {attachment.createdAt.toString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 transition-opacity opacity-40 hover:opacity-100">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
          >
            <Download className="w-4 h-4" />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-gray-100"
              >
                <Edit3 className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Attachment</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form action={courseAttachmentsUpdateFormAction}>
                  <input
                    type="hidden"
                    name="attachmentId"
                    value={form.watch("attachmentId")}
                  />

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel className="text-md">
                                <File className="w-4 h-4" />
                                Course Title
                              </FormLabel>

                              <FormControl>
                                <Input {...field} />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel className="text-md">
                                <Info className="w-4 h-4" />
                                Course Description
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  placeholder="Describe the course overall context"
                                  className="max-h-[150px]"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancel</Button>
                      <Button type="submit">
                        <Check className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseAttachmentCard;
