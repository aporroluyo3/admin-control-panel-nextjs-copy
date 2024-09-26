import axios from '@/lib/axiosInstance';
import {
  allProductsAdapter,
  relatedProductsAdapter,
} from '@/adapters/product.adapter';
import { PRODUCT_SERVICES } from '@/constants/api.constants';
import { GlobalResponse } from '@/types/api.types';
import {
  HandleRelationDTO,
  DeleteProductRelationRequest,
  DetailedProduct,
  GetProductRequest,
  Product,
  ProductWithRelated,
  Sku,
  UpdateRelatedPriorityDTO,
  UpdateRelatedPriorityRequest,
} from '@/types/product';

const getAllProducts = async (): Promise<ProductWithRelated[]> => {
  const response = await axios.get(`${PRODUCT_SERVICES.all}?page=1&limit=240`);

  const adaptedReponse = allProductsAdapter(response.data);

  return adaptedReponse;
};

const getProduct = async ({
  type,
  searchParam,
}: GetProductRequest): Promise<Product> => {
  const services = {
    id: `${PRODUCT_SERVICES.getById}?id=${searchParam}`,
    handle: `${PRODUCT_SERVICES.getByHandle}?handle=${searchParam}`,
    sku: `${PRODUCT_SERVICES.getBySku}?sku=${searchParam}`,
  };

  const response = await axios.get(services[type]);

  return response.data;
};

const syncShopifyProducts = async (): Promise<DetailedProduct[]> => {
  const response = await axios.get(PRODUCT_SERVICES.sync);

  return response.data;
};

const getRelatedProductsBySku = async (
  sku: Sku,
): Promise<ProductWithRelated> => {
  const response = await axios.get(
    `${PRODUCT_SERVICES.getRelatedBySku}?sku=${sku}`,
  );

  const adaptedData = relatedProductsAdapter(response.data);

  return adaptedData;
};

const addProductRelation = async ({
  productSku,
  relatedProductSkus,
}: HandleRelationDTO): Promise<GlobalResponse> => {
  const requestData = { productSku, relatedProductSkus };

  const response = await axios.post(PRODUCT_SERVICES.addRelation, requestData);

  return response.data;
};

const deleteProductRelation = async ({
  productSku,
  relatedProductSkus,
}: HandleRelationDTO): Promise<GlobalResponse> => {
  const requestData: DeleteProductRelationRequest = {
    product_sku: productSku,
    related_product_skus: relatedProductSkus,
  };

  const response = await axios.delete(PRODUCT_SERVICES.deleteRelation, {
    data: requestData,
  });

  return response.data;
};

const updateRelatedPriority = async ({
  priority,
  productSku,
  relatedProductSku,
}: UpdateRelatedPriorityDTO): Promise<GlobalResponse> => {
  const requestData: UpdateRelatedPriorityRequest = {
    id_numpri: priority + 1,
    product_sku: productSku,
    related_product_sku: relatedProductSku,
  };

  const response = await axios.put(
    PRODUCT_SERVICES.updateRelatedPriority,
    requestData,
  );

  return response.data;
};

export {
  getAllProducts,
  syncShopifyProducts,
  getProduct,
  getRelatedProductsBySku,
  addProductRelation,
  deleteProductRelation,
  updateRelatedPriority,
};
