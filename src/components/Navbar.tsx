'use client';
import { signOut, useSession } from 'next-auth/react';
import { redirect, usePathname } from 'next/navigation';
import { Route } from '@/constants/route.constants';
import { Button } from 'antd';

export default function Navbar() {
  const pathName = usePathname();

  const { data: session } = useSession({
    required: false,
    onUnauthenticated() {
      redirect(`/auth/login?callbackUrl=${pathName}`);
    },
  });

  console.log(session); // TODO: delete

  const handleClick = (): void => {
    signOut({ callbackUrl: Route.LOGIN });
  };

  return (
    <nav>
      <h1>Bienvenido {session?.user?.name}</h1>

      <Button onClick={handleClick} type='primary' danger>
        Logout
      </Button>
    </nav>
  );
}
