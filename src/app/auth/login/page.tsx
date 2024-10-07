'use client';
import React, { useEffect, useState } from 'react';
import { Grid, notification, theme, Typography, message } from 'antd';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Route } from '@/constants/route.constants';
import { AuthRequest } from '@/features/auth/types/auth.types';
import { Styles } from '@/types/styles.types';
import { LoginForm } from '@/features/auth/components/LoginForm';

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title } = Typography;

export default function Login() {
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();
  const [messageApi, messageContextHolder] = message.useMessage();
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

      if (response.error === 'Unauthorized') {
        openErrorNotification('Error', 'Incorrect credentials.');
        return;
      }

      console.error(response);
      openErrorNotification('Oops!', 'An internal error occurred.');
      return;
    }

    if (response?.ok) {
      setTimeout(() => {
        setLoading(false);
        router.push(Route.HOME);
      }, 1000);
    }
  };

  const openErrorNotification = (message: string, description: string) => {
    notificationApi.error({
      key: 'loginError',
      message,
      description,
      placement: 'topRight',
    });
  };

  const styles: Styles = {
    container: {
      margin: '0 auto',
      padding: screens.md ? `${token.paddingXL}px` : `150px ${token.padding}px`,
      width: '380px',
    },
    header: {
      marginBottom: token.marginXL,
      textAlign: 'center',
    },
    section: {
      alignItems: screens.sm ? 'center' : 'start',
      backgroundColor: '#fafafa',
      display: 'flex',
      height: '100vh',
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
      messageApi.loading('signin...');
      return;
    }
    messageApi.destroy();
  }, [loading]);

  return (
    <>
      {notificationContextHolder}
      {messageContextHolder}

      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.header}>
            <Title style={styles.title}>Sign in</Title>
            <Text style={styles.text}>W.H.O Manager</Text>
          </div>
          <LoginForm onLogin={handleLogin} isLoading={loading} />
        </div>
      </section>
    </>
  );
}
