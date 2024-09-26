import { Divider, Flex, Grid, Skeleton } from 'antd';

const { useBreakpoint } = Grid;

export default function ProductsPage() {
  const screens = useBreakpoint();

  return (
    <Flex gap='middle' vertical style={{ padding: '30px 20px' }}>
      <Skeleton.Button active style={{ height: '15px', width: '100px' }} />
      <Divider style={{ margin: '0px', marginBottom: '10px' }} />

      <Skeleton.Button
        active
        style={{ height: '30px', marginBottom: '15px' }}
        block
      />
      <Flex gap={'4px'} vertical>
        <Skeleton.Button active style={{ height: '60px' }} block />

        {[...Array(10)].map((_, index) => (
          <Skeleton.Button
            key={index}
            active
            style={{ height: '90px' }}
            block
          />
        ))}
      </Flex>

      <Skeleton.Button
        active
        style={{ height: '15px', width: '100px', marginTop: '30px' }}
      />
      <Divider style={{ margin: '0px', marginBottom: '10px' }} />

      <Skeleton.Button
        active
        style={{ height: '30px', marginBottom: '15px' }}
        block
      />
      <Flex gap={'4px'} vertical>
        <Skeleton.Button active style={{ height: '60px' }} block />

        {[...Array(4)].map((_, index) => (
          <Skeleton.Button
            key={index}
            active
            style={{ height: '90px' }}
            block
          />
        ))}
      </Flex>
    </Flex>
  );
}
