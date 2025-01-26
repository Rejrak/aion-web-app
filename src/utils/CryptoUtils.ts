import { hashSync } from 'bcrypt-ts';

const fixedSalt = "$2a$10$abcdefghijklmnopqrstuv";

export function hashPassword(password: string): string {
  const hashedPassword = hashSync(password, fixedSalt);
  return hashedPassword;
}

export function verifyPassword(userPassword: string, password: string): boolean {
  return userPassword == password;
}
