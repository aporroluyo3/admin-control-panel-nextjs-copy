import { Button, Flex, theme, Typography } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { Styles } from '@/types/styles.types';
import './styles.css';

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

  const styles: Styles = {
    container: { width: '100%', display: 'flex', justifyContent: 'center' },
    box: {
      fontSize: fontSizeHeading1,
      maxWidth: '300px',
      textAlign: 'center',
    },
    buttonBox: { display: 'grid', placeItems: 'center' },
  };

  return (
    <Flex style={styles.container}>
      <Flex gap='middle' vertical style={styles.box}>
        <Text>
          The data could not be loaded correctly. An internal error occurred
        </Text>
        <div style={styles.buttonBox}>
          <Button
            type='primary'
            id='retry-button'
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
