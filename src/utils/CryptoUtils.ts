import { hash, hashSync, compareSync } from 'bcrypt-ts';

const fixedSalt = "$2a$10$abcdefghijklmnopqrstuv";

export function hashPassword(password: string): string {
  // Genera l'hash utilizzando il salt fisso
  const hashedPassword = hashSync(password, fixedSalt);
  return hashedPassword;
}

// Funzione per verificare la password con l'hash
export function verifyPassword(userPassword: string, password: string): boolean {
  return userPassword == password;
  // return compareSync(password, hashedPassword);
}
