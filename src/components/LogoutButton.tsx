"use client";

import { createClient } from "@/utils/supabase/client";

const LogoutButton = () => {
  const handleLogout = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <button onClick={handleLogout} className="w-full text-left">
      Log out
    </button>
  );
};

export default LogoutButton;
