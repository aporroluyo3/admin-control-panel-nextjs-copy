import {
  ProductWithRelatedResponse,
  ProductWithRelated,
} from '@/types/product';

const allProductsAdapter = (
  data: ProductWithRelatedResponse,
): ProductWithRelated[] => {
  return data.products.map((e) => ({
    ...e,
    relatedProducts: [...e.related_products].sort(
      (a, b) => a.num_priori - b.num_priori,
    ),
  }));
};

const relatedProductsAdapter = (
  data: ProductWithRelated,
): ProductWithRelated => ({
  ...data,
  relatedProducts: [...data.relatedProducts].sort(
    (a, b) => a.num_priori - b.num_priori,
  ),
});

export { allProductsAdapter, relatedProductsAdapter };
