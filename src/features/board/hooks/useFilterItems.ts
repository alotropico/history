import { useEffect, useState } from 'react'
import { DataItems } from '../../../types'

export default function useFilterItems(items: DataItems, filters: any): DataItems {
  const [filteredItems, setFilteredItems] = useState(items)

  useEffect(() => {
    setFilteredItems(getFilteredItems(items, filters))
  }, [items, filters])

  return filteredItems
}

const getFilteredItems = (items: DataItems, filters: any): DataItems => {
  if (!filters.length) return items

  return items.filter((item) => filters.includes(item.set))
}
