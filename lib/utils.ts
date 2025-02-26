import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int || 0}.${decimal.padEnd(2, "0")}` : `${int || 0}.00`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function formatSignUpError(error: any) {
  if (error.name === "ZodError") {
    const fieldErrors = Object.values(
      error.errors as { message: string }[]
    ).map((error: { message: string }) => error.message);

    return fieldErrors.join(". ");
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    const field = error.meta?.target?.[0] || "Field";
    return `${field[0].toUpperCase() + field.slice(1)} already exists!`;
  } else {
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error.message);
  }
}
