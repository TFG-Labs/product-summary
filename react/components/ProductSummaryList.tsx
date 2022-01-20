import React, { useCallback } from 'react'
import type { ComponentType, PropsWithChildren } from 'react'
import { usePixel } from 'vtex.pixel-manager'
import { ProductList as ProductListStructuredData } from 'vtex.structured-data'

import ProductSummaryListWithoutQuery from './ProductSummaryListWithoutQuery'
import { PreferenceType } from '../utils/normalize'
import useFilteredProducts from './useFilteredProducts'

export interface ProductClickParams {
  position: number
}

interface Props {
  /** Category ID of the listed items. For sub-categories, use "/" (e.g. "1/2/3") */
  category?: string

  /** Filter by collection. */
  collection?: string

  /**
   * Name of the list property on Google Analytics events.
   */
  listName?: string
  /**
   * Logic to enable which SKU will be the selected item
   * */
  preferredSKU?: PreferenceType
  /** Slot of a product summary. */
  ProductSummary: ComponentType<{ product: any; actionOnClick: any }>
  /** Callback on product click. */
  actionOnProductClick?: (product: any) => void
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

  const { push } = usePixel()
  const { data, loading, error } = useFilteredProducts({ category, collection })

  console.log('internal props', props)
  console.log('YEET')

  const { products } = data ?? {}
  // Not using ?? operator because listName can be ''
  // eslint-disable-next-line no-unneeded-ternary
  const listName = rawListName ? rawListName : 'List of products'

  const productClick = useCallback(
    (product: any, productClickParams?: ProductClickParams) => {
      actionOnProductClick?.(product)

      const { position } = productClickParams ?? {}

      push({
        event: 'productClick',
        list: listName,
        product,
        position,
      })
    },
    [push, actionOnProductClick, listName]
  )

  if (loading || error) {
    return null
  }

  console.log('data', data)

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
