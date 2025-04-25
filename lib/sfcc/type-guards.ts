type SDKResponseError = {
  response?: Response;
};

export async function ensureSDKResponseError(
  error: unknown,
  defaultMessage?: string,
): Promise<string | undefined> {
  // The commerce sdk is configured to throw with a custom object containing the original response for any 400 or 500 status.
  // See https://github.com/SalesforceCommerceCloud/commerce-sdk-isomorphic/tree/main?tab=readme-ov-file#throwonbadresponse
  const sdkError = error as SDKResponseError;

  if (sdkError.response) {
    const errorData = await sdkError.response.json();
    return errorData?.detail || defaultMessage;
  }
}
