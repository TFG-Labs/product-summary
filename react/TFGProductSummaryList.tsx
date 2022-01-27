import React from 'react'
import type { ComponentType, PropsWithChildren } from 'react'

import ProductSummaryListByProductFilter from './components/ProductSummaryListByProductFilter'
import ProductSummaryListByProductId from './components/ProductSummaryListByProductId'
import useStrapiContent from './hooks/useStrapiContent'

interface Props {
  /** Slot of a product summary. */
  ProductSummary: ComponentType<{ product: any; actionOnClick: any }>
  /** Callback on product click. */
  actionOnProductClick?: (product: any) => void
}

/**
 *  This component is responsbile for reading in  data from strßapi
 *  and callin the Product Summary List with the relevant
 *  variables for rendering 4 types of carousels
 *      1. Product Carousels
 *      2. Brand Carousels
 *      3. Category Carousels
 *      4. Collection Carousels
 *  */
function TFGProductSummaryList(props: PropsWithChildren<Props>) {
  const { ProductSummary, actionOnProductClick, children } = props

  const { data, loading, error } = useStrapiContent()

  if (loading || error || !data) return null

  const { carouselVariant, productIds, listName, category, collection } = data

  if (carouselVariant === 'PRODUCT') {
    return (
      <ProductSummaryListByProductId
        productIds={productIds ?? []}
        listName={listName}
        actionOnProductClick={actionOnProductClick}
        ProductSummary={ProductSummary}
      >
        {children}
      </ProductSummaryListByProductId>
    )
  }

  return (
    <ProductSummaryListByProductFilter
      category={category}
      collection={collection}
      listName={listName}
      actionOnProductClick={actionOnProductClick}
      ProductSummary={ProductSummary}
    >
      {children}
    </ProductSummaryListByProductFilter>
  )
}

export default TFGProductSummaryList
