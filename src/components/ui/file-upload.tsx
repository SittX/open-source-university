"use client";

import type React from "react";
import { useState, useCallback, useRef } from "react";
import {
  Upload,
  X,
  File as FileIcon,
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
import { toast } from "sonner";
import { formatFileSize, getFileIcon } from "@/utils/file-utils";

// Upload file using standard upload
async function uploadFile(
  uploadFile: UploadFile,
  bucket: string,
  filePath: string,
  onUploadComplete?: (file: UploadFile) => void
) {
  const supabase = createClient();
  const fileName = uploadFile.file.name;
  const { data: fileData, error } = await supabase.storage
    .from(bucket)
    .upload(`${filePath}/${fileName}`, uploadFile.file, { upsert: true });

  if (error) {
    // Handle error
  } else {
    // Get public URL and call callback
    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(`${filePath}/${fileName}`);
    if (onUploadComplete && publicUrlData?.publicUrl) {
      toast.success("Uploading file complete!");
      onUploadComplete({ ...uploadFile, publicUrl: publicUrlData.publicUrl });
    }
  }
}

export interface FileUploadConfig {
  maxFileSize?: number; // in MB
  maxFiles?: number;
  acceptedFileTypes?: string[];
  allowMultiple?: boolean;
  bucket: string;
  path: string;
}

export interface UploadFile {
  id: string;
  file: File;
  previewUrl?: string;
  publicUrl?: string;
  progress: number;
  status: "uploading" | "completed" | "error";
  error?: string;
}

interface FileUploadProps {
  config?: FileUploadConfig;
  className?: string;
  onUploadComplete?: (file: UploadFile) => void;
  files?: FileList;
}

const defaultConfig: FileUploadConfig = {
  maxFileSize: 10, // 10MB
  maxFiles: 5,
  acceptedFileTypes: ["image/*", "application/pdf", "video/*"],
  allowMultiple: true,
  bucket: "",
  path: "",
};

export function FileUpload({
  config = defaultConfig,
  className,
  onUploadComplete,
  files: existingFiles,
}: FileUploadProps) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mergedConfig = { ...defaultConfig, ...config };

  const acceptFileTypes = config.acceptedFileTypes?.join(",") || "*";
  /* File util methods */
  const validateFile = (file: File): string | null => {
    /* File size validation */
    if (file.size > mergedConfig.maxFileSize! * 1024 * 1024) {
      return `File size exceeded ${mergedConfig.maxFileSize}MB limit`;
    }

    /* File type validation */
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
        return `File type ${
          file.type
        } is not supported. Accepted types : ${mergedConfig.acceptedFileTypes.join(
          ","
        )}`;
      }
    }

    return null;
  };

  const createFilePreview = async (file: File) => {
    if (file.type.startsWith("image")) {
      return URL.createObjectURL(file);
    }
  };

  const processFiles = async (fileList: FileList) => {
    const errors: string[] = [];
    const validFiles: File[] = [];
    if (files.length + fileList.length > mergedConfig.maxFiles!) {
      errors.push(`Maximum ${mergedConfig.maxFiles} files allowed`);
      return;
    }

    Array.from(fileList).forEach((file) => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name} : ${error}`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    setErrors([]);

    const newUploadingFiles: UploadFile[] = await Promise.all(
      validFiles.map(async (file) => ({
        id: Math.random().toString(36).substring(2, 9),
        file,
        previewUrl: await createFilePreview(file),
        progress: 0,
        status: "uploading",
      }))
    );

    const updatedFiles = [...files, ...newUploadingFiles];
    setFiles(updatedFiles);

    newUploadingFiles.forEach(async (file) => {
      await uploadFile(
        file,
        mergedConfig.bucket,
        mergedConfig.path,
        onUploadComplete
      );

      setFiles(
        files.filter((f) => {
          f.id !== file.id;
        })
      );
    });
  };

  if (existingFiles && existingFiles.length > 0) {
    processFiles(existingFiles);
  }

  /* Handlers for file drag-and-drop events */
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

      const droppedFiles = e.dataTransfer.files;
      if (droppedFiles.length > 0) {
        processFiles(droppedFiles);
      }
    },
    [files, mergedConfig]
  );

  /* Handlers for file input */
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

  const handleFileRemove = useCallback((id: string) => {}, []);
  const handleFileUpload = useCallback(() => {}, []);

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
        <CardContent className="flex flex-col items-center justify-center p-4 text-center">
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
        accept={acceptFileTypes}
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
                      {uploadedFile.previewUrl ? (
                        <img
                          src={uploadedFile.previewUrl || "/placeholder.svg"}
                          alt={uploadedFile.file.name}
                          className="w-12 h-12 object-cover rounded border"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-muted rounded border flex items-center justify-center">
                          <FileIcon className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
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
                          onClick={() => handleFileRemove(uploadedFile.id)}
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
          {files.some((f) => f.status === "completed") && (
            <Button onClick={handleFileUpload} className="w-full">
              Upload {files.filter((f) => f.status === "completed").length}{" "}
              Files
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
