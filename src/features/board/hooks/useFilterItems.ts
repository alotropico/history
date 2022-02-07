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
  if (!filters.length) return items.map((item) => ({ ...item, display: true }))

  return items.map((item) => (filters.includes(item.set) ? { ...item, display: true } : { ...item, display: false }))

  // return items.filter((item) => filters.includes(item.set))
}
