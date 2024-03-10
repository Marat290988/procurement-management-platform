import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { themeRepository } from "./theme.repository"

export type ThemeState = {
  theme: 'light' | 'dark'
}

const initialState: ThemeState = {
  theme: 'light'
}

export const loadTheme = createAsyncThunk('theme/loadTheme', async () => {
  const theme = await themeRepository.loadTheme();
  return theme;
});

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loadTheme.fulfilled, (state, action) => {
      state.theme = action.payload.theme;
      document.body.setAttribute('data-theme', state.theme);
    });
  },
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      themeRepository.saveTheme(action.payload);
      document.body.setAttribute('data-theme', state.theme);
    }
  }
})