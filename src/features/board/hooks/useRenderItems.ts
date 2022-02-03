// Converts parsed data into data ready for rendering
import { DataItems, SpatialItems } from '../../../types'
import { useRenderItemsRet } from '../types'

export default function useRenderItems(
  items: DataItems,
  forcedStart: number | null = null,
  forcedEnd: number | null = null
): useRenderItemsRet {
  const start = forcedStart || items.reduce((a: any, item) => (!a || (item?.s && a > item.s) ? item.s : a), null)
  const end = forcedEnd || items.reduce((a: any, item) => (!a || (item?.e && a < item.e) ? item.e : a), null)
  const scopedItems = getItemsByScope(items, start, end)
  const [parsedItems, layers] = insertSpatialData(scopedItems, start, end)
  return [parsedItems, start, end]
}

// Get only items between 'start' and 'end' dates
function getItemsByScope(items, start, end): DataItems {
  return items.filter((item) => item.e > start && item.s < end)
}

// Insert spatial data into each item
function insertSpatialData(items, start, end): [SpatialItems, number] {
  const layers: any = []
  const lapse = end - start

  const spatialItems = items.map((item) => {
    const layer = layers.findIndex((l) => !l.length || l.every((chunk) => item.s >= chunk[1] || item.e <= chunk[0]))

    const spatial = {
      i: layer >= 0 ? layer : layers.length,
      l: toPercentage((item.s - start) / lapse),
      w: toPercentage((item.e - item.s) / lapse),
    }

    // Push this item into the corresponding layers cache
    if (!layers?.[spatial.i]) layers[spatial.i] = []
    layers[spatial.i].push([item.s, item.e])

    return { ...item, spatial }
  })

  return [insertBottomPosition(spatialItems, layers.length), layers.length]
}

function insertBottomPosition(items: SpatialItems, layers): SpatialItems {
  const itemHeight = 100 / layers
  return items.map((item) => ({
    ...item,
    spatial: {
      ...item.spatial,
      b: toPercentage(item.spatial.i / layers),
      h: itemHeight,
    },
  }))
}

function toPercentage(n) {
  return Math.round(n * 1000 * 100) / 1000
}
