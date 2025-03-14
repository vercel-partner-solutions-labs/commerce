export type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;

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
};
