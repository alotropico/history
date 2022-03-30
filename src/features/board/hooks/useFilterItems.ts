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
      const { filters, prop } = filtersObject
      if (display && filters.length && !arrayIsOnArray(filters, item?.properties?.claims?.[prop])) {
        display = false
        displayId = filtersObject.prop
      }
    })

    return { ...item, display, displayId }
  })
}

const arrayIsOnArray = (ar1, ar2) =>
  ar1.some((a) => {
    const ar2a = Array.isArray(ar2) ? ar2 : [ar2]
    return ar2a.includes(a)
  })
