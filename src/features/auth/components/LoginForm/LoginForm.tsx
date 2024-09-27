'use client';
import { Button, Form, Input, Spin, Typography, theme } from 'antd';
import { LoadingOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { AuthRequest } from '@/features/auth/types/auth.types';
import { Styles } from '@/types/styles.types';

const { useToken } = theme;
const { Text } = Typography;

interface LoginFormProps {
  isLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  onLogin: (data: AuthRequest) => void;
}

interface FormValues extends AuthRequest {}

export default function LoginForm({
  isLoading = false,
  onLogin,
}: LoginFormProps) {
  const { token } = useToken();

  const onFinish = async (data: FormValues) => {
    onLogin(data);
  };

  const styles: Styles = {
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    text: {
      color: token.colorWhite,
      fontSize: token.fontSizeHeading5,
    },
    input: {
      fontSize: token.fontSizeHeading5,
      padding: '4px 10px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    },
  };

  return (
    <Form
      name='normal_login'
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      layout='vertical'
      requiredMark='optional'
      style={styles.form}
    >
      <Form.Item
        name='email'
        rules={[
          {
            type: 'email',
            required: true,
            message: 'El email no tiene un formato correcto.',
          },
        ]}
      >
        <Input
          prefix={<MailOutlined />}
          placeholder='Email'
          style={styles.input}
        />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[
          {
            required: true,
            message: 'La contraseña no puede estar vacía',
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          type='password'
          placeholder='Password'
          style={styles.input}
        />
      </Form.Item>
      <Form.Item style={{ marginBottom: '0px' }}>
        <Button block={true} type='primary' htmlType='submit'>
          {!isLoading ? (
            <Text style={styles.text}>Sign in</Text>
          ) : (
            <Spin
              indicator={<LoadingOutlined style={{ color: 'white' }} spin />}
              size='default'
            />
          )}
        </Button>
      </Form.Item>
    </Form>
  );
}
