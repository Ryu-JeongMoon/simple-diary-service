import { MixedConfig, PreDefinedConfig, UrlParams } from '../customAxios.types';

function replaceURLParameters<ReqData, Config extends PreDefinedConfig<ReqData>>(
  config: MixedConfig<ReqData, Config> & { urlParams?: UrlParams<Config['url']> },
): MixedConfig<ReqData, Config> {
  const { urlParams } = config;
  if (config.url && urlParams !== undefined) {
    config.url.replace(/:(\w+)\/?/g, key => {
      const keyName = key.replace(/[:/]/g, '');
      return urlParams[keyName as keyof UrlParams<Config['url']>];
    });
  }
  return config;
}
export default replaceURLParameters;
