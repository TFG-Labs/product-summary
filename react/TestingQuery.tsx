import React from 'react'

import useProductByIdentifier from './components/useProductByIdentifier'

function TestingQuery() {
  const { data, loading, error } = useProductByIdentifier({
    productIds: ['256', '686', '252'],
  })

  console.log('testing query data', data)
  console.log('testing query loading', loading)
  console.log('testing query error', error)

  return <div>testing query</div>
}

export default TestingQuery
