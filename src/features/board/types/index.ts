import { DataItem, SpatialItems, DbSetInfo } from '../../../types'

export type BoardProps = {
  items: DataItem[]
  sets: DbSetInfo[]
  tax: any[]
  places: any[]
}

export type useRenderItemsRet = [SpatialItems, number, number]
