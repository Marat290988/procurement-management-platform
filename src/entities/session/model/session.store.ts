import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { Session } from "./types";
import { nanoid } from "nanoid";
import { sessionRepository } from "./session.repository";
import { createBaseSelector, registerSlice } from "@/shared/lib/redux";

export type CreateSessionData = {
  name: string;
  avatar: string | undefined;
  userId: string;
};

type SessionStore = {
  currentSession?: Session;
};

const initialState: SessionStore = {
  currentSession: undefined,
};

const createSession = createAsyncThunk(
  'session/createSession',
  async (data: CreateSessionData) => {
    const newSession = {...data, id: nanoid()};
    await sessionRepository.saveSession(newSession);
    return newSession;
  }
);

const loadSession = createAsyncThunk('session/loadSession', async () => {
  const session = await sessionRepository.getSession();
  return session;
});

const removeSession = createAsyncThunk('session/removeSession', async () => {
  await sessionRepository.clearSession();
  return;
});

const updateAvatar = createAsyncThunk('session/updateAvatar', async (data: {value: any, field: keyof CreateSessionData}) => {
  const session = await sessionRepository.getSession();
  session![data.field] = data.value;
  await sessionRepository.saveSession(session!);
  return session;
})

const sessionSlice = createSlice({
  name: 'session',
  reducers: {},
  initialState,
  extraReducers: ((builder) => {
    builder.addCase(loadSession.fulfilled, (state, action) => {
      state.currentSession = action.payload;
    });
    builder.addCase(removeSession.fulfilled, (state) => {
      state.currentSession = undefined;
    });
    builder.addCase(createSession.fulfilled, (state, action) => {
      state.currentSession = action.payload;
    });
    builder.addCase(updateAvatar.fulfilled, (state, action) => {
      state.currentSession = action.payload;
    });
  })
});

const baseSelector = createBaseSelector(sessionSlice);

registerSlice([sessionSlice]);

export const sessionStore = {
  actions: {
    loadSession,
    removeSession,
    createSession,
    updateAvatar,
  },
  selectors: {
    selectSession: createSelector(baseSelector, (s) => s.currentSession),
  },
};