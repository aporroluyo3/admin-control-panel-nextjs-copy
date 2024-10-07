import { USER_SERVICES } from '@/constants/api.constants';
import { AuthRequest, AuthCredentials } from '@/features/auth/types/auth.types';
import axios from '@/lib/axiosInstance';

const getAuthCredentials = async ({
  email,
  password,
}: AuthRequest): Promise<AuthCredentials> => {
  const requestData = { email, password };

  const response = await axios.post(USER_SERVICES.login, requestData);

  return response.data;
};

export { getAuthCredentials };
