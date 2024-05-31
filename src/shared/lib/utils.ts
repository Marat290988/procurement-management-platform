import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Compressor from 'compressorjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toBase64(file: File, maxWidth: number): Promise<string> {
  return new Promise((res, rej) => {
    new Compressor(file, {
      quality: 0.9,
      maxWidth: maxWidth,
      success: (blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => res(reader.result as string);
        reader.onerror = error => rej(error);
      },
      error: (err) => {
        rej(err);
      }
    });
  })
}
