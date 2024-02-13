import { SignInComp } from "@/features/auth/ui/sign-in-comp";

export function AuthPage() {
  return(
    <div className="flex flex-col grow min-h-screen">
      <SignInComp />
    </div>
  );
}