import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isServer() {
  return typeof window === "undefined";
}

export function getBaseUrl() {
  return isServer()
    ? process.env.INTERNAL_BACKEND_URL
    : process.env.NEXT_PUBLIC_BACKEND_URL;
}
