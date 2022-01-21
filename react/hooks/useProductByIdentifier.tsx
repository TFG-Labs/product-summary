import { useQuery } from 'react-apollo'
import type { QueryProductsTypes } from 'vtex.store-resources'

import QueryProductsByIdentifer from '../QueryProductsByIdenitifer'

interface Props {
  productIds?: string[]
}

type Variables = {
  ids: string[]
}

/**
 * REACT HOOK
 * Query products from VTEX APIs filtering by product IDs
 * Uses QueryProductsTypes.Data as the return type is the same as useFilteredProducts
 */
function useProductByIdentifier({ productIds = [] }: Props) {
  const { data, loading, error } = useQuery<QueryProductsTypes.Data, Variables>(
    QueryProductsByIdentifer,
    {
      variables: { ids: productIds },
    }
  )

  return { data, loading, error }
}

export default useProductByIdentifier
