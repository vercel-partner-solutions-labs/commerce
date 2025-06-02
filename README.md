[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fcommerce-sfcc&env=COMPANY_NAME,NEXT_PUBLIC_VERCEL_URL,SFCC_CLIENT_ID,SFCC_ORGANIZATIONID,SFCC_SECRET,SFCC_SHORTCODE,SFCC_SITEID,SITE_NAME,SFCC_REVALIDATION_SECRET&project-name=nextjs-commerce-sfcc&repository-name=nextjs-commerce-sfcc&demo-title=ACME%20Store&demo-description=A%20high-performance%20ecommerce%20store%20built%20with%20Next.js%2C%20Vercel%2C%20and%20Salesforce%20Commerce%20Cloud&demo-url=https%3A%2F%2Fnextjs-salesforce-commerce-cloud.vercel.app%2F)

# Next.js Commerce + Salesforce Commerce Cloud

A high-perfomance, server-rendered Next.js App Router ecommerce application.

This template uses React Server Components, Server Actions, _Suspense_, _useOptimistic_, _use cache_ and more.

## Providers

This version of Next.js Commerce is integrated with Salesforce Commerce Cloud. The integration code for Salesforce Commerce Cloud can be found in the _lib/sfcc_ directory.

For information on other commerce providers, additional details, and the core Next.js Commerce template, please refer to the official [Next.js Commerce repository](https://github.com/vercel/commerce).

## Enviroment variables

This project requires the following environment variables for connecting to Salesforce Commerce Cloud:

```
SFCC_ORGANIZATIONID=""
SFCC_SHORTCODE=""
SFCC_SITEID="RefArch"
SFCC_CLIENT_ID=""
SFCC_SECRET=""
SITE_NAME="ACME Store"
SFCC_REVALIDATION_SECRET=""
```

- _SFCC_ORGANIZATIONID_: Salesforce Commerce Cloud Organization ID
- _SFCC_SHORTCODE_: Salesforce Commerce Cloud instance short code
- _SFCC_SITEID_: ID of the target site
- _SFCC_CLIENT_ID_: SLAS API Client ID
- _SFCC_SECRET_: SLAS API Client Secret
- _SITE_NAME_: User-defined name for the site
- _SFCC_REVALIDATION_SECRET_: User-defined string for on-demand revalidation

Please refer to the official Salesforce Commerce API documentation for details on how to retrieve these values:

- [Base URL Configuration](https://developer.salesforce.com/docs/commerce/commerce-api/guide/base-url.html)
- [SLAS Authorization](https://developer.salesforce.com/docs/commerce/commerce-api/guide/authorization-for-shopper-apis.html)

## Store configuration

This project works with a standard Salesforce Commerce Cloud _RefArch_ site with minimal modifications. However, for the homepage to display content correctly, two product categories must be created:

- _hidden-homepage-carousel_: This category populates the main carousel on the homepage
- _hidden-homepage-featured-items_: This category populates the featured products section on the homepage

Create these two categories and assign products to them within Business Manager.

## Running locally

You will need to use the environment variables defined in _.env.example_ to run Next.js Commerce. It's recommended you use [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables) for this, but a _.env_ file is all that is necessary.

> Note: You should not commit your _.env_ file or it will expose secrets that will allow others to control your Salesforce Commerce Cloud store.

1. Install Vercel CLI: _npm i -g vercel_
2. Link local instance with Vercel and GitHub accounts (creates _.vercel_ directory): _vercel link_
3. Download your environment variables: _vercel env pull_

```bash
pnpm install
pnpm dev
```

Your app should now be running on [localhost:3000](http://localhost:3000/).
