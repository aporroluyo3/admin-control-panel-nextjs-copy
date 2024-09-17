'use client';
import {
  Button,
  Dropdown,
  Flex,
  FloatButton,
  Input,
  Layout,
  MenuProps,
  message,
  theme,
  Tooltip,
  Switch,
  Typography,
} from 'antd';
import { ReactNode, useEffect, useRef, useState } from 'react';
import {
  AppstoreOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  QuestionOutlined,
  SettingOutlined,
  UserOutlined,
  MoonOutlined,
  SunOutlined,
} from '@ant-design/icons';
import { redirect, usePathname } from 'next/navigation';
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from 'react-transition-group';
import { useMediaQuery } from 'react-responsive';
import SideNav from './Sidenav';
import Header from './Header';
import Footer from './Footer';
import { AUTH_ROUTES } from '@/constants/route.constants';
import { signOut, useSession } from 'next-auth/react';
const { Content } = Layout;

const { Text } = Typography;

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const {
    token: { borderRadius },
  } = theme.useToken();
  const pathname = usePathname();
  const { data: session } = useSession({
    required: false,
    onUnauthenticated() {
      redirect(`/auth/login?callbackUrl=${pathname}`);
    },
  });
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const [collapsed, setCollapsed] = useState(true);
  const [navFill, setNavFill] = useState(false);
  const nodeRef = useRef(null);
  const floatBtnRef = useRef(null);

  const items: MenuProps['items'] = [
    {
      key: 'user-profile-link',
      label: 'profile',
      icon: <UserOutlined />,
    },
    {
      key: 'user-settings-link',
      label: 'settings',
      icon: <SettingOutlined />,
    },
    {
      key: 'user-help-link',
      label: 'help center',
      icon: <QuestionOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'user-logout-link',
      label: 'logout',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: () => {
        message.open({
          type: 'loading',
          content: 'signing you out',
        });

        setTimeout(() => {
          signOut({ callbackUrl: AUTH_ROUTES.login });
        }, 500);
      },
    },
  ];

  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        setNavFill(true);
        return;
      }
      setNavFill(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <SideNav
          trigger={null}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{
            overflow: 'auto',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            background: 'none',
            border: 'none',
            transition: 'all .2s',
          }}
        />
        <Layout>
          <Header
            style={{
              marginLeft: collapsed ? 0 : '200px',
              padding: '0 2rem 0 0',
              background: navFill ? 'rgba(255, 255, 255, .5)' : 'none',
              backdropFilter: navFill ? 'blur(8px)' : 'none',
              boxShadow: navFill ? '0 0 8px 2px rgba(0, 0, 0, 0.05)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'sticky',
              top: 0,
              zIndex: 1,
              gap: 8,
              transition: 'all .25s',
            }}
          >
            <Flex align='center'>
              <Tooltip title={`${collapsed ? 'Expand' : 'Collapse'} Sidebar`}>
                <Button
                  type='text'
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                  }}
                />
              </Tooltip>
              <Input.Search
                placeholder='search'
                style={{
                  width: isMobile ? '100%' : '400px',
                  marginLeft: isMobile ? 0 : '.5rem',
                }}
                size='middle'
              />
            </Flex>
            <Flex align='center' gap='small'>
              <Tooltip title='Apps'>
                <Button icon={<AppstoreOutlined />} type='text' size='large' />
              </Tooltip>
              <Tooltip title='Messages'>
                <Button icon={<MessageOutlined />} type='text' size='large' />
              </Tooltip>
              <Tooltip title='Theme'>
                {/* <Switch
                  className='hidden py-1 sm:inline'
                  checkedChildren={<MoonOutlined />}
                  unCheckedChildren={<SunOutlined />}
                  checked={mytheme === 'light' ? true : false}
                  onClick={() => dispatch(toggleTheme())}
                /> */}
              </Tooltip>
              <Text>Bienvenido, {session?.user?.name}</Text>
              <Dropdown menu={{ items }} trigger={['click']}>
                <Flex>
                  <UserOutlined className='text-md rounded-full bg-gray-200 p-2 text-xl' />
                </Flex>
              </Dropdown>
            </Flex>
          </Header>
          <Content
            style={{
              margin: `0 0 0 ${collapsed ? 0 : '200px'}`,
              // background: '#ebedf0',
              borderRadius: collapsed ? 0 : borderRadius,
              transition: 'all .25s',
              padding: '24px 32px',
              minHeight: 360,
            }}
          >
            <TransitionGroup>
              <SwitchTransition>
                <CSSTransition
                  // key={`css-transition-${location.key}`}
                  nodeRef={nodeRef}
                  // onEnter={() => {
                  //   setIsLoading(true);
                  // }}
                  // onEntered={() => {
                  //   setIsLoading(false);
                  // }}
                  timeout={300}
                  classNames='bottom-to-top'
                  unmountOnExit
                >
                  {() => (
                    <div ref={nodeRef} style={{ background: 'none' }}>
                      {children}
                    </div>
                  )}
                </CSSTransition>
              </SwitchTransition>
            </TransitionGroup>
            <div ref={floatBtnRef}>
              <FloatButton.BackTop />
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
              marginLeft: collapsed ? 0 : '200px',
              background: 'none',
            }}
          />
        </Layout>
      </Layout>
    </>
  );
}
