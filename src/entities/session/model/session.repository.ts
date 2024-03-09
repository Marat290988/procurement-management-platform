import { persistStorage } from "@/lib/persist-storage";
import { Session } from "./types";

const SESSION_STORAGE_KEY = 'SESSION_STORAGE';

export const sessionRepository = {
  getSession: () => {
    return persistStorage.getItemSafe<Session | undefined>(SESSION_STORAGE_KEY, undefined);
  },
  saveSession: (value: Session) => {
    return persistStorage.setItemSafe(SESSION_STORAGE_KEY, value);
  },
  clearSession: () => {
    return persistStorage.setItemSafe(SESSION_STORAGE_KEY, undefined);
  }
}