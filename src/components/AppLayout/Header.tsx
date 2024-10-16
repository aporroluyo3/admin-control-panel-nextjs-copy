import { Layout } from 'antd';
import { HTMLAttributes, useRef } from 'react';

const { Header: AntHeader } = Layout;

type HeaderProps = {
  navFill?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export default function Header({ navFill, ...props }: HeaderProps) {
  const nodeRef = useRef(null);

  return <AntHeader ref={nodeRef} {...props} />;
}
