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
    let displayId = item.displayId || false

    filterCollection.forEach((filtersObject) => {
      const { filters } = filtersObject
      if (display && filters.length && !filters.includes(item?.[filtersObject.prop])) {
        display = false
        displayId = filtersObject.prop
      }
    })

    return { ...item, display, displayId }
  })
}
