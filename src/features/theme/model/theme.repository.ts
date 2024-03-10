import { persistStorage } from "@/lib/persist-storage";
import { ThemeState } from "./slice";

const THEME_STORAGE_KEY = 'THEME_STORAGE';

export const themeRepository = {
  loadTheme: () => {
    return persistStorage.getItemSafe<ThemeState>(THEME_STORAGE_KEY, {theme: 'light'});
  },
  saveTheme: (value: ThemeState['theme']) => {
    return persistStorage.setItemSafe(THEME_STORAGE_KEY, {theme: value});
  }
}