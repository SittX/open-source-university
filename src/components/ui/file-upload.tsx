"use client";

import type React from "react";
import { useState, useCallback, useRef } from "react";
import {
  Upload,
  X,
  File,
  ImageIcon,
  Music,
  AlertCircle,
  Check,
  Video,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "./alert";
import { Badge } from "./badge";
import { Progress } from "./progress";
import { createClient } from "@/utils/supabase/client";

// Create Supabase client
// const supabase = createClient(
//   "https://hoemcrsqbilgpihehzqt.supabase.co",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvZW1jcnNxYmlsZ3BpaGVoenF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NjMwNDgsImV4cCI6MjA2MzIzOTA0OH0.5Dg2vDefWrN60ORZ9dPv5ZAKHWU2JJODCgZFh0OFEPs"
// );

const supabase = createClient();

// Upload file using standard upload
async function uploadFile(file: File) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("User in the file upload function: ", user);

  const { data, error } = await supabase.storage
    .from("course-attachments")
    .upload(`${user?.id}/${file.name}`, file);

  if (error) {
    console.error("File upload error : ", error);
    // Handle error
  } else {
    console.log("File upload success !!!");
    console.log("Supabase storage data : ", data);
    // Handle success
  }
}

export interface FileUploadConfig {
  maxFileSize?: number; // in MB
  maxFiles?: number;
  acceptedFileTypes?: string[];
  allowMultiple?: boolean;
}

export interface UploadedFile {
  id: string;
  file: File;
  previewUrl?: string;
  progress: number;
  status: "uploading" | "completed" | "error";
  error?: string;
}

interface FileUploadProps {
  config?: FileUploadConfig;
  onFilesChange?: (files: UploadedFile[]) => void;
  onUpload?: (files: File[]) => Promise<void>;
  className?: string;
}

const defaultConfig: FileUploadConfig = {
  maxFileSize: 10, // 10MB
  maxFiles: 5,
  acceptedFileTypes: ["image/*", "application/pdf", "video/*"],
  allowMultiple: true,
};

const getFileIcon = (fileType: string) => {
  if (fileType.startsWith("image/")) return ImageIcon;
  if (fileType.startsWith("video/")) return Video;
  if (fileType.startsWith("audio/")) return Music;
  if (fileType.includes("pdf") || fileType.startsWith("text/")) return File;
  return File;
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  );
};

