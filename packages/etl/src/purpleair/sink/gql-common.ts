import assert from "assert";
import got from "got";

const { API_SECRET_HEADER_KEY, HASURA_GRAPHQL_ADMIN_SECRET, API_ENDPOINT } =
  process.env;

assert(API_SECRET_HEADER_KEY, "API_SECRET_HEADER_KEY");
assert(HASURA_GRAPHQL_ADMIN_SECRET, "HASURA_GRAPHQL_ADMIN_SECRET");
assert(API_ENDPOINT, "API_ENDPOINT");

export const graphQL = <T = unknown>(
  operationsDoc: string,
  operationName: string,
  variables: Record<string, unknown>,
) =>
  got
    .post(API_ENDPOINT!, {
      method: "POST",
      body: JSON.stringify({
        query: operationsDoc,
        variables,
        operationName,
      }),
      headers: {
        "content-type": "application/json",
        [API_SECRET_HEADER_KEY!]: HASURA_GRAPHQL_ADMIN_SECRET!,
      },
      retry: {
        limit: 5,
      },
    })
    .json<{
      data: T | null;
      errors: string[];
    }>()
    .catch((err) => {
      console.error(err.response);
      throw err;
    });
