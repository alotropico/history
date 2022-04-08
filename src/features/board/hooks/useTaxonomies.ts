import { useEffect, useState } from 'react'
import { arrayDif } from '../../../utils/arrays'

import { placeType } from '../types'

export default function useTaxonomies(items, id): placeType[] {
  const [children, setChildren] = useState<any>([])

  useEffect(() => {
    const newChildren: any = {}

    items
      .filter((item) => item?.display || item.displayId === id)
      .forEach((item) => {
        if (item?.properties?.claims?.[id]) {
          const children = Array.isArray(item?.properties?.claims?.[id])
            ? item.properties.claims[id]
            : [item?.properties?.claims?.[id] || '']

          children
            .filter((child) => child)
            .forEach((child) => {
              if (!newChildren?.[child]) {
                newChildren[child] = {
                  name: child,
                  color: item.theme.color,
                  reach: 1,
                }
              } else {
                newChildren[child].reach++
              }
            })
        }
      })

    setChildren(Object.entries(newChildren).map((child) => child[1]))
  }, [arrayDif(items)])

  return children
}
