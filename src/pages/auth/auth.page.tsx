import { SignInComp, AuthHeader } from "@/features/auth/index";

export function AuthPage() {
  return(
    <div className="flex flex-col grow min-h-screen">
      <AuthHeader />
      <SignInComp />
    </div>
  );
}