import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

type FooterNavProps = React.HTMLAttributes<HTMLDivElement>;

export default function Footer({ ...props }: FooterNavProps) {
  return (
    <AntFooter {...props}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <strong>Welding Helmets Online © 2024</strong>
        <small>Template design | AntD Dashboard</small>
      </div>
    </AntFooter>
  );
}
