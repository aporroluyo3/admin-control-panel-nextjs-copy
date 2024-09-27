'use client';
import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Flex,
  Grid,
  Input,
  notification,
  Typography,
} from 'antd';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { animations, multiDrag, selections } from '@formkit/drag-and-drop';
import { useMutation } from '@tanstack/react-query';
import { useProductContext } from '@/features/cross-sell/context/product.context';
import {
  Priority,
  Product,
  RelatedProduct,
  Sku,
} from '@/features/cross-sell/types/product';
import { Styles } from '@/types/styles.types';
import { GlobalResponse } from '@/types/api.types';
import {
  addProductRelation,
  deleteProductRelation,
  updateRelatedPriority,
} from '@/features/cross-sell/services/product.services';
import { areArraysEqual } from '@/utils/array.utils';
import { CloseCircleOutlined, SaveOutlined } from '@ant-design/icons';
import { RetryContainer } from '@/components/RetryContainer';
import { RelatedProductCard } from '@/features/cross-sell/components/Product';

const { Text } = Typography;
const { Search } = Input;
const { useBreakpoint } = Grid;

interface RelatedProductsProps {
  productSku: Sku;
  relatedProducts: RelatedProduct[];
}

export default function RelatedProducts({
  productSku,
  relatedProducts: initialRelateds,
}: RelatedProductsProps) {
  const { products, error } = useProductContext();
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();
  const screens = useBreakpoint();

  const [initialRelatedProducts, setInitialRelatedProducts] =
    useState<RelatedProduct[]>(initialRelateds);
  const [initialNotRelatedProducts, setInitialNotRelatedProducts] = useState<
    Product[]
  >(getFilteredNotRelatedProducts(initialRelatedProducts));

  const [parent, relatedProducts, setRelatedProducts] = useDragAndDrop<
    HTMLUListElement,
    RelatedProduct
  >([...initialRelatedProducts], {
    group: 'A',
    plugins: [
      multiDrag({
        plugins: [
          selections({
            selectedClass: 'multigrag',
          }),
        ],
      }),
      animations(),
    ],
    accepts: (_parent, lastParent): boolean => {
      if (lastParent.el === parent.current) return false;

      return relatedProducts.length < 5;
    },
  });

  const [notParent, notRelatedProducts, setNotRelatedProducts] = useDragAndDrop<
    HTMLUListElement,
    Product
  >([...initialNotRelatedProducts], {
    group: 'A',
    plugins: [
      multiDrag({
        plugins: [
          selections({
            selectedClass: 'multidrag',
          }),
        ],
      }),
      animations(),
    ],
  });

  const addRelationMutation = useMutation({
    mutationFn: addProductRelation,
  });

  const deleteRelationMutation = useMutation({
    mutationFn: deleteProductRelation,
  });

  const updateRelatedPriorityMutation = useMutation({
    mutationFn: updateRelatedPriority,
  });

  const styles: Styles = {
    message: {
      width: '100%',
      height: '100%',
      display: 'flex',
      gap: '12px',
      placeItems: 'center',
    },
    otherProductsText: {
      fontWeight: '500',
      color: 'gray',
      marginTop: '30px',
      marginBottom: '10px',
    },
    list: {
      display: 'grid',
      width: '100%',
      minHeight: screens.md ? '240px' : '100px',
      gap: ' 10px',
      gridTemplateColumns: `repeat(${screens.xxl ? 5 : screens.lg ? 4 : screens.md ? 3 : 1}, minmax(0, 1fr))`,
      borderRadius: '8px',
    },
  };

  useEffect(() => {
    setInitialNotRelatedProducts(
      getFilteredNotRelatedProducts(relatedProducts),
    );

    const areEquals = areArraysEqual(initialRelatedProducts, relatedProducts);

    if (!areEquals) {
      notificationApi.open({
        key: 'save-relateds',
        message: (
          <div style={styles.message}>
            <Text>Unsaved changes</Text>
            {/* TODO: Cambiar el método de renderizado para que el butón tome la referencia del loading, actualmente no lo hace. Esto provoca que el usuario pueda darle click nuevamente al botón aunque no haya terminado el proceso anterior */}
            <Button
              type='primary'
              icon={<SaveOutlined />}
              loading={
                addRelationMutation.isPending ||
                deleteRelationMutation.isPending ||
                updateRelatedPriorityMutation.isPending
              }
              onClick={handleSaveChanges}
            >
              Save
            </Button>
            <Button
              color='default'
              type='dashed'
              icon={<CloseCircleOutlined />}
              loading={false}
              onClick={rollbackRelatedProducts}
            >
              Reject
            </Button>
          </div>
        ),
        className: 'save-relateds-container',
        icon: false,
        closeIcon: false,
        placement: 'bottom',
        duration: 0,
        style: { padding: '4px' },
      });
    }

    return () => notificationApi.destroy('save-relateds');
  }, [relatedProducts, initialRelatedProducts]);

  const applyFilters = (searchTerm: string) => {
    if (!initialNotRelatedProducts) return;

    if (!searchTerm || searchTerm === '') {
      setNotRelatedProducts(initialNotRelatedProducts);
      return;
    }

    const lowerCaseTerm = searchTerm.toLowerCase();

    const filteredProducts = initialNotRelatedProducts.filter(
      (p) =>
        p.sku.toLowerCase().includes(lowerCaseTerm) ||
        p.title.toLowerCase().includes(lowerCaseTerm),
    );

    setNotRelatedProducts(filteredProducts);
  };

  const saveRelatedProducts = async (): Promise<
    [GlobalResponse, GlobalResponse[]]
  > => {
    const excludedSkus = initialRelatedProducts.map((p) => p.sku);

    const skusToAdd = relatedProducts
      .map((p) => p.sku)
      .filter((sku) => !excludedSkus.includes(sku));

    const addRelation = await addRelationMutation.mutateAsync({
      productSku,
      relatedProductSkus: skusToAdd,
    });

    const updatePrioritiesPromises = relatedProducts.map(async ({ sku }, i) => {
      const priorityValue = (i + 1) as Priority;

      return await updateProductRelatedPriority(priorityValue, productSku, sku);
    });

    const updatePrioritiesResults = await Promise.all(updatePrioritiesPromises);

    const allResults = await Promise.all([
      addRelation,
      updatePrioritiesResults,
    ]);

    return allResults;
  };

  const updateProductRelatedPriority = async (
    priority: Priority,
    productSku: Sku,
    relatedProductSku: Sku,
  ): Promise<GlobalResponse> => {
    return await updateRelatedPriorityMutation.mutateAsync({
      priority,
      productSku,
      relatedProductSku,
    });
  };

  const deleteRelatedProducts = async (): Promise<GlobalResponse> => {
    const currentRelatedSkus = relatedProducts.map((p) => p.sku);

    const skusToRemove = initialRelatedProducts
      .map((p) => p.sku)
      .filter((sku) => !currentRelatedSkus.includes(sku));

    return await deleteRelationMutation.mutateAsync({
      productSku,
      relatedProductSkus: skusToRemove,
    });
  };

  const handleSaveChanges = async () => {
    try {
      await Promise.all([deleteRelatedProducts(), saveRelatedProducts()]);

      notificationApi.success({
        key: 'save-relateds-success',
        message: 'Success',
        description: 'Related products updated successfully.',
      });
      setInitialRelatedProducts(relatedProducts);
    } catch (error) {
      notificationApi.error({
        key: 'save-relateds-error',
        message: 'Error',
        description: 'Internal error ocurred while updating data.',
      });
      console.error(error);
    }
  };

  // TODO: Permitir realizar rollback segundos después de guardar (no guardar el initial en el save)
  const rollbackRelatedProducts = (): void => {
    setRelatedProducts(initialRelatedProducts);
    setNotRelatedProducts(initialNotRelatedProducts);
  };

  function getFilteredNotRelatedProducts(productsToSkip: Product[]): Product[] {
    return (
      products?.filter(
        (product) =>
          !productsToSkip.some((related) => related.sku === product.sku) &&
          product.sku !== productSku,
      ) ?? []
    );
  }

  return (
    <>
      {notificationContextHolder}

      <Card title='Related products'>
        <Flex vertical align='end' gap={4} style={{ marginBottom: '40px' }}>
          <Text
            style={{ fontWeight: '500', color: 'gray', marginBottom: '10px' }}
          >
            {relatedProducts.length} related products
          </Text>

          <ul
            ref={parent}
            style={{
              ...styles.list,
              border: relatedProducts.length === 0 ? '1px solid #e5e7eb' : '',
            }}
          >
            {relatedProducts.map((related) => (
              <li data-label={related.title} key={related.id}>
                <RelatedProductCard product={related} />
              </li>
            ))}
          </ul>

          <Text style={styles.otherProductsText}>Other products</Text>
          {!products || error ? (
            <RetryContainer
              label='Reload'
              onRetry={() => {
                window.location.reload();
              }}
            />
          ) : (
            <>
              <Search
                size='middle'
                onChange={(e) => {
                  applyFilters(e.target.value);
                }}
                placeholder='Search product by SKU or title'
                style={{ marginBottom: '20px' }}
              />

              <ul
                ref={notParent}
                style={{
                  ...styles.list,
                  border:
                    notRelatedProducts.length === 0 ? '1px solid #e5e7eb' : '',
                }}
              >
                {notRelatedProducts.map((related) => (
                  <li data-label={related.title} key={related.id}>
                    <RelatedProductCard product={related} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </Flex>
      </Card>
    </>
  );
}
