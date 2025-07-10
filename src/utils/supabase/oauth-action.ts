"use server"

import { redirect } from "next/navigation"
import { createClient } from "./server"

export async function signInWithGithub() {
    console.log("Sign in with github")
    const supabase = await createClient();
    console.log("Redirecting URL", process.env.NEXT_PUBLIC_SITE_URL)
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
        console.log("Redirecting URL : ", data.url)
        redirect(data.url) // use the redirect API for your server framework
    }
}