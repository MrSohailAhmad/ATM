import { randomBytes } from "crypto";

export interface User {
  id: string;
  pin: string;
  balance: number;
}

export const generateRandomUser = (num: number): User[] => {
  const users: User[] = [];
  for (let i = 0; i < num; i++) {
    users.push({
      id: randomBytes(3).toString("hex"), // Random 6 character ID
      pin: Math.floor(1000 + Math.random() * 9000).toString(), // Random 4 digit PIN
      balance: Math.floor(Math.random() * 10000),
    });
  }

  return users;
};
