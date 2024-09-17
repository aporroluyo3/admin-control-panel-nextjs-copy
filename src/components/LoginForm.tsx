import { Button, Form, Input, Spin, Typography, theme } from 'antd';
import { LoadingOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { AuthRequest } from '@/types/auth.types';

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

  return (
    <Form
      name='normal_login'
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      layout='vertical'
      requiredMark='optional'
      className='flex flex-col gap-4'
    >
      {/* <Alert message='Success Text' type='error' showIcon /> */}
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
        <Input prefix={<MailOutlined />} placeholder='Email' />
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
        />
      </Form.Item>
      <Form.Item style={{ marginBottom: '0px' }}>
        <Button block={true} type='primary' htmlType='submit'>
          {!isLoading ? (
            <Text style={{ color: token.colorWhite }}>Sing in</Text>
          ) : (
            <Spin indicator={<LoadingOutlined spin />} size='large' />
          )}
        </Button>
      </Form.Item>
    </Form>
  );
}
