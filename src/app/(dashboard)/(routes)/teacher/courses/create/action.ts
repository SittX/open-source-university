"use server"
import { courseCreateForm } from "@/lib/types"
import { redirect, RedirectType } from "next/navigation"
import toast from "react-hot-toast"

export async function createCourseAction(formData: FormData) {
    console.log("Form data", formData)
    const result = courseCreateForm.safeParse({ title: formData.get("title") })
    console.log("Result: ", result)
    if (!result.success) {
        console.error(result.error)
    }

    redirect("/teacher/courses", RedirectType.replace)
} 