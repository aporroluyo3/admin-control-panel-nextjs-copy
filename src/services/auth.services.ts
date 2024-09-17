import { USER_SERVICES } from '@/constants/api.constants';
import { AuthRequest, AuthCredentials } from '@/types/auth.types';
import axios from '@/lib/axiosInstance';

const getAuthCredentials = async ({
  email,
  password,
}: AuthRequest): Promise<AuthCredentials> => {
  const response = await axios.post(USER_SERVICES.login, { email, password });

  return response.data;
};

export { getAuthCredentials };
