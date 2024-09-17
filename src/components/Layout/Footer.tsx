import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

type FooterNavProps = React.HTMLAttributes<HTMLDivElement>;

export default function Footer({ ...others }: FooterNavProps) {
  return (
    <AntFooter {...others}>
      <div className='flex flex-col gap-3'>
        <strong>Welding Helmets Online © 2023</strong>
        <small>Tempalte design | AntD Dashboard</small>
      </div>
    </AntFooter>
  );
}
