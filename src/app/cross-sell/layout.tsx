import { ReactNode } from 'react';
import { ProductContextProvider } from '@/features/cross-sell/context/product.context';
import '@/styles/product.css';

interface CrossSellLayoutProps {
  children: ReactNode;
}

export default async function CrossSellLayout({
  children,
}: Readonly<CrossSellLayoutProps>) {
  return <ProductContextProvider>{children}</ProductContextProvider>;
}
