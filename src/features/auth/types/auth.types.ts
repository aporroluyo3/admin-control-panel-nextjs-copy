import { JwtPayload } from 'jwt-decode';
import { ISODateString } from 'next-auth';

type AuthRequest = {
  email: string;
  password: string;
};

type AuthCredentials = {
  token: string;
  username: string;
};

type JwtCompletePayload = JwtPayload & {
  role?: string;
};

type CompleteSession = {
  user?: {
    name?: string | null;
    email?: string | null;
    sub?: string | null;
    id?: number | null;
    token?: string | null;
    role?: string | null;
    iat?: number | null;
    exp?: number | null;
    jti?: string | null;
  };
  expires: ISODateString;
};

export type {
  AuthRequest,
  AuthCredentials,
  JwtCompletePayload,
  CompleteSession,
};
