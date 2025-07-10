import { z } from "zod";

export const CourseCreateForm = z.object({
    title: z.string().min(10, "Title must be more than 10 characters")
})

export type TCourseCreateForm = z.infer<typeof CourseCreateForm>

export const CourseFormSchema = z.object({
    title: z.string().min(10, "Title must be more than 10 characters"),
    description: z.string().min(1, "Description must not be less than 1 character"),
    price: z.number().min(0, "Price must not be less than 0"),
    imageUrl: z.string(),
    categoryId: z.string(),
    attachmentIds: z.array(z.string()).optional()
})

export type CourseFormValues = z.infer<typeof CourseFormSchema>

export const CourseAttachmentFormSchema = z.object({
    name: z.string(),
    fileSize: z.string(),
    fileType: z.string(),
    publicUrl: z.string(),
    courseId: z.string()
})

export const CourseAttachmentUpdateFormSchema = z.object({
    name: z.string(),
    description: z.string(),
    attachmentId: z.string(),
})