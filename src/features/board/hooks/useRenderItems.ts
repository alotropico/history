// Converts parsed data into data ready for rendering
import { round } from '../../../utils/numbers'
import { DataItems, SpatialItems } from '../../../types'
import { useRenderItemsRet } from '../types'

export default function useRenderItems(
  items: DataItems,
  forcedStart: number | null = null,
  forcedEnd: number | null = null
): useRenderItemsRet {
  // Get start and end times from displayed items
  const displayedItems = items.filter((item) => item.display)
  const start =
    forcedStart || displayedItems.reduce((a: any, item) => (!a || (item?.s && a > item.s) ? item.s : a), null) || 0
  const end =
    forcedEnd || displayedItems.reduce((a: any, item) => (!a || (item?.e && a < item.e) ? item.e : a), null) || 2000

  return [displayedItems.length ? insertSpatialData(items, start, end) : [], start, end]
}

// Insert spatial data into each item
function insertSpatialData(items, start, end): SpatialItems {
  const layers: any = []
  const lapse = end - start

  const spatialItems = items.map((item) => {
    const layer = layers.findIndex((l) => !l.length || l.every((chunk) => item.s >= chunk[1] || item.e <= chunk[0]))

    const spatial = {
      i: layer >= 0 ? layer : layers.length,
      l: round((item.s - start) / lapse),
      w: round((item.ev - item.s) / lapse),
    }

    // Push this item into the corresponding layers cache
    if (item.display) {
      if (!layers?.[spatial.i]) layers[spatial.i] = []
      layers[spatial.i].push([item.s, item.e])
    }

    return { ...item, spatial }
  })

  return insertBottomPosition(spatialItems, layers.length)
}

function insertBottomPosition(items: SpatialItems, layers): SpatialItems {
  const itemHeight = 1 / layers

  return items.map((item) => ({
    ...item,
    spatial: {
      ...item.spatial,
      b: round(item.spatial.i / layers),
      h: itemHeight,
    },
  }))
}
