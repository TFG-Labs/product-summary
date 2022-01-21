import React from 'react'
import type { ComponentType, PropsWithChildren } from 'react'

import useProductByIdentifier from '../hooks/useProductByIdentifier'
import ProductSummaryListWidget from './ProductSummaryListWidget'

interface Props {
  productIds: string[]
  /** Name of the list property on Google Analytics events. */
  listName?: string
  /** Slot of a product summary. */
  ProductSummary: ComponentType<{ product: any; actionOnClick: any }>
  /** Callback on product click. */
  actionOnProductClick?: (product: any) => void
}

function ProductSummaryListByProductId(props: PropsWithChildren<Props>) {
  const {
    productIds,
    children,
    listName,
    ProductSummary,
    actionOnProductClick,
  } = props

  const { data, loading, error } = useProductByIdentifier({
    productIds,
  })

  const { products } = data ?? {}

  if (loading || error) return null

  return (
    <ProductSummaryListWidget
      listName={listName}
      products={products}
      ProductSummary={ProductSummary}
      actionOnProductClick={actionOnProductClick}
    >
      {children}
    </ProductSummaryListWidget>
  )
}

export default ProductSummaryListByProductId
