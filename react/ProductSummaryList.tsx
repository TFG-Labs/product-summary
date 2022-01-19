import React, { useCallback } from 'react'
import type { ComponentType, PropsWithChildren } from 'react'
import { useQuery } from 'react-apollo'
import { QueryProducts } from 'vtex.store-resources'
import type { QueryProductsTypes } from 'vtex.store-resources'
import { usePixel } from 'vtex.pixel-manager'
import { ProductList as ProductListStructuredData } from 'vtex.structured-data'

import ProductSummaryListWithoutQuery from './ProductSummaryListWithoutQuery'
import { PreferenceType } from './utils/normalize'

const parseFilters = ({ id, value }: { id: string; value: string }) =>
  `specificationFilter_${id}:${value}`

export interface ProductClickParams {
  position: number
}

interface SpecificationFilter {
  id: string
  value: string
}

interface Props {
  /** Category ID of the listed items. For sub-categories, use "/" (e.g. "1/2/3") */
  category?: string
  /** Specification Filters of the listed items. */
  specificationFilters?: SpecificationFilter[]
  /** Filter by collection. */
  collection?: string
  /**
   * Ordination type of the items. Possible values: `''`, `OrderByTopSaleDESC`, `OrderByReleaseDateDESC`, `OrderByBestDiscountDESC`, `OrderByPriceDESC`, `OrderByPriceASC`, `OrderByNameASC`, `OrderByNameDESC`
   * @default ""
   */
  orderBy?:
    | '' // empty string is Relevance
    | 'OrderByTopSaleDESC'
    | 'OrderByPriceDESC'
    | 'OrderByPriceASC'
    | 'OrderByNameASC'
    | 'OrderByNameDESC'
    | 'OrderByReleaseDateDESC'
    | 'OrderByBestDiscountDESC'
  /** Hides items that are unavailable. */
  hideUnavailableItems?: boolean
  /**
   * Maximum items to be fetched.
   * @default 10
   */
  maxItems?: number
  /**
   * Control SKUs returned for each product in the query. The less SKUs needed to be returned, the more performant your shelf query will be.
   * @default "ALL_AVAILABLE"
   */
  skusFilter?: 'ALL_AVAILABLE' | 'ALL' | 'FIRST_AVAILABLE'
  /**
   * Control what price to be shown when price has different installments options.
   * @default "MAX_WITHOUT_INTEREST"
   */
  installmentCriteria?: 'MAX_WITHOUT_INTEREST' | 'MAX_WITH_INTEREST'
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
    category = '',
    collection,
    hideUnavailableItems = false,
    orderBy = '',
    specificationFilters = [],
    maxItems = 10,
    skusFilter = 'ALL_AVAILABLE',
    installmentCriteria = 'MAX_WITHOUT_INTEREST',
    children,
    listName: rawListName,
    ProductSummary,
    actionOnProductClick,
    preferredSKU,
  } = props

  const { push } = usePixel()
  const { data, loading, error } = useQuery<
    QueryProductsTypes.Data,
    QueryProductsTypes.Variables
  >(QueryProducts, {
    variables: {
      category,
      ...(collection != null
        ? {
            collection,
          }
        : {}),
      specificationFilters: specificationFilters.map(parseFilters),
      orderBy,
      from: 0,
      to: maxItems - 1,
      hideUnavailableItems,
      skusFilter,
      installmentCriteria,
    },
  })
  console.log(data)
  console.log(QueryProducts)

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
