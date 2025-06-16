"use server"
import { loginSchema } from "@/lib/validations/auth";
import { createClient } from "@/utils/supabase/server"
import { AuthError } from "@supabase/supabase-js";
import z from "zod";

export async function signup(previousState: AuthError | undefined, formData: FormData): Promise<AuthError | undefined> {
    const supabase = await createClient()

    const data = {
        email: formData.get('email'),
        password: formData.get('password'),
        options: {
            data: {
                role: "teacher"
            }
        }
    }

    try {
        const validatedData = loginSchema.parse(data);
        const { error } = await supabase.auth.signUp(validatedData);
        return error as AuthError | undefined;
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Handle validation error
            return new AuthError(error.errors[0].message);
        }
        throw error;
    }
}