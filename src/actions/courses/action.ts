"use server"
import { prisma } from "@/lib/db"
import { AttachmentSchema, AttachmentUpdateSchema, CourseInitialFormSchema, CourseDetailsSchema, ChapterSchema, LessonSchema } from "@/lib/schema"
import { z } from "zod"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { getAuthContext } from "@/utils/auth/auth.service"
import { attachmenttype, LessonType } from '@prisma/client';
import { revalidatePath } from "next/cache"

export async function createCourseAction(
    state: z.ZodError<{ title: string }> | null,
    formData: FormData
) {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();
    const userId = user.data.user!.id;

    if (userId == "") {
        redirect("/courses")
    }

    const result = CourseInitialFormSchema.safeParse({ title: formData.get("title") })

    if (!result.success) {
        return result.error
    }

    const course = await prisma.course.create({
        data: {
            title: result.data.title,
            createdBy: userId
        }
    })

    redirect(`/courses/${course.id}`)
}

export async function courseDetailsFormAction(prevState: string, formData: FormData) {

    const context = await getAuthContext();
    const userId = (await context.getUser()).data.user!.id;

    const courseId = String(formData.get("courseId")?.valueOf())


    if (!userId) {
        redirect("/courses");
    }

    const result = CourseDetailsSchema.safeParse({
        title: formData.get("title"),
        description: formData.get("description"),
        price: Number(formData.get("price")),
        imageUrl: formData.get("imageUrl") ?? "",
        categoryId: formData.get("categoryId")
    });



    if (!result.success) {
        console.error(result.error)
        return result.error.message;
    }



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

    redirect(`/courses`);
}

export async function courseAttachmentsFormAction(formData: FormData) {
    const result = AttachmentSchema.safeParse({
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


    revalidatePath(`/courses/${result.data.courseId}`)
}

export async function courseAttachmentsUpdateFormAction(formData: FormData) {

    const result = AttachmentUpdateSchema.safeParse({
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


    // revalidatePath(`/courses/${result.data.courseId}`)
}

export async function courseChapterFormAction(formData: FormData) {


    const result = ChapterSchema.safeParse({
        title: formData.get("title"),
        description: formData.get("description"),
        order: Number(formData.get("order")),
        duration: Number(formData.get("duration")),
        isPublished: Boolean(formData.get("isPublished")),
        courseId: formData.get("courseId")
    })

    if (result.error) {

        return
    }

    try {



        await prisma.chapter.create({
            data: {
                title: result.data.title,
                description: result.data.description,
                order: result.data.order,
                isPublished: result.data.isPublished,
                updatedAt: new Date(),
                course: {
                    connect: { id: String(formData.get("courseId")?.valueOf()) }
                }
            },
        })
    } catch (error) {
        console.error("Error during chapter creation : ", error)
    }


}

export async function courseChapterLessonFormAction(formData: FormData) {

    const result = LessonSchema.safeParse({
        title: formData.get("title"),
        description: formData.get("description"),
        order: Number(formData.get("order")),
        duration: Number(formData.get("duration")),
        contentUrl: formData.get("contentUrl") || "",
        isPublished: Boolean(formData.get("isPublished")),
        type: formData.get("type"),
        chapterId: formData.get("chapterId")
    })

    if (result.error) {
        console.error("Error parsing lesson form: ", result.error)
        return
    }



    await prisma.lesson.create({
        data: {
            title: result.data.title,
            description: result.data.description,
            order: result.data.order,
            duration: result.data.duration,
            contentUrl: result.data.contentUrl,
            isPublished: result.data.isPublished,
            updatedAt: new Date(),
            type: LessonType.DOCUMENT,
            chapter: {
                connect: { id: result.data.chapterId }
            }
        }
    })
}