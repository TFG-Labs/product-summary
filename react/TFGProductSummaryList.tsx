import React from 'react'
import type { ComponentType, PropsWithChildren } from 'react'

import ProductSummaryListByProductFilter from './components/ProductSummaryListByProductFilter'
import ProductSummaryListByProductId from './components/ProductSummaryListByProductId'

interface Props {
  /** Category ID of the listed items. For sub-categories, use "/" (e.g. "1/2/3") */
  category?: string
  /** Filter by collection. */
  collection?: string
  /** Filter by productIds. */
  productIds?: string[]
  /** defining the type of carousel to be rendered */
  carouselVariant: 'PRODUCT' | 'BRAND' | 'CATEGORY' | 'COLLECTION'
  /** Name of the list property on Google Analytics events. */
  listName?: string
  /** Slot of a product summary. */
  ProductSummary: ComponentType<{ product: any; actionOnClick: any }>
  /** Callback on product click. */
  actionOnProductClick?: (product: any) => void
}

/**
 *  This component is responsbile for reading in  data from strapi
 *  and callin the Product Summary List with the relevant
 *  variables for rendering 4 types of carousels
 *      1. Product Carousels
 *      2. Brand Carousels
 *      3. Category Carousels
 *      4. Collection Carousels
 *  */
function TFGProductSummaryList(props: PropsWithChildren<Props>) {
  const {
    category,
    collection,
    listName,
    productIds = [],
    carouselVariant,
    ProductSummary,
    actionOnProductClick,
    children,
  } = props

  console.log('removed unused query')

  if (carouselVariant === 'PRODUCT') {
    return (
      <ProductSummaryListByProductId
        productIds={productIds}
        listName={listName}
        actionOnProductClick={actionOnProductClick}
        ProductSummary={ProductSummary}
      >
        {children}
      </ProductSummaryListByProductId>
    )
  }

  if (carouselVariant === 'CATEGORY' || carouselVariant === 'COLLECTION') {
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

  return null
}

export default TFGProductSummaryList
