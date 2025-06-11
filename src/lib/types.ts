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
    attachmentId: z.array(z.string())
})

export type CourseFormValues = z.infer<typeof CourseFormSchema>