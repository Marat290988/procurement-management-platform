import { persistStorage } from "@/lib/persist-storage";
import { LanguageState } from "./types";

const LANGUAGE_STORAGE_KEY = 'LANGUAGE_STORAGE';

export const langRepository = {
  loadLang: () => {
    return persistStorage.getItemSafe<LanguageState>(LANGUAGE_STORAGE_KEY, {lang: 'en'});
  },
  saveLang: (value: LanguageState['lang']) => {
    return persistStorage.setItemSafe(LANGUAGE_STORAGE_KEY, {lang: value});
  }
}