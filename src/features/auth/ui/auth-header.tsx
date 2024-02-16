import { UpdateTheme } from "@/features/theme";

export function AuthHeader() {

  return (
    <header className="flex justify-end px-10 py-2">
      <UpdateTheme />
    </header>
  );
}