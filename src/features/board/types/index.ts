import { DataItem, SpatialItems, DbSetInfo } from '../../../types'

export type BoardProps = {
  items: DataItem[]
  sets: DbSetInfo[]
  occs: any[]
  tags: any[]
}

export type useRenderItemsRet = [SpatialItems, number, number]
