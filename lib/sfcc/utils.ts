export type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;
