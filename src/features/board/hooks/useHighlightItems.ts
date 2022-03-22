import { useEffect, useState } from 'react'
import { DataItems } from '../../../types'

export default function useHighlightItems(items: DataItems, highlight: string): DataItems {
  const [highlightedItems, setHighlightedItems] = useState(items)

  useEffect(() => {
    setHighlightedItems(getHighlightedItems(items, highlight))
  }, [JSON.stringify(items), highlight])

  return highlightedItems
}

const getHighlightedItems = (items: DataItems, highlight: string): DataItems => {
  if (!highlight || highlight.length < 3) return items

  return items.map((item) => {
    const textSearch = highlight.toLowerCase()
    const isHighlight =
      item.name?.toLowerCase()?.indexOf(textSearch) > -1 ||
      (item?.fullName && item.fullName.toLowerCase().indexOf(textSearch) > -1) /* ||
      (item?.place && item.place.toLowerCase().indexOf(textSearch) > -1) ||
      (item?.life && item.life.toLowerCase().indexOf(textSearch) > -1) ||
      (item?.tax && item.tax.toLowerCase().indexOf(textSearch) > -1) */

    return isHighlight ? { ...item, highlight: true, display: true } : item
  })
}
