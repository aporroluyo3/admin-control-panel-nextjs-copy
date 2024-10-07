import { path } from '@/utils/route.utils';

/* eslint-disable no-unused-vars */
enum ApiName {
  CROSS_SELL = 'CROSS_SELL',
}

enum ApiModule {
  USER = 'auth',
  PRODUCT = 'api/v1', // TODO: Change services name
}

const USER_SERVICES = {
  login: path(ApiModule.USER, '/login'),
};

const PRODUCT_SERVICES = {
  all: path(ApiModule.PRODUCT, '/allbd'),
  sync: path(ApiModule.PRODUCT, '/list'),
  getBySku: path(ApiModule.PRODUCT, '/prodsku'),
  getById: path(ApiModule.PRODUCT, '/prodid'),
  getByHandle: path(ApiModule.PRODUCT, '/prodhand'),
  getRelatedBySku: path(ApiModule.PRODUCT, '/prodRela'),
  addRelation: path(ApiModule.PRODUCT, '/addProdRela'),
  deleteRelation: path(ApiModule.PRODUCT, '/deleProRela'),
  updateRelatedPriority: path(ApiModule.PRODUCT, '/upNumPriori'),
};

const requestHeaders = {
  'Content-Type': 'application/json',
};

export { ApiName, ApiModule, USER_SERVICES, PRODUCT_SERVICES, requestHeaders };
