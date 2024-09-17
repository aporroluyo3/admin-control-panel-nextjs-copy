import { PRODUCT_SERVICES } from '@/constants/api.constants';
import axios from '@/lib/axiosInstance';
import { Product } from '@/types/products.types';

const getAllProducts = async (): Promise<{ products: Array<Product> }> => {
  const response = await axios.get(`${PRODUCT_SERVICES.all}?page=1&limit=240`);

  return response.data;
};

export { getAllProducts };
