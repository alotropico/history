import { useEffect, useState } from 'react'
import { DataItems } from '../../../types'

export default function useHighlightItems(items: DataItems, highlight: string): DataItems {
  const [highlightedItems, setHighlightedItems] = useState(items)

  useEffect(() => {
    setHighlightedItems(getHighlightedItems(items, highlight))
  }, [items, highlight])

  return highlightedItems
}

const getHighlightedItems = (items: DataItems, highlight: string): DataItems => {
  if (!highlight) return items

  return items.map((item) => {
    const textSearch = highlight.toLowerCase()
    const isHighlight =
      item.name.toLowerCase().indexOf(textSearch) > -1 ||
      (item?.fullName && item.fullName.toLowerCase().indexOf(textSearch) > -1)

    return isHighlight ? { ...item, highlight: true } : item
  })
}
