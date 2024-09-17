import { path } from '@/utils/route.utils';

/* eslint-disable no-unused-vars */
enum ApiModule {
  USER = 'user',
  PRODUCT = 'api/v1', // TODO: Change services name
}

const USER_SERVICES = {
  login: path(ApiModule.USER, '/login'),
};

const PRODUCT_SERVICES = {
  all: path(ApiModule.PRODUCT, '/'),
  find: path(ApiModule.PRODUCT, '/'),
  getBySku: path(ApiModule.PRODUCT, '/search-by-sku'),
  getRelated: path(ApiModule.PRODUCT, ''),
  addRelation: path(ApiModule.PRODUCT, '/addProductRelation'),
};

const requestHeaders = {
  'Content-Type': 'application/json',
};

export { ApiModule, USER_SERVICES, PRODUCT_SERVICES, requestHeaders };
