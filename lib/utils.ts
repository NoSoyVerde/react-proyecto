import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToPlainObject<T>(data: T): T {
  if (Array.isArray(data)) {
    return data.map((item) => convertToPlainObject(item)) as T;
  }
  if (data && typeof data === "object") {
    const plain: any = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = (data as any)[key];
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
          plain[key] = value.toJSON();
        } else {
          plain[key] = convertToPlainObject(value);
        }
      }
    }
    return plain;
  }
  return data;
}
