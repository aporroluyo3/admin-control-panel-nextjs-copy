import { ApiName } from '@/constants/api.constants';

const getApiUrl = (apiName: ApiName): string => {
  let API_URL: string | undefined;

  if (apiName === ApiName.CROSS_SELL) {
    API_URL = process.env.NEXT_PUBLIC_CROSS_SELL_API_URL;
  }

  if (!API_URL) throw new Error(`API URL for ${apiName} is not defined.`);

  return `${API_URL}/`;
};

export { getApiUrl };
