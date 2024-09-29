import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseUri = (title: string): string => {
  let uri = "";
  uri = title.trim().split(" ").join("-");
  return uri;
};

export function formatDate(mongoDate: string): string {
  const date = new Date(mongoDate);

  const day = date.getDate().toString().padStart(2, "0"); // Get day and pad it to 2 digits
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month (zero-based, so add 1) and pad it
  const year = date.getFullYear().toString(); // Get full year

  return `${day}/${month}/${year}`;
}
