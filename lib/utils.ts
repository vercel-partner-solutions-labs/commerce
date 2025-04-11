import { clsx, type ClassValue } from "clsx";
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

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

export const validateEnvironmentVariables = () => {
  const requiredEnvironmentVariables = [
    "SITE_NAME",
    "SFCC_CLIENT_ID",
    "SFCC_ORGANIZATIONID",
    "SFCC_SECRET",
    "SFCC_SHORTCODE",
    "SFCC_SITEID",
    "SFCC_SANDBOX_DOMAIN",
    "SFCC_OPENCOMMERCE_SHOP_API_ENDPOINT",
    "SFCC_REVALIDATION_SECRET",
  ];
  const missingEnvironmentVariables = [] as string[];

  requiredEnvironmentVariables.forEach((envVar) => {
    if (!process.env[envVar]) {
      missingEnvironmentVariables.push(envVar);
    }
  });

  if (missingEnvironmentVariables.length) {
    throw new Error(
      `The following environment variables are missing. Your site will not work without them. Read more: https://vercel.com/docs/integrations/shopify#configure-environment-variables\n\n${missingEnvironmentVariables.join(
        "\n"
      )}\n`
    );
  }
};
