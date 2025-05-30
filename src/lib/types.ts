import { z } from "zod";

export const courseCreateForm = z.object({
    title: z.string().min(10, "Title must be more than 10 characters")
})

export type TCourseCreateForm = z.infer<typeof courseCreateForm>