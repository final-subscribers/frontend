import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAmount(amount: number): string {
  if (amount < 10000) {
    return `${amount}만`;
  }

  const billion = Math.floor(amount / 10000);
  const thousand = amount % 10000;

  if (thousand > 0) {
    return `${billion}억 ${thousand}만`;
  } else {
    return `${billion}억`;
  }
}
