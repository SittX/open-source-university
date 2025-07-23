"use server"

import { redirect } from "next/navigation"
import { createClient } from "./server"

export async function signInWithGithub() {

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        },
    })

    if (error) {
        console.error("Error with OAuth login : ", error)
        redirect("/auth/login")
    }

    if (data.url) {
        console.log("Data URL", data.url)
        redirect(data.url) // use the redirect API for your server framework
    }
}