import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import '../styles/globals.css';

import { QueryProvider, SessionProvider } from '@/providers';

export const metadata: Metadata = {
  title: 'W.H.O Cross Sell Manager',
  description: 'W.H.O Cross Sell Manager admin',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang='en'>
      <body>
        <SessionProvider session={session}>
          <QueryProvider>
            <AntdRegistry>{children}</AntdRegistry>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
