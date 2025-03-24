export type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;

export interface SFCCSDKParameters extends Record<string, unknown> {
  clientId: string;
  organizationId: string;
  shortCode: string;
  siteId: string;
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
      `The following environment variables are missing. Your site will not work without them. Read more: https://vercel.com/docs/integrations/salesforce-commerce-cloud#configure-environment-variables\n\n${missingEnvironmentVariables.join(
        "\n"
      )}\n`
    );
  }

  // Return the parameters in the format expected by the SDK
  return {
    clientId: process.env.SFCC_CLIENT_ID!,
    organizationId: process.env.SFCC_ORGANIZATIONID!,
    shortCode: process.env.SFCC_SHORTCODE!,
    siteId: process.env.SFCC_SITEID!,
  } as SFCCSDKParameters;
};