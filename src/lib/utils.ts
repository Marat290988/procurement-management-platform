import { HASH_CONST } from "@/shared/constants"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import CryptoJS from 'crypto-js';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const comparePassword = (hashedPassword: string, password: string): boolean => {
  return CryptoJS.AES.decrypt(hashedPassword, HASH_CONST).toString(CryptoJS.enc.Utf8) === password;
}
