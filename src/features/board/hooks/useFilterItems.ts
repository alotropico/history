import { useEffect, useState } from 'react'
import { DataItems } from '../../../types'

export default function useFilterItems(items: DataItems, filterCollection: any): DataItems {
  const [filteredItems, setFilteredItems] = useState(items)

  useEffect(() => {
    setFilteredItems(getFilteredItems(items, filterCollection))
  }, [JSON.stringify(items), JSON.stringify(filterCollection)])

  return filteredItems
}

const getFilteredItems = (items: DataItems, filterCollection: any): DataItems => {
  return items.map((item) => {
    let display: boolean = item?.display || true

    filterCollection.forEach((filtersObject) => {
      const { filters } = filtersObject
      if (filters.length && !filters.includes(item?.[filtersObject.prop])) display = false
    })

    return { ...item, display }
  })
}
