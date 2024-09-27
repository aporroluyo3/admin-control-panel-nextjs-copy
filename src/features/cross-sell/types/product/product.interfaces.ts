import { Product, RelatedProduct, Sku } from './product.types';

type GetProductRequest = {
  type: 'sku' | 'id' | 'handle';
  searchParam: string;
};

type DeleteProductRelationRequest = {
  product_sku: Sku;
  related_product_skus: Sku[];
};

type UpdateRelatedPriorityRequest = {
  id_numpri: number;
  product_sku: Sku;
  related_product_sku: Sku;
};

type ProductWithRelatedResponse = {
  products: (Product & {
    related_products: RelatedProduct[];
  })[];
};

export type {
  GetProductRequest,
  DeleteProductRelationRequest,
  UpdateRelatedPriorityRequest,
  ProductWithRelatedResponse,
};
