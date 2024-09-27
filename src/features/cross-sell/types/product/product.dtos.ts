import { Priority, Sku } from './product.types';

type HandleRelationDTO = {
  productSku: Sku;
  relatedProductSkus: Sku[];
};

type UpdateRelatedPriorityDTO = {
  priority: Priority;
  productSku: Sku;
  relatedProductSku: Sku;
};

export type { HandleRelationDTO, UpdateRelatedPriorityDTO };
