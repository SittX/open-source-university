import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Attachment } from "@prisma/client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
  Calendar,
  Check,
  Download,
  Edit3,
  FileIcon,
  HardDrive,
  Trash2,
} from "lucide-react";
import React from "react";

type CourseAttachmentProps = {
  data: Attachment;
};

const CourseAttachmentCard = ({ data }: CourseAttachmentProps) => {
  console.log("Course Data", data);
  return (
    <div
      key={data.id}
      className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50/50 transition-colors group"
    >
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <FileIcon className="w-5 h-5 text-blue-600" />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-semibold text-gray-900 truncate">
              {data.name}
            </h4>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
              {data.description || "No description"}
            </p>
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <HardDrive className="w-3 h-3" />
                {/* {formatFileSize(attachment.size)} */}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {/* {formatDate(attachment.uploadDate)} */}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 transition-opacity">
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
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>File Name</Label>
                <Input id="edit-name" placeholder="Enter file name" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  id="edit-description"
                  placeholder="Enter file description"
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>
                  <Check className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
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
    </div>
  );
};

export default CourseAttachmentCard;
