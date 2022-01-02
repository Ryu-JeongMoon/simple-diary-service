import { BASE_URL } from '@constants/apis';
import defaultAxios, { AxiosError, AxiosResponse } from 'axios';

import {
  CustomConfig,
  ErrorResponse,
  ExpectedResponse,
  MixedConfig,
  MockErrorResponse,
  MockServer,
  PreDefinedApi,
  PreDefinedConfig,
  SuccessStatus,
} from './customAxios.types';
import { replaceURLParameters } from './interseptors/request';

const axios = defaultAxios.create({ baseURL: BASE_URL });

// TODO: Add postProcess?
async function preProcess<ReqData, Config extends PreDefinedConfig<ReqData>>(
  config: MixedConfig<ReqData, Config>,
): Promise<MixedConfig<ReqData, Config>> {
  config = replaceURLParameters(config);

  // Add token to header
  if (config.headers === undefined) {
    config.headers = {};
  }
  config.headers.Authorization = axios.defaults.headers.common.Authorization;

  return config;
}

async function postProcess<ResData, ReqData>(
  response: AxiosResponse<ResData, ReqData>,
): Promise<ExpectedResponse<ResData, ReqData>> {
  return response;
}

async function createRequestDefault<ResData, ReqData, Config extends PreDefinedConfig<ReqData>>(
  api: PreDefinedApi<ResData, ReqData, Config>,
  config: CustomConfig<ReqData, Config>,
): Promise<ExpectedResponse<ResData, ReqData>> {
  let mixedConfig = {
    ...api.config,
    ...(config as Record<string, unknown>),
  } as MixedConfig<ReqData, Config>;
  mixedConfig = await preProcess(mixedConfig);

  const response = await axios.request<ResData, AxiosResponse<ResData, ReqData>, ReqData>(
    mixedConfig,
  );

  return postProcess(response);
}

async function createRequestTest<ResData, ReqData, Config extends PreDefinedConfig<ReqData>>(
  api: PreDefinedApi<ResData, ReqData, Config>,
  config: CustomConfig<ReqData, Config>,
): Promise<ExpectedResponse<ResData, ReqData>> {
  try {
    const response = await createRequestDefault(api, config);
    return response;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.message === 'Network Error') {
      let mixedConfig = {
        ...api.config,
        ...(config as Record<string, unknown>),
      } as MixedConfig<ReqData, Config>;
      mixedConfig = await preProcess(mixedConfig);

      // const response = api.expect(mixedConfig);
      let response = api.expect(mixedConfig);

      // TODO: Need type inference
      /**
       * 어짜피 테스트용 코드고, 실제 컴포넌트 내부에서는
       * createRequestDefault와 동일한 리턴값을 기대하기 때문에
       * as로 강제 형변환을 함
       */
      if (response.status in SuccessStatus) {
        response = await postProcess(response as AxiosResponse<ResData, ReqData>);
        return response as ExpectedResponse<ResData, ReqData>;
      } else {
        const errRes = response as MockErrorResponse<ReqData>;
        axiosError.message = `${errRes.status}: ${errRes.data.message}`;
        axiosError.config = mixedConfig;
        axiosError.response = errRes as ErrorResponse<ReqData>;
        axiosError.isAxiosError = true;
        throw axiosError;
      }
    } else {
      throw axiosError;
    }
  }
}

const createRequest =
  process.env.NODE_ENV === 'development' ? createRequestTest : createRequestDefault;

export function PreDefinedApiFactory<ResData = undefined, ReqData = undefined>() {
  function createPreDefinedApi<Config extends PreDefinedConfig<ReqData>>(api: {
    config: Config;
    expect: MockServer<ResData, ReqData, Config>;
  }) {
    const preDefinedApi: PreDefinedApi<ResData, ReqData, Config> = api;
    return (config: CustomConfig<ReqData, Config>) => createRequest(preDefinedApi, config);
  }

  return createPreDefinedApi;
}
