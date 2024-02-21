import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type ThemeState = {
  theme: 'light' | 'dark'
}

const initialState: ThemeState = {
  theme: 'light'
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      document.body.setAttribute('data-theme', state.theme);
    }
  }
})