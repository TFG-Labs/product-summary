import { useCallback } from 'react'
import { usePixel } from 'vtex.pixel-manager'

export interface ProductClickParams {
  position: number
}

interface Props {
  listName: string
  actionOnProductClick?: (product: any) => void
}

/**
 *  REACT HOOK
 *  Responsible for pushing product click events to google analytics
 *  Original Source:
 *  https://github.com/vtex-apps/product-summary/blob/master/react/ProductSummaryList.tsx#L160
 */
function useProductClick({ listName, actionOnProductClick }: Props) {
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
