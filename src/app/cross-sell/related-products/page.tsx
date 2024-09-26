'use client';
import { HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { CROSS_SELL_ITEMS, Route } from '@/constants/route.constants';
import Link from 'next/link';
import { AppLayout, PageHeader } from '@/components';

export default function RelatedProductsPage() {
  return (
    <AppLayout>
      <PageHeader
        title='Active related products'
        breadcrumbs={[
          {
            title: (
              <>
                <HomeOutlined />
                <span>home</span>
              </>
            ),
            path: Route.HOME,
          },
          {
            title: (
              <>
                <ShoppingCartOutlined />
                <span>Cross sell</span>
              </>
            ),
            menu: {
              items: CROSS_SELL_ITEMS.map(({ title, path }) => ({
                key: title,
                title: <Link href={path}>{title}</Link>,
              })),
            },
          },
          {
            title: 'Active related products',
          },
        ]}
      />
      <div id='related-product-list'>hola</div>
    </AppLayout>
  );
}
