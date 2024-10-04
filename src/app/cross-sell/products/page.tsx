'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import {
  Button,
  Card,
  Image,
  Input,
  message,
  notification,
  Space,
  Table,
  TableProps,
  Tag,
  TagProps,
  Typography,
} from 'antd';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import {
  CROSS_SELL_ITEMS,
  CROSS_SELL_ROUTES,
  Route,
} from '@/constants/route.constants';
import { BaseType } from 'antd/es/typography/Base';
import {
  ProductWithRelated,
  RelatedProduct,
} from '@/features/cross-sell/types/product';
import { useProductContext } from '@/features/cross-sell/context/product.context';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { AppLayout } from '@/components/AppLayout';
import { PageHeader } from '@/components/PageHeader';
import { ProductsPageSkeleton } from '@/features/cross-sell/components/Skeletons';
import { RetryContainer } from '@/components/RetryContainer';
import { syncShopifyProducts } from '@/features/cross-sell/services/product.services';
import { useRouter } from 'next/navigation';

const { Search } = Input;
const { Text } = Typography;

const PRODUCTS_TABLE_COLUMNS: TableProps<ProductWithRelated>['columns'] = [
  {
    title: 'SKU',
    dataIndex: 'sku',
    key: 'sku',
    ellipsis: true,
  },
  {
    title: 'Image',
    dataIndex: 'image_url',
    key: 'image_url',
    render: (_: string, record) => (
      <Image width={70} src={_} alt={`${record.title} image`} />
    ),
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Handle',
    dataIndex: 'handle',
    key: 'handle',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (_: string) => {
      let color: TagProps['color'], icon: ReactNode;

      if (_ === 'active') {
        color = 'green-inverse';
        icon = <CheckCircleOutlined />;
      } else {
        color = 'red-inverse';
        icon = <ExclamationCircleOutlined />;
      }

      return (
        <Tag color={color} icon={icon}>
          {_}
        </Tag>
      );
    },
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Compare at price',
    dataIndex: 'compare_at_price',
    key: 'compare_at_price',
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    render: (_, record) => (
      <Space size='middle'>
        <a
          href={CROSS_SELL_ROUTES.product(record.handle)}
          style={{ fontWeight: '600' }}
        >
          Details
        </a>
      </Space>
    ),
    fixed: 'right',
  },
];

const RELATED_PRODUCTS_TABLE_COLUMNS: TableProps<ProductWithRelated>['columns'] =
  [
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: 'Image',
      dataIndex: 'image_url',
      key: 'image_url',
      render: (_: string, record) => (
        <Image width={70} src={_} alt={`${record.title} image`} />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Handle',
      dataIndex: 'handle',
      key: 'handle',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_: string) => {
        let color: TagProps['color'], icon: ReactNode;

        if (_ === 'active') {
          color = 'green-inverse';
          icon = <CheckCircleOutlined />;
        } else {
          color = 'red-inverse';
          icon = <ExclamationCircleOutlined />;
        }

        return (
          <Tag color={color} icon={icon}>
            {_}
          </Tag>
        );
      },
    },
    {
      title: 'Total related products',
      dataIndex: 'relatedProducts',
      key: 'relatedProducts',
      render: (_: RelatedProduct[]) => {
        let type: BaseType;

        if (_.length === 5) {
          type = 'danger';
        } else if (_.length < 5 && _.length >= 3) {
          type = 'warning';
        } else {
          type = 'success';
        }
        return (
          <Text type={type} strong>
            {_.length}
          </Text>
        );
      },
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <Space size='middle'>
          <a
            href={CROSS_SELL_ROUTES.product(record.handle)}
            style={{ fontWeight: '600' }}
          >
            Details
          </a>
        </Space>
      ),
      fixed: 'right',
    },
  ];

const RELATED_PRODUCTS_CHILD_TABLE_COLUMNS: TableProps<RelatedProduct>['columns'] =
  [
    {
      title: 'Priority',
      dataIndex: 'num_priori',
      key: 'num_priori',
      render: (_: number) => {
        if (!_) {
          return (
            <CloseCircleOutlined style={{ color: 'red', fontSize: '18px' }} />
          );
        }
        return <Text>{_}</Text>;
      },
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
      ellipsis: true,
    },
    {
      title: 'Image',
      dataIndex: 'image_url',
      key: 'image_url',
      render: (_: string, record) => (
        <Image width={70} src={_} alt={`${record.title} image`} />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Handle',
      dataIndex: 'handle',
      key: 'handle',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_: string) => {
        let color: TagProps['color'], icon: ReactNode;

        if (_ === 'active') {
          color = 'green-inverse';
          icon = <CheckCircleOutlined />;
        } else {
          color = 'red-inverse';
          icon = <ExclamationCircleOutlined />;
        }

        return (
          <Tag color={color} icon={icon}>
            {_}
          </Tag>
        );
      },
    },
  ];

