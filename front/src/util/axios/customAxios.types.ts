import { AxiosError, AxiosResponse, AxiosRequestConfig as OriginalConfig } from 'axios';
import { AddNullableExcept, SplitBy } from 'utilityTypes';

/**
 * TODO: enum을 사용해 타입 추론하기
 * https://stackoverflow.com/questions/59205588/how-to-make-typescript-enum-restrict-to-specific-number
 * 기본적으로 typescript numeric enum은 number 형식을
 * 허용하기 때문에 enum으로 적어주면 타입 추론이 제대로
 * 되지만, enum value에 해당하는 숫자를 넣으면 어떤 enum이던
 * 매칭이 될 수 있어서 타입 추론이 되지 않음.
 * 이를 해결하기 위해 임시로 enum을 쓰지 않고 매칭되는
 * 숫자들로 리터럴 타입을 정의해 사용함.
 */
export enum SuccessStatus {
  'OK' = 200,
  'CREATED' = 201,
  'ACCEPTED' = 202,
  'NO_CONTENT' = 204,
}
export enum RedirectStatus {
  'MOVED_PERMANENTLY' = 301,
  'FOUND' = 302,
  'SEE_OTHER' = 303,
  'NOT_MODIFIED' = 304,
  'TEMPORARY_REDIRECT' = 307,
  'PERMANENT_REDIRECT' = 308,
}
export enum ClientErrorStatus {
  'BAD_REQUEST' = 400,
  'UNAUTHORIZED' = 401,
  'FORBIDDEN' = 403,
  'NOT_FOUND' = 404,
  'METHOD_NOT_ALLOWED' = 405,
  'NOT_ACCEPTABLE' = 406,
  'PROXY_AUTHENTICATION_REQUIRED' = 407,
  'REQUEST_TIMEOUT' = 408,
  'CONFLICT' = 409,
}
export enum ServerErrorStatus {
  'INTERNAL_SERVER_ERROR' = 500,
  'NOT_IMPLEMENTED' = 501,
  'BAD_GATEWAY' = 502,
  'SERVICE_UNAVAILABLE' = 503,
  'GATEWAY_TIMEOUT' = 504,
}
export enum ErrorStatus {
  'MULTIPLE_CHOICES' = 300,
  'MOVED_PERMANENTLY' = 301,
  'FOUND' = 302,
  'SEE_OTHER' = 303,
  'NOT_MODIFIED' = 304,
  'TEMPORARY_REDIRECT' = 307,
  'PERMANENT_REDIRECT' = 308,
  'BAD_REQUEST' = 400,
  'UNAUTHORIZED' = 401,
  'FORBIDDEN' = 403,
  'NOT_FOUND' = 404,
  'METHOD_NOT_ALLOWED' = 405,
  'NOT_ACCEPTABLE' = 406,
  'PROXY_AUTHENTICATION_REQUIRED' = 407,
  'REQUEST_TIMEOUT' = 408,
  'CONFLICT' = 409,
  'INTERNAL_SERVER_ERROR' = 500,
  'NOT_IMPLEMENTED' = 501,
  'BAD_GATEWAY' = 502,
  'SERVICE_UNAVAILABLE' = 503,
  'GATEWAY_TIMEOUT' = 504,
}

export type Status = SuccessStatus | ErrorStatus;

export interface PreDefinedConfig<ReqData> extends OriginalConfig<ReqData> {
  url: string;
  method: OriginalConfig['method'];
}

type PickUrlParameter<T extends string> = T extends `:${infer K}` ? K : never;
export type UrlParams<Url extends string> = {
  [key in PickUrlParameter<SplitBy<Url, '/'>>]: string;
};

type HasUrlParams<Url extends string> = UrlParams<Url> extends Record<string, never> ? false : true;
type HasData<Data> = Data extends undefined ? false : true;

// TODO: 커서를 올렸을 때 타입이 더 깔끔하게 보이도록 수정
export type CustomConfig<ReqData, Config extends PreDefinedConfig<ReqData>> = Omit<
  OriginalConfig<ReqData>,
  'data'
> &
  (HasUrlParams<Config['url']> extends true ? { urlParams: UrlParams<Config['url']> } : unknown) &
  (HasData<ReqData> extends true ? { data: ReqData } : unknown);

export type MixedConfig<ReqData, Config extends PreDefinedConfig<ReqData>> = Omit<
  PreDefinedConfig<ReqData>,
  'data'
> &
  CustomConfig<ReqData, Config>;

type BaseResponse<ResData, ReqData> = Omit<AxiosResponse<ResData, ReqData>, 'status' | 'data'> &
  (HasData<ResData> extends true ? { data: ResData } : unknown);

export type ExpectedResponse<ResData, ReqData> = BaseResponse<ResData, ReqData> & {
  status: SuccessStatus;
};
export type MockResponse<ResData, ReqData> = AddNullableExcept<
  BaseResponse<ResData, ReqData>,
  'data'
> & {
  status: SuccessStatus;
};

type BaseErrorResponse<ReqData> = AxiosResponse<DefaultErrorData<ReqData>, ReqData>;
export interface ErrorResponse<ReqData = any> extends BaseErrorResponse<ReqData> {
  status: ErrorStatus;
}
export interface MockErrorResponse<ReqData> extends Partial<AxiosResponse<any, ReqData>> {
  data: Partial<DefaultErrorData<ReqData>>;
  status: ErrorStatus;
}

export type MockServer<ResData, ReqData, Config extends PreDefinedConfig<ReqData>> = (
  config: MixedConfig<ReqData, Config>,
) => MockResponse<ResData, ReqData> | MockErrorResponse<ReqData>;

// TODO: Add error data format support
export type PreDefinedApi<
  ResData = undefined,
  ReqData = undefined,
  Config extends PreDefinedConfig<ReqData> = any,
> = {
  readonly config: PreDefinedConfig<ReqData>;
  readonly expect: MockServer<ResData, ReqData, Config>;
};

export type DefaultErrorData<ReqData> = {
  result: false;
  status: Status;
  timestamp: string;
  message: string;
  requestData: {
    query: Record<string, string>;
    params: Record<string, string>;
    body: ReqData;
  };
};

export type ApiError<D = any, T = DefaultErrorData<D>> = AxiosError<T, D>;

// export interface BaseResData {
//   result: boolean;
// }

// export interface BasicResData<T> extends BaseResData {
//   data: T;
// }

// export interface RowResData<T> extends BaseResData {
//   count: number;
//   data: T[];
// }
