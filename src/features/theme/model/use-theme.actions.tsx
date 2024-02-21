import { useAction } from "@/shared/lib/redux"
import { themeStore } from "."

export const useThemeActions = () => {
  
  const setTheme = useAction(themeStore.actions.setTheme);

  return { setTheme };
}