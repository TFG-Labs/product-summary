import { useState, useEffect } from 'react'

type APIDataReponseType = {
  carouselVariant: 'PRODUCT' | 'COLLECTION' | 'CATEGORY'
  collection: string
  category: string
  productIds: string[] | null
  listName: string
}

/**
 *  REACT HOOK
 *  fetches carousel content from strapi cms
 */
function useStrapiContent() {
  const [data, setData] = useState<APIDataReponseType | null>(null)
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetch(`http://localhost:1337/api/home?populate=*`)
      .then((response) => response.json())
      .then((result) => {
        const updatedData: APIDataReponseType = result.data.attributes.carousel

        setData(updatedData)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [])

  return { data, error, loading }
}

export default useStrapiContent