const ExpandedRowRender = ({ data }: { data: RelatedProduct[] }) => {
  return (
    <Table
      columns={RELATED_PRODUCTS_CHILD_TABLE_COLUMNS}
      dataSource={data}
      pagination={false}
      className='relateds-by-product-child-table'
    />
  );
};

export default function ProductListPage() {
  const { products, update, isLoading, error } = useProductContext();
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();
  const [messageApi, messageContextHolder] = message.useMessage();
  const router = useRouter();

  const [filteredProducts, setFilteredProducts] = useState<
    ProductWithRelated[] | null
  >(null);
  const [productWithRelateds, setProductsWithRelateds] = useState<
    ProductWithRelated[] | null
  >(null);

  const syncProductsMutation = useMutation({
    mutationFn: syncShopifyProducts,
    onSuccess: () => {
      notificationApi.success({
        key: 'sync-shopify-products-success',
        message: 'Error',
        description: 'The data was updated successfully.',
      });
      update();
    },
    onError: (error: AxiosError) => {
      notificationApi.error({
        key: 'sync-shopify-products-error',
        message: 'Error',
        description: 'Error getting data from server.',
      });
      console.error(error);
    },
    onSettled: () => {
      messageApi.destroy('sync-shopify-products-loading');
    },
  });

  useEffect(() => {
    if (!products) return;

    setFilteredProducts(products);
    setProductsWithRelateds(
      products?.filter((p) => p.relatedProducts.length > 0) ?? [],
    );
  }, [products]);

  const applyFilters = (searchTerm: string) => {
    if (!products) return;

    if (!searchTerm || searchTerm === '') {
      setFilteredProducts(products);
      return;
    }

    const lowerCaseTerm = searchTerm.toLowerCase();

    const filteredProducts = products.filter(
      (p) =>
        p.sku.toLowerCase().includes(lowerCaseTerm) ||
        p.title.toLowerCase().includes(lowerCaseTerm),
    );

    setFilteredProducts(filteredProducts);
  };

  const handleSyncClick = (): void => {
    messageApi.loading({
      key: 'sync-shopify-products-loading',
      content: 'Synchronizing information...',
      duration: 0,
    });
    syncProductsMutation.mutate();
  };

  return (
    <AppLayout>
      <PageHeader
        title='Products'
        breadcrumbs={[
          {
            title: (
              <Link href={Route.HOME} style={{ display: 'flex', gap: '4px' }}>
                <HomeOutlined />
                <span>home</span>
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
          { title: 'Products' },
        ]}
      />
      {notificationContextHolder}
      {messageContextHolder}

      {error ? (
        <RetryContainer
          label='Reload'
          onRetry={() => {
            window.location.reload();
          }}
        />
      ) : isLoading || !filteredProducts ? (
        <ProductsPageSkeleton />
      ) : (
        <div
          id='products'
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: '30px',
          }}
        >
          <div style={{ alignSelf: 'end' }}>
            <Button
              onClick={handleSyncClick}
              loading={syncProductsMutation.isPending}
              color='primary'
              variant='outlined'
            >
              Sync shopify products
            </Button>
          </div>
          <Card title='Product list'>
            <Search
              size='middle'
              onChange={(e) => {
                applyFilters(e.target.value);
              }}
              placeholder='Search product by SKU or title'
              style={{ padding: '20px 0px' }}
            />

            <Table
              columns={PRODUCTS_TABLE_COLUMNS}
              dataSource={filteredProducts?.map((product) => ({
                ...product,
                key: product.sku,
              }))}
            />
          </Card>
          <Card title='Related products by Product'>
            <Table
              columns={RELATED_PRODUCTS_TABLE_COLUMNS}
              dataSource={productWithRelateds?.map((product) => ({
                ...product,
                key: product.sku,
              }))}
              expandable={{
                expandedRowRender: (record) => (
                  <ExpandedRowRender data={record.relatedProducts} />
                ),
              }}
              className='relateds-by-product-table'
            />
          </Card>
        </div>
      )}
    </AppLayout>
  );
}
