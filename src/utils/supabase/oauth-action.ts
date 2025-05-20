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
        redirect("/login")
    }

    console.log("Data", data.url)
    if (data.url) {
        redirect(data.url) // use the redirect API for your server framework
    }
}