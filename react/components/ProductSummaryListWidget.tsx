import React from 'react'
import { ProductList as ProductListStructuredData } from 'vtex.structured-data'
import { ProductSummaryListWithoutQuery } from 'vtex.product-summary'
import type { ComponentType, PropsWithChildren } from 'react'
import type { QueryProductsTypes } from 'vtex.store-resources'

import useProductClick from './useProductClick'
import type { ActionOnProductClickType } from './useProductClick'

interface Props {
  listName?: string
  actionOnProductClick?: ActionOnProductClickType
  products: QueryProductsTypes.Data['products'] | undefined
  ProductSummary: ComponentType<{ product: any; actionOnClick: any }>
}

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
