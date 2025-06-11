import { createClient } from "../supabase/server"
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";

export const getAuthContext = async (): Promise<SupabaseAuthClient> => {
    const supabase = await createClient();
    return supabase.auth;
}