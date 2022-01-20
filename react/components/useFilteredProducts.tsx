import { useQuery } from 'react-apollo'
import { QueryProducts } from 'vtex.store-resources'
import type { QueryProductsTypes } from 'vtex.store-resources'

/**
 * ===========================================
 * TYPINGS
 * ===========================================
 */
type SpecificationFilter = {
  id: string
  value: string
}

type SKUFilterType = 'ALL_AVAILABLE' | 'ALL' | 'FIRST_AVAILABLE'
type InstallmentCriteriaType = 'MAX_WITHOUT_INTEREST' | 'MAX_WITH_INTEREST'
type OrderByType =
  | ''
  | 'OrderByTopSaleDESC'
  | 'OrderByPriceDESC'
  | 'OrderByPriceASC'
  | 'OrderByNameASC'
  | 'OrderByNameDESC'
  | 'OrderByReleaseDateDESC'
  | 'OrderByBestDiscountDESC'

/** Category ID of the listed items. For sub-categories, use "/" (e.g. "1/2/3") */
type CategoryType = string | undefined

/** Filter by collection. */
type CollectionType = string | undefined

type UseFilteredProductsProps = {
  category: CategoryType
  collection: CollectionType
}

/**
 * ===========================================
 *  CONSTANTS
 *  All constants can in future be paramterized dependent on
 *  what the business would like to supply to the product carousels
 * ===========================================
 */

/** Control what price to be shown when price has different installments options. */
const INSTALLMENT_CRITERIA: InstallmentCriteriaType = 'MAX_WITHOUT_INTEREST'

/** Control SKUs returned for each product in the query. The less SKUs needed to be returned, the more performant your shelf query will be.   */
const SKUS_FILTER: SKUFilterType = 'ALL_AVAILABLE'

const HIDE_UNAVAILABLE_ITEMS = false

/** Maximum items to be fetched. */
const MAX_ITEMS = 10

/** Ordination type of the items. Empty string orders items by RELEVANCE */
const ORDER_BY: OrderByType = ''

/** Specification Filters of the listed items. */
const SPECIFICATION_FILTERS: SpecificationFilter[] = []

/**
 * ===========================================
 *  UTILITIY METHODS
 * ===========================================
 */
const parseFilters = ({ id, value }: { id: string; value: string }) =>
  `specificationFilter_${id}:${value}`

/**
 * ===========================================
 *  REACT HOOK
 * Calls VTEXs api to fetch filtered product data: filtered by category or collection
 * Original source: https://github.com/vtex-apps/product-summary/blob/master/react/ProductSummaryList.tsx#L134
 * ===========================================
 */
function useFilteredProducts({
  category,
  collection,
}: UseFilteredProductsProps) {
  const collectionObj = collection != null ? { collection } : {}

  const { data, loading, error } = useQuery<
    QueryProductsTypes.Data,
    QueryProductsTypes.Variables
  >(QueryProducts, {
    variables: {
      category,
      collection,
      ...collectionObj,
      specificationFilters: SPECIFICATION_FILTERS.map(parseFilters),
      orderBy: ORDER_BY,
      from: 0,
      to: MAX_ITEMS - 1,
      hideUnavailableItems: HIDE_UNAVAILABLE_ITEMS,
      skusFilter: SKUS_FILTER,
      installmentCriteria: INSTALLMENT_CRITERIA,
    },
  })

  return { data, loading, error }
}

export default useFilteredProducts
