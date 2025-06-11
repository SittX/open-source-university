"use server"
import { prisma } from "@/lib/db"
import { CourseCreateForm, CourseFormSchema } from "@/lib/types"
import { z } from "zod"
import { redirect, RedirectType } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { getAuthContext } from "@/utils/auth/auth.service"

export async function createCourseAction(
    state: z.ZodError<{ title: string }> | null,
    formData: FormData
) {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();
    const userId = user.data.user!.id;

    if (userId == "") {
        redirect("teacher/courses", RedirectType.replace)
    }

    const result = CourseCreateForm.safeParse({ title: formData.get("title") })

    if (!result.success) {
        return result.error
    }

    const course = await prisma.course.create({
        data: {
            title: result.data.title,
            createdBy: userId
        }
    })

    redirect(`/teacher/courses/${course.id}`, RedirectType.push)
}

export async function courseFormAction(courseId: string, formData: FormData) {
    console.log("Form Data", formData)
    const context = await getAuthContext();
    const userId = (await context.getUser()).data.user!.id;

    if (!userId) {
        redirect("/teacher/courses", RedirectType.replace);
    }

    const result = CourseFormSchema.safeParse({
        title: formData.get("title"),
        description: formData.get("description"),
        price: Number(formData.get("price")),
        imageUrl: formData.get("imageUrl") ?? "",
        categoryId: formData.get("categoryId")
    });

    console.log("Result", result)

    if (!result.success) {
        console.error(result.error)
        return result.error.message;
    }

    console.log("Saving object : ", result)

    await prisma.course.update({
        where: {
            id: courseId,
            createdBy: userId
        },
        data: {
            title: result.data.title,
            description: result.data.description,
            price: result.data.price,
            imageUrl: result.data.imageUrl,
            categoryId: result.data.categoryId || null
        }
    });

    redirect(`/teacher/courses`);
}
