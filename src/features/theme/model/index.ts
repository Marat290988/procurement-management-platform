import { registerSlice } from "@/shared/lib/redux";
import { themeSlice } from "./slice";
import { selectTheme } from "./selectors";

registerSlice([themeSlice]);

const { setTheme } = themeSlice.actions;

export const themeStore = {
  actions: {
    setTheme
  },
  selectors: {
    selectTheme
  }
}