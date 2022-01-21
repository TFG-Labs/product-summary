import { useQuery } from 'react-apollo'
import { QueryProducts } from 'vtex.store-resources'
import type { QueryProductsTypes } from 'vtex.store-resources'

/**
 * ===========================================
 * TYPINGS
 * ===========================================
 */

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
      specificationFilters: [],
      orderBy: '', // Relevance
      from: 0,
      to: 10 - 1,
      hideUnavailableItems: false,
      skusFilter: 'ALL_AVAILABLE',
      installmentCriteria: 'MAX_WITHOUT_INTEREST',
    },
  })

  return { data, loading, error }
}

export default useFilteredProducts
