declare module 'utilityTypes' {
  // export declare type Omit<T, K extends keyof T> = { [P in Exclude<keyof T, K>]: T[P] };
  export declare type RemoveNullable<T, K extends keyof T> = { [P in K]-?: T[P] } & Omit<T, K>;
  export declare type RemoveNullableExcept<T, K extends string | number | symbol> = {
    [P in Exclude<keyof T, K>]-?: T[P];
  } & {
    [P in Extract<keyof T, K>]: T[P];
  };

  export declare type AddNullable<T, K extends keyof T> = { [P in K]+?: T[P] } & Omit<T, K>;
  export declare type AddNullableExcept<T, K extends string | number | symbol> = {
    [P in Exclude<keyof T, K>]+?: T[P];
  } & {
    [P in Extract<keyof T, K>]: T[P];
  };
}