export function FileUpload({
  config = defaultConfig,
  onFilesChange,
  onUpload,
  className,
}: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mergedConfig = { ...defaultConfig, ...config };

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > mergedConfig.maxFileSize! * 1024 * 1024) {
      return `File size exceeds ${mergedConfig.maxFileSize}MB limit`;
    }

    // Check file type
    if (
      mergedConfig.acceptedFileTypes &&
      mergedConfig.acceptedFileTypes.length > 0
    ) {
      const isValidType = mergedConfig.acceptedFileTypes.some((type) => {
        if (type.endsWith("/*")) {
          return file.type.startsWith(type.slice(0, -1));
        }
        return file.type === type;
      });

      if (!isValidType) {
        return `File type not supported. Accepted types: ${mergedConfig.acceptedFileTypes.join(
          ", "
        )}`;
      }
    }

    return null;
  };

  const createFilePreview = (file: File): string => {
    if (file.type.endsWith("/*")) {
      return URL.createObjectURL(file);
    } else {
      return "";
    }
  };

  const processFiles = async (fileList: FileList) => {
    const newErrors: string[] = [];
    const validFiles: File[] = [];

    // Check total file count
    if (files.length + fileList.length > mergedConfig.maxFiles!) {
      newErrors.push(`Maximum ${mergedConfig.maxFiles} files allowed`);
      setErrors(newErrors);
      return;
    }

    // Validate each file
    Array.from(fileList).forEach((file) => {
      const error = validateFile(file);
      if (error) {
        newErrors.push(`${file.name}: ${error}`);
      } else {
        validFiles.push(file);
      }
    });

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear previous errors
    setErrors([]);

    // Create uploaded file objects
    const newUploadedFiles: UploadedFile[] = await Promise.all(
      validFiles.map(async (file) => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview: await createFilePreview(file),
        progress: 0,
        status: "uploading" as const,
      }))
    );

    const updatedFiles = [...files, ...newUploadedFiles];
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);

    // Simulate upload progress
    newUploadedFiles.forEach((uploadedFile, index) => {
      console.log("Uploading files", uploadedFile);
      uploadFile(uploadedFile.file);
      // simulateUpload(uploadedFile.id);
    });
  };

  const removeFile = (fileId: string) => {
    const updatedFiles = files.filter((file) => file.id !== fileId);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      console.log("Handle Drop callback is invoked");

      const droppedFiles = e.dataTransfer.files;
      if (droppedFiles.length > 0) {
        processFiles(droppedFiles);
      }
    },
    [files, mergedConfig]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      processFiles(selectedFiles);
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    if (onUpload) {
      const completedFiles = files
        .filter((f) => f.status === "completed")
        .map((f) => f.file);

      if (completedFiles.length > 0) {
        await onUpload(completedFiles);
      }
    }
  };

  const acceptedTypes = mergedConfig.acceptedFileTypes?.join(",") || "*";

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Upload Area */}
      <Card
        className={cn(
          "border-2 border-dashed transition-colors duration-200 cursor-pointer",
          isDragOver
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <Upload
            className={cn(
              "h-12 w-12 mb-4 transition-colors",
              isDragOver ? "text-primary" : "text-muted-foreground"
            )}
          />
          <div className="space-y-2">
            <p className="text-lg font-medium">
              {isDragOver ? "Drop files here" : "Drag & drop files here"}
            </p>
            <p className="text-sm text-muted-foreground">
              or click to browse files
            </p>
            <div className="flex flex-wrap gap-2 justify-center text-xs text-muted-foreground">
              <span>Max {mergedConfig.maxFiles} files</span>
              <span>•</span>
              <span>Up to {mergedConfig.maxFileSize}MB each</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        multiple={mergedConfig.allowMultiple}
        accept={acceptedTypes}
        onChange={handleFileSelect}
        className="hidden"
        aria-label="File upload input"
      />

      {/* Error Messages */}
      {errors.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <ul className="list-disc list-inside space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium text-sm">
            Uploaded Files ({files.length}/{mergedConfig.maxFiles})
          </h3>
          <div className="space-y-2">
            {files.map((uploadedFile) => {
              const FileIcon = getFileIcon(uploadedFile.file.type);

              return (
                <Card key={uploadedFile.id} className="p-3">
                  <div className="flex items-start gap-3">
                    {/* File Preview/Icon */}
                    <div className="flex-shrink-0">
                      {uploadedFile.file.type.startsWith("image/") ? (
                        <img
                          src={uploadedFile.previewUrl}
                          alt={uploadedFile.file.name}
                          className="w-12 h-12 object-cover rounded border"
                        />
                      ) : (
                        <video
                          src={uploadedFile.previewUrl}
                          autoPlay
                          loop
                          muted
                          className="w-12 h-12 object-cover rounded border"
                        />
                      )}
                      {/* {uploadedFile.preview ? (
                        <img
                          src={uploadedFile.preview || "/placeholder.svg"}
                          alt={uploadedFile.file.name}
                          className="w-12 h-12 object-cover rounded border"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-muted rounded border flex items-center justify-center">
                          <FileIcon className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )} */}
                    </div>

                    {/* File Info */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm truncate">
                            {uploadedFile.file.name}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>
                              {formatFileSize(uploadedFile.file.size)}
                            </span>
                            <Badge
                              variant={
                                uploadedFile.status === "completed"
                                  ? "default"
                                  : uploadedFile.status === "error"
                                  ? "destructive"
                                  : "secondary"
                              }
                              className="text-xs"
                            >
                              {uploadedFile.status === "completed" && (
                                <Check className="w-3 h-3 mr-1" />
                              )}
                              {uploadedFile.status}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(uploadedFile.id)}
                          className="h-8 w-8 p-0 flex-shrink-0"
                          aria-label={`Remove ${uploadedFile.file.name}`}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Progress Bar */}
                      {uploadedFile.status === "uploading" && (
                        <div className="space-y-1">
                          <Progress
                            value={uploadedFile.progress}
                            className="h-2"
                          />
                          <p className="text-xs text-muted-foreground">
                            {Math.round(uploadedFile.progress)}% uploaded
                          </p>
                        </div>
                      )}

                      {/* Error Message */}
                      {uploadedFile.error && (
                        <p className="text-xs text-destructive">
                          {uploadedFile.error}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Upload Button */}
          {onUpload && files.some((f) => f.status === "completed") && (
            <Button onClick={handleUpload} className="w-full">
              Upload {files.filter((f) => f.status === "completed").length}{" "}
              Files
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
