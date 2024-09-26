'use client';
import { Button, ButtonProps, Card, Flex, Typography } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { ProductWithRelated } from '@/types/product';

const { Text } = Typography;

const BUTTON_PROPS: ButtonProps = {
  type: 'dashed',
  style: {
    width: '100%',
    textAlign: 'start',
    justifyContent: 'start',
    overflow: 'hidden',
  },
  // onClick: (e: React.MouseEvent<HTMLElement>) => {
  //   navigator.clipboard.writeText(e.target.innerHTML);
  // },
};

interface ProductDetailsProps {
  product: ProductWithRelated;
}

export default function ProductDetails({
  product: { handle, admin_graphql_api_id, id },
}: ProductDetailsProps) {
  const isMobile = useMediaQuery({ maxWidth: 600 });

  return (
    <Card title='Details'>
      <Flex vertical gap='small'>
        <Flex
          vertical={isMobile}
          align={isMobile ? 'flex-start' : 'center'}
          gap={4}
        >
          <Text style={{ width: 200 }}>Internal ID</Text>
          <Button {...BUTTON_PROPS}>{id}</Button>
        </Flex>
        <Flex
          vertical={isMobile}
          align={isMobile ? 'flex-start' : 'center'}
          gap={4}
        >
          <Text style={{ width: 200 }}>Handle</Text>
          <Button {...BUTTON_PROPS}>{handle}</Button>
        </Flex>
        <Flex
          vertical={isMobile}
          align={isMobile ? 'flex-start' : 'center'}
          gap={4}
        >
          <Text style={{ width: 200 }}>Shopify ID</Text>
          <Button {...BUTTON_PROPS}>{admin_graphql_api_id}</Button>
        </Flex>
      </Flex>
    </Card>
  );
}
