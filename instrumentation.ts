export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
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
      console.error(
        `\nERROR: Missing required environment variables\n\n${missingEnvironmentVariables
          .map((v) => `  • ${v}`)
          .join("\n")}\n\nClosing the application.\n`
      );
      process.exit(1);
    }
  }
}
