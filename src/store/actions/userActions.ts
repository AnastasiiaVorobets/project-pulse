import { TUser } from "../../types";
import { mockUsers } from "../../utils/mockData";

export const getUserById = async (userId: string): Promise<TUser | null> => {
  const user = mockUsers.find(u => u.id === userId);
  return user || null;
};

export const updateUser = async (userId: string, userData: Partial<TUser>): Promise<void> => {
  const userIndex = mockUsers.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData };
  }
};

export const deleteUser = async (userId: string): Promise<void> => {
  const userIndex = mockUsers.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    mockUsers.splice(userIndex, 1);
  }
};
