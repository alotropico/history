import { IItems, SpatialItems } from '../types'

export default function useParsedItems(items: IItems, start, end): SpatialItems {
  return insertSpatialData(getItemsByScope(items, start, end))
}

function getItemsByScope(items, start, end): IItems {
  return items.filter((item) => item.e > start && item.s < end)
}

function insertSpatialData(items) {
  let s = 0
  let b = 0
  return items.map((item) => {
    const [spatial, sn, bn] = getSpatialData(item, s, b)
    s = sn
    b = bn
    return { ...item, spatial }
  })
}

function getSpatialData(item, s, b) {
  s = s + (item.e - item.s)
  b++
  return [{ s, b }, s, b]
}
