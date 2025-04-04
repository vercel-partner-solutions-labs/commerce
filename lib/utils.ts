import { clsx, type ClassValue } from "clsx";
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith) ? stringToCheck : `${startsWith}${stringToCheck}`;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper for returning the expected error state to actions instead of throwing.
export const handleFormActionError = (error: unknown, defaultMessage: string) => {
  return {
    errors: {
      formErrors: [(error as Error)?.message || defaultMessage],
    },
  };
};

type PrefixedShape<T extends z.ZodObject<any>, P extends string> = {
  [K in keyof T["shape"] as K extends string ? `${P}.${K}` : never]: T["shape"][K];
};

// Creates a new Zod schema with all keys prefixed with the given string.
export const prefixSchema = <T extends z.ZodObject<any>, P extends string>(
  schema: T,
  prefix: P
): z.ZodObject<PrefixedShape<T, P>> => {
  if (!prefix) return schema as z.ZodObject<PrefixedShape<T, P>>;

  const shape = schema.shape;
  const newShape = {} as PrefixedShape<T, P>;

  for (const [key, value] of Object.entries(shape)) {
    (newShape as any)[`${prefix}.${key}`] = value;
  }

  return z.object(newShape);
};
