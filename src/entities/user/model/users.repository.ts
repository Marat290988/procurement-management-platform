import { persistStorage } from "@/lib/persist-storage";
import { User } from "./types";

const USERS_STORAGE_KEY = 'USERS_STORAGE';

export const usersRepository = {
  getUsers: () => {
    return persistStorage.getItemSafe<User[]>(USERS_STORAGE_KEY, []);
  },
  addUser: async (value: User) => {
    const users = await usersRepository.getUsers();
    await persistStorage.setItemSafe(USERS_STORAGE_KEY, users.concat([value]));
  },
  removeUser: async (userId: string) => {
    const users = await usersRepository.getUsers();
    await persistStorage.setItemSafe(
      USERS_STORAGE_KEY,
      users.filter((user) => user.id !== userId),
    );
  },
  editUser: async (editUser: User) => {
    const users = await usersRepository.getUsers();
    const findIndex = users.findIndex(u => u.id === editUser.id);
    if (findIndex !== -1) {
      users[findIndex] = editUser;
      await persistStorage.setItemSafe(USERS_STORAGE_KEY, users);
    }
  }
}