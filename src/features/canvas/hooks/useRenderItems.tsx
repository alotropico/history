import { DataItems, SpatialItems } from '../../../types'

export default function useRenderItems(items: DataItems, start, end): [SpatialItems, number] {
  const scopedItems = getItemsByScope(items, start, end)
  const [parsedItems, layers] = insertSpatialData(scopedItems, start, end)
  return [parsedItems, layers]
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
    const layer = layers.findIndex((l) => item.s >= l)
    const spatial = {
      i: layer >= 0 ? layer : layers.length,
      l: toPercentage((item.s - start) / lapse),
      w: toPercentage((item.e - item.s) / lapse),
    }
    layers[spatial.i] = item.e
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
