import React from "react";
import { signInWithGithub } from "@/utils/supabase/oauth-action";

type oauthBtnProps = {
  provider?: string;
  children: React.ReactNode;
};

const OAuthButton = ({ children }: oauthBtnProps) => {
  return (
    <div className="w-full">
      <form action={signInWithGithub} className="w-full">
        {children}
      </form>
    </div>
  );
};

export default OAuthButton;
