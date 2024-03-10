import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { usersRepository } from "./users.repository";
import { nanoid } from "nanoid";
import { User } from "./types";
import { createBaseSelector, registerSlice } from "@/shared/lib/redux";
import { HASH_CONST } from "@/shared/constants";
import CryptoJS from 'crypto-js';


const loadUsers = createAsyncThunk("users/loadUsers", async () => {
  const users = await usersRepository.getUsers();
  if (users.length === 0) {
    const ciphertext = CryptoJS.AES.encrypt('admin', HASH_CONST).toString();
    const adminUser: User = {
      name: 'admin', id: nanoid(), avatarBlob: undefined, password: ciphertext
    }
    usersRepository.addUser(adminUser);
    users.push(adminUser);
  }
  return users;
});

const loginUser = createAsyncThunk('users/login', async (name: string) => {
  const users = await usersRepository.getUsers();
  const findUserIndex = users.findIndex(u => u.name === name);
  return findUserIndex > 0 ? users[0] : null;
})

const createUser = createAsyncThunk(
  'users/createUser',
  async (data: { name: string; avatarBlob: Blob | undefined; password: string }) => {
    const newUser = { id: nanoid(), ...data };
    await usersRepository.addUser(newUser);
    return newUser;
  },
);

const removeUser = createAsyncThunk(
  'users/removeUser',
  async (userId: string) => {
    await usersRepository.removeUser(userId);
    return userId;
  },
);

const usersAdapter = createEntityAdapter({
  selectId: (user: User) => user.name
});

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      usersAdapter.setAll(state, action.payload);
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      usersAdapter.addOne(state, action.payload);
    });
    builder.addCase(removeUser.fulfilled, (state, action) => {
      usersAdapter.removeOne(state, action.payload);
    });
  }
});

const usersBaseSelector = createBaseSelector(usersSlice);
const adapterSelectors = usersAdapter.getSelectors(usersBaseSelector);

const selectUsersMap = createSelector(adapterSelectors.selectAll, (users) =>
  users.reduce(
    (acc, user) => {
      acc[user.name] = user;
      return acc;
    },
    {} as Record<string, User>,
  ),
);

registerSlice([usersSlice]);

export const usersStore = {
  actions: {
    loadUsers,
    createUser,
    removeUser,
    loginUser,
  },
  selectors: {
    ...adapterSelectors,
    selectUsersMap,
  },
  slice: usersSlice,
};