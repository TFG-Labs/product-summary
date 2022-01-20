import React from 'react'
import type { ComponentType, PropsWithChildren } from 'react'

import type { ActionOnProductClickType } from './useProductClick'
import useFilteredProducts from './useFilteredProducts'
import ProductSummaryListWidget from './ProductSummaryListWidget'

interface Props {
  /** Category ID of the listed items. For sub-categories, use "/" (e.g. "1/2/3") */
  category?: string
  /** Filter by collection. */
  collection?: string
  /** Name of the list property on Google Analytics events. */
  listName?: string
  /** Slot of a product summary. */
  ProductSummary: ComponentType<{ product: any; actionOnClick: any }>
  /** Callback on product click. */
  actionOnProductClick?: ActionOnProductClickType
}

function ProductSummaryListByProductFilter(props: PropsWithChildren<Props>) {
  const {
    category, // = '2/7/15',
    collection, //= '142',
    children,
    listName,
    ProductSummary,
    actionOnProductClick,
  } = props

  const { data, loading, error } = useFilteredProducts({ category, collection })

  const { products } = data ?? {}

  if (loading || error) {
    return null
  }

  console.log('second data', data)

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

export default ProductSummaryListByProductFilter
