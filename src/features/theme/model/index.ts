import { registerSlice } from "@/shared/lib/redux";
import { themeSlice, loadTheme } from "./slice";
import { selectTheme } from "./selectors";

registerSlice([themeSlice]);

const { setTheme } = themeSlice.actions;

export const themeStore = {
  actions: {
    setTheme,
    loadTheme
  },
  selectors: {
    selectTheme
  }
}