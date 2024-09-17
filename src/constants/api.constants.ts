/* eslint-disable no-unused-vars */
enum ApiModule {
  USER = 'user',
  PRODUCT = 'product',
}

const ApiServices: Record<ApiModule, Record<string, string>> = {
  [ApiModule.USER]: {
    LOGIN: 'login',
  },
  [ApiModule.PRODUCT]: {
    ALL: '',
    GET: '',
    SEARCH_BY_SKU: 'search-by-sku',
    GET_RELATED: '',
    ADD_RELATION: 'addProductRelation',
  },
};

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

const requestHeaders = {
  'Content-Type': 'application/json',
};

export { ApiModule, ApiServices, HttpMethod, requestHeaders };
