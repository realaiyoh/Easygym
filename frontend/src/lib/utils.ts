import { AxiosError } from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const titleize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    return error.response?.data.message ?? 'An error occurred';
  } else {
    return 'An unexpected error occurred';
  }
}
