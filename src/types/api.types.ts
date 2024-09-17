type GlobalResponse = {
  code: string;
  message: string;
};

type GlobalErrorReponse = {
  statusCode: number;
  message: string;
};

export type { GlobalResponse, GlobalErrorReponse };
