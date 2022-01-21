import { DataItems, SpatialItems } from '../types'

export default function useParsedItems(items: DataItems, start, end): [SpatialItems, number] {
  const scopedItems = getItemsByScope(items, start, end)
  return insertSpatialData(scopedItems, start, end)
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
      b: layer >= 0 ? layer : layers.length,
      l: round((item.s - start) / lapse),
      w: round((item.s - start + (item.e - item.s)) / lapse),
    }
    layers[spatial.b] = item.e
    return { ...item, spatial }
  })

  return [spatialItems, layers.length]
}

function round(n) {
  return Math.round(n * 1000) / 1000
}
