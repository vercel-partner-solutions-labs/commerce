import { isSFCCError } from "./type-guards";

export type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;

export async function salesforceFetch<T>({
  method,
  cache = "force-cache",
  headers,
  tags,
  variables,
  apiEndpoint,
}: {
  method: "POST" | "GET";
  apiEndpoint: string;
  cache?: RequestCache;
  headers?: HeadersInit;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  try {
    const fetchOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      cache,
      ...(tags && { next: { tags } }),
    };

    if (method === "POST" && variables) {
      fetchOptions.body = JSON.stringify({ variables });
    }

    const res = await fetch(apiEndpoint, fetchOptions);

    const body = await res.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: res.status,
      body,
    };
  } catch (e) {
    if (isSFCCError(e)) {
      throw {
        version: e._v || "unknown",
        fault: e?.fault || {},
        apiEndpoint,
      };
    }

    throw {
      error: e,
    };
  }
}
