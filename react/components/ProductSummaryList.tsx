import React from 'react'
import type { ComponentType, PropsWithChildren } from 'react'

import { ProductList as ProductListStructuredData } from 'vtex.structured-data'
import { ProductSummaryListWithoutQuery } from 'vtex.product-summary'

import useFilteredProducts from './useFilteredProducts'
import useProductClick, { ActionOnProductClickType } from './useProductClick'

type PreferenceType =
  | 'FIRST_AVAILABLE'
  | 'LAST_AVAILABLE'
  | 'PRICE_ASC'
  | 'PRICE_DESC'
interface Props {
  /** Category ID of the listed items. For sub-categories, use "/" (e.g. "1/2/3") */
  category?: string
  /** Filter by collection. */
  collection?: string
  /** Name of the list property on Google Analytics events. */
  listName?: string
  /** Logic to enable which SKU will be the selected item */
  preferredSKU?: PreferenceType
  /** Slot of a product summary. */
  ProductSummary: ComponentType<{ product: any; actionOnClick: any }>
  /** Callback on product click. */
  actionOnProductClick?: ActionOnProductClickType
}

function ProductSummaryList(props: PropsWithChildren<Props>) {
  const {
    category, // = '2/7/15',
    collection, //= '142',
    children,
    listName: rawListName,
    ProductSummary,
    actionOnProductClick,
    preferredSKU,
  } = props

  const { data, loading, error } = useFilteredProducts({ category, collection })

  const { products } = data ?? {}
  // Not using ?? operator because listName can be ''
  // eslint-disable-next-line no-unneeded-ternary
  const listName = rawListName ? rawListName : 'List of products'

  const productClick = useProductClick({ listName, actionOnProductClick })

  if (loading || error) {
    return null
  }

  console.log('data', data)
  console.log('made useProuct Click its own function  ')

  return (
    <ProductSummaryListWithoutQuery
      products={products}
      listName={listName}
      ProductSummary={ProductSummary}
      actionOnProductClick={productClick}
      preferredSKU={preferredSKU}
    >
      <ProductListStructuredData products={products} />
      {children}
    </ProductSummaryListWithoutQuery>
  )
}

export default ProductSummaryList
