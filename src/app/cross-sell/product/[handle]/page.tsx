'use client';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import {
  Card,
  Col,
  Descriptions,
  DescriptionsProps,
  Flex,
  Grid,
  Image,
  notification,
  Row,
  TabsProps,
  theme,
  Typography,
} from 'antd';
import { ProductWithRelated } from '@/features/cross-sell/types/product';
import {
  CROSS_SELL_ITEMS,
  CROSS_SELL_ROUTES,
  Route,
} from '@/constants/route.constants';
import {
  getProduct,
  getRelatedProductsBySku,
} from '@/features/cross-sell/services/product.services';
import {
  ProductDetails,
  RelatedProducts,
} from '@/features/cross-sell/components/Product';
import { HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { AppLayout } from '@/components/AppLayout';
import { PageHeader } from '@/components/PageHeader';
import { RetryContainer } from '@/components/RetryContainer';
import { ProductPageSkeleton } from '@/features/cross-sell/components/Skeletons';

const { Text } = Typography;
const { useBreakpoint } = Grid;

interface SingleProductPageProps {
  params: { handle: string };
}

export default function ProductDetailsPage({ params }: SingleProductPageProps) {
  const {
    token: { borderRadius, fontSizeHeading4 },
  } = theme.useToken();
  const screens = useBreakpoint();
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();

  const [product, setProduct] = useState<ProductWithRelated | null>(null);

  const productDetailsMutation = useMutation({
    mutationFn: getProduct,
    onSuccess: (data) => {
      setProduct({ ...data, relatedProducts: [] });
      productWithRelatedMutation.mutate(data.sku);
    },
    onError: (error: AxiosError) => {
      notificationApi.error({
        key: 'get-product-error',
        message: 'Error',
        description: 'Error getting data from server',
      });
      console.error(error);
    },
  });

  const productWithRelatedMutation = useMutation({
    mutationFn: getRelatedProductsBySku,
    onSuccess: (data) => {
      setProduct(data);
    },
    onError: (error: AxiosError) => {
      notificationApi.open({
        key: 'get-product-with-relateds-error',
        message: 'Error',
        description: 'Error getting data from server',
      });
      console.error(error);
    },
  });

  const TAB_ITEMS: TabsProps['items'] = [
    {
      key: CROSS_SELL_ROUTES.product(params.handle),
      label: 'Details',
    },
  ];

  useEffect(() => {
    productDetailsMutation.mutate({
      type: 'handle',
      searchParam: params.handle,
    });
  }, []);

  return (
    <AppLayout>
      <PageHeader
        title='Product details'
        breadcrumbs={[
          {
            title: (
              <Link href={Route.HOME} style={{ display: 'flex', gap: '4px' }}>
                <HomeOutlined />
                <span>Home</span>
              </Link>
            ),
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
            title: 'Product details',
          },
        ]}
      />
      <>
        {notificationContextHolder}

        {productDetailsMutation.isError ||
        productWithRelatedMutation.isError ? (
          <RetryContainer
            onRetry={() => {
              productDetailsMutation.mutate({
                type: 'handle',
                searchParam: params.handle,
              });
            }}
          />
        ) : productDetailsMutation.isPending ||
          productWithRelatedMutation.isPending ? (
          <ProductPageSkeleton />
        ) : (
          product && (
            <>
              {(() => {
                const DESCRIPTION_ITEMS: DescriptionsProps['items'] = [
                  {
                    key: 'sku',
                    label: 'SKU',
                    children: <span>{product.sku}</span>,
                  },
                  {
                    key: 'vendor',
                    label: 'Vendor',
                    children: <span>{product.vendor}</span>,
                  },
                  {
                    key: 'status',
                    label: 'Status',
                    children: <span>{product.status}</span>,
                  },
                  {
                    key: 'price',
                    label: 'Price',
                    children: <span>{product.price}</span>,
                  },
                  {
                    key: 'compare-at-price',
                    label: 'Compare at price',
                    children: <span>{product.compare_at_price}</span>,
                  },
                  {
                    key: 'weight-unit',
                    label: 'Weight unit',
                    children: <span>{product.weight_unit}</span>,
                  },
                ];

                return (
                  <Card className='user-profile-card-nav card'>
                    <Row gutter={screens.lg ? 40 : 10}>
                      <Col xs={24} sm={12} md={9} lg={6} xl={5}>
                        <Image
                          src={product.image_url}
                          alt={`${product.title} image`}
                          height='100%'
                          width='100%'
                          style={{ borderRadius }}
                        />
                      </Col>
                      <Col xs={24} sm={12} md={13} lg={18} xl={19}>
                        <Text
                          style={{
                            marginBottom: '2rem',
                            display: 'block',
                            fontSize: fontSizeHeading4,
                            fontWeight: '500',
                          }}
                        >
                          {product.title}
                        </Text>
                        <Descriptions
                          title='Information'
                          items={DESCRIPTION_ITEMS}
                          column={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl: 4 }}
                        />
                      </Col>
                    </Row>
                  </Card>
                );
              })()}
              <div style={{ marginTop: '1.5rem' }}>
                <Flex vertical gap='middle'>
                  <ProductDetails product={product} />
                  <RelatedProducts
                    productSku={product.sku}
                    relatedProducts={product.relatedProducts}
                  />
                </Flex>
              </div>
            </>
          )
        )}
      </>
    </AppLayout>
  );
}
