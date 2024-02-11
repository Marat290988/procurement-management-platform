import { ReactNode } from "react";

export function ThemeProvider({ children }: { children?: ReactNode }) {
  
  return(
    <div data-theme="light">
      {children}
    </div>
  )
}