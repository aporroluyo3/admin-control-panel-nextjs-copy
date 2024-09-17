const getApiUrl = (): string => {
  const PROT = process.env.NEXT_PUBLIC_API_PROT;
  const HOST = process.env.NEXT_PUBLIC_API_HOST;
  const PORT = process.env.NEXT_PUBLIC_API_PORT;
  const PATH = process.env.NEXT_PUBLIC_API_PATH;

  const pathSegment = PATH ? `/${PATH}` : '';

  const url = `${PROT}://${HOST}${PORT ? ':' + PORT : ''}${pathSegment}/`;

  return url;
};

export { getApiUrl };
