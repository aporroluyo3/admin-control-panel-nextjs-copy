'use client';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  Image,
  Input,
  message,
  Space,
  Table,
  TableProps,
  Tag,
  TagProps,
  Typography,
} from 'antd';
import Link from 'next/link';
import {
  CROSS_SELL_ITEMS,
  CROSS_SELL_ROUTES,
  Route,
} from '@/constants/route.constants';
import { ProductWithRelated, RelatedProduct } from '@/types/product';
import { useProductContext } from '@/context/product.context';
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { AppLayout, PageHeader } from '@/components';
import { ProductsPageSkeleton } from '@/components/Skeletons';
import { BaseType } from 'antd/es/typography/Base';

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
        <Tag className='text-capitalize' color={color} icon={icon}>
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
          className='font-semibold'
        >
          Details
        </a>
      </Space>
    ),
  },
];

const RELATED_PRODUCTS_TABLE_COLUMNS: TableProps<ProductWithRelated>['columns'] =
  [
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
          <Tag className='text-capitalize' color={color} icon={icon}>
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
            className='font-semibold'
          >
            Details
          </a>
        </Space>
      ),
    },
  ];

const RELATED_PRODUCTS_CHILD_TABLE_COLUMNS: TableProps<RelatedProduct>['columns'] =
  [
    {
      title: 'Priority',
      dataIndex: 'num_priori',
      key: 'num_priori',
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
          <Tag className='text-capitalize' color={color} icon={icon}>
            {_}
          </Tag>
        );
      },
    },
  ];

export const ExpandedRowRender = ({ data }: { data: RelatedProduct[] }) => {
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
  const { products, isLoading, error } = useProductContext();

  const [filteredProducts, setFilteredProducts] = useState<
    ProductWithRelated[] | null
  >(null);
  const [productWithRelateds, setProductsWithRelateds] = useState<
    ProductWithRelated[] | null
  >(null);

  const router = useRouter();

  if (error) {
    console.error(error);

    message.open({
      type: 'error',
      content: 'Internal error. Failed to load data from server.',
    });

    message.open({
      type: 'loading',
      content: 'Redirecting to home page...',
    });

    setTimeout(() => {
      router.push(Route.HOME);
      message.destroy();
    }, 2000);
  }

  useEffect(() => {
    setFilteredProducts(products);
    setProductsWithRelateds(
      products?.filter((p) => p.relatedProducts.length > 0) ?? [],
    );
  }, [products]);

  const applyFilters = (searchTerm: string) => {
    if (!products) return;

    const filtered = products.filter((p) =>
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setFilteredProducts(filtered);
  };

  return (
    <AppLayout>
      <PageHeader
        title='Product list'
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
            title: 'Product list',
          },
        ]}
      />

      {isLoading || !filteredProducts ? (
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
          <Card title='Product list'>
            <Search
              size='middle'
              onChange={(e) => {
                applyFilters(e.target.value);
              }}
              placeholder='Search product by SKU'
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
