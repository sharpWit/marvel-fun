import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to modify URLs
export const modifyUrl = (url: string) => {
  return url.replace("http://gateway.marvel.com/v1/public/", "/");
};
