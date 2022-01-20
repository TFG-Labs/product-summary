import { useCallback } from 'react'
import { usePixel } from 'vtex.pixel-manager'

export interface ProductClickParams {
  position: number
}
export type ActionOnProductClickType = (product: any) => void

interface UseProductClickProps {
  listName: string
  actionOnProductClick?: ActionOnProductClickType
}

function useProductClick({
  listName,
  actionOnProductClick,
}: UseProductClickProps) {
  const { push } = usePixel()

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

  return productClick
}

export default useProductClick
