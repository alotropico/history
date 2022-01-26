import { DataItem, SpatialItems } from '../../../types'

export type BoardProps = {
  items: DataItem[]
}

export type useRenderItemsRet = [SpatialItems, number, number]
