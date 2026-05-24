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


export function formatPersianPrice(price: number): string {
  // Multiply by 10,000 to get a realistic thousand-Toman menu price matching standard cafés
  const tomanValue = Math.round(price * 10000);

  // Format with thousand separators
  const formattedWithCommas = tomanValue.toLocaleString("en-US");

  // Convert digits to Persian
  const persianNum = toPersianDigits(formattedWithCommas);
  return `${persianNum} تومان`;
}
