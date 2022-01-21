import React from 'react'
import { ProductList as ProductListStructuredData } from 'vtex.structured-data'
import { ProductSummaryListWithoutQuery } from 'vtex.product-summary'
import type { ComponentType, PropsWithChildren } from 'react'
import type { QueryProductsTypes } from 'vtex.store-resources'

import useProductClick from '../hooks/useProductClick'

interface Props {
  listName?: string
  actionOnProductClick?: (product: any) => void
  products: QueryProductsTypes.Data['products'] | undefined
  ProductSummary: ComponentType<{ product: any; actionOnClick: any }>
}

/**
 * Component Is responsible for co -ordinating product click info
 * and calling ProductSummaryListWithout Query
 * Data fetching has been abstracted away from it using the single concern principle
 * Original Source https://github.com/vtex-apps/product-summary/blob/master/react/ProductSummaryList.tsx#L180
 */

function ProductSummaryListWidget(props: PropsWithChildren<Props>) {
  const {
    children,
    listName = 'List of products',
    actionOnProductClick,
    products,
    ProductSummary,
  } = props

  const productClick = useProductClick({ listName, actionOnProductClick })

  return (
    <ProductSummaryListWithoutQuery
      products={products}
      listName={listName}
      ProductSummary={ProductSummary}
      actionOnProductClick={productClick}
    >
      <ProductListStructuredData products={products} />
      {children}
    </ProductSummaryListWithoutQuery>
  )
}

export default ProductSummaryListWidget
