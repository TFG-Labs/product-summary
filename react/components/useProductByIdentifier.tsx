import { useQuery } from 'react-apollo'

import type { Data } from '../QueryProductType'
import QueryProductsByIdentifer from '../QueryProductsByIdenitifer'

interface Props {
  productIds?: string[]
}

type Variables = {
  ids: string[]
}

function useProductByIdentifier({ productIds = [] }: Props) {
  const { data, loading, error } = useQuery<Data, Variables>(
    QueryProductsByIdentifer,
    {
      variables: { ids: productIds },
    }
  )

  console.log(' query products by identifier', QueryProductsByIdentifer)

  return { data, loading, error }
}

export default useProductByIdentifier
