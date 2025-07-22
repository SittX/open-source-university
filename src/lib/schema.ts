import { title } from "process";
import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),
});

export const SignUpSchema = z
    .object({
        name: z.string().min(2, { message: "Name must be at least 2 characters" }),
        email: z.string().email({ message: "Please enter a valid email address" }),
        password: z.string().min(8, { message: "Password must be at least 8 characters" }),
        confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

export const CourseInitialFormSchema = z.object({
    title: z.string().min(10, "Title must be more than 10 characters")
})

export const CourseDetailsSchema = z.object({
    title: z.string().min(10, "Title must be more than 10 characters"),
    description: z.string().min(1, "Description must not be less than 1 character"),
    price: z.number().min(0, "Price must not be less than 0"),
    imageUrl: z.string(),
    categoryId: z.string(),
    attachmentIds: z.array(z.string()).optional()
})

export const AttachmentSchema = z.object({
    name: z.string(),
    fileSize: z.string(),
    fileType: z.string(),
    publicUrl: z.string(),
    courseId: z.string()
})

export const AttachmentUpdateSchema = z.object({
    name: z.string(),
    description: z.string(),
    attachmentId: z.string(),
})

export const ChapterSchema = z.object({
    title: z.string().min(5, { message: "Title is required" }),
    description: z.string(),
    order: z.number(),
    duration: z.number(),
    isPublished: z.boolean(),
    courseId: z.string().nonempty(),
})

export const LessonSchema = z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    duration: z.number(),
    contentUrl: z.string(),
    isPublished: z.boolean(),
    type: z.string(),
    chapterId: z.string()
}) 