"use server"
import { prisma } from "@/lib/db"
import { CourseAttachmentFormSchema, CourseAttachmentUpdateFormSchema, CourseCreateForm, CourseFormSchema } from "@/lib/types"
import { z } from "zod"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { getAuthContext } from "@/utils/auth/auth.service"
import { Attachment, attachmenttype } from '@prisma/client';
import { revalidatePath } from "next/cache"

export async function createCourseAction(
    state: z.ZodError<{ title: string }> | null,
    formData: FormData
) {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();
    const userId = user.data.user!.id;

    if (userId == "") {
        redirect("teacher/courses")
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

    redirect(`/teacher/courses/${course.id}`)
}

export async function courseFormAction(courseId: string, formData: FormData) {
    console.log("Form Data", formData)
    const context = await getAuthContext();
    const userId = (await context.getUser()).data.user!.id;

    if (!userId) {
        redirect("/teacher/courses");
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
            categoryId: result.data.categoryId || null,
        }
    });

    redirect(`/teacher/courses`);
}

export async function courseAttachmentsFormAction(formData: FormData) {
    console.log("Form Data : ", formData)
    // TODO: Can add zod validation here
    const result = CourseAttachmentFormSchema.safeParse({
        name: formData.get("name"),
        fileSize: formData.get("fileSize"),
        fileType: formData.get("fileType"),
        publicUrl: formData.get("publicUrl"),
        courseId: formData.get("courseId")
    })

    if (result.error) {
        console.error("Error parsing course attachment form : ", result.error)
        return;
    }
    const data = await prisma.attachment.create({
        data: {
            courseId: result.data.courseId,
            name: result.data.name,
            url: result.data.publicUrl,
            fileSize: Number(result.data.fileSize),
            type: attachmenttype.IMAGE,
        }
    })

    console.log("Successfully saved attachment : ", data)
    revalidatePath(`/courses/${result.data.courseId}`)
}

export async function courseAttachmentsUpdateFormAction(formData: FormData) {
    console.log("Form Data : ", formData)
    const result = CourseAttachmentUpdateFormSchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description"),
        attachmentId: formData.get("attachmentId"),
    })

    if (result.error) {
        console.error("Error parsing course attachment form : ", result.error)
        return;
    }

    const data = await prisma.attachment.update({
        where: {
            id: result.data.attachmentId
        },
        data: {
            name: result.data.name,
            description: result.data.description
        }
    })

    console.log("Successfully updated attachment : ", data)
    // revalidatePath(`/courses/${result.data.courseId}`)
}