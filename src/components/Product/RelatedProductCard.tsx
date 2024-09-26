import { Product } from '@/types/product';
import { Card, Flex, Grid, Switch, theme, Typography } from 'antd';

const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

interface RelatedProductCardProps {
  product: Product;
}

export default function RelatedProductCard({
  product: { title, sku, image_url },
}: RelatedProductCardProps) {
  const {
    token: { fontSizeHeading5 },
  } = theme.useToken();
  const screens = useBreakpoint();

  return (
    <Card style={{ width: '100%', height: '100%' }} hoverable>
      <Flex vertical={screens.md} style={{ height: '100%' }} gap={10}>
        <picture>
          <img
            src={image_url}
            alt={`${title} image`}
            draggable={false}
            width={screens.md ? '100%' : '70px'}
          />
        </picture>
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          <Title
            style={{
              display: 'block',
              fontSize: fontSizeHeading5,
              fontWeight: '500',
            }}
          >
            {title}
          </Title>
          <Text style={{ display: 'block', color: 'gray' }}>Sku: {sku}</Text>
        </div>
      </Flex>
    </Card>
  );
}
