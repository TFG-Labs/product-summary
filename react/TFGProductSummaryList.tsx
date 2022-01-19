import React from 'react'
import type { ComponentType, PropsWithChildren } from 'react'

import useProductByIdentifier from './components/useProductByIdentifier'
import ProductSummaryList from './components/ProductSummaryList'

/**
 *  This component is responsbile for reading in  data from strapi
 *  and callin the Product Summary List with the relevant
 *  variables for rendering 3 types of carousels
 *      1. Product Carousels
 *      2. Brand Carousels
 *      3. Category Carousels
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

  const { data, loading, error } = useProductByIdentifier({
    category,
    collection,
  })

  console.log('props', props)
  console.log('data whoop whoop bla', data)
  console.log('loading', error)
  console.log('error', loading)

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
