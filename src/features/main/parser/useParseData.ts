import { useEffect, useState } from 'react'

import taxItems from './taxItems'
import parseItem from './parseItem'
import parseRawItem from './parseRawItem'
import { arrayObjectUnique, sortByNumericValue } from '../../../utils/arrays'
import { DbItem, DataItem } from '../../../types'

export default function useParseData(data: DbItem[]): DataItem[] {
  const [items, setItems] = useState<DataItem[]>([])

  console.log(data && data.map((i: any) => i?.wikidataId).join(', '))

  useEffect(() => {
    if (data) {
      const parsedItems = data
        .map((item) => parseRawItem(item))
        .map((item) => parseItem(item))
        .filter((item) => item?.s && item?.e)
        .sort((a, b) => sortByNumericValue('e', a, b))
        .sort((a, b) => sortByNumericValue('s', a, b))

      const taggedItems = taxItems(parsedItems)
      setItems(arrayObjectUnique(taggedItems, 'id'))
    }
  }, [JSON.stringify(data)])

  return items
}
