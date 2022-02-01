import { DataItem, SpatialItems, DbSetInfo } from '../../../types'

export type BoardProps = {
  items: DataItem[]
  sets: DbSetInfo[]
}

export type useRenderItemsRet = [SpatialItems, number, number]
