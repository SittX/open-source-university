"use server"
import { prisma } from "@/lib/db"
import { courseCreateForm } from "@/lib/types"
import { z } from "zod"
import { redirect, RedirectType } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

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

    const result = courseCreateForm.safeParse({ title: formData.get("title") })

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