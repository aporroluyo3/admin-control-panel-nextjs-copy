import React, { useEffect, useRef, useState } from 'react';
import { ConfigProvider, Layout, Menu, MenuProps, SiderProps } from 'antd';
import {
  GithubOutlined,
  SecurityScanOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CROSS_SELL_ROUTES } from '@/constants/route.constants';

const GITHUB_LINK =
  'https://github.com/Welding-Helmets-Online/cross-sell-manager-frontend-nextjs';

export const COLOR = {
  50: '#e0f1ff',
  100: '#b0d2ff',
  200: '#7fb0ff',
  300: '#4d8bff',
  400: '#1e79fe',
  500: '#076ee5',
  600: '#0062b3',
  700: '#004f81',
  800: '#003650',
  900: '#001620',
  borderColor: '#E7EAF3B2',
};

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
};

const items: MenuProps['items'] = [
  getItem('Services', 'services', null, [], 'group'),

  getItem('Cross Sell', 'cross-sell', <ShoppingCartOutlined />, [
    getItem(
      <Link href={CROSS_SELL_ROUTES.root}>List</Link>,
      'cross-sell-list',
      null,
    ),
  ]),

  getItem('Settings', 'settings', null, [], 'group'),

  getItem('User profile', 'user-profile', <UserOutlined />, [
    getItem(<Link href={''}>Details</Link>, 'details', null),
    getItem(<Link href={''}>Preferences</Link>, 'preferences', null),
    getItem(<Link href={''}>Information</Link>, 'personal-information', null),
    getItem(<Link href={''}>Security</Link>, 'security', null),
    getItem(<Link href={''}>Activity</Link>, 'activity', null),
    getItem(<Link href={''}>Actions</Link>, 'actions', null),
    getItem(<Link href={''}>Help</Link>, 'help', null),
    getItem(<Link href={''}>Feedback</Link>, 'feedback', null),
  ]),

  getItem('Authentication', 'authentication', <SecurityScanOutlined />, [
    getItem(<Link href={''}>Sign In</Link>, 'auth-signin', null),
    getItem(<Link href={''}>Sign Up</Link>, 'auth-signup', null),
    getItem(<Link href={''}>Welcome</Link>, 'auth-welcome', null),
    getItem(<Link href={''}>Verify email</Link>, 'auth-verify', null),
    getItem(<Link href={''}>Password reset</Link>, 'auth-password-reset', null),
    getItem(
      <Link href={''}>Passsword confirmation</Link>,
      'auth-password-confirmation',
      null,
    ),
  ]),

  getItem('Help', 'help', null, [], 'group'),

  getItem(
    <Link href={GITHUB_LINK} target='_blank'>
      Project repository
    </Link>,
    'project-repository',
    <GithubOutlined />,
  ),
];

const rootSubmenuKeys = ['cross-sell', 'authentication', 'user-profile'];

type SideNavProps = SiderProps;

export default function SideNav({ ...others }: SideNavProps) {
  const nodeRef = useRef(null);
  const pathname = usePathname();
  const [openKeys, setOpenKeys] = useState(['']);
  const [current, setCurrent] = useState('');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  useEffect(() => {
    const paths = pathname.split('/');
    setOpenKeys(paths);
    setCurrent(paths[paths.length - 1]);
  }, [pathname]);

  return (
    <Sider ref={nodeRef} breakpoint='lg' collapsedWidth='0' {...others}>
      <picture>
        <img
          src='https://cdn.shopify.com/s/files/1/3009/5686/files/logoweldinghelmetsonline.png?v=1705342552'
          alt='W.H.O Logo'
          className='px-3 py-4'
          width={200}
        />
      </picture>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemBg: 'none',
              itemSelectedBg: COLOR['100'],
              itemHoverBg: COLOR['50'],
              itemSelectedColor: COLOR['600'],
            },
          },
        }}
      >
        <Menu
          mode='inline'
          items={items}
          onClick={onClick}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          selectedKeys={[current]}
          style={{ border: 'none' }}
        />
      </ConfigProvider>
    </Sider>
  );
}
