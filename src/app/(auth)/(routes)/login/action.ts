'use server'

import { createClient } from '@/utils/supabase/server'
import { AuthError } from '@supabase/supabase-js'
import { loginSchema } from '@/lib/validations/auth'
import { z } from 'zod'

export async function login(previousState: AuthError | undefined, formData: FormData): Promise<AuthError | undefined> {
    const supabase = await createClient()

    const data = {
        email: formData.get('email'),
        password: formData.get('password'),
    }

    try {
        const validatedData = loginSchema.parse(data);
        const { error } = await supabase.auth.signInWithPassword(validatedData);
        return error as AuthError | undefined;
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Handle validation error
            return new AuthError(error.errors[0].message);
        }
        throw error;
    }
}

