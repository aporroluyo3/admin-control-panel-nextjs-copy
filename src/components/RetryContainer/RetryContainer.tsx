import { Button, Flex, theme, Typography } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface RetryContainerProps {
  label?: string;
  isLoading?: boolean;
  onRetry: () => void;
}

export default function RetryContainer({
  label = 'Retry',
  isLoading = false,
  onRetry,
}: RetryContainerProps) {
  const {
    token: { fontSizeHeading1 },
  } = theme.useToken();

  return (
    <Flex style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Flex
        gap='middle'
        vertical
        style={{
          fontSize: fontSizeHeading1,
          maxWidth: '300px',
          textAlign: 'center',
        }}
      >
        <Text>
          The data could not be loaded correctly. An internal error occurred
        </Text>
        <div style={{ display: 'grid', placeItems: 'center' }}>
          <Button
            type='primary'
            color='yellow'
            icon={<ReloadOutlined />}
            onClick={onRetry}
            loading={isLoading}
          >
            {label}
          </Button>
        </div>
      </Flex>
    </Flex>
  );
}
