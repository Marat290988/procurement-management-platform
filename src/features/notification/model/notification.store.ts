import { createBaseSelector, registerSlice } from "@/shared/lib/redux";
import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export type NotificationType = {
  message: string,
  type: 'success' | 'warn' | 'error' | 'info',
  ms?: number,
  id: string,
}

const initialState: {note: NotificationType[]} = {note: []};

export const addNotificationWithTimeout = createAsyncThunk(
  'notification/addNotificationWithTimeout',
  async (notification: NotificationType, { dispatch }) => {
    notification.id = nanoid();

    dispatch(notificationSlice.actions.addNotification(notification));

    setTimeout(() => {
      dispatch(notificationSlice.actions.removeNotification(notification.id));
    }, notification.ms ? notification.ms : 3000);
  }
);

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<NotificationType>) => {
      state.note.push(action.payload);
      return state;
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      const findIndex = state.note.findIndex(s => s.id === action.payload);
      if (findIndex > -1) {
        state.note.splice(findIndex, 1);
      }
      return state;
    }
  }
});

const baseSelector = createBaseSelector(notificationSlice);

registerSlice([notificationSlice]);

export const notificationStore = {
  actions: {
    addNotificationWithTimeout,
    removeNotification: notificationSlice.actions.removeNotification
  },
  selectors: {
    noteData: createSelector(baseSelector, (s) => s.note),
  },
}