import { Divider, Flex, Skeleton } from 'antd';

export default function ProductsPage() {
  return (
    <Flex gap='middle' vertical style={{ padding: '10px 20px' }}>
      <Flex justify='end'>
        <Skeleton.Button active style={{ height: '30px', width: '130px' }} />
      </Flex>
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
