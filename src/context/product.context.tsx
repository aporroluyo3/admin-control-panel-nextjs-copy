'use client';
import { getAllProducts } from '@/services/product.services';
import { ProductWithRelated } from '@/types/product';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

/* eslint-disable no-unused-vars */
interface DataContextType {
  products: ProductWithRelated[] | null;
  setProducts: (products: ProductWithRelated[]) => void;
  isLoading: boolean;
  error: AxiosError | null;
}
/* eslint-enable no-unused-vars */

const DataContext = createContext<DataContextType | undefined>(undefined);

export const ProductContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [products, setProducts] = useState<ProductWithRelated[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);

  // TODO: mejorar este fetching ante errores
  const allProductsMutation = useMutation({
    mutationFn: getAllProducts,
    onSuccess: (data) => {
      setProducts(data);
      setIsLoading(false);
    },
    onError: (error: AxiosError) => {
      console.error(error);
      setError(error);
      setIsLoading(false);
    },
  });

  useEffect(() => {
    allProductsMutation.mutate();
  }, []);

  return (
    <DataContext.Provider value={{ products, setProducts, isLoading, error }}>
      {children}
    </DataContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useProductContext must be used inside a DataProvider');
  }
  return context;
};
