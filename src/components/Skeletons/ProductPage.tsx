import { Divider, Flex, Grid, Skeleton } from 'antd';

const { useBreakpoint } = Grid;

export default function ProductsPage() {
  const screens = useBreakpoint();

  return (
    <Flex gap='middle' vertical style={{ padding: '30px 20px' }}>
      <Flex gap={40} vertical={!screens.sm}>
        <Skeleton.Image
          active
          style={{
            width: !screens.sm ? '100%' : '',
            height: !screens.sm ? '200px' : '',
          }}
        />
        <Skeleton active paragraph={{ rows: 3 }} />
      </Flex>
      <Divider />

      <Skeleton.Button
        active
        style={{ height: '15px', width: '150px', marginBottom: '20px' }}
      />
      <Skeleton active paragraph={{ rows: 2 }} />
      <Divider />

      <Skeleton.Button
        active
        style={{ height: '15px', width: '250px', marginBottom: '20px' }}
      />
      <Flex vertical align='flex-end' style={{ marginBottom: '30px' }}>
        <Skeleton.Button
          active
          style={{ height: '15px', width: '100px', marginBottom: '20px' }}
        />
        <Skeleton.Button active style={{ height: '240px' }} block />
      </Flex>
      <Flex vertical align='flex-end'>
        <Skeleton.Button
          active
          style={{ height: '15px', width: '100px', marginBottom: '20px' }}
        />
        <Skeleton.Button
          active
          style={{ height: '20px', marginBottom: '20px' }}
          block
        />
        <Skeleton.Button active style={{ height: '240px' }} block={true} />
      </Flex>
    </Flex>
  );
}
