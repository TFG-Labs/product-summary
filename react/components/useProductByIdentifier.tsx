import { useQuery } from 'react-apollo'

import type { Data, Variables } from '../QueryProductType'
import QueryProducts from '../QueryProducts'

interface Props {
  /** Category ID of the listed items. For sub-categories, use "/" (e.g. "1/2/3") */
  category?: string
  /** Filter by collection. */
  collection?: string
}

function useProductByIdentifier({ category, collection }: Props) {
  const { data, loading, error } = useQuery<Data, Variables>(QueryProducts, {
    variables: {
      category,
      ...(collection != null
        ? {
            collection,
          }
        : {}),
      specificationFilters: [],
      orderBy: '',
      from: 0,
      to: 10 - 1,
      hideUnavailableItems: true,
      skusFilter: 'ALL_AVAILABLE',
      installmentCriteria: 'MAX_WITHOUT_INTEREST',
    },
  })

  return { data, loading, error }
}

export default useProductByIdentifier
