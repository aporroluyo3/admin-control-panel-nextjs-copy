import { jwtDecode } from 'jwt-decode';
import { JwtCompletePayload } from '@/features/auth/types/auth.types';

const isTokenExpired = (token: string): boolean => {
  const decoded: JwtCompletePayload = jwtDecode(token);
  const currentTime = Math.floor(Date.now() / 1000);

  if (decoded.exp && decoded.exp < currentTime) return true;

  return false;
};

export { isTokenExpired };
