import { useQuery } from 'react-apollo'
import { QueryProducts } from 'vtex.store-resources'
import type { QueryProductsTypes } from 'vtex.store-resources'

type Props = {
  category?: string /** Category ID For sub-categories, use  "1/2/3") */
  collection?: string /** Filter by collection. */
}
/**
 *  REACT HOOK
 *  Calls VTEXs api to fetch filtered product data: filtered by category or collection
 *  Original source:
 *  https://github.com/vtex-apps/product-summary/blob/master/react/ProductSummaryList.tsx#L134
 *
 */
function useFilteredProducts({ category, collection }: Props) {
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
      orderBy: '', // RELEVANCE
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
