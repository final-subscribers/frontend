import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import propertyDataMap from '../constants/propertyDataMap';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 금액 단위 변환
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

// 매물 데이터 변환
export function getPropertyLabel(key: string): string {
  return propertyDataMap[key as keyof typeof propertyDataMap] || 'Unknown';
}

// 인프라 input 변환
type InfraInput = { input1: string; input2: string; input3: string }[];

export function formatInfraText(input: InfraInput): string {
  return input
    .map((item) => {
      const timeInMinutes = `${parseInt(item.input3.replace('m', ''), 10)}분`;

      return `${item.input1} ${item.input2} ${timeInMinutes}`;
    })
    .join(', ');
}

// 혜택 input 변환
type BenefitInput = string | number | Record<string, string>[];

export function formatBenefitText(input: BenefitInput): string {
  if (typeof input === 'number' || typeof input === 'string') {
    return String(input);
  }
  if (Array.isArray(input)) {
    return input.map((item) => Object.values(item).join(' ')).join(', ');
  }

  return '';
}
