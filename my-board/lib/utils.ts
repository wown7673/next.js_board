import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrentDateTime(){
  const now = new Date();

  return format(now, 'yyyy-MM-dd HH:mm:ss');
}