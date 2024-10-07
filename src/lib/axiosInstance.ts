import axios, { AxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/react';
import { ApiName, requestHeaders } from '@/constants/api.constants';
import { CompleteSession } from '@/features/auth/types/auth.types';
import { getApiUrl } from '@/utils/api.utils';

const axiosInstance = axios.create({
  baseURL: getApiUrl(ApiName.CROSS_SELL),
  headers: requestHeaders,
});

/* eslint-disable @typescript-eslint/no-explicit-any */
const addAuthHeader = async (request: AxiosRequestConfig): Promise<any> => {
  const session: CompleteSession | null = await getSession();

  const authHeader = {
    Authorization: `Bearer ${session?.user?.token}`,
    'x-api-key': process.env.NEXT_PUBLIC_CROSS_SELL_API_APIKEY,
  };

  request.headers = {
    ...request.headers,
    ...authHeader,
  };

  return request;
};
/* eslint-enable @typescript-eslint/no-explicit-any */

axiosInstance.interceptors.request.use(
  async (request: AxiosRequestConfig) => {
    if (typeof request.url === 'string' && request.url?.includes('login')) {
      return request;
    }

    return await addAuthHeader(request);
  },
  async (error) => {
    return await Promise.reject(error);
  },
);

export default axiosInstance;
