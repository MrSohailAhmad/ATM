import { generateRandomUser } from "./data";
import { User } from "./data";

// const users: User[] = generateRandomUser(10); // Generate 10 random user
// if use object or generate random number
const users: User[] = [{ id: "345678", pin: "3456", balance: 9089 }]; // if use object and generate

export const authUser = (id: string, pin: string): boolean => {
  return users.some((user) => user.id === id && user.pin === pin);
};

export const getUserBalance = (id: string): number | null => {
  const user = users.find((user) => user.id === id);
  return user ? user.balance : null;
};

export const updateUserBalance = (id: string, newBalance: number) => {
  const user = users.find((user) => user.id === id);

  if (user) {
    return user.balance === newBalance;
  }
};
