import { createSelector } from "@reduxjs/toolkit";
import { themeSlice } from "./slice";
import { createBaseSelector } from "@/shared/lib/redux";

export const themeBaseSelector = createBaseSelector(themeSlice);

export const selectTheme = createSelector(themeBaseSelector, (th) => th.theme);