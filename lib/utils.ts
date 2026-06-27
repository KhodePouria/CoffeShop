import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toPersianDigits(value: number | string): string {
  const english = [/0/g, /1/g, /2/g, /3/g, /4/g, /5/g, /6/g, /7/g, /8/g, /9/g];
  const persian = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  let str = typeof value === "number" ? value.toString() : value;

  for (let i = 0; i < 10; i++) {
    str = str.replace(english[i], persian[i]);
  }
  return str;
}

export function serveImage(id: string) {
  return `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/serve/${id}`
}

export function formatPersianPrice(price: number): string {
  const tomanValue = Math.round(price);

  const formattedWithCommas = tomanValue.toLocaleString("en-US");

  const persianNum = toPersianDigits(formattedWithCommas);
  return `${persianNum} `;
}
