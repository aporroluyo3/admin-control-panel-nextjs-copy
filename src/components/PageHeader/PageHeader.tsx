import React, { HTMLAttributes } from 'react';
import { Breadcrumb, BreadcrumbProps, Divider, Space, Typography } from 'antd';
import './styles.css';

interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  breadcrumbs: BreadcrumbProps['items'];
}

export default function PageHeader({
  breadcrumbs,
  title,
  ...props
}: PageHeaderProps) {
  return (
    <div {...props}>
      <Space direction='vertical' size='small'>
        <Typography.Title
          level={4}
          style={{ padding: 0, margin: 0, textTransform: 'capitalize' }}
        >
          {title}
        </Typography.Title>
        <Breadcrumb items={breadcrumbs} className='page-header-breadcrumbs' />
      </Space>
      <Divider orientation='right' plain>
        <span style={{ textTransform: 'capitalize' }}>{title}</span>
      </Divider>
    </div>
  );
}
