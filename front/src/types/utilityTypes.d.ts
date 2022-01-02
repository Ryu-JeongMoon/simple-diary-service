declare module 'utilityTypes' {
  // export declare type Omit<T, K extends keyof T> = { [P in Exclude<keyof T, K>]: T[P] };
  type RemoveNullable<T, K extends keyof T> = { [P in K]-?: T[P] } & Omit<T, K>;
  type RemoveNullableExcept<T, K extends string | number | symbol> = {
    [P in Exclude<keyof T, K>]-?: T[P];
  } & {
    [P in Extract<keyof T, K>]: T[P];
  };

  type AddNullable<T, K extends keyof T> = { [P in K]+?: T[P] } & Omit<T, K>;
  type AddNullableExcept<T, K extends string | number | symbol> = {
    [P in Exclude<keyof T, K>]+?: T[P];
  } & {
    [P in Extract<keyof T, K>]: T[P];
  };

  type SplitBy<
    T extends string,
    Separator extends string,
  > = T extends `${infer A}${Separator}${infer B}` ? A | SplitBy<B, Separator> : T;
}
