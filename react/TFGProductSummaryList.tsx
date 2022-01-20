import React from 'react'
import type { ComponentType, PropsWithChildren } from 'react'

import ProductSummaryList from './components/ProductSummaryList'

/**
 *  This component is responsbile for reading in  data from strapi
 *  and callin the Product Summary List with the relevant
 *  variables for rendering 4 types of carousels
 *      1. Product Carousels
 *      2. Brand Carousels
 *      3. Category Carousels
 *      4. Collection Carousels
 *  */

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
  actionOnProductClick?: (product: any) => void
}
function TFGProductSummaryList(props: PropsWithChildren<Props>) {
  const {
    category,
    collection,
    listName,
    ProductSummary,
    actionOnProductClick,
    children,
  } = props

  //   const { data, loading, error } = useProductByIdentifier({
  //     productIds: ['686', '255'],
  //   })

  return (
    <ProductSummaryList
      category={category}
      collection={collection}
      listName={listName}
      actionOnProductClick={actionOnProductClick}
      ProductSummary={ProductSummary}
    >
      {children}
    </ProductSummaryList>
  )
}

export default TFGProductSummaryList
