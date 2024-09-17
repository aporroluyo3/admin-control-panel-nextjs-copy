'use client';
import React, { useEffect, useState } from 'react';
import { Grid, notification, theme, Typography, message } from 'antd';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { AuthRequest } from '@/types/auth.types';
import { LoginForm } from '@/components';

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title } = Typography;

export default function Login() {
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();

  const { token } = useToken();
  const screens = useBreakpoint();

  const [loading, setLoading] = useState(false);

  const handleLogin = async ({ email, password }: AuthRequest) => {
    // TODO: Arreglar esto para usar server actions
    setLoading(true);

    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (response?.error) {
      setLoading(false);

      if (response.status === 401) {
        openNotification('Error', 'Credenciales incorrectas.');
        return;
      }

      console.error(response);
      openNotification('Oops!', 'Ocurrió un error interno.');
      return;
    }

    if (response?.ok) {
      setTimeout(() => {
        setLoading(false);
        router.push('/');
      }, 1000);
    }
  };

  const openNotification = (message: string, description: string) => {
    api.error({
      message,
      description,
      placement: 'topRight',
    });
  };

  const styles = {
    container: {
      margin: '0 auto',
      padding: screens.md
        ? `${token.paddingXL}px`
        : `${token.sizeXXL}px ${token.padding}px`,
      width: '380px',
    },
    header: {
      marginBottom: token.marginXL,
    },
    section: {
      alignItems: 'center',
      backgroundColor: '#fafafa',
      display: 'flex',
      height: screens.sm ? '100vh' : 'auto',
      padding: screens.md ? `${token.sizeXXL}px 0px` : '0px',
    },
    text: {
      color: token.colorTextSecondary,
      fontSize: token.fontSizeHeading4,
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
  };

  useEffect(() => {
    if (loading) {
      message.open({
        type: 'loading',
        content: 'signing...',
      });
      return;
    }
    message.destroy();
  }, [loading]);

  return (
    <>
      {contextHolder}

      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.header} className='text-center'>
            <Title style={styles.title}>Sign in</Title>
            <Text style={styles.text}>Cross Sell Manager</Text>
          </div>
          <LoginForm onLogin={handleLogin} isLoading={loading} />
        </div>
      </section>
    </>
  );
}
